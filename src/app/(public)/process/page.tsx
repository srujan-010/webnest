import type { Metadata } from "next";
import { getProcessSteps } from "@/services/api";
import { ProcessClient } from "./ProcessClient";

export const metadata: Metadata = {
  title: "Our Process | WebNest Engineering",
  description: "A battle-tested methodology designed to mitigate risk and guarantee exceptional technical outcomes. Discover how WebNest builds enterprise software.",
};

export default async function ProcessPage() {
  const steps = await getProcessSteps() || [];

  return <ProcessClient steps={steps} />;
}
