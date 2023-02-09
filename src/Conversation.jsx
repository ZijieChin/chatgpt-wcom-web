import chatgpt from './chatgpt.svg'
import user from './user.png'

function Conversation(props) {
  return (
    <div className="flex-row w-full">
      {props.content.map((item, index) =>
        item.user === 'user' ? (
          <div className="w-full flex flex-row-reverse mt-2 mb-2" key={index}>
            <div className="basis-1/6 flex justify-center">
              <img src={user} alt="" className="h-10 w-10" />
            </div>
            <div className="basis-4/6 flex flex-row-reverse">
              <div className="bg-gray-200 p-2 rounded-tl-xl  rounded-br-xl rounded-bl-xl shadow-md -mr-1">
                <p className="whitespace-pre-wrap break-all">{item.content}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full flex flex-row mt-2 mb-2" key={index}>
            <div className="basis-1/6 flex justify-center">
              <img src={chatgpt} alt="" className="h-10 w-10" />
            </div>
            <div className="basis-4/6 flex">
              <div className="bg-red-200 p-2 rounded-br-xl  rounded-tr-xl rounded-bl-xl shadow-md -ml-1">
                <p className="whitespace-pre-wrap break-all">{item.content}</p>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  )
}

export default Conversation
