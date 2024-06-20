import { ProtectedRoute } from "@providers/ProtectedRoute"
import { Loader } from "@src/components/shared/Loader";
import { Navbar } from "@src/components/shared/Navbar"
import { StateType } from "@src/store/appStore";
import { useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom"

export const Layout = () => {
  const { pathname } = useLocation();
  const auth = ['/login', 'signup'].includes(pathname);

  const loading = useSelector((state: StateType) => state.global.loading);

  if (auth) {
    return (
      <>
        <Outlet />
        { loading && <Loader />}
      </>
    )
  }

  return (
    <ProtectedRoute>
      <div className="select-none">
        <Navbar />
        <div className="pt-14">
          <Outlet />
        </div>
        { loading && <Loader />}
      </div>
    </ProtectedRoute>
  )
}
