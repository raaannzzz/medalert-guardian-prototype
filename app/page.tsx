import Image from "next/image";
import { ArrowRight, House, Phone, ShieldCheck, Signal } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { StatusBar } from "@/components/StatusBar";

const PRODUCT_URL = "https://medalert.io/products/medalert-plus-medical-alert-watch-4g-with-gps";

const TRUST = [
  { icon: House, label: "Australian Owned" },
  { icon: Signal, label: "Telstra 4G" },
  { icon: ShieldCheck, label: "NDIS & My Aged Care" },
  { icon: Phone, label: "24/7 Response Available" },
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <SiteHeader />

      <main className="grid flex-1 items-center gap-8 px-5 pb-8 pt-4 min-[900px]:grid-cols-2 min-[900px]:gap-[72px] min-[900px]:px-20 min-[900px]:pb-10 min-[900px]:pt-6">
        <div className="flex flex-col gap-8">
          <h1 className="text-[40px] font-semibold leading-[1.06] tracking-[-0.02em] min-[900px]:text-[58px]">
            Confidence to live independently.
            <br />
            <span className="text-blue">Reassurance for everyone who cares.</span>
          </h1>
          <p className="max-w-[540px] text-[19px] leading-[1.55] text-ink-2 min-[900px]:text-[21px]">
            Automatic fall detection, live GPS and two-way calling keep your loved ones connected wherever life takes them.
          </p>
          <div className="flex flex-col gap-4 min-[900px]:flex-row min-[900px]:items-center">
            <a href={PRODUCT_URL} className="btn-solid">
              Explore MedAlert Plus
              <ArrowRight size={22} strokeWidth={2} aria-hidden="true" />
            </a>
            <a href="https://medalert.io" className="btn-tonal h-[60px] rounded-2xl px-7 text-[19px]">
              How It Works
            </a>
          </div>
        </div>

        <div className="relative h-[500px] min-[900px]:h-[620px]">
          <div className="absolute inset-0 overflow-hidden rounded-[32px] bg-panel">
            <Image
              src="/images/medalert-plus-watch.jpg"
              alt="MedAlert PLUS watch showing a blue alarm icon"
              width={823}
              height={617}
              priority
              className="absolute left-1/2 top-0 h-[420px] w-auto min-[900px]:h-[540px] max-w-none -translate-x-1/2 mix-blend-multiply [mask-image:linear-gradient(to_bottom,#000_86%,transparent)]"
            />
          </div>
          <StatusBar caption="MedAlert PLUS · connected to Guardian" />
        </div>
      </main>

      <ul className="grid grid-cols-2 gap-x-6 gap-y-4 border-t border-line px-5 py-5 min-[900px]:h-24 min-[900px]:grid-cols-4 min-[900px]:items-center min-[900px]:px-20 min-[900px]:py-0">
        {TRUST.map(({ icon: Icon, label }) => (
          <li key={label} className="flex items-center gap-3 text-[16px] font-semibold min-[900px]:text-[17px]">
            <Icon size={26} strokeWidth={1.8} className="shrink-0 text-blue" aria-hidden="true" />
            {label}
          </li>
        ))}
      </ul>
    </div>
  );
}
