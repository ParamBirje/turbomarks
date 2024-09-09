"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

export function DarkExtensionSteps() {
  const steps = [
    {
      title: "Step 1: Choose",
      description: "Add the extension to your browser",
      content:
        "Visit the Chrome Web Store and click 'Add to Chrome' to install our extension.",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "Step 2: Store",
      description: "Set up your preferences",
      content:
        "Click on the extension icon and navigate to the settings page to customize your experience.",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "Step 3: TURBOMODE",
      description: "Enjoy the benefits",
      content:
        "Start browsing and see how our extension enhances your online experience!",
      image: "/placeholder.svg?height=200&width=300",
    },
  ];

  return (
    <section id="usage" className="min-h-screen py-12 pb-0 mt-20">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl md:text-6xl font-bold text-center mb-8">
          USAGE
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          {steps.map((step, index) => (
            <Card key={index} className="border-gray-700">
              <CardHeader>
                <CardTitle className="text-gray-100">{step.title}</CardTitle>
                <CardDescription className="text-gray-400">
                  {step.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative w-full h-48 rounded-md overflow-hidden">
                  <Image
                    src={step.image}
                    alt={`Illustration for ${step.title}`}
                    layout="fill"
                    objectFit="cover"
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
