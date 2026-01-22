import ShareClient from "@/components/ShareClient";
import { Suspense } from "react";

export default function SharePage() {
  return (
    <Suspense fallback={<div>Loading result...</div>}>
      <ShareClient />
    </Suspense>
  );
}
