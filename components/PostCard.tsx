"use client";

import { deletePost, updatePost } from "@/app/actions/postActions";
import { useState } from "react";

type Post = {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
  author: {
    name: string;
  };
};

type Props = {
  post: Post;
};

export default function PostCard({ post }: Props) {
  const [expanded, setExpanded] = useState(false);

  return (
    <article className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <div className="p-6">
        {/* Author Info */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-sm">
                {post.author.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">
                {post.author.name}
              </p>
              <p className="text-xs text-gray-500">
                {new Date(post.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Title & Content */}
        <h2 className="text-2xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors">
          {post.title}
        </h2>

        <div className="prose prose-gray max-w-none">
          <p className="text-gray-700 leading-relaxed">
            {post.content.length > 200 && !expanded
              ? `${post.content.substring(0, 200)}...`
              : post.content}
          </p>
        </div>

        {post.content.length > 200 && (
          <button
            onClick={() => setExpanded((prev) => !prev)}
            className="mt-4 text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors"
          >
            {expanded ? "Show less ↑" : "Read more →"}
          </button>
        )}

        {/* Delete Form */}
        <form action={deletePost} method="post" className="mt-4">
          <input type="hidden" name="postId" value={post.id} />
          <button
            type="submit"
            className="text-red-600 hover:text-red-800 font-medium text-sm transition-colors"
          >
            Delete Post
          </button>
        </form>

        {/* Edit Form */}
        <details className="mt-4">
          <summary className="cursor-pointer text-blue-600 hover:text-blue-800 font-medium text-sm">
            Edit Post
          </summary>
          <form action={updatePost} className="mt-2 space-y-2">
            <input type="hidden" name="postId" value={post.id} />

            <div>
              <label
                htmlFor={`title-${post.id}`}
                className="block text-sm font-medium text-gray-700"
              >
                Title
              </label>
              <input
                id={`title-${post.id}`}
                name="title"
                defaultValue={post.title}
                className="w-full px-3 py-1 border border-gray-300 rounded"
              />
            </div>

            <div>
              <label
                htmlFor={`content-${post.id}`}
                className="block text-sm font-medium text-gray-700"
              >
                Content
              </label>
              <textarea
                id={`content-${post.id}`}
                name="content"
                rows={4}
                defaultValue={post.content}
                className="w-full px-3 py-1 border border-gray-300 rounded"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="text-white bg-green-600 hover:bg-green-700 px-4 py-1 rounded text-sm"
              >
                Update
              </button>
            </div>
          </form>
        </details>
      </div>
    </article>
  );
}
