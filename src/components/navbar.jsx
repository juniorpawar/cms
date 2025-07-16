import { AtomIcon } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';
import Image from 'next/image';

export default function Navbar() {
    const auth = true; //auth variable to check if user is authenticated, replace with actual auth logic
    return (
        <div className='flex items-center justify-between w-full'>
            <div>
                <Link href="/" className='flex items-center gap-1 font-extrabold text-2xl'>
                    <AtomIcon />Opmus Clips
                </Link>
            </div>
            {auth ? (
                <div className='flex items-center gap-2'>
                    <Link href="/dashboard">
                        <Image src="/profile.png" alt="Profile" width={40} height={40} className="rounded-full bg-gray-100" />
                    </Link>
                    <Button variant="secondary" size={"sm"}>Logout</Button>
                </div>
            ) : (
                <div>
                    <Link href="/sign-in">
                        <Button variant="outline" className='mr-2'>Sign in</Button>
                    </Link>
                    <Link href="/register">
                        <Button variant="outline" className='mr-2'>Register</Button>
                    </Link>
                </div>
            )}
        </div>
    )
}