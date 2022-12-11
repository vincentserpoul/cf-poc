#![warn(
    clippy::all,
    // clippy::restriction,
    // clippy::pedantic,
    // clippy::cargo
)]

use axum::{
    error_handling::HandleErrorLayer, extract::State, http::StatusCode, response::IntoResponse,
    routing::get, Json, Router,
};
use std::{net::SocketAddr, time::Duration};
use tower::{BoxError, ServiceBuilder};
use tower_http::trace::TraceLayer;
use tracing_subscriber::{layer::SubscriberExt, util::SubscriberInitExt};

use radonrisks::{get_radon_risks, RadonRisk};

use tokio::sync::OnceCell;

static GLOBAL_RADON_RISKS: OnceCell<Vec<RadonRisk>> = OnceCell::const_new();

async fn get_global_radon_risks() -> &'static Vec<RadonRisk> {
    GLOBAL_RADON_RISKS
        .get_or_init(|| async { get_radon_risks().await.unwrap() })
        .await
}

#[tokio::main]
async fn main() {
    tracing_subscriber::registry()
        .with(
            tracing_subscriber::EnvFilter::try_from_default_env()
                .unwrap_or_else(|_| "radon_risks=debug,tower_http=debug".into()),
        )
        .with(tracing_subscriber::fmt::layer().json())
        .init();

    let db = get_global_radon_risks().await;

    // Compose the routes
    let app = Router::new()
        .route("/radonrisks", get(radon_risks_index))
        // Add middleware to all routes
        .layer(
            ServiceBuilder::new()
                .layer(HandleErrorLayer::new(|error: BoxError| async move {
                    if error.is::<tower::timeout::error::Elapsed>() {
                        Ok(StatusCode::REQUEST_TIMEOUT)
                    } else {
                        Err((
                            StatusCode::INTERNAL_SERVER_ERROR,
                            format!("Unhandled internal error: {}", error),
                        ))
                    }
                }))
                .timeout(Duration::from_secs(1))
                .layer(TraceLayer::new_for_http())
                .into_inner(),
        )
        .with_state(db.to_owned());

    let addr = SocketAddr::from(([0, 0, 0, 0], 8080));

    tracing::debug!("listening on {}", addr);

    axum::Server::bind(&addr)
        .serve(app.into_make_service())
        .await
        .unwrap();
}

async fn radon_risks_index(State(db): State<Vec<RadonRisk>>) -> impl IntoResponse {
    Json(db)
}
