import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AddRoomModal } from '@components/home/AddRoomModal'
import { createRoom } from "@src/services/chat";
import { useDispatch } from "react-redux";
import { handleRefetch } from "@src/store/slices/room.slice";

export const Navbar = () => {
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        localStorage.removeItem('token');
        toast.dismiss();
        toast.success('Logged out Successfully!');
        navigate('/login');
    }

    const handleShow = () => setShowModal(true);

    const handleAdd = async (text: string) => {
        await createRoom({ name: text });
        dispatch(handleRefetch());
        setShowModal(false);
    }

    return (
        <nav className="px-10 py-3 bg-blue-500 flex justify-between fixed w-full top-0 left-0 z-10">
            <p className="text-2xl text-white font-medium">Messenger</p>

            <div className="flex gap-4">
                <button onClick={handleShow} className="bg-violet-900 px-2 py-1 text-sm text-white rounded-md">Add Room</button>
                <button onClick={handleLogout} className="bg-red-500 px-5 py-1 text-white rounded-md">Logout</button>
            </div>


            { showModal && <AddRoomModal onClose={() => setShowModal(false)} onAdd={handleAdd}/> }
        </nav>
    )
}
