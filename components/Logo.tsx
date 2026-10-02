import Image from "next/image";
import Link from "next/link";

export function Logo({ className = "h-11" }: { className?: string }) {
  return (
    <Link href="/" aria-label="MedAlert home" className="flex items-center">
      <Image
        src="/images/medalert-logo.png"
        alt="MedAlert"
        width={563}
        height={169}
        priority
        className={`${className} w-auto`}
      />
    </Link>
  );
}
