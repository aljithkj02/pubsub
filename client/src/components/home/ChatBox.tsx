import { getMessages } from "@src/services/chat";
import { Message, RequestTypes, ResponseTypes } from "@src/services/types";
import { WebSocketManager } from "@src/services/ws";
import { StateType } from "@src/store/appStore";
import moment from "moment";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

export const ChatBox = () => {
  const [text, setText] = useState('');
  const [wsSocket, setWsSocket] = useState<WebSocket | null>(null);
  const selectedRoom = useSelector((state: StateType) => state.room.selectedRoom);
  const [messages, setMessages] = useState<Message[]>([]);
  const {search} = useLocation();

  const selectedRoomRef = useRef(selectedRoom?.id || null);

  useEffect(() => {
    selectedRoom && fetchMessages();
    selectedRoomRef.current = selectedRoom?.id || null;
  }, [selectedRoom])

  useEffect(() => {
    const flag = Number(search.split('=').pop()) % 2 == 0;
    const websocketManager = new WebSocketManager(flag);

    const socket = websocketManager.getSocket();

    setWsSocket(socket);
    
    socket.addEventListener("message", event => {
      const res = JSON.parse(event.data);
      if (res.type === ResponseTypes.NEW_MESSAGE && res.data.roomId === selectedRoomRef.current) {
        setMessages(prev => [...prev, res.data as Message]);
      }
    });

    return () => websocketManager.closeSocket();
  }, [])

  const handleChangeText = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  }
  
  const handleSendMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    wsSocket?.send(JSON.stringify({ type: RequestTypes.SEND, data: { message: text, roomId: selectedRoom?.id as number }}));
    setText('');
  }

  const fetchMessages = async () => {
    if (!selectedRoom) return;
    const res: Message[] = await getMessages(selectedRoom.id);
    setMessages(res);
  }

  return (
    <div className="bg-yellow-200 max-h-[91.8vh] h-screen overflow-y-auto relative -z-0">

      <div className="bg-violet-600 px-8 py-4 text-white font-semibold absolute w-full top-0">
        <p className="text-lg">
          {selectedRoom?.name || 'Select a room!'}
        </p>
      </div>

      <div className="mt-20 px-5 flex flex-col gap-2 max-h-[70vh] overflow-y-scroll pb-2">
        { !selectedRoom && <p className="text-center text-xl text-gray-700">Please select a room</p> }
        { selectedRoom && !messages.length &&  <p className="text-center text-xl text-gray-700">Start messaging!!</p> }
        {
          messages.map((item) => {
            return (
              <div key={item.id} className={`bg-white px-4 py-2 max-w-[30%] w-full rounded-lg ${item.me ? 'self-end': 'self-start'}`}>
                <p className="text-emerald-600 font-semibold">{item.sender}</p>
                <p className="text-gray-500">{item.text}</p>
                <p className="text-right text-gray-500 text-sm">
                  { moment(item.createdAt).format('h:mm A') }
                </p>
              </div>
            )
          })
        }
      </div>

      <form onSubmit={handleSendMessage}>
        <div className="absolute bottom-0 bg-emerald-600 w-full px-8 py-3 flex">
          
          <input type="text" value={text} onChange={handleChangeText} autoFocus
            className="w-full px-6 py-2 rounded-md outline-none rounded-r-none"
            disabled={!selectedRoom}
          />

          <div>
            <button className="bg-yellow-500 text-white rounded-md px-4 py-2 rounded-l-none text-lg font-semibold"
              type="submit" disabled={!selectedRoom || !text}
            >Send</button>
          </div>
        </div>
      </form>
    </div>
  )
}
