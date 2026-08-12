import Navbar from "@/components/Navbar";
import BoardHeader from "@/components/BoardHeader";
import BoardCard from "@/components/BoardCard";
import { useEffect, useState } from "react";
import type { Board } from "@/types/board";

type BoardsPageProps = { username: string };

export default function BoardsPage({ username }: BoardsPageProps) {
  const [boards, setBoards] = useState<Board[]>([
    {
      id: "1",
      title: "Neues Board",
      columns: 3,
      tasks: [],
    },
  ]);
  useEffect(() => {
    const savedBoards = localStorage.getItem("boards");
    console.log(savedBoards);
    if (savedBoards) {
      const parsedBoards: Board[] = JSON.parse(savedBoards);
      setBoards(parsedBoards);
    }
  }, []);
  //useEffect(() => {}, [boards]);
  const handleCreateBoard = (title: string) => {
    if (!title.trim()) return;
    const newBoard = {
      id: crypto.randomUUID(),
      title,
      columns: 3,
      tasks: [],
    };
    const updatedBoards = [...boards, newBoard];

    localStorage.setItem("boards", JSON.stringify(updatedBoards));

    setBoards(updatedBoards);
  };

  const handleDeleteBoard = (id: string) => {
    const updatedBoards = boards.filter((board) => board.id !== id);

    localStorage.setItem("boards", JSON.stringify(updatedBoards));

    setBoards(updatedBoards);
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
              columns={board.columns}
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
