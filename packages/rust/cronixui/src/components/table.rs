//! Table component

use egui::Ui;

pub struct Table<'a> {
    headers: &'a [&'a str],
    rows: Vec<Vec<String>>,
}

impl<'a> Table<'a> {
    pub fn new(headers: &'a [&'a str]) -> Self {
        Self { headers, rows: Vec::new() }
    }

    pub fn row(mut self, cells: impl IntoIterator<Item = impl Into<String>>) -> Self {
        self.rows.push(cells.into_iter().map(|s| s.into()).collect());
        self
    }

    pub fn show(&self, ui: &mut Ui) {
        use egui_extras::{Column, TableBuilder};

        let num_cols = self.headers.len();
        let mut table = TableBuilder::new(ui)
            .striped(true)
            .resizable(true)
            .cell_layout(egui::Layout::left_to_right(egui::Align::Center));

        for _ in 0..num_cols {
            table = table.column(Column::initial(100.0).at_least(40.0));
        }

        table
            .header(20.0, |mut header| {
                for &h in self.headers {
                    header.col(|ui| {
                        ui.strong(h);
                    });
                }
            })
            .body(|mut body| {
                for row in &self.rows {
                    body.row(18.0, |mut row| {
                        for cell in row {
                            row.col(|ui| {
                                ui.label(cell);
                            });
                        }
                    });
                }
            });
    }
}
