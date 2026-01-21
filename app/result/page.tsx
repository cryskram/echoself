import ResultClient from "@/components/ResultClient";
import { Suspense } from "react";

export default function ResultPage() {
  return (
    <Suspense fallback={<div>Loading result...</div>}>
      <ResultClient />
    </Suspense>
  );
}
