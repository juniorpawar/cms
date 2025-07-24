'use client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Shapes, Zap, Pencil } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Home() {
  const session = useSession();
  console.log("Session:", session);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <section className="flex flex-col items-center justify-center gap-6 sm:h-screen h-[80vh]">
        <div className="flex flex-col items-center gap-3">
          <h1 className="text-4xl font-bold sm:text-5xl text-center">Manage your content With Ease 🎬</h1>
          <p className="text-gray-500 text-lg text-center">Your content seamlessly managed by our servers</p>
        </div>
        <div className="flex gap-4 justify-center">
          
          <Link href="/sign-in"><Button>Try it out!</Button></Link>
          <Link href="/blogs"><Button variant="secondary">Learn More</Button></Link>
        </div>
      </section>
      <section className="flex flex-col items-center gap-4 min-h-[50vh]">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="flex flex-col items-center bg-black rounded-xl shadow-lg p-8 gap-4 max-w-md mx-auto">
            <div>
              <Pencil size={40} />
            </div>
            <h2 className="text-2xl font-bold">Video Editor</h2>
            <p className="text-gray-500 text-center">Monitor, edit, and generate content from a single place.</p>
          </div>
          <div className="flex flex-col items-center bg-black rounded-xl p-8 gap-4 max-w-md mx-auto">
            <div>
              <Shapes size={40} />
            </div>
            <h2 className="text-2xl font-bold">All-in-one Dashboard</h2>
            <p className="text-gray-500 text-center">Monitor, edit, and generate content from a single place.</p>
          </div>
          <div className="flex flex-col items-center bg-black rounded-xl p-8 gap-4 max-w-md mx-auto">
            <div>
              <Zap size={40} />
            </div>
            <h2 className="text-2xl font-bold">Lightning Fast</h2>
            <p className="text-gray-500 text-center">Edit, Create with handy tools at a very high speed that keeps you ahead of the world</p>
          </div>
        </div>
      </section>
      <section className="flex flex-col items-center justify-center gap-4 min-h-[70vh] sm:min-h-[50vh]">
        <div className="flex flex-col items-center gap-2">
          <h4 className="text-2xl">Ready to transform your content journey ?</h4>
          <p className="text-gray-500">Join us and experience the future of content management.</p>
        </div>
        <div className="flex flex-row gap-2 w-full max-w-md">
          <Input placeholder="enter the email" type="email"></Input>
          <Button >Get Started🔥</Button>
        </div>
      </section>
    </main>
  );
}
