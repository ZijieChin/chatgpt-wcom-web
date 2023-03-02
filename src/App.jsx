import { useRef, useState, useEffect } from 'react'
import './App.css'
import Conversation from './Conversation'
import { useLoading, Oval } from '@agney/react-loading'
import TextareaAutosize from 'react-textarea-autosize'
import toast, { Toaster } from 'react-hot-toast'

// 控制用户输入的字符长度
const wordLimitation = 100

function App() {
  let botName = '小乐'
  // const api = 'http://localhost:8888/api'
  const api = 'https://chat.zijieq.com/api'

  const [botStatus, setBotStatus] = useState('Powered by ChatGPT')
  const [userInput, setUserInput] = useState('')
  const [conversations, setConversations] = useState([])
  const [sessionID, setSessionID] = useState('')
  const [btnDisabled, setBtnDisabled] = useState(false)
  const [textAreaHeight, setTextAreaHeight] = useState('auto')
  const [inputLength, setInputLength] = useState(0)

  const chatBoxBottom = useRef(null)

  const { containerProps, indicatorEl } = useLoading({
    loading: true,
    indicator: <Oval width="25px" style={{ color: 'white' }} />,
  })

  const onSubmitClick = () => {
    if (userInput.trim().length > 0) {
      setBotStatus('思考中...')
      setBtnDisabled(true)
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
          setBtnDisabled(false)
          setTextAreaHeight('auto')
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
    setTimeout(() => {
      setConversations([{ user: 'bot', content: '您好！我是 **ChatGPT**，今天您想聊点什么？' }])
    }, 800)
  }, [])

  return (
    <div className="App p-0 h-full bg-neutral-50">
      <Toaster />
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
              <TextareaAutosize
                className="rounded-md w-full outline-none border-slate-50	border-2 bg-neutral-50 shadow-md overflow-hidden resize-none p-1"
                onChange={(e) => {
                  setInputLength(e.target.value.length)
                  if (e.target.value.length > wordLimitation) {
                    toast.error(`输入限制${wordLimitation}字，已达限制。`, {
                      duration: 1000,
                    })
                    return
                  } else {
                    setUserInput(e.target.value)
                  }
                  // setTextAreaHeight('auto')
                  // setTextAreaHeight(`${e.target.scrollHeight}px`)
                }}
                value={userInput}
                onKeyUp={(e) => {
                  if (e.key === 'Enter') onSubmitClick()
                }}
                autoFocus
                style={{ height: textAreaHeight }}
              />
            </div>
            <div className="basis-1/5 flex items-center">
              <button
                onClick={onSubmitClick}
                disabled={btnDisabled}
                className="rounded-md w-full h-9 bg-blue-400 ml-1 outline-none font-semibold text-gray-50 shadow-md"
              >
                {btnDisabled ? (
                  <section {...containerProps} className="flex justify-center">
                    {indicatorEl} {/* renders only while loading */}
                  </section>
                ) : (
                  '发 送'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
