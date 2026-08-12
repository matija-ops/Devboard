import { Card } from "@workspace/ui/components/card";
import CreateTaskDialog from "@/components/CreateTaskDialog";
import type { Task } from "@/types/task";
import TaskCard from "@/components/TaskCard";
import { useState } from "react";

type BoardColumnProps = {
  title: string;
  tasks: Task[];
  status: "todo" | "in-progress" | "done";
  onCreateTask: (task: Task) => void;
  onDeleteTask: (id: string) => void;
  onMoveTask: (id: string, status: "todo" | "in-progress" | "done") => void;
  onDropTask: (taskId: string, status: "todo" | "in-progress" | "done") => void;
  onUpdate: (id: string, title: string, description: string) => void;
};

export default function BoardColumn({
  title,
  tasks,
  status,
  onCreateTask,
  onDeleteTask,
  onDropTask,
  onUpdate,
}: BoardColumnProps) {
  function handleCreateTask(
    title: string,
    description: string,
    deadline: string
  ) {
    if (!title.trim()) return;
    const newTask: Task = {
      id: crypto.randomUUID(),
      boardId: "",
      title,
      description,
      username: "",
      status: status,
      deadline,
    };

    onCreateTask(newTask);
  }

  const [isDraggingOver, setIsDraggingOver] = useState(false);
  return (
    <Card className="w-full max-w-xs rounded-xl p-0">
      <div className="flex items-center justify-between border-b p-3">
        <h2 className="font-semibold">{title}</h2>
        <CreateTaskDialog onCreateTask={handleCreateTask} />
      </div>

      <div
        className={`flex min-h-56 flex-col rounded-xl p-3 transition-colors duration-200 ${isDraggingOver ? "bg-cyan-50" : ""}`}
        onDragLeave={() => setIsDraggingOver(false)}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDraggingOver(true);
        }}
        onDrop={(e) => {
          e.preventDefault();
          setIsDraggingOver(false);

          const taskId = e.dataTransfer.getData("taskId");
          onDropTask(taskId, status);
        }}
      >
        {isDraggingOver && (
          <div className="mb-3 flex h-24 items-center justify-center rounded-xl border-2 border-dashed border-cyan-400 bg-cyan-50 text-sm font-medium text-cyan-600">
            Hier ablegen
          </div>
        )}

        {tasks.length === 0 ? (
          <div className="flex h-full items-center justify-center text-sm text-muted-foreground/60">
            Keine Tasks vorhanden
          </div>
        ) : (
          tasks.map((task) => (
            <TaskCard
              id={task.id}
              key={task.id}
              title={task.title}
              description={task.description}
              username={task.username}
              onDelete={onDeleteTask}
              status={task.status}
              deadline={task.deadline}
              onUpdate={onUpdate}
            />
          ))
        )}
      </div>
    </Card>
  );
}
