import chatgpt from "./chatgpt.svg"
import user from "./user.png"

function Conversation(props) {
  return (
    <div className="flex-row w-full">
      {props.content.map((item, index) =>
        item.user === 'user' ? (
          <div className="w-full flex flex-row-reverse m-2">
            <div className="basis-1/6 flex items-end justify-center">
							<img src={user} alt="" className="h-10 w-10" />
						</div>
            <div className="basis-4/6">
							<div className="bg-gray-200 p-2 rounded-tl-lg  rounded-tr-lg rounded-bl-lg">
								{item.content}
							</div>
						</div>
          </div>
        ) : (
          <div className="w-full flex flex-row">
            <div className="basis-1/6 flex items-end justify-center">
							<img src={chatgpt} alt="" className="h-10 w-10" />
					  </div>
            <div className="basis-4/6">
							<div className="bg-red-200 p-2 rounded-tl-lg  rounded-tr-lg rounded-br-lg">
								{item.content}
							</div>
						</div>
          </div>
        )
      )}
    </div>
  )
}

export default Conversation
