import DotPattern from "@/components/magicui/dot-pattern";
import FirefoxIcon from "@/lib/icons/firefox";
import { cn } from "@/lib/utils";
import { ChromeIcon, GithubIcon, Link } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import tutorial from "@/lib/media/tutorial.gif";
import { BorderBeam } from "@/components/magicui/border-beam";
import DATA from "@/lib/config";

export default function Home() {
  return (
    <main className="max-w-6xl mx-auto my-10">
      <section id="hero">
        <DotPattern
          className={cn(
            "[mask-image:radial-gradient(400px_circle_at_left,white,transparent)]"
          )}
        />

        <h1 className="scroll-m-20 mt-20 uppercase text-4xl font-bold tracking-tight lg:text-9xl">
          Turbomarks
        </h1>
        <p className="text-3xl text-muted-foreground lg:w-[80%] tracking-[.5px]">
          Access bookmarks the vim way, by choosing shorthands for your
          frequently visited websites. No more clicking or searching through
          folders, access at speed of thought.
        </p>

        <div className="flex gap-5 items-center mt-6">
          <button className="relative inline-flex h-12 overflow-hidden rounded-sm p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-sm bg-background px-8 py-1 text-lg font-medium text-white backdrop-blur-3xl">
              <ChromeIcon className="mr-3" /> Add to Chrome
            </span>
          </button>

          <button className="relative inline-flex h-12 overflow-hidden rounded-sm p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-sm bg-background px-8 py-1 text-lg font-medium text-white backdrop-blur-3xl">
              <FirefoxIcon className="mr-3" /> Add to Firefox
            </span>
          </button>

          <button className="px-9 py-3 text-white text-lg flex items-center rounded-md tracking-[.5px] hover:bg-muted/[0.8] hover:shadow-lg">
            <GithubIcon className="mr-3 h-5 w-5" /> Github
          </button>
        </div>

        <AspectRatio ratio={16 / 6.4} className="bg-muted mt-14 rounded-lg">
          <img
            src={tutorial.src}
            alt="Tutorial"
            className="h-full w-full rounded-md object-cover"
          />

          <BorderBeam borderWidth={3} colorFrom="#40DFAF" colorTo="#40DFAF" />
        </AspectRatio>
      </section>
    </main>
  );
}
