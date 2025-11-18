"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function BoardDetailPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const [post, setPost] = useState<any>(null);

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/board/${params.id}`)
            .then((res) => res.json())
            .then((data) => setPost(data));
    }, []);

    if (!post) return <div>Loading...</div>;

    const handleDelete = () => {
        fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/board/${params.id}`, {
            method: "DELETE",
            credentials: "include",
        }).then(() => router.push("/board"));
    };

    return (
        <div className="p-6 bg-white text-black min-h-screen">
            <h1 className="text-2xl font-bold">{post.title}</h1>
            <p className="my-4 whitespace-pre-line">{post.content}</p>

            <Link
                href={`/board/${params.id}/edit`}
                className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
            >
                수정
            </Link>

            <button
                onClick={handleDelete}
                className="bg-red-600 text-white px-3 py-1 rounded"
            >
                삭제
            </button>
        </div>
    );
}
