import { getAllRooms } from "@src/services/chat";
import { Room } from "@src/services/types";
import { StateType } from "@src/store/appStore";
import { setSelectedRoom } from "@src/store/slices/room.slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const Rooms = () => {

  const [rooms, setRooms] = useState<Room[]>([]);
  const {selectedRoom, refetch} = useSelector((state: StateType) => state.room);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchAllRooms();
  }, [refetch])

  const fetchAllRooms = async () => {
    const res: Room[] = await getAllRooms();
    setRooms(res);
  }

  const handleSelect = (room: Room) => {
    dispatch(setSelectedRoom(room));
  }

  return (
    <div className="border-r-2 max-h-[91.8vh] h-screen overflow-y-auto">
      <p className="text-violet-700 font-semibold text-xl text-center mt-4">Available Rooms</p>

      <div className="flex flex-col mt-6">
        {
          rooms.map((item) => {
            return  <p key={item.id} 
              className={`px-7 cursor-pointer py-3 text-lg transition-all duration-300 ${item.id === selectedRoom?.id ? ' bg-yellow-400': 'hover:bg-yellow-100'}`}
              onClick={() => handleSelect(item)}
            >
              {item.name}
            </p>
          })
        }
      </div>
    </div>
  )
}
