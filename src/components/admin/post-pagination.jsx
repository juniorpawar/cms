import { ChevronRight, ChevronLeft } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";


export default function PostPagination({ maxPage }) {
    let pageNo = [];
    for (let i = 1; i <= maxPage; i++) {
        pageNo[i - 1] = i;
    }
    return <div className="flex w-full justify-center gap-2 mt-3">
        <Button variant={"outline"}><ChevronLeft /></Button>
        {pageNo.map(i => {
            return <Link href={`${process.env.NEXT_PUBLIC_URL}/posts?page=${i}`}>
                <Button variant={"outline"}>{i}</Button>
            </Link>
        })}
        <Button variant={"outline"}><ChevronRight /></Button>
    </div>
}