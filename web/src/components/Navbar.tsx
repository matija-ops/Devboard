import { LayoutDashboard, CircleUserRound } from "lucide-react";
import { Link } from "react-router-dom";

type NavbarProps = {
  username: string;
};

export default function Navbar({ username }: NavbarProps) {
  return (
    <header className="h-20 border-b bg-black text-white">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-8">
        <Link to="/boards" className="flex items-center gap-3">
          <LayoutDashboard className="h-7 w-7 text-cyan-400" />
          <h1 className="text-2xl font-bold text-cyan-400">Devboard</h1>
        </Link>
        <Link to="/profile" className="flex items-center gap-2">
          <CircleUserRound className="h-6 w-6 text-muted-foreground transition-colors hover:text-cyan-400" />
          <span className="text-white">{username}</span>
        </Link>
      </div>
    </header>
  );
}
