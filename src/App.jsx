import { useRef, useState, useEffect } from 'react'
import './App.css'
import Conversation from './Conversation'

function App() {
  let botName = '小乐'
  // const api = 'http://localhost:8888/api'
  const api = 'https://chat.zijieq.com/api'

  const [botStatus, setBotStatus] = useState('Powered by ChatGPT')
  const [userInput, setUserInput] = useState('')
  const [conversations, setConversations] = useState([])
  const [sessionID, setSessionID] = useState('')

  const chatBoxBottom = useRef(null)

  const onSubmitClick = () => {
    setBotStatus('思考中...')
    if (userInput.length > 0) {
      let question = userInput
      setConversations([...conversations, { user: 'user', content: question }])
      setUserInput('')
      fetch(api + '/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ uid: sessionID, text: userInput }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          let answer = data.answer
          setConversations([...conversations, { user: 'user', content: question }, { user: 'bot', content: answer }])
        })
        .catch(() => {
          setConversations([
            ...conversations,
            { user: 'user', content: question },
            { user: 'bot', content: '抱歉，当前 ChatGPT 服务器负载较高，请重试。' },
          ])
        })
        .finally(() => {
          setBotStatus('Powered by ChatGPT')
        })
    }
  }

  const scrollToBottom = () => {
    if (chatBoxBottom.current && chatBoxBottom) {
      chatBoxBottom.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [conversations])

  useEffect(() => {
    fetch(api)
      .then((res) => res.json())
      .then((data) => {
        setSessionID(data)
      })
  }, [])

  return (
    <div className="App p-0 h-full bg-neutral-50">
      <div className="flex flex-col h-full">
        <div className="basis-1/12 flex flex-col justify-center items-center bg-red-500 fixed w-full top-0">
          <p className="font-san text-lg font-bold text-white mt-1">{botName}</p>
          <p className="font-san text-xs text-white m-1">{botStatus}</p>
        </div>
        <div className="basis-10/12 flex flex-col mt-14 mb-16 bg-neutral-50">
          <Conversation content={conversations} />
          <div className="bottom" ref={chatBoxBottom}></div>
          <div className="basis-1/12 flex flex-row bg-red-500 items-center p-2 fixed bottom-0 w-full">
            <div className="basis-4/5 flex items-center">
              <input
                className="rounded-md w-full h-9 outline-none border-slate-50	border-2 bg-neutral-50 shadow-md"
                onChange={(e) => {
                  setUserInput(e.target.value)
                }}
                value={userInput}
                onKeyUp={(e) => {
                  if (e.key === 'Enter') onSubmitClick()
                }}
              />
            </div>
            <div className="basis-1/5 flex items-center">
              <button
                onClick={onSubmitClick}
                className="rounded-md w-full h-9 bg-blue-400 ml-1 outline-none font-semibold text-gray-50 shadow-md"
              >
                发 送
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
