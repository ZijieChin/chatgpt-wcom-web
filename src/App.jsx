import { useRef, useState, useEffect } from 'react'
import './App.css'
import Conversation from './Conversation'

function App() {
  let botName = 'ChatGPT 聊天机器人'

  const [botStatus, setBotStatus] = useState('思考中...')
  const [userInput, setUserInput] = useState()
  const [conversations, setConversations] = useState([
    { user: 'user', content: '你好' },
    { user: 'bot', content: '你好，人类' },
    {
      user: 'user',
      content:
        '现在大家的生活水平变得越来越高，都想在各个方面提高一下自己的生活质量，电脑就是一个显著的方向，都喜欢给自己加上固态硬盘，但是都说固态硬盘寿命短，用完寿命之后固态硬盘会如何？',
    },
    {
      user: 'bot',
      content:
        '总得来说商用的东西，往往会把很多资源用到极限。这些被写超了预期寿命的ssd，厂家也是不提供保修的，运维发现了ssd损坏，确认一下写入次数超标的也就直接报废处理了。其实消费级SSD这玩意只要是正常使用一般不担心寿命，前提是大厂出品的可靠固态，像那种二手颗粒或者是黑白片SSD另当别论。',
    },
    {
      user: 'user',
      content:
        '现在大家的生活水平变得越来越高，都想在各个方面提高一下自己的生活质量，电脑就是一个显著的方向，都喜欢给自己加上固态硬盘，但是都说固态硬盘寿命短，用完寿命之后固态硬盘会如何？',
    },
    {
      user: 'bot',
      content:
        '总得来说商用的东西，往往会把很多资源用到极限。这些被写超了预期寿命的ssd，厂家也是不提供保修的，运维发现了ssd损坏，确认一下写入次数超标的也就直接报废处理了。其实消费级SSD这玩意只要是正常使用一般不担心寿命，前提是大厂出品的可靠固态，像那种二手颗粒或者是黑白片SSD另当别论。',
    },
  ])

  const chatBoxBottom = useRef(null)

  const onSubmitClick = () => {
    let question = { user: 'user', content: userInput }
    setConversations([...conversations, question])
    setUserInput('')
  }

  const scrollToBottom = () => {
    if (chatBoxBottom.current && chatBoxBottom) {
      chatBoxBottom.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [conversations])

  return (
    <div className="App p-0 max-h-full">
      <div className="flex flex-col h-full">
        <div className="basis-1/12 flex flex-col justify-center items-center bg-red-500	fixed w-full top-0">
          <p className="font-san text-lg font-semibold text-white">{botName}</p>
          <p className="font-san text-xs text-white">{botStatus}</p>
        </div>
        <div className="basis-10/12 flex flex-col mt-10 mb-16 bg-neutral-50">
          <Conversation content={conversations} />
          <div className="bottom" ref={chatBoxBottom}></div>
          <div className="basis-1/12 flex flex-row bg-red-500 items-center p-2 fixed bottom-0 w-full">
            <div className="basis-4/5 flex items-center">
              <input
                className="rounded-md w-full h-9 outline-none border-slate-50	border-2 bg-neutral-50"
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
                className="rounded-md w-full h-9 bg-blue-400 ml-1 outline-none font-semibold text-gray-50"
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
