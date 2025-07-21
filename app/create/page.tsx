// @ts-nocheck

import Link from "next/link";
import { prisma } from "../../lib/prisma";

import React from "react";
import { createPost } from "../actions/postActions";

const Createpage = async () => {
  const users = await prisma.user.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Create New Post</h2>
      <div className="flex justify-center my-1">
        <Link
          href="/"
          className="bg-green-400 hover:bg-blue-700 text-white text-sm py-4 px-8 rounded-full shadow-md transition duration-200"
        >
          <span className="text-lg">🚎</span> Take me back to
          all posts
        </Link>
      </div>
      <form action={createPost} className="space-y-4">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Post Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
            placeholder="Enter your post title..."
          />
        </div>

        <div>
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Post Content
          </label>
          <textarea
            id="content"
            name="content"
            required
            rows={6}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
            placeholder="Write your post content here..."
          />
        </div>

        <div>
          <label
            htmlFor="authorId"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Author
          </label>
          <select
            id="authorId"
            name="authorId"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
          >
            <option value="" disabled>
              Select an author...
            </option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name} ({user.email})
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Create Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default Createpage;
