import { DesignStudio } from "@/components/inspire/design-studio"

export const metadata = {
  title: "Design Your Quote -- Inspire | Muse",
  description:
    "Customize typography, colors, and background for your motivational wall art.",
}

export default async function DesignPage({
  params,
}: {
  params: Promise<{ quoteId: string }>
}) {
  const { quoteId } = await params
  return <DesignStudio quoteId={quoteId} />
}
