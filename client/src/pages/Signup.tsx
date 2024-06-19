import { AuthPage, UserInfo } from "@components/auth/AuthPage"
import { signupUser } from "@src/services/auth";
import { useNavigate } from "react-router-dom";

export const Signup = () => {

  const navigate = useNavigate();

  const signup = async ({name, email, password}: UserInfo) => {
    const res = await signupUser({ name, email, password });

    if (res) {
      navigate('/');
    }
  }

  return (
    <AuthPage handleSubmit={signup} isLogin={false} />
  )
}
