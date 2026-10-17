"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  NUMBER_SKILLS,
  NUMBER_LESSONS,
  dueNumberSkills,
  numberSkillLabel,
} from "@cstf/core/numberSense";
import { dateKey } from "@cstf/core/week";
import { useProgressStore } from "@/store/progress";
import { useProgressTicker } from "@/lib/useProgressTicker";

export function NumberSenseProgress({
  expanded = false,
}: {
  expanded?: boolean;
}) {
  const progress = useProgressStore((s) => s.numberSenseProgress);
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  useProgressTicker();
  const today = dateKey();
  const due = ready ? dueNumberSkills(progress, today) : [];
  const practiced = ready
    ? NUMBER_SKILLS.filter((skill) => progress[skill]).length
    : 0;
  return (
    <section
      aria-label="数数与比多少示范单元"
      className="w-full rounded-2xl border-2 border-secondary/30 bg-white p-4 mb-5 text-ink"
    >
      <h2 className="font-extrabold text-xl">数数与比多少</h2>
      <p className="text-sm text-ink-light mt-2">
        跟着做 → 自己试 → 换个情境 → 隔天再试
      </p>
      <p className="text-sm text-ink mt-2">
        已练习 {practiced}/3 个技能。
        {due.length > 0
          ? `今天可以检验 ${due.length} 个技能。`
          : "练习后，下一天用新题看看还会不会。"}
      </p>
      {expanded && (
        <div className="space-y-4 mt-5">
          {NUMBER_SKILLS.map((skill, i) => {
            const entry = ready ? progress[skill] : undefined;
            return (
              <article
                key={skill}
                className="rounded-2xl border-2 border-bg-softer p-4"
              >
                <h3 className="font-extrabold text-lg">
                  {i + 1}. {NUMBER_LESSONS[skill].title}
                </h3>
                <p className="text-base text-ink-light mt-2">
                  {NUMBER_LESSONS[skill].goal}
                </p>
                <p className="text-sm font-extrabold text-secondary-dark mt-2">
                  {numberSkillLabel(entry)}
                </p>
                {entry && (
                  <p className="text-sm mt-2 text-ink-light">
                    无提示首答 {entry.evidence.independentCorrect}/
                    {entry.evidence.independentTotal} · 换情境{" "}
                    {entry.evidence.transferCorrect}/
                    {entry.evidence.transferTotal}
                    <br />
                    下次隔天检验：{entry.nextReviewOn}
                    {entry.verifiedOn ? ` · 已验证于 ${entry.verifiedOn}` : ""}
                  </p>
                )}
                <Link
                  className="btn-chunky-secondary mt-3 w-full"
                  href={`/lesson/g1up/${NUMBER_LESSONS[skill].id}/`}
                >
                  {entry ? "再练一次" : "开始这节课"}
                </Link>
              </article>
            );
          })}
        </div>
      )}
      <div className="flex flex-wrap gap-3 mt-4">
        {!expanded && (
          <Link
            href="/number-sense/"
            className="min-h-11 px-4 inline-flex items-center rounded-xl border-2 border-secondary text-secondary-dark font-extrabold"
          >
            进入示范单元
          </Link>
        )}
        {due.length > 0 && (
          <Link
            href="/number-sense/review/"
            className="btn-chunky-primary px-4"
          >
            用新题检验一下
          </Link>
        )}
      </div>
    </section>
  );
}
