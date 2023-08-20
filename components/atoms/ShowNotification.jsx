import Image from "next/image";
import { useState } from "react";

// notification API fetched data here.
const messages = [
  { message: "Hello this is message 1" },
  { message: "Hello this is message 2" },
  { message: "Hello this is message 3" },
];
function ShowNotifications() {
  const [showMessages, setShowMessages] = useState(false);
  const [unread, setUnread] = useState(messages);

  // Example data variable

  const handleClick = () => {
    setShowMessages(!showMessages);
    // const nextMessage = {message : "Hello this is message 4"}
    // const newMessage = [...unread, nextMessage]
    // setUnread(newMessage);
  };

  return (
    <div
      className="h-10 w-10 rounded-full bg-[#242627] flex items-center justify-center relative cursor-pointer"
      onClick={() => handleClick()}
    >
      <Image
        src="Icons/vector.svg"
        height={18.22}
        width={13.42}
        alt="not found"
      />
      {unread.length > 0 && (
        <div className="absolute w-2 h-2 rounded-full bg-red-600 top-0 right-1"></div>
      )}
      {unread.length > 0 && showMessages && (
        
          <ul className="absolute  bg-[#2b2d31] top-[50px] right-[3px] rounded-lg min-w-[200px] py-2 text-center h-auto">
            {unread.map((item,index)=>{0
              return (
                <li className="w-auto h-auto" key={index}>{item.message}</li>
              )
            })}
          </ul>
        
      )}
    </div>
    // <div className="relative right-[-55px]">
    //   <button
    //     className="flex items-center focus:outline-none"
    //     onClick={handleClick}
    //   >
    //     <img
    //       src="/vector.svg"
    //       alt="My Icon"
    //       className=" ml-2 div absolute w-[30px] h-[23px] right-[195px] top-[26px] bg-[#313131] rounded-[25px] flex items-center justify-center"
    //     />
    //     {unread > 0 && (
    //       <div className="ml-2 div absolute w-2 h-2 rounded-full bg-red-500 right-[195px] top-[23px]"></div>
    //     )}
    //   </button>
    //   {unread > 0 && showMessages && (
    //     <div className="absolute z-10 w-64 bg-gray-400 shadow-lg rounded-lg py-2 mt-1 right-[195px] top-[75px]">
    //       <ul>
    //         <li>Unread message 1</li>
    //         <li>Unread message 2</li>
    //         <li>Unread message 3</li>
    //       </ul>
    //     </div>
    //   )}
    // </div>
  );
}

export default ShowNotifications;
