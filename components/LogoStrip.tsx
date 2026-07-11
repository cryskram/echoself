import Image from "next/image";

export default function LogoStrip() {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 shadow-sm sm:p-5">
      <div className="flex justify-center">
        <Image
          src="/images/cs80.png"
          alt="IEEE Computer Society Bangalore Chapter"
          width={160}
          height={36}
          className="h-6 w-auto max-w-full object-contain sm:h-12"
        />
      </div>

      <div className="my-5 h-px bg-zinc-200" />

      {/* <div className="grid grid-cols-3 items-center gap-2 sm:gap-6">
        <div className="flex justify-center">
          <Image
            src="/images/dataport.png"
            alt="IEEE DataPort"
            width={130}
            height={36}
            className="h-5 w-auto max-w-full object-contain sm:h-7"
          />
        </div>

        <div className="flex justify-center">
          <Image
            src="/images/conecct.png"
            alt="IEEE CONECCT"
            width={130}
            height={36}
            className="h-6 w-auto max-w-full object-contain sm:h-9"
          />
        </div>

        <div className="flex justify-center">
          <Image
            src="/images/csbc.png"
            alt="IEEE Computer Society Bangalore Chapter"
            width={130}
            height={36}
            className="h-6 w-auto max-w-full object-contain sm:h-10"
          />
        </div>
      </div> */}

      <div className="flex items-center justify-center gap-4 sm:gap-10">
        <Image
          src="/images/bangaloresec.png"
          alt="IEEE Bangalore Section"
          width={180}
          height={48}
          className="h-8 w-auto max-w-[60%] object-contain sm:h-11"
        />

        <Image
          src="/images/bangalore50.png"
          alt="IEEE Bangalore 50"
          width={90}
          height={48}
          className="h-10 w-auto max-w-[25%] object-contain sm:h-12"
        />
      </div>
    </div>
  );
}
