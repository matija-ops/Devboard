import { Button } from "@workspace/ui/components/button"
import CreateBoardDialog from "@/components/CreateBoardDialog"

type BoardHeaderProps = {
  onCreateBoard: (title: string) => void
}

export default function BoardHeader({ onCreateBoard }: BoardHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-5xl font-bold">Meine Boards</h1>

      <CreateBoardDialog
        trigger={<Button className="bg-cyan-400">+ Neues Board</Button>}
        onCreate={onCreateBoard}
      />
    </div>
  )
}
