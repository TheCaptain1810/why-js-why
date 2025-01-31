import React, { Suspense, lazy } from 'react';

// Lazy-load the component
const LazyComponent = lazy(() => import('./LazyComponent'));

function App() {
  return (
    <div>
      <h1>Lazy Loading with Suspense in React</h1>
      
      {/* Suspense wraps the lazy-loaded component */}
      <Suspense fallback={<div>Loading...</div>}>
        <LazyComponent />
      </Suspense>
    </div>
  );
}

export default App;
