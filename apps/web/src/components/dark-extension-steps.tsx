"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import step1 from "@/lib/media/step1.png";
import step2 from "@/lib/media/step2.png";

export function DarkExtensionSteps() {
  const steps = [
    {
      title: "Step 1: Store",
      description: "Add the extension to your browser",
      content:
        "Visit the Chrome Web Store and click 'Add to Chrome' to install our extension.",
      image: step1,
    },
    {
      title: "Step 2: TURBOMODE",
      description: "Enjoy the benefits",
      content:
        "Start browsing and see how our extension enhances your online experience!",
      image: step2,
    },
  ];

  return (
    <section id="usage" className="py-12 pb-0 my-16">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl md:text-6xl font-bold text-center mb-8">
          USAGE
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          {steps.map((step, index) => (
            <Card key={index} className="border-gray-700">
              <CardHeader>
                <CardTitle className="text-3xl text-gray-100">
                  {step.title}
                </CardTitle>
                <CardDescription className="text-2xl text-gray-400">
                  {step.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative w-full min-h-48 rounded-md overflow-hidden">
                  <Image
                    src={step.image.src}
                    width={step.image.width}
                    height={step.image.height}
                    alt={`Illustration for ${step.title}`}
                    className="h-[280px] w-full aspect-video object-cover"
                  />
                </div>
                <p className="text-gray-300 text-xl">{step.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
