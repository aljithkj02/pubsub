import { StateType } from "@src/store/appStore";
import { ChangeEvent, FormEvent, useState } from "react"
import { useSelector } from "react-redux";

const chats = [
  {
    id: 1,
    name: 'Krishna',
    message: 'How are you buddy',
    time: '7:30',
    me: false
  },
  {
    id: 2,
    name: 'Balram',
    message: 'I am doing good brother',
    time: '8:30',
    me: false
  },
  {
    id: 3,
    name: 'Ram',
    message: 'I hope all are doing good',
    time: '8:31',
    me: false
  },
  {
    id: 4,
    name: 'Jithu',
    message: 'Jai Sree Ram',
    time: '10:30',
    me: true
  },
  {
    id: 5,
    name: 'Sita',
    message: 'How are you my son Jithu',
    time: '17:30',
    me: false
  },
];

export const ChatBox = () => {
  const [text, setText] = useState('');
  const selectedRoom = useSelector((state: StateType) => state.room.selectedRoom);

  const handleChangeText = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  }
  
  const handleSendMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setText('');
  }

  return (
    <div className="bg-yellow-200 max-h-[91.8vh] h-screen overflow-y-auto relative -z-10">

      <div className="bg-violet-600 px-8 py-4 text-white font-semibold absolute w-full top-0">
        <p className="text-lg">
          {selectedRoom?.name || 'Select a room!'}
        </p>
      </div>

      <div className="mt-20 px-5 flex flex-col gap-2 max-h-[70vh] overflow-y-scroll pb-2">
        {
          chats.map((item) => {
            return (
              <div key={item.id} className={`bg-white px-4 py-2 max-w-[30%] w-full rounded-lg ${item.me ? 'self-end': 'self-start'}`}>
                <p className="text-emerald-600 font-semibold">{item.name}</p>
                <p className="text-gray-500">{item.message}</p>
                <p className="text-right text-gray-500 text-sm">{item.time}</p>
              </div>
            )
          })
        }
      </div>

      <form onSubmit={handleSendMessage}>
        <div className="absolute bottom-0 bg-emerald-600 w-full px-8 py-3 flex">
          
          <input type="text" value={text} onChange={handleChangeText} autoFocus
            className="w-full px-6 py-2 rounded-md outline-none rounded-r-none"
          />

          <div>
            <button className="bg-yellow-500 text-white rounded-md px-4 py-2 rounded-l-none text-lg font-semibold"
              type="submit"
            >Send</button>
          </div>
        </div>
      </form>
    </div>
  )
}
