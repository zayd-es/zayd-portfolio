import Image from "next/image";
import { ViewTransition } from "react";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

/**
 * Project cover shared between the card and the detail page: the same
 * view-transition name makes it morph from one to the other on navigation.
 */
export function ProjectCover({
  project,
  alt = "",
  sizes,
  priority,
  className,
  imageClassName,
}: {
  project: Project;
  alt?: string;
  sizes: string;
  priority?: boolean;
  className?: string;
  imageClassName?: string;
}) {
  return (
    <ViewTransition name={`project-${project.slug}`} share="morph" default="none">
      <div className={cn("relative overflow-hidden bg-bg-elevated", className)}>
        <Image
          src={project.cover}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          placeholder="blur"
          className={cn("object-cover object-top", imageClassName)}
        />
      </div>
    </ViewTransition>
  );
}
