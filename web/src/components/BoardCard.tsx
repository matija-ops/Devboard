import type { Task } from "@/types/task";
import { Card } from "@workspace/ui/components/card";
import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

type BoardCardProps = {
  id: string;
  title: string;
  columns: number;
  tasks: Task[];
  onDelete: (id: string) => void;
};

export default function BoardCard({
  id,
  title,
  columns,
  tasks,
  onDelete,
}: BoardCardProps) {
  const navigate = useNavigate();
  return (
    <Card
      onClick={() => navigate(`/boards/${id}`)}
      className="group hover:shadwoe-md w-full max-w-xs cursor-pointer rounded-xl border p-6 shadow-sm transition-shadow"
    >
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-lg font-bold group-hover:underline">{title}</h2>
          <p className="text-md mt-4 text-muted-foreground">
            {columns}Spalten · {tasks.length} tasks
          </p>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            console.log("Button wurde geklickt");
            console.log(id);
            onDelete(id);
          }}
        >
          <Trash2 className="h-7 w-7 cursor-pointer text-muted-foreground hover:text-destructive" />
        </button>
      </div>
    </Card>
  );
}
