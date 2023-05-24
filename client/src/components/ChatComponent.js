import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { useModal } from "react-hooks-use-modal";
import { BsSend } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const socket = io("http://localhost:3002");
const ChatComponent = () => {
  const [rooms, setRooms] = useState([]);
  const [singleRoom, setSingleRoom] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    axios.get("http://localhost:3001/api/loginStatus").then((response) => {
      if (!response.data.loggedIn) {
        navigate("/signin");
      } else if (response.data.user[0].User_Type !== "CS") {
        navigate("/");
      } else {
        setCurrentUser(response.data.user[0].Name);
      }
    });
  }, []);
  const handleJoinRoom = (room) => {
    setSingleRoom(room);
    socket.emit("join_room", room);
  };

  const updateRooms = () => {
    // Request an updated list of rooms from the server
    socket.on("room_list", (rooms) => {
      console.log(rooms);
      setRooms(rooms);
    });
  };
  // send message
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: singleRoom,
        author: singleRoom,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
    }
  };
  // receive message
  useEffect(() => {
    socket.on("receive_message", handleReceiveMessage);
    socket.on("room_list", handleRoomList);

    return () => {
      socket.off("receive_message", handleReceiveMessage);
      socket.off("room_list", handleRoomList);
    };
  }, [socket]);

  const handleReceiveMessage = (data) => {
    console.log(data);
    setMessageList((list) => [...list, data]);
  };

  const handleRoomList = (rooms) => {
    console.log(rooms);
    setRooms(rooms);
  };

  const [Modal, open, close, isOpen] = useModal("root", {
    preventScroll: true,
    closeOnOverlayClick: true,
  });

  return (
    <div className="flex flex-col">
      <div className="flex p-4">
        <button
          class="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          onClick={updateRooms}
        >
          Update Rooms
        </button>
      </div>
      <div className="flex flex-row flex-wrap h-screen items-center justify-center">
        <div class="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
          <div class="flex items-center justify-between mb-4">
            <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white">
              Client's Rooms
            </h5>
          </div>
          {rooms.map((room) => (
            <div class="flow-root" key={room}>
              <ul
                role="list"
                class="divide-y divide-gray-200 dark:divide-gray-700"
              >
                <li class="py-3 sm:py-4">
                  <div class="flex items-center space-x-4">
                    <div class="flex-1 min-w-0">
                      <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                        {room}
                      </p>
                    </div>
                    <div class="inline-flex items-center cursor-pointer text-base font-semibold text-gray-900 dark:text-white">
                      <button
                        onClick={() => {
                          handleJoinRoom(room);
                          open();
                        }}
                      >
                        Join
                      </button>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          ))}
        </div>
      </div>
      <Modal>
        <div className="flex items-center justify-center">
          <div className=" w-[500px] h-[500px] bg-slate-400 border  rounded-lg">
            <h1>Hi{} </h1>

            <div class="flex flex-col flex-grow w-full h-full max-w-xl bg-white shadow-xl rounded-lg overflow-hidden">
              <div class="flex flex-col flex-grow h-0 p-4 overflow-auto">
                <h3 className="p-1">{singleRoom}</h3>
                {messageList?.map((message) => {
                  console.log(currentMessage, message.author);
                  return (
                    <div
                      className={`flex w-full mt-2 space-x-3 max-w-xs ${
                        currentUser === message.author
                          ? "justify-start"
                          : "justify-end"
                      }`}
                    >
                      <div>
                        <div class="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
                          <p class="text-sm">{message.message}</p>
                        </div>
                        <span class="text-xs text-gray-500 leading-none">
                          {message.time}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div class="bg-gray-300 p-4 flex flex-row">
                <input
                  class="flex items-center h-10 w-full rounded px-3 text-sm"
                  type="text"
                  placeholder="Type your message…"
                  onChange={(e) => {
                    setCurrentMessage(e.target.value);
                  }}
                />
                <button onClick={sendMessage} className=" p-1">
                  <BsSend />
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ChatComponent;
