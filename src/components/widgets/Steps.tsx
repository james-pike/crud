import { component$ } from "@builder.io/qwik";
import { Image } from "@unpic/qwik";

import IconStar from "~/components/icons/IconStar";
const sideImg =
  "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1035&q=80";

export default component$(() => {
  const stepsData = {
    title: "Our Craftsmanship Process",
    items: [
      {
        title: "Clay Preparation",
        description:
          "We begin with the finest terracotta clay, carefully sourced and prepared. The clay is wedged to remove air bubbles and achieve the perfect consistency for throwing on the potter's wheel.",
        icon: IconStar,
      },
      {
        title: "Hand Throwing",
        description:
          "Each piece is individually hand-thrown on the potter's wheel, where skill and intuition come together to create perfectly balanced forms with unique character.",
        icon: IconStar,
      },
      {
        title: "Drying & Trimming",
        description:
          "Pieces are carefully dried to leather-hard stage, then trimmed and refined to achieve the perfect shape and finish before the first firing.",
        icon: IconStar,
      },
      {
        title: "Glazing & Firing",
        description:
          "Natural glazes are applied by hand, then fired in our kiln at high temperatures to create the beautiful, durable finish that makes each piece special.",
        icon: IconStar,
      },
    ],
    image: {
      src: sideImg,
      alt: "Pottery making process showing hand-thrown pieces",
    },
  };
  const { title, items, image } = stepsData;

  return (
    <section class="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20 overflow-hidden">
      {/* Background with pottery texture */}
      <div class="absolute inset-0 bg-pottery-texture opacity-20" aria-hidden="true"></div>
      
      {/* Gradient background */}
      <div class="absolute inset-0 bg-gradient-to-br from-earth-50/50 via-white to-clay-50/50" aria-hidden="true"></div>
      
      <div class="relative row-gap-10 grid gap-6 md:grid-cols-2">
        <div class="mb-4 md:mb-0 md:py-4 md:pr-16">
          {title && (
            <h2 class="font-serif mb-8 text-3xl font-bold lg:text-4xl bg-gradient-to-r from-clay-600 to-sage-600 bg-clip-text text-transparent">
              {title}
            </h2>
          )}
          {Array.isArray(items) &&
            items.length &&
            items.map(({ title, description, icon: Icon }, index) => (
              <div key={`item-steps-${index}`} class="flex group">
                <div class="mr-4 flex flex-col items-center">
                  <div>
                    {index !== items.length - 1 ? (
                      <div class="flex h-12 w-12 items-center justify-center rounded-full border-2 border-clay-300 bg-gradient-to-br from-clay-100 to-clay-200 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                        {typeof Icon !== "undefined" ? (
                          <Icon class="h-6 w-6 text-clay-600" />
                        ) : (
                          <IconStar class="h-6 w-6 text-clay-600" />
                        )}
                      </div>
                    ) : (
                      <div class="flex h-12 w-12 items-center justify-center rounded-full border-2 border-clay-600 bg-gradient-to-br from-clay-600 to-clay-700 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                        {typeof Icon !== "undefined" ? (
                          <Icon class="h-6 w-6 text-white" />
                        ) : (
                          <IconStar class="h-6 w-6 text-white" />
                        )}
                      </div>
                    )}
                  </div>
                  {index !== items.length - 1 && (
                    <div class="h-full w-px bg-gradient-to-b from-clay-300 to-sage-300 dark:from-clay-600 dark:to-sage-600"></div>
                  )}
                </div>
                <div class={`pt-1 ${index !== items.length - 1 ? "pb-8" : ""}`}>
                  {title && (
                    <p class="mb-3 text-xl font-bold text-clay-900 dark:text-clay-100 font-serif">
                      {title}
                    </p>
                  )}
                  {description && (
                    <p class="text-sage-700 dark:text-sage-300 leading-relaxed">
                      {description}
                    </p>
                  )}
                </div>
              </div>
            ))}
        </div>
        <div class="relative">
          {typeof image !== "undefined" && (
            <div class="relative group">
              {/* Background glow */}
              <div class="absolute -inset-4 bg-gradient-to-r from-clay-400/20 to-sage-400/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              
              <Image
                layout="constrained"
                src={image.src}
                width={532}
                height={704}
                alt={image.alt}
                class="relative inset-0 w-full rounded-3xl bg-clay-500 object-cover object-top shadow-2xl dark:bg-clay-700 md:absolute md:h-full transform group-hover:scale-105 transition-transform duration-700"
                breakpoints={[320, 480, 640, 1024]}
              />
              
              {/* Overlay gradient */}
              <div class="absolute inset-0 rounded-3xl bg-gradient-to-t from-clay-900/20 via-transparent to-transparent"></div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
});
