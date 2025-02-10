import React, { useState } from "react";
import { createRoomApi, joinRoomApi } from "../services/RoomServices";
import toast from "react-hot-toast";
import useChatContext from "../context/ChatProvider";
import { useNavigate } from "react-router";

const JoinCreate = () => {
  const { roomId, setRoomId, currentUser, setCurrentUser, setConnected } =
    useChatContext();

  const navigate = useNavigate();

  const [details, setDetails] = useState({
    userName: "",
    roomId: "",
  });

  const handleForm = (event) => {
    setDetails({
      ...details,
      [event.target.name]: event.target.value,
    });
  };

  //validation

  const validation = () => {
    if (details.roomId === null || details.name === null) return false;
    return true;
  };

  //join chat....

  const joinChat = async () => {
    if (validation()) {
      try {
        const response = await joinRoomApi(details.roomId);
        toast.success("Welcome..");
        setConnected(true);
        setCurrentUser(details.userName);
        setRoomId(response.roomId);
        navigate("/chats");
      } catch (error) {
        if (error.status == 400) {
          toast.error("Room does not exist");
        } else {
          toast.error("Error in joining");
        }
      }
    }
  };

  //create room

  const createRoom = async () => {
    if (validation()) {
      try {
        const response = await createRoomApi(details.roomId);
        toast.success("Room created successfully");

        //redirect to chat page
        setRoomId(response.roomId);
        setConnected(true);
        setCurrentUser(details.userName);
        navigate("/chats");
      } catch (error) {
        if (error.status == 400) {
          toast.error("Room already exist");
        } else {
          toast.error("Could not create room");
        }
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className=" p-8 dark:bg-slate-800 shadow-lg rounded w-full max-w-md">
        <h1 className="text-2xl font-semibold dark:text-gray-300 pb-6 flex flex-col justify-center">
          Join room
          <p className="text-sm text-gray-500 mb-2">
            (If don't have room,just fill these fields and create room)
          </p>
        </h1>

        <form className="max-w-sm mx-auto">
          <div className="mb-5">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="userName"
              value={details.userName}
              onChange={handleForm}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter name"
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="roomId"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Room-id
            </label>
            <input
              type="text"
              id="roomId"
              name="roomId"
              value={details.roomId}
              onChange={handleForm}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <div className="flex flex-col items-center justify-between md:flex-row">
            <div
              onClick={joinChat}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Join Room
            </div>
            <h3>OR</h3>
            <div
              onClick={createRoom}
              className="text-white bg-green-500 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-500 dark:hover:bg-green-700 dark:focus:ring-blue-800"
            >
              Create Room
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JoinCreate;
