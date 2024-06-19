import { ChatBox } from "@src/components/home/ChatBox"
import { Rooms } from "@src/components/home/Rooms"

export const Home = () => {
  
  return (
    <>
    <div className="grid grid-cols-4">
      <div className="col-span-1">
        <Rooms />
      </div>

      <div className="col-span-3">
        <ChatBox />
      </div>
    </div>
    </>
  )
}
