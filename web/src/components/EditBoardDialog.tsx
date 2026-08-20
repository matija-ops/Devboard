import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@workspace/ui/components/dialog";

import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Pencil } from "lucide-react";
import { useState } from "react";

type EditBoardDialogProps = {
  title: string;
  onSave: (newTitle: string) => void;
};

export default function EditBoardDialog({
  title,
  onSave,
}: EditBoardDialogProps) {
  const [boardTitle, setBoardTitle] = useState(title);
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
     <DialogTrigger
  render={
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setBoardTitle("")}
    >
      <Pencil className="h-5 w-5 text-muted-foreground" />
    </Button>
  }
/>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Board bearbeiten</DialogTitle>

          <DialogDescription>Ändere den Namen deines Boards.</DialogDescription>
        </DialogHeader>

        <Input
          placeholder="Boardname eingeben..."
          value={boardTitle}
          onChange={(e) => setBoardTitle(e.target.value)}
        />

        <DialogFooter>
          <Button
            onClick={() => {
              if (!boardTitle.trim()) return;
              onSave(boardTitle);
              setBoardTitle("");
              setOpen(false);
            }}
          >
            Speichern
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
