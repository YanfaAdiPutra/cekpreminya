"use client";

import { useEffect, useRef, useState } from "react";
import {
  QUESTIONS,
  answerLabel,
  recommend,
  saveSummary,
  summaryText,
  track,
  type Answers,
} from "@/lib/engagement";
import { PRODUCTS, buildWaLink } from "@/lib/site-config";

export function ProtectionFinder({
  initialStage,
  onResult,
}: {
  initialStage?: string;
  onResult?: (answers: Answers) => void;
}) {
  const [answers, setAnswers] = useState<Answers>({ stage: initialStage });
  const [step, setStep] = useState(0);
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);
  const [shareStatus, setShareStatus] = useState("");
  const title = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    if (started) title.current?.focus();
  }, [step, done, started]);
  const question = QUESTIONS[step];
  const result = recommend(answers);
  const product = PRODUCTS.find((p) => p.slug === result.slug)!;
  const summary = `Ringkasan Cek Preminya\n${summaryText(answers)}\nTopik diskusi: ${product.name}\nPanduan awal, bukan rekomendasi keuangan atau penawaran resmi.`;
  function next(skip = false) {
    const updated = skip ? { ...answers, [question.key]: undefined } : answers;
    setAnswers(updated);
    setStarted(true);
    if (!started) track("quiz_started");
    track("quiz_step_completed", { step: step + 1, skipped: skip ? 1 : 0 });
    if (step === QUESTIONS.length - 1) {
      setDone(true);
      onResult?.(updated);
      track("quiz_completed");
    } else setStep(step + 1);
  }
  async function share() {
    try {
      if (navigator.share)
        await navigator.share({
          title: "Ringkasan Cek Preminya",
          text: summary,
        });
      else {
        await navigator.clipboard.writeText(summary);
        setShareStatus("Ringkasan disalin. Kamu bisa menempelkannya di chat.");
      }
      track("result_shared");
    } catch (error) {
      if (!(error instanceof DOMException && error.name === "AbortError"))
        setShareStatus(
          "Belum bisa membagikan. Gunakan Simpan ringkasan atau WhatsApp.",
        );
    }
  }
  return (
    <div className="finder-panel" id="finder-panel">
      <div className="finder-sidebar">
        <span className="eyebrow light">CEK KEBUTUHAN</span>
        <h2>
          Kenali kebutuhan.
          <br />
          Temukan arah.
        </h2>
        <p>Lima pertanyaan kecil untuk langkah yang lebih yakin.</p>
        <ol>
          {QUESTIONS.map((q, i) => (
            <li key={q.key} className={done || i === step ? "active" : ""}>
              <span>{done || i < step ? "✓" : `0${i + 1}`}</span>
              {
                [
                  "Fase hidup",
                  "Prioritas",
                  "Proteksi saat ini",
                  "Tanggungan",
                  "Anggaran",
                ][i]
              }
            </li>
          ))}
        </ol>
        <small>
          Tanpa nama atau nomor telepon.
          <br />
          Jawaban tetap di perangkat selama sesi ini.
        </small>
      </div>
      <div className="finder-body">
        {!done ? (
          <>
            <div className="flex items-center justify-between">
              <span className="eyebrow">LANGKAH {step + 1} DARI 5</span>
              <span className="text-xs text-slate-500">± 1 menit</span>
            </div>
            <progress
              className="quiz-progress"
              max={5}
              value={step + 1}
              aria-label="Progres pertanyaan"
            />
            <h3 ref={title} tabIndex={-1} className="quiz-title">
              {question.title}
            </h3>
            <p className="text-sm leading-relaxed text-slate-500">
              {question.why}
            </p>
            <fieldset className="quiz-options">
              <legend className="sr-only">{question.title}</legend>
              {question.options.map((option) => (
                <label
                  className={`quiz-option ${answers[question.key] === option.value ? "selected" : ""}`}
                  key={option.value}
                >
                  <input
                    type="radio"
                    name={question.key}
                    value={option.value}
                    checked={answers[question.key] === option.value}
                    onChange={() =>
                      setAnswers({ ...answers, [question.key]: option.value })
                    }
                  />
                  <span>{option.label}</span>
                  <span aria-hidden="true" className="option-check">
                    {answers[question.key] === option.value ? "✓" : ""}
                  </span>
                </label>
              ))}
            </fieldset>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <button
                className="text-button"
                disabled={step === 0}
                onClick={() => setStep(step - 1)}
              >
                ← Kembali
              </button>
              <div className="flex gap-3">
                <button className="text-button" onClick={() => next(true)}>
                  Lewati
                </button>
                <button
                  className="button primary"
                  disabled={!answers[question.key]}
                  onClick={() => next()}
                >
                  {step === 4 ? "Lihat ringkasan" : "Lanjut"} <span>→</span>
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            <span className="eyebrow">LANGKAH PERTAMAMU SUDAH SELESAI</span>
            <h3 ref={title} tabIndex={-1} className="quiz-title">
              Mulai dari {product.shortName.toLowerCase()}.
            </h3>
            <p className="text-sm text-slate-500">
              Ini peta awal percakapanmu, bukan penilaian kelayakan atau skor
              perlindungan.
            </p>
            <div className="result-reasons">
              {result.reasons.map((reason) => (
                <p key={reason}>
                  <span>↗</span>
                  {reason}
                </p>
              ))}
            </div>
            <dl className="result-facts">
              {QUESTIONS.map((q) => (
                <div key={q.key}>
                  <dt>
                    {q.key === "stage"
                      ? "Fase hidup"
                      : q.key === "concern"
                        ? "Prioritas"
                        : q.key === "existing"
                          ? "Proteksi saat ini"
                          : q.key === "dependents"
                            ? "Tanggungan"
                            : "Anggaran"}
                  </dt>
                  <dd>{answerLabel(q.key, answers[q.key])}</dd>
                </div>
              ))}
            </dl>
            <div className="flex flex-wrap gap-3">
              <a
                className="button primary"
                href="#cek-premi"
                onClick={() => {
                  onResult?.(answers);
                  track("result_to_calculator");
                }}
              >
                Bandingkan estimasi →
              </a>
              <a
                className="button secondary"
                href={buildWaLink(
                  `Halo Kharis, saya ingin diskusi hasil cek kebutuhan.\n${summary}`,
                )}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track("whatsapp_clicked", { source: "quiz" })}
              >
                Diskusi hasil via WhatsApp ↗
              </a>
            </div>
            <div className="mt-5 flex flex-wrap gap-5">
              <button
                className="text-button"
                onClick={() => saveSummary(summary)}
              >
                ↓ Simpan ringkasan
              </button>
              <button className="text-button" onClick={share}>
                Bagikan
              </button>
              <button
                className="text-button"
                onClick={() => {
                  setDone(false);
                  setStep(0);
                }}
              >
                Ubah jawaban
              </button>
            </div>
            <p className="mt-3 text-sm" role="status">
              {shareStatus}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
