#![warn(
    clippy::all,
    // clippy::restriction,
    // clippy::pedantic,
    // clippy::cargo
)]

use anyhow::Result;
use thiserror::Error;

use serde::{Deserialize, Serialize};

#[derive(Debug, Deserialize, Serialize, Default, Clone)]
pub struct RadonRisk {
    nom_comm: String,
    nom_dept: String,
    insee_com: String,
    classe_potentiel: u8,
    reg: String,
}

#[derive(Error, Debug)]
pub enum RadonRisksError {
    #[error("could not get data from data.gouv.fr")]
    Unknown,
}

pub async fn get_radon_risks() -> Result<Vec<RadonRisk>> {
    let resp = reqwest::get("http://static.data.gouv.fr/resources/connaitre-le-potentiel-radon-de-ma-commune/20190506-174309/radon.csv")
        .await?.bytes().await?;

    let radon_risks = parse_radon_risks(resp.as_ref())?;

    Ok(radon_risks)
}

pub fn parse_radon_risks(r: &[u8]) -> Result<Vec<RadonRisk>> {
    let mut rdr = csv::ReaderBuilder::new()
        .has_headers(true)
        .delimiter(b';')
        .from_reader(r);

    let mut radon_risks = Vec::new();

    for result in rdr.deserialize() {
        let record: RadonRisk = result?;
        radon_risks.push(record);
    }

    Ok(radon_risks)
}
