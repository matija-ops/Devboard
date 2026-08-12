export type Task = {
  id: string;
  boardId: string;
  title: string;
  description: string;
  username: string;
  status: "todo" | "in-progress" | "done";
  deadline: string;
};
