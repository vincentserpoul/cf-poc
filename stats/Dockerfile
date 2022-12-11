ARG RUST_VERSION=1.65

###########
# PLANNER #
###########

FROM rust:${RUST_VERSION} as planner

WORKDIR /app

RUN cargo install cargo-chef

COPY . .

RUN cargo chef prepare --recipe-path recipe.json

##########
# CACHER #
##########

FROM rust:${RUST_VERSION} as cacher

WORKDIR /app

RUN cargo install cargo-chef

COPY --from=planner /app/recipe.json recipe.json

RUN cargo chef cook --release --recipe-path recipe.json

##########
# CACHER #
##########

FROM rust:${RUST_VERSION} as builder

WORKDIR /app

COPY . .

COPY --from=cacher /app/target target

COPY --from=cacher /usr/local/cargo /usr/local/cargo

WORKDIR /app/run

RUN cargo build --release --bin run

##########
# RUNNER #
##########

FROM gcr.io/distroless/cc-debian10:nonroot

WORKDIR /app

COPY --from=builder /app/target/release/run stats-run

ENTRYPOINT ["./stats-run"]
