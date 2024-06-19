import { ProtectedRoute } from "@providers/ProtectedRoute"
import { Navbar } from "@src/components/shared/Navbar"
import { Outlet } from "react-router-dom"

export const Layout = () => {
  return (
    <ProtectedRoute>
        <Navbar />
        <Outlet />
    </ProtectedRoute>
  )
}
