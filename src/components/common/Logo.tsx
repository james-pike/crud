import { component$ } from "@builder.io/qwik";

// @ts-ignore
import logoSrc from "~/assets/images/logo.png?width=64&height=64&png";

export default component$(() => (
  <span class="self-center ml-2 text-2xl md:text-xl font-bold text-clay-900 whitespace-nowrap dark:text-clay-100 flex items-center group">
    <div class="relative mr-3">
      <div class="w-8 h-8 bg-gradient-to-br from-clay-500 to-clay-600 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
        <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
        </svg>
      </div>
    </div>
    <span class="font-serif bg-gradient-to-r from-clay-600 to-sage-600 bg-clip-text text-transparent">
      Terra Pottery
    </span>
  </span>
));
