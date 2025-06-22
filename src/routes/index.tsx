import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

import Hero from "~/components/widgets/Hero";
import Features from "~/components/widgets/Features";
import Steps from "~/components/widgets/Steps";
import FAQs from "~/components/widgets/FAQs";
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
      <Steps />
      <FAQs
        title="Frequently Asked Questions"
        subtitle="Learn more about our pottery, materials, and care instructions to help you make the most of your handcrafted pieces."
        highlight="FAQs"
        items={[
          {
            title: "How do I care for my pottery?",
            description:
              "Our pottery is dishwasher safe, but we recommend hand washing to preserve the finish. Avoid extreme temperature changes and use mild soap. For decorative pieces, simply dust regularly with a soft cloth.",
          },
          {
            title: "Are your pieces food safe?",
            description:
              "Yes, all our functional pieces are food safe and lead-free. We use only food-grade glazes and fire our pottery to the proper temperature to ensure safety and durability.",
          },
          {
            title: "Can I use your pottery in the oven?",
            description:
              "Most of our pieces are oven safe up to 350°F (175°C). However, we recommend checking the specific care instructions that come with each piece, as some decorative items may not be suitable for oven use.",
          },
          {
            title: "Do you offer custom pieces?",
            description:
              "Yes, we love creating custom pieces! Whether it's a special gift, wedding registry, or unique design, we work closely with you to bring your vision to life. Contact us to discuss your project.",
          },
          {
            title: "What makes terracotta special?",
            description:
              "Terracotta clay has been used for thousands of years due to its natural beauty, durability, and ability to retain heat. It's also porous, which helps regulate humidity and keeps food fresh longer.",
          },
          {
            title: "How long does shipping take?",
            description:
              "We carefully pack each piece to ensure safe delivery. Standard shipping takes 5-7 business days, while expedited shipping is available for 2-3 business days. International shipping varies by location.",
          },
        ]}
      />
      <Stats />
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
