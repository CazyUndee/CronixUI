//! Pagination component

pub struct Pagination {
    pub total: usize,
    pub current: usize,
}

impl Pagination {
    pub fn new(total: usize) -> Self {
        Self { total, current: 1 }
    }

    pub fn go_to(&mut self, page: usize) {
        if page >= 1 && page <= self.total {
            self.current = page;
        }
    }

    pub fn next(&mut self) {
        if self.current < self.total {
            self.current += 1;
        }
    }

    pub fn prev(&mut self) {
        if self.current > 1 {
            self.current -= 1;
        }
    }

    pub fn is_first(&self) -> bool {
        self.current == 1
    }

    pub fn is_last(&self) -> bool {
        self.current == self.total
    }
}
