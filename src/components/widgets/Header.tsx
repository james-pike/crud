import { component$, useStore } from "@builder.io/qwik";
import { useContent } from "@builder.io/qwik-city";

import Logo from "~/components/common/Logo";
import ToggleTheme from "~/components/common/ToggleTheme";
import ToggleMenu from "~/components/common/ToggleMenu";
import IconChevronDown from "../icons/IconChevronDown";

export default component$(() => {
  const store = useStore({
    isScrolling: false,
  });

  const { menu } = useContent();

  return (
    <header
      id="header"
      class={`sticky top-0 z-40 flex-none mx-auto w-full border-b border-clay-100/0 transition-all duration-300 ease-in-out ${
        store.isScrolling
          ? " md:bg-white/95 md:backdrop-blur-md dark:md:bg-clay-900/95 bg-white dark:bg-clay-900 border-clay-200/20 dark:border-clay-700/20 shadow-lg"
          : ""
      }`}
      window:onScroll$={() => {
        if (!store.isScrolling && window.scrollY >= 10) {
          store.isScrolling = true;
        } else if (store.isScrolling && window.scrollY < 10) {
          store.isScrolling = false;
        }
      }}
    >
      <div class="absolute inset-0"></div>
      <div class="relative text-default py-3 px-3 md:px-6 mx-auto w-full md:flex md:justify-between max-w-7xl">
        <div class="mr-auto rtl:mr-0 rtl:ml-auto flex justify-between">
          <a class="flex items-center group" href={"/"}>
            <Logo />
          </a>
          <div class="flex items-center md:hidden">
            <ToggleTheme iconClass="w-6 h-6 md:w-5 md:h-5 md:inline-block" />
            <ToggleMenu />
          </div>
        </div>
        <nav
          class="items-center w-full md:w-auto hidden md:flex text-default overflow-y-auto overflow-x-hidden md:overflow-y-visible md:overflow-x-auto md:mx-5"
          aria-label="Main navigation"
        >
          {menu && menu.items ? (
            <ul class="flex flex-col md:flex-row md:self-center w-full md:w-auto text-xl md:text-[0.9375rem] tracking-[0.01rem] font-medium">
              {menu.items.map(({ text, href, items }, key) => (
                <li key={key} class={items?.length ? "dropdown" : ""}>
                  {items?.length ? (
                    <>
                      <button class="hover:text-clay-600 dark:hover:text-clay-300 px-4 py-3 flex items-center transition-colors duration-200">
                        {text} <IconChevronDown class="w-3.5 h-3.5 ml-0.5 rtl:ml-0 rtl:mr-0.5 hidden md:inline" />
                      </button>
                      <ul class="dropdown-menu md:backdrop-blur-md dark:md:bg-clay-800 rounded-lg md:absolute pl-4 md:pl-0 md:hidden font-medium md:bg-white/95 md:min-w-[200px] drop-shadow-xl border border-clay-100 dark:border-clay-700">
                        {items.map(({ text: text2, href: href2 }, key2) => (
                          <li key={key2}>
                            <a
                              class="first:rounded-t-lg last:rounded-b-lg md:hover:bg-clay-50 hover:text-clay-600 dark:hover:text-clay-300 dark:hover:bg-clay-700/50 py-2 px-5 block whitespace-no-wrap transition-colors duration-200"
                              href={href2}
                            >
                              {text2}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <a class="hover:text-clay-600 dark:hover:text-clay-300 px-4 py-3 flex items-centers transition-colors duration-200" href={href}>
                      {text}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          ) : null}
        </nav>
        <div class="hidden md:self-center md:flex items-center md:mb-0 fixed w-full md:w-auto md:static justify-end left-0 rtl:left-auto rtl:right-0 bottom-0 p-3 md:p-0">
          <div class="items-center flex justify-between w-full md:w-auto">
            <div class="flex">
              <ToggleTheme iconClass="w-6 h-6 md:w-5 md:h-5 md:inline-block" />
            </div>
            <span class="ml-4 rtl:ml-0 rtl:mr-4">
              <a
                href="#collection"
                class="group relative inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-clay-600 to-clay-700 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden"
              >
                <span class="relative z-10">Shop Now</span>
                <div class="absolute inset-0 bg-gradient-to-r from-clay-700 to-clay-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
            </span>
          </div>
        </div>
      </div>
    </header>
  );
});

//

//////