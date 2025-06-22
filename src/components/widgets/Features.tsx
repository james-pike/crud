import { component$ } from "@builder.io/qwik";
import { twMerge } from "tailwind-merge";
import { Headline } from "~/components/ui/Headline";
import { ItemGrid } from "~/components/ui/ItemGrid";

import IconStar from "~/components/icons/IconStar";

interface Item {
  title?: string;
  description?: string;
  icon?: any;
  classes?: Record<string, string>;
}

interface Props {
  id?: string;
  title?: any;
  subtitle?: any;
  highlight?: any;
  items: Array<Item>;
  isDark?: boolean;
  classes?: any;
}

export default component$((props: Props) => {
  const { id, title = "", subtitle = "", highlight = "", items = [], classes = {}, isDark = false } = props;

  return (
    <section class="relative scroll-mt-16 overflow-hidden" {...(id ? { id } : {})}>
      {/* Background with pottery texture */}
      <div class="absolute inset-0 bg-pottery-texture opacity-20" aria-hidden="true"></div>
      
      {/* Gradient background */}
      <div class="absolute inset-0 bg-gradient-to-br from-clay-50/50 via-white to-sage-50/50" aria-hidden="true"></div>
      
      {/* Floating decorative elements */}
      <div class="absolute top-20 right-20 w-32 h-32 bg-clay-200/10 rounded-full blur-2xl"></div>
      <div class="absolute bottom-20 left-20 w-24 h-24 bg-sage-200/10 rounded-full blur-2xl"></div>
      
      <div
        class={twMerge(
          "relative mx-auto max-w-6xl px-4 md:px-6 py-12 md:py-16 lg:py-20 text-default",
          classes?.container,
          isDark ? "dark" : ""
        )}
      >
        <Headline title={title} subtitle={subtitle} highlight={highlight} classes={classes?.headline} />
        <ItemGrid
          items={items}
          defaultIcon={IconStar}
          classes={{
            container: "md:grid-cols-2 lg:grid-cols-3 gap-8",
            title: "md:text-[1.3rem] font-serif text-clay-900 dark:text-clay-100",
            description: "text-sage-700 dark:text-sage-300",
            icon: "text-white bg-gradient-to-br from-clay-500 to-clay-600 dark:from-clay-600 dark:to-clay-700 rounded-full w-12 h-12 p-3 md:w-14 md:h-14 md:p-3 mr-4 shadow-lg",
            item: "group bg-white/80 backdrop-blur-sm border border-clay-100 dark:border-clay-800 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 hover:bg-white dark:bg-clay-900/50",
            ...(classes?.items ?? {}),
          }}
        />
      </div>
    </section>
  );
});
