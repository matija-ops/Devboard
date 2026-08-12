import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@workspace/ui/components/button";
import EditBoardDialog from "./EditBoardDialog";

type BoardDetailHeaderProps = {
  title: string;
  onRename: (newTitle: string) => void;
};

export default function BoardDetailHeader({
  title,
  onRename,
}: BoardDetailHeaderProps) {
  return (
    <div className="mb-8 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Link to="/boards">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>

        <h1 className="text-2xl font-bold">{title} </h1>
      </div>

      <EditBoardDialog title={title} onSave={onRename} />
    </div>
  );
}
