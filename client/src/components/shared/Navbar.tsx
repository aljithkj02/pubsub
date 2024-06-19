import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        toast.dismiss();
        toast.success('Logged out Successfully!');
        navigate('/login');
    }

    return (
        <nav className="px-10 py-3 bg-blue-500 flex justify-between fixed w-full top-0 left-0">
            <p className="text-2xl text-white font-medium">Messenger</p>

            <div>
                <button onClick={handleLogout} className="bg-red-500 px-5 py-1 text-white rounded-md">Logout</button>
            </div>
        </nav>
    )
}
