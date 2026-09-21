import { lazy, Suspense } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import { HomeSkeleton, ComponentsSkeleton, InstallSkeleton, DemoSkeleton } from './components/Skeletons';

const Home = lazy(() => import('./pages/Home'));
const Components = lazy(() => import('./pages/Components'));
const Install = lazy(() => import('./pages/Install'));
const Demo = lazy(() => import('./pages/Demo'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <Suspense fallback={<HomeSkeleton />}>
                <Home />
              </Suspense>
            }
          />
          <Route
            path="components"
            element={
              <Suspense fallback={<ComponentsSkeleton />}>
                <Components />
              </Suspense>
            }
          />
          <Route
            path="demo"
            element={
              <Suspense fallback={<DemoSkeleton />}>
                <Demo />
              </Suspense>
            }
          />
          <Route
            path="install"
            element={
              <Suspense fallback={<InstallSkeleton />}>
                <Install />
              </Suspense>
            }
          />
          <Route
            path="*"
            element={
              <Suspense fallback={<HomeSkeleton />}>
                <NotFound />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
