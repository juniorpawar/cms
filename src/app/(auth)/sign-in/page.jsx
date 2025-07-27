"use client"

import { UserRoundCheck, AtomIcon } from "lucide-react"
import { signIn, signOut, useSession } from "next-auth/react"
import { toast } from "@/hooks/use-toast"
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Signin() {
  const session = useSession();
  console.log(session);

  const [loading, setLoading] = useState(false);
  const handleSignIn = async () => {
    console.log("Sign-in button clicked");
    try {
      // on click logic for sign in button uses signIn("google") form next auth
      setLoading(true);
      await signIn("google", {
        redirect: true,
        callbackUrl: '/dashboard' // where you want the user to go after sign in
      });
    } catch (error) {
      //handle the error 
      console.error("Error during sign-in:", error);
      toast({
        title: "Sign-in failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(true);
    }
  }
  return (
    <div className="min-h-screen text-white flex items-center justify-center">
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-10 items-center justify-center">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <AtomIcon size={50} className="text-[#00ff99]" />
            <span className="text-xl font-bold tracking-wide">Opmus Clips</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Join <span className="text-[#00ff99]">Opmus Clips</span><br /> in one click
          </h1>

          <p className="text-gray-400 max-w-md">
            The fastest way to access your dashboard. Sign up with Google to get started in seconds.
          </p>

          <Button 
            disabled={!session}
            onClick={handleSignIn}
            className="bg-white text-black flex items-center gap-3 px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-all"
          >
            <Image src="/google-icon.svg" alt="Google" width={20} height={20} />
            Sign up with Google
          </Button>
        </div>

        {/* Right - Illustration */}
        <div className="hidden md:flex justify-center">
          <Image
            src="/login-graphic.png"
            alt="Illustration"
            width={700}
            height={900}
            className="drop-shadow-lg"
          />
        </div>
      </div>
    </div>
  );
}
