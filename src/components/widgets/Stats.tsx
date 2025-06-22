import { component$ } from "@builder.io/qwik";

export default component$(() => {
  return (
    <section class="relative overflow-hidden">
      {/* Background with pottery texture */}
      <div class="absolute inset-0 bg-pottery-texture opacity-20" aria-hidden="true"></div>
      
      {/* Gradient background */}
      <div class="absolute inset-0 bg-gradient-to-br from-sage-50/50 via-white to-clay-50/50" aria-hidden="true"></div>
      
      <div class="relative px-4 py-8 md:py-16 sm:px-6 mx-auto md:px-24 lg:px-8 lg:py-20 max-w-7xl">
        <div class="grid grid-cols-2 row-gap-8 md:grid-cols-4">
          <div class="text-center md:border-r border-clay-200 dark:border-clay-700 mb-10 md:mb-0 group">
            <div class="text-4xl font-bold lg:text-5xl xl:text-6xl bg-gradient-to-r from-clay-600 to-clay-700 bg-clip-text text-transparent font-serif group-hover:scale-110 transition-transform duration-300">
              15K+
            </div>
            <p class="text-sm font-medium tracking-widest text-sage-700 dark:text-sage-300 uppercase lg:text-base mt-2">
              Pieces Created
            </p>
          </div>
          <div class="text-center md:border-r border-clay-200 dark:border-clay-700 mb-10 md:mb-0 group">
            <div class="text-4xl font-bold lg:text-5xl xl:text-6xl bg-gradient-to-r from-sage-600 to-sage-700 bg-clip-text text-transparent font-serif group-hover:scale-110 transition-transform duration-300">
              25+
            </div>
            <p class="text-sm font-medium tracking-widest text-sage-700 dark:text-sage-300 uppercase lg:text-base mt-2">
              Years Experience
            </p>
          </div>
          <div class="text-center md:border-r border-clay-200 dark:border-clay-700 font-serif group">
            <div class="text-4xl font-bold lg:text-5xl xl:text-6xl bg-gradient-to-r from-earth-600 to-earth-700 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
              98%
            </div>
            <p class="text-sm font-medium tracking-widest text-sage-700 dark:text-sage-300 uppercase lg:text-base mt-2">
              Customer Satisfaction
            </p>
          </div>
          <div class="text-center group">
            <div class="text-4xl font-bold lg:text-5xl xl:text-6xl bg-gradient-to-r from-clay-600 to-sage-600 bg-clip-text text-transparent font-serif group-hover:scale-110 transition-transform duration-300">
              50+
            </div>
            <p class="text-sm font-medium tracking-widest text-sage-700 dark:text-sage-300 uppercase lg:text-base mt-2">
              Unique Designs
            </p>
          </div>
        </div>
      </div>
    </section>
  );
});
