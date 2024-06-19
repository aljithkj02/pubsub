import { AuthPage, UserInfo } from "@src/components/auth/AuthPage"

export const Login = () => {
  const login = async ({ email, password}: UserInfo) => {

  }

  return (
    <AuthPage handleSubmit={login} isLogin={true} />
  )
}
