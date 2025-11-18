"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function BoardUpdate() {
    const { id } = useParams();
    const router = useRouter();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    useEffect(() => {
        async function load() {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/board/${id}`,
                { credentials: "include" }
            );

            const data = await res.json();
            setTitle(data.title);
            setContent(data.content);
        }
        load();
    }, [id]);

    async function handleUpdate() {
        await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/board/update/${id}`,
            {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ title, content }),
            }
        );

        router.push("/board/list");
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">게시글 수정</h1>

            <input
                className="border p-2 w-full mb-3"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
                className="border p-2 w-full mb-3"
                rows={6}
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />

            <button
                onClick={handleUpdate}
                className="bg-blue-600 text-white px-4 py-2 rounded"
            >
                수정 완료
            </button>
        </div>
    );
}
