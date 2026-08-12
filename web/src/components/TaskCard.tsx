import { Card } from "@workspace/ui/components/card";
import { Trash2, CircleUserRound, Pencil } from "lucide-react";
import EditTaskDialog from "./EditTaskDialog";
import type { Task } from "@/types/task";

type TaskCardProps = {
  id: string;
  title: string;
  description: string;
  username: string;
  onDelete: (id: string) => void;
  status: "todo" | "in-progress" | "done";
  onUpdate: (id: string, title: string, description: string) => void;
  deadline: string;
  //   onMove: (id: string, status: "todo" | "in-progress" | "done") => void;
};

export default function TaskCard({
  id,
  title,
  description,
  username,
  onDelete,
  status,
  onUpdate,
  deadline,
}: TaskCardProps) {
  const task: Task = {
    id,
    title,
    description,
    username,
    status,
  };

  return (
    <EditTaskDialog
      id={id}
      title={title}
      description={description}
      onUpdate={onUpdate}
    >
      <Card
        draggable
        onDragStart={(e) => {
          e.dataTransfer.setData("taskId", id);
          e.dataTransfer.setData("status", status);
        }}
        className="m-3 cursor-grab rounded-lg border p-2 transition-shadow hover:shadow-md active:cursor-grabbing"
      >
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-sm font-semibold break-words">{title}</h3>

          <button
            onClick={() => onDelete(id)}
            className="rounded-md p-1 transition-colors hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4 text-muted-foreground hover:text-red-500" />
          </button>
        </div>
        <p className="mt-2 text-left text-sm break-all text-muted-foreground">
          {description}
        </p>
        <div className="mt-4 flex items-center gap-2 border-t pt-3 text-sm text-muted-foreground">
          <CircleUserRound className="h-4 w-4" />
          <span>{username}</span>
        </div>
        <div className="mt-2 text-sm text-muted-foreground">
          Deadline: {deadline}
        </div>
      </Card>
    </EditTaskDialog>
  );
}
