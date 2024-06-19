import { AuthPage, UserInfo } from "@src/components/auth/AuthPage"

export const Signup = () => {

  const signup = async ({name, email, password}: UserInfo) => {
    
  }

  return (
    <AuthPage handleSubmit={signup} isLogin={false} />
  )
}
