import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex justify-center items-center p-24">
      <div>
        <h1 className="text-5xl font-bold text-center">
          A Link in Bio. <br />
          But Rich and Beautiful.
        </h1>
        <h6 className="text-center text-gray-500 my-4">
          Your personal page to show everything you are and create.
        </h6>
        <Link href="register">
          <Button className="flex mx-auto">Create</Button>
        </Link>
      </div>
    </main>
  );
}
