import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import TodoDetailsPageSkeleton from './pages/todos/TodoDetailsPageSkeleton';
import TodosPageSkeleton from './pages/todos/TodosPageSkeleton';
import { Toaster } from './components/toast/Toaster';

/**
 * This will retry failed chunks up to 5 times
 * @param {Function} lazyComponent - lazy component import function
 * @param {Number} attemptsLeft - number of attempts to make (defaults to 5)
 * @returns {Promise<any>} Promise that rejects if all additional attempts fail.
 */
function componentLoader(lazyComponent, attemptsLeft = 5) {
  return new Promise((resolve, reject) => {
    lazyComponent()
      .then(resolve)
      .catch((error) => {
        // let us retry after 100 ms
        setTimeout(() => {
          if (attemptsLeft === 1) {
            reject(error);
            return;
          }
          componentLoader(lazyComponent, attemptsLeft - 1).then(
            resolve,
            reject
          );
        }, 100);
      });
  });
}

// Lazy load imports
const TodosPage = lazy(() =>
  componentLoader(() => import('./pages/todos/TodosPage'))
);
const TodoDetailsPage = lazy(() =>
  componentLoader(() => import('./pages/todos/TodoDetailsPage'))
);

// TODO:
// Notifications

function App() {
  return (
    <BrowserRouter>
      <Toaster />

      <Routes>
        <Route
          path='/'
          element={
            <Suspense fallback={<TodosPageSkeleton />}>
              <TodosPage />
            </Suspense>
          }
        />
        <Route
          path='/:id'
          element={
            <Suspense fallback={<TodoDetailsPageSkeleton />}>
              <TodoDetailsPage />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
