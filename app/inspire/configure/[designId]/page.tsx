import { InspireConfigurator } from "@/components/inspire/inspire-configurator"

export const metadata = {
  title: "Configure Print -- Inspire | Muse",
  description:
    "Choose size, medium, and frame for your motivational wall art print.",
}

export default async function ConfigurePage({
  params,
}: {
  params: Promise<{ designId: string }>
}) {
  const { designId } = await params
  return <InspireConfigurator designId={designId} />
}
