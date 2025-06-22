import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

import Hero from "~/components/widgets/Hero";
import Features from "~/components/widgets/Features";
import WorkshopsCarousel from "~/components/widgets/WorkshopsCarousel";
import Steps from "~/components/widgets/Steps";
import FAQAccordion from "~/components/widgets/FAQAccordion";
import ReviewCarousel from "~/components/widgets/ReviewCarousel";
import ContactSection from "~/components/widgets/ContactSection";
import Stats from "~/components/widgets/Stats";
import CallToAction from "~/components/widgets/CallToAction";

import { qwikSerialized } from "~/utils/qwikSerialized";

const IconBrandTailwind = qwikSerialized(() => import("../components/icons/IconBrandTailwind"));
const IconApps = qwikSerialized(() => import("../components/icons/IconApps"));
const IconRocket = qwikSerialized(() => import("../components/icons/IconRocket"));
const IconBrandGoogle = qwikSerialized(() => import("../components/icons/IconBrandGoogle"));
const IconBulb = qwikSerialized(() => import("../components/icons/IconBulb"));

import { SITE } from "~/config.mjs";

export default component$(() => {
  return (
    <>
      <Hero />
      <Features
        highlight="Our Craft"
        title="What Makes Our Pottery Special"
        subtitle="Every piece in our collection is crafted with intention, using traditional techniques passed down through generations and sustainable materials that honor the earth."
        items={[
          {
            title: "Hand-Thrown Excellence",
            description:
              "Each piece is individually hand-thrown on the potter's wheel, ensuring unique character and perfect balance in every creation.",
            icon: IconBrandTailwind,
          },
          {
            title: "Natural Materials",
            description:
              "We use only the finest terracotta clay and natural glazes, sourced sustainably to create pieces that are both beautiful and eco-friendly.",
            icon: IconApps,
          },
          {
            title: "Traditional Techniques",
            description:
              "Our artisans employ centuries-old pottery techniques, from coil building to slip trailing, ensuring each piece carries the weight of tradition.",
          },
          {
            title: "Unique Character",
            description:
              "No two pieces are exactly alike. The natural variations in clay, firing, and hand-finishing create one-of-a-kind works of functional art.",
            icon: IconRocket,
          },
          {
            title: "Sustainable Practices",
            description:
              "We prioritize eco-friendly practices, from using local clay sources to energy-efficient kilns, minimizing our environmental footprint.",
            icon: IconBrandGoogle,
          },
          {
            title: "Timeless Design",
            description:
              "Our designs blend contemporary aesthetics with timeless appeal, creating pieces that will be cherished for generations to come.",
            icon: IconBulb
          },
        ]}
      />
      <WorkshopsCarousel />
      <Steps />
      <ReviewCarousel />
      <FAQAccordion />
      <Stats />
      <ContactSection />
      <CallToAction />
    </>
  );
});

export const head: DocumentHead = {
  title: SITE.title,
  meta: [
    {
      name: "description",
      content: SITE.description,
    },
  ],
};
