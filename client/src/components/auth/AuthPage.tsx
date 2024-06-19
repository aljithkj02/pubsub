import { ChangeEvent, FormEvent, useState } from "react"
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface IAuthPageProps {
    handleSubmit: (params: UserInfo) => Promise<void>;
    isLogin: boolean;
}

export interface UserInfo {
  name: string;
  email: string;
  password: string;
}

export const AuthPage = ({ handleSubmit, isLogin }: IAuthPageProps) => {
  const [info, setInfo] = useState({
    name: '',
    email: '',
    password: ''
  })

  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setInfo({
      ...info,
      [name]: value
    })
  }

  const handleChangePage = () => {
    navigate(isLogin ? '/signup': '/login')
  }

  const submitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isLogin) {
      if (!info.email || !info.password) {
        toast.dismiss();
        toast.error('Fields should not be empty!');
        return;
      }
    } else {
      if (!info.email || !info.password || !info.name) {
        toast.dismiss();
        toast.error('Fields should not be empty!');
        return;
      }
    }

    handleSubmit(info);
  }

  return (
    <div className="w-full h-screen gap-2 flex flex-col justify-center items-center bg-gray-300">
      <div className="w-[38%] bg-white rounded-lg px-10 py-10">
        <p className="text-center text-3xl font-medium">{isLogin ? 'Login': 'Signup'}</p>

        <form onSubmit={submitForm}>
          <div className="my-3 flex flex-col gap-4">
            { !isLogin && <input 
                className="p-2 border-2 rounded-md"
                placeholder="Enter your name"
                type="text"
                value={info.name}
                name='name'
                onChange={handleChange}
            /> }

            <input 
                className="p-2 border-2 rounded-md"
                placeholder="Enter your email"
                type="email"
                value={info.email}
                name='email'
                onChange={handleChange}
            />

            <input 
                className="p-2 border-2 rounded-md"
                placeholder="Enter your password"
                type="text"
                value={info.password}
                name='password'
                onChange={handleChange}
            />

            <button type="submit" className="mt-3 bg-blue-500 text-white p-2 rounded-md text-xl">
              {isLogin ? 'Login' : 'Signup'}
            </button>

            <p className="text-center">
              {isLogin ? "Don't have an account?": "Already have an account?"}
              <span 
                onClick={handleChangePage}
                className="text-blue-600 cursor-pointer"
              >
                {isLogin ? ' Signup': ' Login'}
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}