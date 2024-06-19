import { AuthPage, UserInfo } from "@src/components/auth/AuthPage"
import { loginUser } from "@src/services/auth";
import { setLoading } from "@src/store/slices/global.slice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export const Login = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const login = async ({name, email, password}: UserInfo) => {
    dispatch(setLoading(true))
    const res = await loginUser({ name, email, password });
    dispatch(setLoading(false))

    if (res) {
      navigate('/');
    }
  }

  return (
    <AuthPage handleSubmit={login} isLogin={true} />
  )
}
