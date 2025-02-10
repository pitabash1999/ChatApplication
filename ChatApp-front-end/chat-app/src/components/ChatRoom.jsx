import React, { useEffect, useRef, useState } from "react";

import chatPng from "../assets/chat.png";
import upload from "../assets/upload-file.png";
import send from "../assets/send.png";
import useChatContext from "../context/ChatProvider";
import { useNavigate } from "react-router";
import SockJS from "sockjs-client";
import { BASE_URL } from "../config/AxiosHelper";
import { Stomp } from "@stomp/stompjs";
import { loadMeassges } from "../services/RoomServices";
import toast from "react-hot-toast";

const ChatRoom = () => {
  const {
    roomId,
    connected,
    currentUser,
    setConnected,
    setRoomId,
    setCurrentUser,
  } = useChatContext();

  const navigateTo = useNavigate();

  useEffect(() => {
    if (!connected) {
      navigateTo("/");
    }
  }, [roomId, currentUser, connected]);

  const [message, setMessage] = useState([]);
  const [input, setInput] = useState("");
  const inputRef = useRef(null);
  const chatBox = useRef();
  const [stompClient, setStompClient] = useState(null);

  //funtionality to load messages

  useEffect(() => {
    const load = async () => {
      try {
        const loadedMsg = await loadMeassges(roomId);

        setMessage(loadedMsg);
      } catch (error) {
        if (connected) toast.error("Error in loading messges");
      }
    };
    if (connected) load();
  }, []);

  //scroll chatpage

  useEffect(() => {
    if (chatBox.current) {
      chatBox.current.scroll({
        top: chatBox.current.scrollHeight,
      });
    }
  }, [message]);

  //Stomp client initialization
  useEffect(() => {
    const createConnection = () => {
      //SOCK
      const sock = new SockJS(`${BASE_URL}/chat`);
      const client = Stomp.over(sock);

      client.connect({}, () => {
        setStompClient(client);
        client.subscribe(`/topic/room/${roomId}`, (msg) => {
          const newMsg = JSON.parse(msg.body);
          setMessage((prev) => [...prev, newMsg]);
        });
      });
    };

    if (connected) createConnection();
  }, [roomId]);

  //Send message input function

  const sendMessage = () => {
    if (stompClient && connected && input.trim()) {
      const sendMsgBody = {
        sender: currentUser,
        content: input,
        roomId: roomId,
      };

      stompClient.send(
        `/app/sendMessage/${roomId}`,
        {},
        JSON.stringify(sendMsgBody)
      );
      setInput("");
    }
  };

  const leaveBottun = () => {
    stompClient.disconnect();
    setConnected(false);
    setRoomId(null);
    setCurrentUser(null);
    navigateTo("/");
  };

  return (
    <div className="min-w-max">
      {/*header section*/}
      <header className="bg-slate-300 dark:bg-slate-800 flex items-center justify-around sticky -top-0  w-full p-3 shadow-lg z-50 sm:flex-wrap">
        <div className="flex items-center space-x-2">
          <img className="w-6 h-6" src={chatPng} alt="chat-logo" />
          <h3 className="text-sm font-semibold">
            RoomId: <span className="text-xl font-semibold">{roomId}</span>
          </h3>
        </div>
        <div>
          <h3 className="text-sm font-semibold">
            User: <span className="text-xl font-semibold">{currentUser}</span>
          </h3>
        </div>
        <div>
          <button
            type="submit"
            onClick={leaveBottun}
            className="text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-500 dark:hover:bg-red-800  dark:focus:ring-blue-800"
          >
            Leave Room
          </button>
        </div>
      </header>
      {/*chat page section*/}

      <main className="flex justify-center w-full h-[calc(100vh-8rem)] overflow-hidden">
        <div
          ref={chatBox}
          className="flex flex-col border border-gray-700 bg-slate-300 w-2/3   h-full dark:bg-slate-800 mt-2 rounded-lg shadow-md overflow-auto pb-5"
        >
          {message.map((msg) => (
            <div
              key={Math.random()}
              className={`flex ${
                msg.sender === currentUser ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`flex ${
                  msg.sender === currentUser ? "flex-row-reverse" : "flex-row"
                }  gap-2 mt-2 px-4 py-1 dark:text-white `}
              >
                <img
                  className="w-8 h-8"
                  src="https://avatar.iran.liara.run/public"
                  alt=""
                />
                <div className=" bg-slate-400 dark:bg-slate-600 flex flex-col  max-w-max rounded-lg p-1 shadow-lg ">
                  <p className="text-[12px]">{msg.sender}</p>
                  <p>{msg.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* message section */}
      <div className="fixed w-full bottom-0 h-16 flex items-center justify-center">
        <div className="w-2/3 flex space-x-4 items-center justify-center">
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(e) => {
              if (e.code === "Enter") sendMessage();
            }}
            type="text"
            placeholder="Enter message"
            className="dark:bg-slate-800 border border-gray-800 dark:border-none px-5 py-2 rounded-full mb-2 w-4/5 outline-none bg-transparent"
          />
          <div>
            <button>
              <img className="w-8 h-8" src={upload} alt="" />
            </button>
          </div>

          <div>
            <button onClick={sendMessage}>
              <img src={send} alt="" className="w-8 h-8" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
