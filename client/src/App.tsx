import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { Signup } from '@pages/Signup'
import { Login } from '@pages/Login'
import { Home } from "@pages/Home"
import { Providers } from "@providers/Providers"

const router = createBrowserRouter([
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/',
    element: <Home />
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
