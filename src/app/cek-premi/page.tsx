import type { Metadata } from "next";
import { EngagementHome } from "@/components/Engagement/EngagementHome";
export const metadata: Metadata = {
  title: "Bandingkan Estimasi Premi",
  description:
    "Bandingkan estimasi premi berdasarkan usia dan jenis kelamin, lalu diskusikan pilihan bersama agen.",
};
export default function Page() {
  return <EngagementHome mode="calculator" />;
}
