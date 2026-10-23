import { CodeXml, Layers, PenTool, Smartphone, WandSparkles, type LucideIcon } from "lucide-react";

/** Services, in display order. Texts live in messages/*.json under `services.items.<id>`. */
export const services: readonly { id: string; icon: LucideIcon; main?: boolean }[] = [
  { id: "frontend", icon: CodeXml, main: true },
  { id: "fullstack", icon: Layers },
  { id: "responsive", icon: Smartphone },
  { id: "uiux", icon: WandSparkles },
  { id: "figma", icon: PenTool },
];
