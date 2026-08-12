import Navbar from "@/components/Navbar";
import BoardDetailHeader from "@/components/BoardDetailHeader";
import BoardColumn from "@/components/BoardColumn";
import { useState, useEffect } from "react";
import type { Task } from "@/types/task";
import { useParams } from "react-router-dom";

type BoardsPageProps = { username: string };

export default function BoardPage({ username }: BoardsPageProps) {
  const { id } = useParams();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [boardTitle, setBoardTitle] = useState("");
  useEffect(() => {
    const savedBoards = localStorage.getItem("boards");

    if (savedBoards && id) {
      const boards = JSON.parse(savedBoards);

      const currentBoard = boards.find(
        (board: { id: string }) => board.id === id
      );

      if (currentBoard) {
        setBoardTitle(currentBoard.title);
      }
    }

    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      const parsedTasks: Task[] = JSON.parse(savedTasks);
      setTasks(parsedTasks);
    }
  }, []);

  const handleCreateTask = (task: Task) => {
    task.boardId = id ?? "";
    task.username = username;

    const updatedTasks = [...tasks, task];
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setTasks(updatedTasks);
  };

  const handleDeleteTask = (id: string) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setTasks(updatedTasks);
  };

  const handleMoveTask = (
    id: string,
    status: "todo" | "in-progress" | "done"
  ) => {
    console.log("handleMoveTask", id, status);
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, status } : task
    );

    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    setTasks(updatedTasks);
  };

  const handleUpdateTask = (id: string, title: string, description: string) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id
        ? {
            ...task,
            title,
            description,
          }
        : task
    );
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setTasks(updatedTasks);
  };

  const handleRenameBoard = (newTitle: string) => {
    const savedBoards = localStorage.getItem("boards");

    if (!savedBoards || !id) return;

    const boards = JSON.parse(savedBoards);

    const updatedBoards = boards.map((board: { id: string; title: string }) =>
      board.id === id ? { ...board, title: newTitle } : board
    );

    localStorage.setItem("boards", JSON.stringify(updatedBoards));

    setBoardTitle(newTitle);
  };

  const boardTasks = tasks.filter((task) => task.boardId === id);
  const todoTasks = boardTasks.filter((task) => task.status === "todo");

  const inProgressTasks = boardTasks.filter(
    (task) => task.status === "in-progress"
  );

  const doneTasks = boardTasks.filter((task) => task.status === "done");

  return (
    <>
      <Navbar username={username} />
      <main className="mx-auto max-w-7xl p-8">
        <BoardDetailHeader title={boardTitle} onRename={handleRenameBoard} />

        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <BoardColumn
            title="To Do"
            tasks={todoTasks}
            status="todo"
            onCreateTask={handleCreateTask}
            onDeleteTask={handleDeleteTask}
            onMoveTask={handleMoveTask}
            onDropTask={handleMoveTask}
            onUpdate={handleUpdateTask}
          />
          <BoardColumn
            title="In Progress"
            status="in-progress"
            tasks={inProgressTasks}
            onCreateTask={handleCreateTask}
            onDeleteTask={handleDeleteTask}
            onMoveTask={handleMoveTask}
            onDropTask={handleMoveTask}
            onUpdate={handleUpdateTask}
          />
          <BoardColumn
            title="Done"
            status="done"
            tasks={doneTasks}
            onCreateTask={handleCreateTask}
            onDeleteTask={handleDeleteTask}
            onMoveTask={handleMoveTask}
            onDropTask={handleMoveTask}
            onUpdate={handleUpdateTask}
          />
        </div>
      </main>
    </>
  );
}
