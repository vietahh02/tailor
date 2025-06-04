import { Suspense } from "react";
import FullScreenSpinner from "../loading/Spiner";
import SearchContent from "./SearchContent";

export default function SearchPage() {
  return (
    <Suspense fallback={<FullScreenSpinner />}>
      <SearchContent />
    </Suspense>
  );
}
