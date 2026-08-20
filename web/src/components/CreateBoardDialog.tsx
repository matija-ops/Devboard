import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog";
import { useState } from "react";

type CreateBoardDialogProps = {
  trigger: React.ReactNode;
  onCreate: (title: string) => void;
};

export default function CreateBoardDialog({
  trigger,
  onCreate,
}: CreateBoardDialogProps) {
  const [title, setTitle] = useState("");
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={trigger}>{trigger}</DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Neues Board erstellen</DialogTitle>

          <DialogDescription>
            Vergib einen Namen für dein neues Board.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <Input
            placeholder="Boardname"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <DialogFooter>
          <Button variant="outline">Abbrechen</Button>

          <Button
            disabled={!title.trim()}
            onClick={() => {
              onCreate(title);
              setTitle("");
              setOpen(false);
            }}
          >
            Erstellen
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
