import PostCard from "./PostCard";
import type { Post, User } from "@prisma/client";

type PostWithAuthor = Post & {
  author: User;
};

type Props = {
  posts: PostWithAuthor[];
  authorId?: number;
};

export default function PostList({ posts, authorId }: Props) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">
          No posts found. {authorId ? "Try selecting a different author." : "Create your first post!"}
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-8 mt-10">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      <div className="text-center mt-12">
        <p className="text-gray-500">
          Showing {posts.length} post{posts.length !== 1 ? "s" : ""}
        </p>
      </div>
    </>
  );
}
