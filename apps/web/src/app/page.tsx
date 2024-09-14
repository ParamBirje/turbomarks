import DotPattern from "@/components/magicui/dot-pattern";
import FirefoxIcon from "@/lib/icons/firefox";
import { cn } from "@/lib/utils";
import { ChromeIcon, GithubIcon } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { BorderBeam } from "@/components/magicui/border-beam";
import DATA from "@/lib/config";
import { DarkExtensionSteps } from "@/components/dark-extension-steps";
import { DarkModeMinimalFooter } from "@/components/dark-mode-minimal-footer";
import Link from "next/link";

export default function Home() {
  return (
    <main className="max-w-6xl mx-auto my-10 px-4">
      <section id="hero">
        <DotPattern
          className={cn(
            "[mask-image:radial-gradient(400px_circle_at_left,white,transparent)]"
          )}
        />

        <h1 className="scroll-m-20 mt-20 uppercase text-6xl font-bold tracking-tight lg:text-9xl">
          Turbomarks
        </h1>
        <div className="text-xl md:text-3xl text-muted-foreground lg:w-[80%] tracking-[.5px]">
          <p>
            Access bookmarks the vim way, by choosing shorthands for your
            frequently visited websites. No more clicking or searching through
            folders, access at speed of thought.
          </p>
        </div>

        <div className="flex flex-col gap-5 items-center mt-6 md:flex-row">
          <Link href={DATA.links.chrome}>
            <button className="relative w-full md:w-fit inline-flex h-12 overflow-hidden rounded-sm p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
              <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-sm bg-background px-8 py-1 text-lg font-medium text-white backdrop-blur-3xl">
                <ChromeIcon className="mr-3" /> Add to Chrome
              </span>
            </button>
          </Link>

          <Link href={DATA.links.firefox}>
            <button className="relative w-full md:w-fit inline-flex h-12 overflow-hidden rounded-sm p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
              <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-sm bg-background px-8 py-1 text-lg font-medium text-white backdrop-blur-3xl">
                <FirefoxIcon className="mr-3" /> Add to Firefox
              </span>
            </button>
          </Link>

          <Link href={DATA.links.github}>
            <button className="px-9 py-3 w-full md:w-fit text-white text-lg flex justify-center items-center rounded-md tracking-[.5px] hover:bg-muted/[0.8] duration-100 hover:shadow-lg">
              <GithubIcon className="mr-3 h-5 w-5" /> Github
            </button>
          </Link>
        </div>

        <AspectRatio
          ratio={16 / 9}
          className="bg-muted mt-14 rounded-lg h-[20vh] md:h-auto"
        >
          <video
            loop
            autoPlay
            muted
            src="https://github.com/user-attachments/assets/b6b052c0-cd67-4a86-b457-901ef9268217"
            className="h-full w-full rounded-md object-cover"
          />

          <BorderBeam borderWidth={3} colorFrom="#40DFAF" colorTo="#40DFAF" />
        </AspectRatio>
      </section>

      <DarkExtensionSteps />

      {/* spacer */}
      <div className="h-10 w-full" />

      <DarkModeMinimalFooter />
    </main>
  );
}
