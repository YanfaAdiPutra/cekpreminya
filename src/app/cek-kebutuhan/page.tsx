import type { Metadata } from "next";
import { EngagementHome } from "@/components/Engagement/EngagementHome";
export const metadata: Metadata = {
  title: "Cek Kebutuhan Proteksi",
  description:
    "Lima pertanyaan untuk mengenali kebutuhan perlindunganmu sebelum berkonsultasi.",
};
export default function Page() {
  return (
    <>
      <h1 className="sr-only">Cek kebutuhan perlindunganmu</h1>
      <EngagementHome mode="quiz" />
    </>
  );
}
