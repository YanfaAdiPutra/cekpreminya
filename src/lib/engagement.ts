export const LIFE_STAGES = [
  {
    id: "career",
    label: "Mulai karier",
    detail: "Mandiri, selangkah lebih siap",
    icon: "↗",
  },
  {
    id: "couple",
    label: "Baru menikah",
    detail: "Rencana berdua, mulai di sini",
    icon: "♡",
  },
  {
    id: "family",
    label: "Punya keluarga",
    detail: "Untuk mereka yang bergantung padamu",
    icon: "⌂",
  },
  {
    id: "parents",
    label: "Menopang orang tua",
    detail: "Jaga diri, jaga yang tersayang",
    icon: "✳",
  },
  {
    id: "retirement",
    label: "Siapkan pensiun",
    detail: "Hari nanti yang lebih terencana",
    icon: "☀",
  },
] as const;

export const QUESTIONS = [
  {
    key: "stage",
    title: "Kamu sedang di fase apa?",
    why: "Setiap fase hidup punya kebutuhan yang berbeda. Pilih yang paling dekat dengan keadaanmu.",
    options: LIFE_STAGES.map((s) => ({ value: s.id, label: s.label })),
  },
  {
    key: "concern",
    title: "Apa yang paling ingin kamu jaga?",
    why: "Pilihan ini menentukan topik utama yang akan kita bahas, bukan keputusan pembelian.",
    options: [
      { value: "asuransi-kesehatan", label: "Biaya perawatan rumah sakit" },
      { value: "asuransi-jiwa", label: "Penghasilan keluarga & warisan" },
      { value: "asuransi-kritis", label: "Dana selama pemulihan sakit kritis" },
      { value: "asuransi-dana-pensiun", label: "Kehidupan setelah pensiun" },
    ],
  },
  {
    key: "existing",
    title: "Sudah ada perlindungan apa?",
    why: "Kita mulai dari yang sudah kamu punya. Manfaat dan batas polis tetap perlu ditinjau bersama.",
    options: [
      { value: "bpjs", label: "BPJS" },
      { value: "office", label: "Asuransi kantor (dengan/tanpa BPJS)" },
      { value: "personal", label: "Polis pribadi (dengan/tanpa BPJS)" },
      { value: "none", label: "Belum ada / belum yakin" },
    ],
  },
  {
    key: "dependents",
    title: "Siapa yang bergantung padamu?",
    why: "Tanggungan membantu kita memahami pentingnya kelangsungan penghasilan keluarga.",
    options: [
      { value: "0", label: "Saat ini hanya diri sendiri" },
      { value: "1", label: "1 orang" },
      { value: "2", label: "2 orang" },
      { value: "3", label: "3 orang atau lebih" },
    ],
  },
  {
    key: "budget",
    title: "Berapa anggaran nyamanmu per bulan?",
    why: "Anggaran adalah batas kenyamanan, bukan janji bahwa suatu plan tersedia pada harga tersebut.",
    options: [
      { value: "500000", label: "Sampai Rp 500 ribu" },
      { value: "1000000", label: "Rp 500 ribu – 1 juta" },
      { value: "2000000", label: "Rp 1 – 2 juta" },
      { value: "0", label: "Ingin diskusi dulu" },
    ],
  },
] as const;

export type Answers = Partial<
  Record<(typeof QUESTIONS)[number]["key"], string>
>;
export function answerLabel(key: string, value?: string) {
  return (
    QUESTIONS.find((q) => q.key === key)?.options.find((o) => o.value === value)
      ?.label ?? "Belum diisi"
  );
}
export function recommend(answers: Answers) {
  const slug =
    answers.concern ||
    (answers.stage === "retirement"
      ? "asuransi-dana-pensiun"
      : Number(answers.dependents) > 0
        ? "asuransi-jiwa"
        : "asuransi-kesehatan");
  const reasons = [
    answers.concern
      ? `Kamu memilih fokus: ${answerLabel("concern", answers.concern).toLowerCase()}.`
      : "Mulai dari kebutuhan dasar, lalu sesuaikan bersama agen.",
  ];
  if (answers.existing === "office")
    reasons.push(
      "Periksa apakah manfaat asuransi kantor tetap berlaku ketika kamu berganti pekerjaan.",
    );
  else if (answers.existing === "personal")
    reasons.push(
      "Tinjau manfaat polis yang sudah ada agar perlindungan baru tidak tumpang tindih.",
    );
  else if (answers.existing === "bpjs")
    reasons.push(
      "Diskusikan kebutuhan tambahan dengan tetap mempertimbangkan manfaat BPJS yang kamu miliki.",
    );
  else
    reasons.push(
      "Petakan dulu perlindungan yang tersedia sebelum menentukan manfaat tambahan.",
    );
  if (Number(answers.dependents) > 0)
    reasons.push(
      "Ada orang yang bergantung padamu. Kelangsungan penghasilan keluarga juga layak dibahas.",
    );
  return { slug, reasons };
}
export function summaryText(answers: Answers) {
  return QUESTIONS.map(
    (q) => `${q.title} ${answerLabel(q.key, answers[q.key])}`,
  ).join("\n");
}
// Events never include answers, dates of birth, or contact details.
export function track(
  event: string,
  properties: Record<string, string | number> = {},
) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent("cekpreminya:analytics", {
      detail: { event, ...properties },
    }),
  );
}
export function ageFromBirthDate(
  value: string,
  now = new Date(),
): number | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const [year, month, day] = value.split("-").map(Number);
  const birth = new Date(year, month - 1, day);
  if (
    birth.getFullYear() !== year ||
    birth.getMonth() !== month - 1 ||
    birth.getDate() !== day ||
    birth > now
  )
    return null;
  return (
    now.getFullYear() -
    year -
    (now.getMonth() < month - 1 ||
    (now.getMonth() === month - 1 && now.getDate() < day)
      ? 1
      : 0)
  );
}
export function saveSummary(text: string) {
  const url = URL.createObjectURL(
    new Blob([text], { type: "text/plain;charset=utf-8" }),
  );
  const link = document.createElement("a");
  link.href = url;
  link.download = "ringkasan-cekpreminya.txt";
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  track("result_saved");
}
