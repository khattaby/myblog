import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create test users
  const user1 = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'john@example.com',
    },
  })

  const user2 = await prisma.user.create({
    data: {
      name: 'Jane Smith',
      email: 'jane@example.com',
    },
  })

  // Create test posts
  await prisma.post.create({
    data: {
      title: 'Getting Started with Next.js',
      content: 'Next.js is a powerful React framework that makes building web applications easier. In this post, we\'ll explore the basics of Next.js and how to get started with your first project.',
      authorId: user1.id,
    },
  })

  await prisma.post.create({
    data: {
      title: 'Understanding Prisma ORM',
      content: 'Prisma is a modern database toolkit that makes database access easy with type safety and auto-completion. Let\'s dive into how Prisma can improve your development workflow.',
      authorId: user1.id,
    },
  })

  await prisma.post.create({
    data: {
      title: 'Building a Blog with TypeScript',
      content: 'TypeScript adds static typing to JavaScript, making your code more robust and maintainable. Here\'s how to build a blog application using TypeScript and modern web technologies.',
      authorId: user2.id,
    },
  })

  console.log('✅ Seed data created successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding data:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })