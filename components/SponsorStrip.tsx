import Image from "next/image";

export default function SponsorStrip() {
  return (
    <div className="w-full rounded-3xl border border-zinc-200 bg-white px-8 py-6 shadow-lg">
      <div className="flex flex-col items-center gap-6">
        <div className="flex items-center justify-center gap-16">
          <Image
            src="/images/bangaloresec.png"
            alt="IEEE Bangalore Section"
            width={220}
            height={60}
            className="h-14 w-auto object-contain"
          />

          <Image
            src="/images/bangalore50.png"
            alt="IEEE Bangalore 50"
            width={220}
            height={60}
            className="h-14 w-auto object-contain"
          />
        </div>

        <div className="h-px w-full bg-zinc-200" />

        <div className="flex flex-wrap items-center justify-center gap-14">
          <Image
            src="/images/dataport.png"
            alt="IEEE DataPort"
            width={150}
            height={40}
            className="h-8 w-auto object-contain"
          />

          <Image
            src="/images/conecct.png"
            alt="IEEE CONECCT"
            width={150}
            height={40}
            className="h-10 w-auto object-contain"
          />

          <Image
            src="/images/csbc.png"
            alt="IEEE CSBC"
            width={150}
            height={40}
            className="h-11 w-auto object-contain"
          />
        </div>
      </div>
    </div>
  );
}
