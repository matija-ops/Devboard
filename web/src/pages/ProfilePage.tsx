import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { Button } from "@workspace/ui/components/button";
import Navbar from "@/components/Navbar";
import { useState } from "react";

type ProfilePageProps = {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
};

export default function ProfilePage({
  username,
  setUsername,
}: ProfilePageProps) {
  const [inputValue, setInputValue] = useState("");
  const [showForm, setShowForum] = useState(true);

  const saveUsername = () => {
    if (!inputValue.trim()) return;
    setUsername(inputValue);
    localStorage.setItem("username", inputValue);
    setInputValue("");
    setShowForum(false);
  };
  return (
    <>
      <Navbar username={username} />
      <main className="mx-auto max-w-3xl p-6">
        <h1 className="mb-10 text-2xl font-bold">Profil</h1>
        {showForm && (
          <Card className="w-full max-w-xl">
            <CardHeader>
              <CardTitle>Benutzernamen ändern</CardTitle>
              <CardDescription>
                Ändere deinen Anzeigenamen für das Kanban-Board.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Name</Label>
                  <Input
                    id="username"
                    placeholder="neuer Nutzer"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                  />
                </div>
                <Button className={"w-full"} onClick={saveUsername}>
                  Speichern
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </>
  );
}
