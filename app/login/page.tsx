import type { Metadata } from "next";
import Image from "next/image";
import { Logo } from "@/components/Logo";
import { StatusBar } from "@/components/StatusBar";
import { LoginForm } from "@/components/LoginForm";

export const metadata: Metadata = { title: "Guardian Login — MedAlert" };

export default function LoginPage() {
  return (
    <div className="grid min-h-screen bg-white min-[900px]:grid-cols-2">
      <aside className="hidden flex-col bg-blue-50 px-20 pb-14 pt-10 min-[900px]:flex">
        <div className="flex h-14 items-center">
          <Logo />
        </div>
        <div className="mt-14 flex max-w-[560px] flex-col gap-5">
          <p className="text-[46px] font-semibold leading-[1.1] tracking-[-0.02em]">
            Stay connected to the people who matter most.
          </p>
          <p className="text-[20px] leading-[1.55] text-ink-2">
            Guardian gives families and carers a simple view of the MedAlert wearers they look after.
          </p>
        </div>
        <div className="relative mt-auto h-[440px] max-w-[560px]">
          <div className="absolute inset-0 overflow-hidden rounded-[28px] bg-[#e1ebfa]">
            <Image
              src="/images/medalert-plus-watch.jpg"
              alt="MedAlert PLUS watch"
              width={823}
              height={617}
              className="absolute inset-0 h-full w-full object-cover object-top mix-blend-multiply"
            />
          </div>
          <StatusBar />
        </div>
      </aside>

      <main className="flex flex-col items-center justify-center px-5 pb-12 pt-6 min-[900px]:px-20 min-[900px]:py-14">
        <div className="flex w-full max-w-[440px] flex-col gap-8">
          <div className="min-[900px]:hidden">
            <Logo className="h-10" />
          </div>
          <LoginForm />
          <p className="text-[16px] leading-normal text-ink-2">
            Need help? Call MedAlert on <a href="tel:+61272275833" className="font-semibold text-ink">02 7227 5833</a>.
          </p>
        </div>
      </main>
    </div>
  );
}
