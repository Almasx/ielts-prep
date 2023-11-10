import { redirect } from "next/navigation";
import TextAreaField from "~/app/_components/text-area";
import { db } from "~/server/db";

export default async function Evaluation({
  params,
}: {
  params: { id: string };
}) {
  const essay = await db.essay.findUnique({
    where: { id: params.id },
    include: { evaluation: true },
  });

  if (!essay) {
    redirect("/writing/task-2");
  }

  const bandScore =
    (essay.evaluation?.coherenceScore! +
      essay.evaluation?.grammarScore! +
      essay.evaluation?.lexicalResourceScore! +
      essay.evaluation?.taskAchievementScore!) /
    4;

  return (
    <>
      <div className="flex flex-col gap-1 pt-20">
        <h1 className="text-sm uppercase text-neutral-400">Your Score</h1>
        <span className="text-6xl font-bold text-red-500">
          {bandScore.toFixed(0)}.0
        </span>
      </div>
      <div className="mt-10 grid min-w-full grid-cols-4 overflow-clip rounded-xl border border-neutral-300">
        <div className="flex flex-col items-center gap-1 border-r bg-neutral-50 p-3">
          <h1 className="text-sm uppercase text-neutral-400">Task response</h1>
          <span className="text-3xl font-semibold text-neutral-500">
            {essay.evaluation?.taskAchievementScore.toFixed(1)}
          </span>
        </div>
        <div className="flex flex-col items-center gap-1 border-r bg-neutral-50 p-3">
          <h1 className="text-sm uppercase text-neutral-400">
            COHERENCE and cohesion
          </h1>
          <span className="text-3xl font-semibold text-neutral-500">
            {essay.evaluation?.coherenceScore.toFixed(1)}
          </span>
        </div>
        <div className="flex flex-col items-center gap-1 border-r bg-neutral-50 p-3">
          <h1 className="text-sm uppercase text-neutral-400">
            lexical resources
          </h1>
          <span className="text-3xl font-semibold text-neutral-500">
            {essay.evaluation?.lexicalResourceScore.toFixed(1)}
          </span>
        </div>
        <div className="flex flex-col items-center gap-1 bg-neutral-50 p-3">
          <h1 className="text-sm uppercase text-neutral-400">
            Grammatical range
          </h1>
          <span className="text-3xl font-semibold text-neutral-500">
            {essay.evaluation?.grammarScore.toFixed(1)}
          </span>
        </div>
      </div>
      <div className="mt-8 grid grid-cols-4 gap-4 whitespace-pre-line break-words text-sm">
        <p>{essay.evaluation?.taskAchievementComment}</p>
        <p>{essay.evaluation?.coherenceComment}</p>
        <p>{essay.evaluation?.lexicalResourceComment}</p>
        <p>{essay.evaluation?.grammarComment}</p>
      </div>
      <div className="mt-12 flex flex-col gap-2">
        <h1 className="text-sm uppercase text-neutral-400">Suggestion</h1>
        <p className="whitespace-pre-line break-words text-base">
          {essay.evaluation?.overallSuggestion}
        </p>
      </div>
      <div className="my-12">
        <TextAreaField
          value={essay.content}
          label="Essay"
          className="h-[80vh]"
        />
      </div>
    </>
  );
}
