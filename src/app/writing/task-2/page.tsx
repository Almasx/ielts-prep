"use client";

import { useEffect, useState } from "react";
import { evaluate, generate } from "./writing.actions";

import { useRouter } from "next/navigation";
import { useZact } from "zact/client";
import Button from "~/app/_components/button";
import { Spinner } from "~/app/_components/spinner";
import TextAreaField from "~/app/_components/text-area";

export default function Query() {
  const [essay, setEssay] = useState<string>();
  const [question, setQuestion] = useState<string>();
  const [loading, setLoading] = useState(true);

  const { mutate, data, isLoading } = useZact(evaluate);
  const { push } = useRouter();

  useEffect(() => {
    if (data) {
      push(`/evaluation/${data}`);
    }
  }, [data]);

  useEffect(() => {
    generate(undefined).then((data) => setQuestion(data));
    setLoading(false);
  }, []);

  return (
    <form
      className="flex h-[calc(100vh-96px)] flex-col gap-3 pt-3"
      onSubmit={(event) => {
        event?.preventDefault();
        console.log(essay);
        mutate({
          essay: essay!,
          question: question!,
        });
      }}
    >
      <div className="flex flex-col gap-2">
        <label className="">Question</label>
        {loading ? (
          <div className="font-meduim flex flex-row items-center justify-center gap-3 rounded-lg border bg-neutral-50 p-6 text-2xl text-neutral-500">
            <Spinner className="h-5 w-5" /> Generating question...
          </div>
        ) : (
          <TextAreaField
            placeholder="Введите сюда таск 2"
            className="h-24"
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
          />
        )}
      </div>
      <div className="mb-3 flex grow flex-col gap-2">
        <label className="">Эссе</label>
        <TextAreaField
          placeholder="Введите сюда ваше эссе"
          className="h-full"
          value={essay}
          onChange={(event) => setEssay(event.target.value)}
        />
      </div>
      <Button type="submit" loading={isLoading}>
        Check essay
      </Button>
    </form>
  );
}
