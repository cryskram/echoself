import ShareClient from "@/components/ShareClient";
import { verifyShareToken } from "@/lib/share";

export default async function SharePage({
  searchParams,
}: {
  searchParams: Promise<{
    t?: string;
  }>;
}) {
  const { t } = await searchParams;

  if (!t) {
    return <div>Missing share token.</div>;
  }

  const payload = verifyShareToken(t);

  if (!payload) {
    return <div>Invalid or expired share link.</div>;
  }

  return (
    <ShareClient
      img={payload.img}
      genre={payload.genre}
      audio={payload.audio}
    />
  );
}
