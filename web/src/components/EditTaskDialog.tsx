import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog";

import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { Textarea } from "@workspace/ui/components/textarea";

type EditTaskDialogProps = {
  children: React.ReactNode;
  id: string;
  title: string;
  description: string;
  onUpdate: (id: string, title: string, description: string) => void;
};

export default function EditTaskDialog({
  children,
  id,
  title,
  description,
  onUpdate,
}: EditTaskDialogProps) {
  const [taskTitle, setTaskTitle] = useState(title);
  const [taskDescription, setTaskDescription] = useState(description);
  const [open, setOpen] = useState(false);
  const handleSave = () => {
    if (taskTitle.trim() === "") {
      return;
    }
    onUpdate(id, taskTitle, taskDescription);
    setOpen(false);
  };
  useEffect(() => {
    if (open) {
      setTaskTitle(title);
      setTaskDescription(description);
    }
  }, [open, title, description]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild onClick={() => setOpen(true)}>
        <div className="block w-full">{children}</div>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Task bearbeiten</DialogTitle>

          <DialogDescription>
            Ändere die Details dieser Aufgabe.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-2">
          <Label htmlFor="title">Titel</Label>
          <Input
            id="title"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            placeholder="Titel eingeben..."
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Beschreibung</Label>

          <Textarea
            id="description"
            placeholder="Beschreibung eingeben..."
            className="h-32 max-h-32 w-full min-w-0 resize-none overflow-y-auto break-all"
            onChange={(e) => setTaskDescription(e.target.value)}
            value={taskDescription}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="deadline">Deadline</Label>

          <Input id="deadline" type="date" />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Abbrechen
          </Button>
          <Button onClick={handleSave}>Speichern</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
