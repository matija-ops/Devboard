import type { Task } from "./task";

export type Board = {
  id: string;
  title: string;
  columns: number;
  tasks: Task[]
};
