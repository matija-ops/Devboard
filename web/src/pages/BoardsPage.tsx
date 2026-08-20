import Navbar from "@/components/Navbar";
import BoardHeader from "@/components/BoardHeader";
import BoardCard from "@/components/BoardCard";
import { useEffect, useState } from "react";
import type { Board } from "@/types/board";
import { supabase } from "@/lib/supabaseClient"

type BoardsPageProps = { username: string };

export default function BoardsPage({ username }: BoardsPageProps) {
  const [boards, setBoards] = useState<Board[]>([

  ]);
useEffect(() => {
  const getBoards = async () => {
    const { data, error } = await supabase
      .from("board")
      .select("*, tasks:task(*)");
    console.log(data)
    if (error) {
      console.error("Fehler beim Laden der Boards:", error);
      return;
    }

    setBoards(data)
  };

  getBoards();
}, []);
  //useEffect(() => {}, [boards]);
const handleCreateBoard = async (title: string) => {
  if (!title.trim()) return;

  const { data, error } = await supabase
    .from("board")
    .insert({
      title: title,
      
    })
    .select()
    .single();

  if (error) {
    console.error("Fehler beim Erstellen des Boards:", error);
    return;
  }

  setBoards((currentBoards) => [
    ...currentBoards,
    {
      ...data,
      tasks: [],
    },
  ]);
};

const handleDeleteBoard = async (id: string) => {
  const { error } = await supabase
    .from("board")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Fehler beim Löschen des Boards:", error);
    return;
  }

  setBoards((currentBoards) =>
    currentBoards.filter((board) => board.id !== id)
  );
};
  return (
    <>
      <Navbar username={username} />

      <main className="mx-auto max-w-7xl p-8">
        <BoardHeader onCreateBoard={handleCreateBoard} />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {boards.map((board) => (
            <BoardCard
              id={board.id}
              title={board.title}
              columns={3}
              tasks={board.tasks}
              key={board.id}
              onDelete={handleDeleteBoard}
            />
          ))}
        </div>
      </main>
    </>
  );
}
