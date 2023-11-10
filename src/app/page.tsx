import Link from "next/link";
import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";

export default async function Home() {
  const session = await getServerAuthSession();

  const user = await db.user.findUnique({
    where: { id: session?.user.id },
    include: { posts: { select: { id: true, question: true } } },
  });

  if (!user?.posts?.length) {
    return (
      <main className="mx-auto flex h-screen max-w-md flex-col items-center justify-center">
        <h1 className="mb-8 text-center text-6xl font-medium italic text-neutral-300">
          No essays...
        </h1>
        <p className="mb-12 text-center">
          {`Looks like you haven't embarked on any journeys just yet. Start by
          creating your first journey to achieve your goal. Let's build systems
          together!`}
        </p>
        <Link
          href="/writing/task-2"
          className="mx-auto rounded-lg bg-black p-3 font-semibold text-white"
        >
          Evaluate essay
        </Link>
      </main>
    );
  }

  return (
    <>
      <div className="mb-6 mt-12 flex w-full items-end justify-between">
        <h1 className="text-xl font-semibold">Essays</h1>
        <Link
          href="/writing/task-2"
          className="rounded-lg bg-black px-2 py-1 font-semibold text-white"
        >
          Evaluate essay
        </Link>
      </div>
      <div className="min-h-96 mb-12 grid grid-cols-3 grid-rows-3 gap-3">
        {user?.posts.map((essay) => (
          <Link
            href={`/evaluation/${essay.id}`}
            className="whitespace-pre-line break-words rounded-lg border border-neutral-200 p-3 "
          >
            {essay.question}
          </Link>
        ))}
      </div>
    </>
  );
}
