import { Route, Routes } from "react-router";
import App from "../App";
import ChatRoom from "../components/ChatRoom";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/chats" element={<ChatRoom />} />
    </Routes>
  );
};

export default AppRoutes;
