import { httpCilent } from "../config/AxiosHelper";

export const createRoomApi = async (roomId) => {
  const response = await httpCilent.post("api/v1/rooms", roomId, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
  return response.data;
};

export const joinRoomApi = async (roomId) => {
  const response = await httpCilent.get(`api/v1/rooms/${roomId}`);
  return response.data;
};

export const loadMeassges = async (roomId) => {
  const response = await httpCilent.get(`api/v1/rooms/${roomId}/message`);

  return response.data;
};
