import React, { useState, useEffect ,useRef} from "react";

export default function Chat({ socket, username, room }) {
  const [currentMessage, setCurrentMessage] = useState("");

  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        id: Math.random(),
        room: room,
        author: username,
        message: currentMessage,
        time:
          (new Date(Date.now()).getHours() % 12) +
          ":" +
          (new Date(Date.now()).getMinutes() % 60),
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(
    (data) => {
      const handleRecieveMessage = (data) => {
        setMessageList((list) => [...list, data]);
      };
      socket.on("receive_message", handleRecieveMessage);

      return () => {
        socket.off("receive_message", handleRecieveMessage);
      };
    },
    [socket]
  );


  const conatinerRef=useRef(null)


  useEffect(()=>{
    conatinerRef.current.scrollTop=conatinerRef.current.scrollHeight;
  },[messageList])


  return (
    <div>
      <div className="chat">
        <h1>Welcome {username}</h1>
        <div className="chat_box">
            <div className="auto-scrolling-div"
            ref={conatinerRef}
            style={
                {
                    height:'450px',
                    overflowY:"auto",
                }
            }>

          {messageList.map((data) => (
            <div
              key={data.id}
              className="message_content"
              id={username === data.author ? "you" : "other"}
            >
              <div>
                <div className="msg"
                id={username===data.author?"y":"b"}>
                  <p>{data.message}</p>
                </div>
                <div className="msg_detail">
                  <p>{data.author}</p>
                  <p>{data.time}</p>
                </div>
              </div>
            </div>
          ))}

        </div>
          <div className="chat_body">
            <input
              type="text"
              name=""
              id=""
              value={currentMessage}
              placeholder="Enter Your message"
              onChange={(e) => setCurrentMessage(e.target.value)}
              onKeyPress={(e) => {
                e.key === "Enter" && sendMessage();
              }}
            />

            <button onClick={sendMessage}>&#9658;</button>
          </div>
        </div>
      </div>
    </div>
  );
}
