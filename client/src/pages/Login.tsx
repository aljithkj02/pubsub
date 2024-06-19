import { AuthPage, UserInfo } from "@src/components/auth/AuthPage"
import { loginUser } from "@src/services/auth";
import { useNavigate } from "react-router-dom";

export const Login = () => {

  const navigate = useNavigate();

  const login = async ({name, email, password}: UserInfo) => {
    const res = await loginUser({ name, email, password });

    if (res) {
      navigate('/');
    }
  }

  return (
    <AuthPage handleSubmit={login} isLogin={true} />
  )
}
