import { AuthPage, UserInfo } from "@components/auth/AuthPage"
import { signupUser } from "@src/services/auth";
import { setLoading } from "@src/store/slices/global.slice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export const Signup = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signup = async ({name, email, password}: UserInfo) => {
    dispatch(setLoading(true));
    const res = await signupUser({ name, email, password });
    dispatch(setLoading(false));

    if (res) {
      navigate('/');
    }
  }

  return (
    <AuthPage handleSubmit={signup} isLogin={false} />
  )
}
