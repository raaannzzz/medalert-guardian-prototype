import type { Metadata } from "next";
import Link from "next/link";
import { LogOut, ShieldCheck } from "lucide-react";
import { Logo } from "@/components/Logo";
import { GuardianDashboard } from "@/components/GuardianDashboard";

export const metadata: Metadata = { title: "Guardian — MedAlert" };

export default function GuardianPage() {
  return (
    <div className="min-h-screen bg-page">
      <header className="flex h-[72px] items-center gap-5 border-b border-line bg-white px-5 min-[900px]:h-[88px] min-[900px]:px-20">
        <Logo className="h-9 min-[900px]:h-11" />
        <span aria-hidden="true" className="hidden h-7 w-px bg-line min-[900px]:block" />
        <div className="hidden items-center gap-2.5 text-[20px] font-bold text-blue min-[900px]:flex">
          <ShieldCheck size={26} strokeWidth={1.8} aria-hidden="true" />
          Guardian
        </div>
        <Link href="/login" className="btn-tonal ml-auto h-12 px-5 text-[17px]">
          <LogOut size={22} strokeWidth={1.8} aria-hidden="true" />
          Sign out
        </Link>
      </header>
      <main className="mx-auto flex max-w-[1280px] flex-col gap-6 px-4 pb-12 pt-5 min-[900px]:px-20 min-[900px]:pb-16 min-[900px]:pt-10">
        <GuardianDashboard />
      </main>
    </div>
  );
}
