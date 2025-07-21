import { PrismaClient } from "../generated/prisma";
const prisma = new PrismaClient();

async function main() {
  // Create test users
  const user1 = await prisma.user.create({
    data: { name: "John Doe", email: "john1@example.com" },
  });

  const user2 = await prisma.user.create({
    data: { name: "Jane Smith", email: "jane1@example.com" },
  });

  const user3 = await prisma.user.create({
    data: { name: "Alice Johnson", email: "alice1@example.com" },
  });

  const user4 = await prisma.user.create({
    data: { name: "Bob Brown", email: "bob1@example.com" },
  });

  const user5 = await prisma.user.create({
    data: { name: "Charlie Lee", email: "charlie1@example.com" },
  });

  // Create test posts
  await prisma.post.create({
    data: {
      title: "Getting Started with Next.js",
      content: `Next.js is a powerful React framework...`,
      authorId: user1.id,
    },
  });

  await prisma.post.create({
    data: {
      title: "Understanding Prisma ORM",
      content: `Prisma is a modern database toolkit...`,
      authorId: user1.id,
    },
  });

  await prisma.post.create({
    data: {
      title: "Building a Blog with TypeScript",
      content: `TypeScript adds static typing to JavaScript...`,
      authorId: user2.id,
    },
  });

  await prisma.post.create({
    data: {
      title: "Deploying with Vercel",
      content: `Vercel provides seamless integration with Next.js for fast deployments.`,
      authorId: user2.id,
    },
  });

  await prisma.post.create({
    data: {
      title: "CSS Tricks Every Developer Should Know",
      content: `Here are some powerful CSS tricks...`,
      authorId: user3.id,
    },
  });

  await prisma.post.create({
    data: {
      title: "Mastering JavaScript Closures",
      content: `Closures are a core concept in JavaScript...`,
      authorId: user3.id,
    },
  });

  await prisma.post.create({
    data: {
      title: "Responsive Design in 2025",
      content: `Responsive design is essential in modern web apps...`,
      authorId: user4.id,
    },
  });

  await prisma.post.create({
    data: {
      title: "React Server Components: A Primer",
      content: `React Server Components allow you to build fast, dynamic UIs...`,
      authorId: user4.id,
    },
  });

  await prisma.post.create({
    data: {
      title: "Dark Mode in Tailwind CSS",
      content: `Implementing dark mode with Tailwind is simple and elegant...`,
      authorId: user5.id,
    },
  });

  await prisma.post.create({
    data: {
      title: "Authentication Strategies in Next.js",
      content: `NextAuth.js and JWTs make authentication in Next.js apps flexible and secure...`,
      authorId: user5.id,
    },
  });

  console.log("✅ Seed data created successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding data:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
