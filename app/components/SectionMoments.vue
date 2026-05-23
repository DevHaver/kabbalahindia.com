<script setup lang="ts">
const moments = [
  {
    caption: "Congress '24",
    sub: "Pune · December",
    bg: "from-maroon-600 to-maroon-700",
    accent: "text-gold-500",
  },
  {
    caption: "Mumbai meet",
    sub: "Weekly study circle",
    bg: "from-gold-400 to-gold-600",
    accent: "text-charcoal-800",
  },
  {
    caption: "Books open",
    sub: "Sulam, slowly",
    bg: "from-indigo-500 to-indigo-700",
    accent: "text-gold-500",
  },
  {
    caption: "Delhi circle",
    sub: "Saturday morning",
    bg: "from-vermillion-500 to-maroon-600",
    accent: "text-gold-500",
  },
  {
    caption: "Bengaluru women",
    sub: "Hindi study group",
    bg: "from-forest-500 to-forest-700",
    accent: "text-gold-500",
  },
];
</script>

<template>
  <section class="bg-cream-300">
    <div
      class="mx-auto flex max-w-6xl flex-col gap-5 px-8 py-10 md:px-12 md:py-20"
    >
      <Eyebrow text="MOMENTS · हमारे समुदाय से" tone="maroon" />
      <h2
        class="font-display-en text-indigo-500 text-[24px] leading-tight md:text-[40px]"
      >
        Real life inside the community
      </h2>
      <UCarousel
        :items="moments"
        arrows
        dots
        align="start"
        :ui="{
          item: 'basis-[150px] md:basis-[260px] pl-3 md:pl-6',
          container: '-ml-3 md:-ml-6',
          controls: 'mt-6 flex items-center justify-between gap-4',
          dots: 'flex items-center gap-[6px]',
          dot: 'h-[6px] w-[6px] rounded-full bg-maroon-500/30 data-[state=active]:w-5 data-[state=active]:bg-maroon-500 transition-all',
          arrows: 'flex gap-2',
        }"
      >
        <template #default="{ item }">
          <figure
            class="relative flex h-[180px] flex-col justify-end overflow-hidden rounded-[12px] bg-gradient-to-br p-4 md:h-[280px]"
            :class="item.bg"
          >
            <span
              aria-hidden="true"
              class="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent_60%)]"
            />
            <figcaption class="relative">
              <p
                class="font-display-en text-cream-300 text-[14px] leading-tight md:text-xl"
              >
                {{ item.caption }}
              </p>
              <p class="font-body-en mt-1 text-[10px]" :class="item.accent">
                {{ item.sub }}
              </p>
            </figcaption>
          </figure>
        </template>
      </UCarousel>
    </div>
  </section>
</template>
