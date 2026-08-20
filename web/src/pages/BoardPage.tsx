import Navbar from "@/components/Navbar";
import BoardDetailHeader from "@/components/BoardDetailHeader";
import BoardColumn from "@/components/BoardColumn";
import { useState, useEffect } from "react";
import type { Task } from "@/types/task";
import { useParams } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
type BoardsPageProps = { username: string };

export default function BoardPage({ username }: BoardsPageProps) {
  const { id } = useParams();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [boardTitle, setBoardTitle] = useState("");
useEffect(() => {
  const getBoard = async () => {
    if (!id) return;

    const { data, error } = await supabase
      .from("board")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Fehler beim Laden des Boards:", error);
      return;
    }

    setBoardTitle(data.title);
  };

  const getTasks = async () => {
    if (!id) return;

    const { data, error } = await supabase
      .from("task")
      .select("*")
      .eq("boardId", id);

    if (error) {
      console.error("Fehler beim Laden der Tasks:", error);
      return;
    }

    setTasks(data);
  };

  getBoard();
  getTasks();
}, [id]);

  const handleCreateTask = async (task:Task)=>{
    if (!id) return;
    

const { data, error } = await supabase
  .from("task")
  .insert({
    id: task.id,
    boardId: id,
    title: task.title,
    description: task.description,
    username: username,
    status: task.status,
    deadline: task.deadline,
  })
  .select()
  .single();
    if(error) {
      console.error("Fehler beim Erstellen der Task", error);
      return;
    }
    setTasks((currentTasks)=> [...currentTasks, data]);
  };

const handleDeleteTask = async (id: string) => {
  const { error } = await supabase
    .from("task")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Fehler beim Löschen der Task:", error);
    return;
  }

  setTasks((currentTasks) =>
    currentTasks.filter((task) => task.id !== id)
  );
};

const handleMoveTask = async (
  id:string, 
  status: "todo" | "in-progress" | "done") =>{
    const { data, error} = await supabase.from ("task").update({status:status,})
    .eq("id", id)
    .select()
    .single();

    if (error){
      console.error("Fehler beim Versschieben der Task:", error);
      return;
    }
    setTasks((currentTasks)=>
    currentTasks.map((task)=>
    task.id === id ? data: task));
  };


const handleUpdateTask = async(
  id: string,
  title: string,
  description: string,
) => {
  const { data, error } = await supabase.from("task")
  .update ({
    title: title,
    description: description,
  })
  .eq("id", id)
  .select()
  .single();

  if (error){
    console.error("Fehler beim Aktualisieren der Task", error);
    return;
  }

  setTasks((currentTasks)=>
  currentTasks.map((task)=>task.id === id ? data : task));
};


  const handleRenameBoard = async (newTitle: string) => {
  if (!id) return;

  const { error } = await supabase
    .from("board")
    .update({
      title: newTitle,
    })
    .eq("id", id);

  if (error) {
    console.error("Fehler beim Aktualisieren des Boards:", error);
    return;
  }

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
