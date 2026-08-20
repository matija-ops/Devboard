import { Routes, Route, Navigate } from "react-router-dom";

import BoardsPage from "./pages/BoardsPage";
import BoardPage from "./pages/BoardPage";
import ProfilePage from "./pages/ProfilePage";
import { useEffect, useState } from "react";
import { supabase } from "./lib/supabaseClient"


const getBoards = async () => {
  const { data, error } = await supabase.from("board").select("*");

  console.log("Boards:", data);
  console.log("Fehler:", error);
};

export function App() {
  const [username, setUsername] = useState("Nutzer");

  useEffect(() => {
    const savedUsername = localStorage.getItem("username");
    if (savedUsername) {
      setUsername(savedUsername);
    }
    getBoards();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/boards" replace />} />
      <Route path="/boards" element={<BoardsPage username={username} />} />
      <Route path="/boards/:id" element={<BoardPage username={username} />} />
      <Route
        path="/profile"
        element={<ProfilePage username={username} setUsername={setUsername} />}
      />
    </Routes>
  );
}
