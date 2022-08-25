use serde::{Deserialize, Serialize};
use std::fmt;
use skyline_web::{Webpage, WebSession};
use crate::*;

/// a basic string response
#[derive(Serialize, Deserialize)]
pub struct StringResponse {
    pub id: String,
    pub message: String,
}

impl fmt::Display for StringResponse {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "(id: {}, message: {})", self.id, self.message)
    }
}

/// a basic boolean response
#[derive(Serialize, Deserialize)]
pub struct BooleanResponse {
    pub id: String,
    pub result: bool,
}

impl fmt::Display for BooleanResponse {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "(id: {}, message: {})", self.id, self.result)
    }
}

pub trait BoolRespond {
    fn respond_bool(&self, result: bool, id: &String);
}

pub trait StringRespond {
    fn respond_string(&self, message: &str, id: &String);
}

pub trait OkOrError {
    fn ok(&self, message: &str, id: &String);
    fn error(&self, message: &str, id: &String);
}

/// a response that contains a flag for whether the
/// operation was successful, as well as a message field.
#[derive(Serialize, Deserialize)]
pub struct OkOrErrorResponse {
    pub id: String,
    pub ok: bool,
    pub message: String,
}

impl fmt::Display for OkOrErrorResponse {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "(id: {}, ok: {}, message: {})", self.id, self.ok, self.message)
    }
}