import Link from "next/link";
import { prisma } from "@/lib/prisma";
import AuthorFilter from "@/components/AuthorFilter";
import PostList from "@/components/PostList";

export default async function Home({ searchParams }: { searchParams: { authorId?: string } }) {
  const authorId = searchParams.authorId ? Number(searchParams.authorId) : undefined;

  const [posts, users] = await Promise.all([
    prisma.post.findMany({
      where: authorId ? { authorId } : undefined,
      include: { author: true },
      orderBy: { createdAt: "desc" },
    }),
    prisma.user.findMany({ orderBy: { name: "asc" } }),
  ]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">My Blog</h1>
          <p className="text-lg text-gray-600">Welcome to the best blog ever 😋</p>
        </div>

        <div className="flex justify-center mb-8">
          <AuthorFilter authorId={authorId} users={users} />
        </div>

        <div className="flex justify-center mt-10 mb-15">
          <Link
            href="/create"
            className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold py-4 px-8 rounded-lg shadow-md transition duration-200"
          >
            ✍️ Create New Post
          </Link>
        </div>

        <PostList posts={posts} authorId={authorId} />
      </div>
    </div>
  );
}
