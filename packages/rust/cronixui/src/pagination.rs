pub struct Pagination {
    total: usize,
    current: usize,
}

impl Pagination {
    pub fn new(total: usize, current: usize) -> Self {
        let current = current.clamp(1, total.max(1));
        Self { total, current }
    }

    pub fn go_to(&mut self, page: usize) {
        if page >= 1 && page <= self.total {
            self.current = page;
        }
    }

    pub fn current(&self) -> usize {
        self.current
    }

    pub fn total(&self) -> usize {
        self.total
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
}
