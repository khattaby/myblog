"use server";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

// ✅ Server Action to Create Post
export async function createPost(formData: FormData) {
  "use server";

  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const authorId = parseInt(formData.get("authorId") as string);

  if (!title || !content || !authorId) return;

  await prisma.post.create({
    data: {
      title,
      content,
      authorId,
    },
  });

  redirect("/");
}

export async function deletePost(formData: FormData) {
  const postId = formData.get("postId") as string;
  if (!postId) return;

  await prisma.post.delete({
    where: { id: Number(postId) },
  });

  redirect("/");
}

export async function updatePost(formData: FormData) {
  const postId = Number(formData.get("postId"));
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;

  if (!postId || !title || !content) return;

  await prisma.post.update({
    where: { id: postId },
    data: { title, content },
  });

  redirect("/");
}
