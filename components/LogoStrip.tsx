import Image from "next/image";

export default function LogoStrip() {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 shadow-sm sm:p-5">
      <div className="flex flex-col items-center gap-6">
        <div className="flex flex-wrap items-center justify-center gap-14">
          <Image
            src="/images/icwite.png"
            alt="IEEE ICWITE 2026"
            width={150}
            height={40}
            className="h-14 w-auto object-contain"
          />
          <Image
            src="/images/wiebs.png"
            alt="IEEE Women in Engineering Bangalore Section"
            width={150}
            height={40}
            className="h-20 w-auto object-contain"
          />
        </div>

        <div className="h-px w-full bg-zinc-200" />

        <div className="flex flex-wrap items-center justify-center gap-6">
          <Image
            src="/images/bangaloresec.png"
            alt="IEEE Bangalore Section"
            width={150}
            height={40}
            className="h-10 w-auto object-contain"
          />
          <Image
            src="/images/dataport.png"
            alt="IEEE DataPort"
            width={150}
            height={40}
            className="ml-6 h-6 w-auto object-contain"
          />

          <Image
            src="/images/cs80.png"
            alt="IEEE CSBC"
            width={150}
            height={40}
            className="h-10 w-auto object-contain"
          />
        </div>
      </div>
    </div>
  );
}
