import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { Signup } from '@pages/Signup'
import { Login } from '@pages/Login'
import { Home } from "@pages/Home"
import { Providers } from "@providers/Providers"
import { Layout } from "@providers/Layout"

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/signup',
        element: <Signup />
      },
      {
        path: '/login',
        element: <Login />
      },
    ]
  },
])

function App() {
  return (
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  )
}

export default App
