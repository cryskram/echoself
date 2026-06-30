import ShareClient from "@/components/ShareClient";
import { verifyShareToken } from "@/lib/share";

export default function SharePage({
  searchParams,
}: {
  searchParams: {
    t?: string;
  };
}) {
  const token = searchParams.t;

  if (!token) {
    return null;
  }

  const payload = verifyShareToken(token);

  if (!payload) {
    return null;
  }

  return (
    <ShareClient
      img={payload.img}
      genre={payload.genre}
      audio={payload.audio}
    />
  );
}
