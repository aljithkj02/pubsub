import { ChangeEvent, FormEvent, useState } from "react"

export const ChatBox = () => {
  const [text, setText] = useState('');

  const handleChangeText = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  }
  
  const handleSendMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setText('');
  }

  return (
    <div className="bg-yellow-100 max-h-[91.8vh] h-screen overflow-y-auto relative">

      <div className="bg-violet-600 px-8 py-4 text-white font-semibold absolute w-full top-0">
        <p className="text-lg">Room Name</p>
      </div>

      <div className="mt-16 px-5">
        Chats
      </div>

      <form onSubmit={handleSendMessage}>
        <div className="absolute bottom-0 bg-emerald-600 w-full px-8 py-3 flex">
          
          <input type="text" value={text} onChange={handleChangeText} autoFocus
            className="w-full px-2 py-2 rounded-md outline-none rounded-r-none"
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
