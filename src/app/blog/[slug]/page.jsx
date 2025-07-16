import Image from "next/image";
import { Calendar1 } from "lucide-react";
import dateFormat from "@/utils/dateFormat";

export default function BlogPage({ params }) {
    const tagConfig = ["UI/UX", "Designing", "Development"];
    return (
        <section className="flex flex-col items-center justify-center">
            <div className="flex flex-col text-center mt-4 gap-1 text-sm">
                <Image className=" w-[90vw] md:w-[70vw] rounded-xl" src={"/ui-ux.png"} height={600} width={500}></Image>
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <Calendar1 />
                    <p>{dateFormat(new Date())}</p>
                </div>
                <div className="text-gray-200 flex items-center gap-2">
                    <p>Catagory:</p><div className="badge bg-gray-700 border border-white/30 rounded px-2 py-[2px]">Designing</div>
                </div>
                <div className="text-gray-200 flex items-center gap-2">
                    <p>Tags:</p>
                    {tagConfig.map(tag => {
                        return <div className="badge bg-gray-700 border border-white/30 rounded px-2 py-[2px]">{tag}</div>
                    })}
                </div>
            </div>
            <div className="max-w-5xl text-gray-200 mt-8">
                <h1 className="text-3xl font-bold mt-4">UI/UX Design Principles</h1>
                <p className="text-gray-300 font-thin mt-2">
                    UI/UX design is crucial for creating user-friendly and visually appealing digital products. It involves understanding
                    user needs, behaviors, and preferences to design interfaces that enhance usability and satisfaction. Lorem ipsum dolor,
                    sit amet consectetur adipisicing elit. Magnam quibusdam facilis blanditiis voluptate nesciunt dignissimos in vero nihil
                    cumque aut, qui commodi, ad doloremque eaque modi iure? Provident fugit id animi, mollitia quibusdam amet laboriosam eligendi
                    magnam, quasi impedit repellat! Iste quibusdam ex, itaque eligendi nemo commodi officiis natus.
                    <br /><br />
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Totam modi iure, ratione, ducimus saepe assumenda sunt rerum architecto temporibus officiis quisquam placeat, amet minus ex porro at
                    quos reprehenderit quam? Repellendus velit ad dolorem porro, totam voluptate maxime! Exercitationem illum eius consequatur nisi suscipit aperiam, assumenda odio autem voluptatum optio? Ratione
                    a ipsum necessitatibus, asperiores minima autem tempora doloremque odio magni, nihil laudantium qui in? Commodi repudiandae ea magnam, nulla voluptates corrupti temporibus repellat animi asperiores
                    minima placeat! In voluptatem quis repellendus, eos blanditiis mollitia ex quas distinctio dolorem deserunt voluptate alias et est ipsa, id repellat, odio repudiandae excepturi.
                    <br /><br />
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae praesentium velit accusamus quae? Dolor unde itaque iure
                    rerum labore veritatis velit, voluptas voluptates tempora enim voluptatibus molestias ipsam rem dolorum asperiores facere, iusto
                    aut cum nemo vel nihil obcaecati? Placeat error maiores neque cum temporibus dolorem doloremque, vitae inventore quae quam
                    rerum similique dolor dignissimos incidunt, sit saepe nihil magnam reiciendis a ad ducimus esse! Distinctio nesciunt exercitationem
                    tempore excepturi perspiciatis veniam aliquam, dignissimos suscipit aspernatur illum quos deserunt omnis?
                </p>
            </div>
        </section>
    )
}