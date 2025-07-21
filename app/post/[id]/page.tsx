import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function PostPage({ params }: { params: { id: string } }) {
  const post = await prisma.post.findUnique({
    where: { id: parseInt(params.id, 10) },
    include: { author: true },
  });

  if (!post) {
    notFound();
  }

  return (
    <main className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6 sm:p-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight mb-2">
            {post.title}
          </h1>
          <p className="text-sm text-gray-500 mb-6">
            By {post.author.name} on{" "}
            {new Date(post.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <div className="prose prose-lg max-w-none">
            <p>{post.content}</p>
            <div className="flex justify-center mt-5">
              <Link
                href="/"
                className="bg-green-400 hover:bg-blue-700 text-white text-sm py-4 px-8 rounded-full shadow-md transition duration-200"
              >
                <span className="text-lg">🚎</span> Back to the all posts
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
