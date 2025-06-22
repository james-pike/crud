import { component$ } from "@builder.io/qwik";
import { Image } from "@unpic/qwik";

const coverImage =
  "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3087&q=80";

export default component$(() => {
  return (
    <section class="relative md:-mt-[76px] not-prose overflow-hidden">
      {/* Background with pottery texture */}
      <div class="absolute inset-0 bg-pottery-texture opacity-30" aria-hidden="true"></div>
      
      {/* Gradient overlays */}
      <div class="absolute inset-0 bg-gradient-to-br from-clay-50/80 via-sage-50/60 to-earth-50/70" aria-hidden="true"></div>
      <div class="absolute inset-0 bg-gradient-to-t from-clay-100/20 via-transparent to-sage-100/30" aria-hidden="true"></div>
      
      {/* Floating decorative elements */}
      <div class="absolute top-20 left-10 w-32 h-32 bg-clay-200/20 rounded-full blur-xl animate-float"></div>
      <div class="absolute bottom-20 right-10 w-24 h-24 bg-sage-300/20 rounded-full blur-xl animate-float" style="animation-delay: -2s;"></div>
      <div class="absolute top-1/2 left-1/4 w-16 h-16 bg-earth-300/30 rounded-full blur-lg animate-float" style="animation-delay: -4s;"></div>
      
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div class="pt-0 md:pt-[76px] pointer-events-none"></div>
        <div class="py-12 md:py-20 lg:py-0 lg:flex lg:items-center lg:h-screen lg:gap-8">
          <div class="basis-1/2 text-center lg:text-left pb-10 md:pb-16 mx-auto">
            {/* Decorative line */}
            <div class="hidden lg:block w-20 h-1 bg-gradient-to-r from-clay-500 to-sage-500 mb-8 rounded-full"></div>
            
            <h1 class="text-5xl md:text-6xl font-bold leading-tighter tracking-tighter mb-4 font-serif text-clay-900 dark:text-clay-100">
              Handcrafted <br class="hidden lg:block" />
              <span class="bg-gradient-to-r from-clay-600 to-sage-600 bg-clip-text text-transparent">
                Ceramic Artistry
              </span>
            </h1>
            
            <div class="max-w-3xl mx-auto lg:max-w-none">
              <p class="text-xl text-sage-700 mb-6 dark:text-sage-300 leading-relaxed">
                Each piece tells a story of{" "}
                <span class="font-semibold text-clay-600 dark:text-clay-400">
                  earth, fire, and human creativity
                </span>
                . Discover our collection of handcrafted pottery that brings the warmth of terracotta and the serenity of sage into your home.
              </p>

              <div class="max-w-xs sm:max-w-md m-auto flex flex-nowrap flex-col sm:flex-row sm:justify-center gap-4 lg:justify-start lg:m-0 lg:max-w-7xl">
                <div class="flex w-full sm:w-auto">
                  <a
                    class="group relative inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-white bg-gradient-to-r from-clay-600 to-clay-700 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden"
                    href="#collection"
                  >
                    <span class="relative z-10">Explore Collection</span>
                    <div class="absolute inset-0 bg-gradient-to-r from-clay-700 to-clay-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </a>
                </div>
                <div class="flex w-full sm:w-auto">
                  <button class="group relative inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-sage-700 bg-white/80 backdrop-blur-sm border border-sage-200 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:bg-sage-50">
                    <span class="relative z-10">Learn Our Story</span>
                  </button>
                </div>
              </div>
              
              {/* Feature highlights */}
              <div class="mt-12 grid grid-cols-3 gap-6 text-center lg:text-left">
                <div class="group">
                  <div class="w-12 h-12 mx-auto lg:mx-0 mb-3 bg-gradient-to-br from-clay-100 to-clay-200 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg class="w-6 h-6 text-clay-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                    </svg>
                  </div>
                  <h3 class="text-sm font-semibold text-clay-800 dark:text-clay-200">Handcrafted</h3>
                </div>
                <div class="group">
                  <div class="w-12 h-12 mx-auto lg:mx-0 mb-3 bg-gradient-to-br from-sage-100 to-sage-200 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg class="w-6 h-6 text-sage-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <h3 class="text-sm font-semibold text-sage-800 dark:text-sage-200">Sustainable</h3>
                </div>
                <div class="group">
                  <div class="w-12 h-12 mx-auto lg:mx-0 mb-3 bg-gradient-to-br from-earth-100 to-earth-200 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg class="w-6 h-6 text-earth-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <h3 class="text-sm font-semibold text-earth-800 dark:text-earth-200">Timeless</h3>
                </div>
              </div>
            </div>
          </div>
          
          <div class="basis-1/2 relative">
            {/* Image container with advanced effects */}
            <div class="relative group">
              {/* Background glow */}
              <div class="absolute -inset-4 bg-gradient-to-r from-clay-400/20 to-sage-400/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              
              {/* Main image with mask */}
              <div class="relative overflow-hidden rounded-3xl shadow-2xl">
                <Image
                  src={coverImage}
                  layout="constrained"
                  width={493}
                  height={616}
                  alt="Handcrafted pottery collection featuring terracotta and sage green pieces"
                  class="w-full h-auto transform group-hover:scale-105 transition-transform duration-700"
                  priority={true}
                  breakpoints={[320, 480, 640, 768, 1024]}
                />
                
                {/* Overlay gradient */}
                <div class="absolute inset-0 bg-gradient-to-t from-clay-900/20 via-transparent to-transparent"></div>
              </div>
              
              {/* Floating decorative elements */}
              <div class="absolute -top-4 -right-4 w-8 h-8 bg-clay-300 rounded-full animate-pulse-slow"></div>
              <div class="absolute -bottom-4 -left-4 w-6 h-6 bg-sage-300 rounded-full animate-pulse-slow" style="animation-delay: -1s;"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});
