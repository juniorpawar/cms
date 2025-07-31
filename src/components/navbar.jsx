"use client"

import { AtomIcon } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';
import Image from 'next/image';
import { signOut, useSession } from 'next-auth/react';
import { toast } from '@/hooks/use-toast';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Navbar() {
    const handleSignOut = async () => {
        // const { toast } = useToast();
        prompt("Are you sure you want to sign out?");
        console.log("Signing out...");
        toast({
            title: "Signing out",
            description: "You are being signed out...", 
            variant: "warning",
        });
        await signOut();
    }
    const session = useSession();

    const auth = session.status === "authenticated" ? true : false; // Example auth check, replace with actual logic
    const user = {
        name: "John Doe",
        email: "ajailsdj@gmail.com",
        image: "/profile.png",
    }//auth variable to check if user is authenticated, replace with actual auth logic
    return (
        <div className='flex items-center justify-between w-full'>
            <div>
                <Link href="/" className='flex items-center gap-1 font-extrabold md:text-2xl'>
                    <AtomIcon />Opmus Clips
                </Link>
            </div>
            {auth ? (
                <div className='flex items-center gap-2 text-sm md:text-xl'>
                    <UserModalComponent user={session.data.user} handleSignOut={handleSignOut} />
                </div>
            ) : (
                <div>
                    <Link href="/sign-in">
                        <Button variant="outline" className='mr-2'>Sign in</Button>
                    </Link>
                    <Link href="/sign-in">
                        <Button variant="outline" className='mr-2'>Register</Button>
                    </Link>
                </div>
            )}
        </div>
    )
}


const UserModalComponent = ({ user, handleSignOut }) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Image src={user.image} alt="Profile" width={40} height={40} className="rounded-full border-2 border-white"/>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <Link href={`/profile/${user.email}`}>Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem>Subscription</DropdownMenuItem>
                <DropdownMenuItem>
                    <Button
                        onClick={handleSignOut}
                        variant="secondary" size={"sm"}>
                        Logout
                    </Button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}