import { ChangeEvent, useState } from "react"

interface AddRoomModalProps {
    onClose: () => void;
    onAdd: (text: string) => void;
}

export const AddRoomModal = ({ onClose, onAdd }: AddRoomModalProps) => {

    const [text, setText] = useState('');

    const handleChangeText = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    }

    return (
        <div className="fixed top-0 left-0 w-full h-[100vh] bg-black bg-opacity-50 flex justify-center items-center z-40"
            onClick={onClose}
        >
            <div className="w-[30%] bg-white px-10 py-6 rounded-lg" onClick={(e) => e.stopPropagation()}>
                <p className="text-center text-2xl">Add Room</p>

                <div className="mt-3 flex">
                    <input type='text' placeholder="Room Name" value={text} onChange={handleChangeText}
                        onClick={(e) => e.stopPropagation()}
                        className="px-4 py-2 border-2 outline-none w-full rounded-md rounded-r-none"
                    />

                    <button className="bg-violet-600 text-white px-6 rounded-r-md"
                        onClick={(e) => {
                            e.stopPropagation();
                            onAdd(text);
                        }}
                    >Add</button>
                </div>
            </div>
        </div>
    )
}
