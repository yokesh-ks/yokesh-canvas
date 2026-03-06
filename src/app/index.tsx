import * as React from "react";
import Header from "@/components/layout/header";
import type { NavigationSection } from "@/components/blocks/menu-navigation";
import manifest from "~/src/artworks/manifest.json";
import { InfiniteCanvas } from "~/src/infinite-canvas";
import type { MediaItem } from "~/src/infinite-canvas/types";
import { PageLoader } from "~/src/loader";

const navigationData: NavigationSection[] = [
  { title: "Experience", href: "https://yokesh.in/experience" },
  { title: "Projects", href: "https://yokesh.in/projects" },
  { title: "Gallery", href: "/" },
  { title: "Blog", href: "https://yokesh.in/blog" },
  { title: "Memories", href: "https://yokesh.in/memories" },
  { title: "Contact", href: "https://yokesh.in/#contact-us" },
];

// hex equivalents of the theme --background CSS vars
const LIGHT_BG = "#faf7f5";
const DARK_BG = "#2b221e";

function useThemeBackground() {
  const [isDark, setIsDark] = React.useState(() =>
    document.documentElement.classList.contains("dark")
  );

  React.useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  return isDark ? DARK_BG : LIGHT_BG;
}

export function App() {
  const [media] = React.useState<MediaItem[]>(manifest);
  const [textureProgress, setTextureProgress] = React.useState(0);
  const bgColor = useThemeBackground();

  if (!media.length) {
    return <PageLoader progress={0} />;
  }

  return (
    <>
      <Header navigationData={navigationData} />
      <PageLoader progress={textureProgress} />
      <InfiniteCanvas
        media={media}
        onTextureProgress={setTextureProgress}
        backgroundColor={bgColor}
        fogColor={bgColor}
      />
    </>
  );
}
