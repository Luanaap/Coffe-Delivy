import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Home } from './pages/Home'
import { Cart } from './pages/Cart'
import { Sucess } from './pages/Success'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home/>,
      },
      {
        path: '/cart',
        element: <Cart/>,
      },
      {
        path: '/order/:orderId/success',
        element: <Sucess/>,
      }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
