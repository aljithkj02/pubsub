import { ProtectedRoute } from "@providers/ProtectedRoute"
import { Outlet } from "react-router-dom"

export const Layout = () => {
  return (
    <ProtectedRoute>
        <Outlet />
    </ProtectedRoute>
  )
}
