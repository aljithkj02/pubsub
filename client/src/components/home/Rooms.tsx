import { getAllRooms } from "@src/services/chat";
import { Room } from "@src/services/types";
import { useEffect, useState } from "react";

export const Rooms = () => {

  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    fetchAllRooms();
  }, [])

  const fetchAllRooms = async () => {
    const res: Room[] = await getAllRooms();
    setRooms(res);
  }

  return (
    <div className="border-r-2 max-h-[91.8vh] h-screen overflow-y-auto">
      <p className="text-violet-700 font-semibold text-xl text-center mt-4">Available Rooms</p>

      <div className="flex flex-col gap-2 mt-6">
        {
          rooms.map((item) => {
            return  <p key={item.id} className="px-7 cursor-pointer hover:bg-yellow-200 py-2 text-lg transition-all duration-300">
              {item.name}
            </p>
          })
        }
      </div>
    </div>
  )
}
