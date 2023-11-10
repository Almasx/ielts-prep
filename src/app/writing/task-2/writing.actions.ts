"use server";

import { zact } from "zact/server";
import { z } from "zod";
import { completion } from "zod-gpt";
import { openai } from "~/lib/openai";
import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";

export const evaluate = zact(
  z.object({
    question: z.string(),
    essay: z.string(),
  }),
)(async ({ essay, question }) => {
  const session = await getServerAuthSession();

  const prompt = `Can you evaluate my IELTS Writing Part 2, including detailed marking all criteria sections and giving band for each section,  and giving total band, higlighting bullet points of the essay and giving advices for future development
  Question: """${question}"""
  Essay: """${essay}"""`;

  const response = await completion(openai, prompt, {
    schema: z.object({
      coherenceComment: z
        .string()
        .describe(
          "Highlight evidence, explain why such score on cohesion in short bulletpoints (with evidence quotes)",
        ),
      coherenceScore: z.number().describe("Score for coherence 1-9"),
      grammarComment: z
        .string()
        .describe(
          "Highlight evidence, explain why such score on grammar in short bulletpoints (with evidence quotes)",
        ),
      grammarScore: z.number().describe("Score for grammar 1-9"),
      lexicalResourceComment: z
        .string()
        .describe(
          "Highlight evidence, explain why such score on lexical resources 1-9 in short bulletpoints (with evidence quotes)",
        ),
      lexicalResourceScore: z
        .number()
        .describe("Score for lexical resources 1-9"),
      taskAchievementComment: z
        .string()
        .describe(
          "Highlight evidence, explain why such score on task achievement in short bulletpoints (with evidence quotes)",
        ),
      taskAchievementScore: z
        .number()
        .describe("Score for task achievement 1-9"),
      overallSuggestion: z
        .string()
        .describe("Ways to improve essay 4-6 sentences with evidence(quotes)"),
    }),
  });

  console.log(response);

  const userEssay = await db.essay.create({
    data: {
      content: essay,
      question,
      createdBy: { connect: { id: session?.user.id } },
      evaluation: { create: response.data },
    },
  });

  return userEssay.id;
});

export const generate = zact(z.undefined())(async () => {
  const response = await completion(
    openai,
    `Can you gime me a topic for IELTS Writing Task 2, especially from real IELTS from 2020-2023. Output only topic without any extra information and additions
    Example: "Doing an enjoyable activity with a child can develop better skills and more creativity than reading. To what extent do you agree? Use reasons and specific examples to explain your answer."`,
  );
  return response.data;
});
