import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { BsChatLeft } from "react-icons/bs";
import { BsSend } from "react-icons/bs";
import Swal from "sweetalert2";
import axios from "axios";
import ScrollToBottom from "react-scroll-to-bottom";
const socket = io.connect("http://localhost:3002");
const Chat = () => {
  axios.defaults.withCredentials = true;

  const [currentUser, setCurrentUser] = useState("");
  const handleCreateRoom = () => {
    axios.get("http://localhost:3001/api/loginStatus").then((response) => {
      if (response.data.loggedIn === true) {
        setPopup(!popup);
        setRoom(response.data.user[0].Name);
        setCurrentUser(response.data.user[0].Name);

        if (room !== "") {
          socket.emit("join_room", room);
        }
        // Update the room list after receiving the response
        socket.on("room_list", (rooms) => {
          console.log(rooms);
          setRooms(rooms);
        });
      } else {
        // Handle the case when user is not logged in
        setPopup(false);
        Swal.fire({
          position: "top",
          icon: "Error",
          title: "You need to Login first!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const [room, setRoom] = useState("");
  const [popup, setPopup] = useState(false);

  // Chat

  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const sendMessage = async () => {
    console.log(room.trim());
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: currentUser,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  const [rooms, setRooms] = useState([]);
  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log(data);
      setMessageList((list) => [...list, data]);
    });
    socket.on("room_list", (rooms) => {
      console.log(rooms);
      setRooms(rooms);
    });

    // Clean up event listeners
    return () => {
      socket.off("receive_message");
      socket.off("room_list");
    };
  }, []);

  return (
    <div className="sticky left-10 bottom-10">
      <button
        onClick={() => {
          handleCreateRoom();
          console.log(rooms);
        }}
        className="w-14 h-14 flex items-center justify-center p-3 rounded-full bg-white border-2"
      >
        <BsChatLeft size={"40px"} />
      </button>

      {popup && (
        <div className="absolute w-72 h-80 bg-slate-400 border left-24 bottom-10 rounded-lg">
          <h1>Hi {room}</h1>

          <div className="flex flex-col flex-grow w-full h-full max-w-xl bg-white shadow-xl rounded-lg overflow-hidden">
            <div className="flex flex-col flex-grow h-0 p-4 overflow-auto">
              {messageList?.map((message) => {
                return (
                  <div
                    className={`flex w-full mt-2 space-x-3 max-w-xs ${
                      room === message.author ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div>
                      <div class="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
                        <p class="text-sm">{message.message}</p>
                      </div>
                      <span class="text-xs text-gray-500 leading-none">
                        {message.time}
                      </span>
                      <p className="text-black">{message.author}</p>
                    </div>
                  </div>
                );
              })}

              {/* <div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
                <div>
                  <div className="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
                    <p className="text-sm">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod.
                    </p>
                  </div>
                  <span className="text-xs text-gray-500 leading-none">
                    2 min ago
                  </span>
                </div>
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
              </div> */}
            </div>

            <div className="bg-gray-300 p-4 flex flex-row">
              <input
                className="flex items-center h-10 w-full rounded px-3 text-sm"
                type="text"
                value={currentMessage}
                placeholder="Type your message…"
                onChange={(e) => {
                  setCurrentMessage(e.target.value);
                }}
                onKeyDown={(e) => {
                  e.key === "Enter" && sendMessage();
                }}
              />
              <button onClick={sendMessage} className="p-1">
                <BsSend />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
