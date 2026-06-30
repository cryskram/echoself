import Image from "next/image";

export default function LogoStrip() {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5 shadow-sm">
      <div className="flex items-center justify-center gap-12">
        <Image
          src="/images/bangaloresec.png"
          alt="IEEE Bangalore Section"
          width={180}
          height={48}
          className="h-11 w-auto object-contain"
        />

        <Image
          src="/images/bangalore50.png"
          alt="IEEE Bangalore 50"
          width={180}
          height={48}
          className="h-11 w-auto object-contain"
        />
      </div>

      <div className="my-5 h-px bg-zinc-200" />

      <div className="flex items-center justify-center gap-8">
        <Image
          src="/images/dataport.png"
          alt="IEEE DataPort"
          width={130}
          height={36}
          className="h-7 w-auto object-contain"
        />

        <Image
          src="/images/conecct.png"
          alt="IEEE CONECCT"
          width={130}
          height={36}
          className="h-9 w-auto object-contain"
        />

        <Image
          src="/images/csbc.png"
          alt="IEEE Computer Society Bangalore Chapter"
          width={130}
          height={36}
          className="h-10 w-auto object-contain"
        />
      </div>
    </div>
  );
}
