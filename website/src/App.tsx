import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Components from './pages/Components';
import Install from './pages/Install';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="components" element={<Components />} />
          <Route path="install" element={<Install />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;