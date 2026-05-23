<script setup lang="ts">
const moments = [
  {
    time: "4:30 AM",
    title: "Morning lesson",
    bg: "from-charcoal-900 via-charcoal-800 to-indigo-700",
    glow: "bg-[radial-gradient(circle_at_30%_30%,rgba(226,122,46,0.25),transparent_55%)]",
  },
  {
    time: "6:00 AM",
    title: "Books on the table",
    bg: "from-maroon-600 via-maroon-500 to-maroon-700",
    glow: "bg-[radial-gradient(circle_at_70%_30%,rgba(200,155,60,0.30),transparent_55%)]",
  },
  {
    time: "10:00 AM",
    title: "A teacher answers",
    bg: "from-gold-300 via-gold-400 to-gold-600",
    glow: "bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.30),transparent_55%)]",
  },
  {
    time: "1:00 PM",
    title: "Shared meal",
    bg: "from-forest-500 via-forest-600 to-forest-700",
    glow: "bg-[radial-gradient(circle_at_60%_30%,rgba(200,155,60,0.25),transparent_55%)]",
  },
  {
    time: "5:30 PM",
    title: "WhatsApp circle",
    bg: "from-indigo-500 via-indigo-600 to-indigo-800",
    glow: "bg-[radial-gradient(circle_at_40%_40%,rgba(245,235,215,0.18),transparent_55%)]",
  },
  {
    time: "8:00 PM",
    title: "Evening chai",
    bg: "from-vermillion-400 via-vermillion-500 to-maroon-600",
    glow: "bg-[radial-gradient(circle_at_70%_20%,rgba(255,228,200,0.25),transparent_55%)]",
  },
];
</script>

<template>
  <section class="bg-indigo-500 text-cream-300">
    <div
      class="mx-auto flex max-w-6xl flex-col gap-6 px-8 py-12 md:px-12 md:py-20"
    >
      <div class="flex flex-col gap-3 md:items-center md:text-center">
        <Eyebrow text="A DAY INSIDE · अकादमी का एक दिन" tone="gold" />
        <h2
          class="font-display-en mt-2 text-[28px] leading-[1.05] md:text-[44px]"
        >
          <span class="text-cream-300 md:inline block"
            >From the morning lesson</span
          >
          <span class="text-gold-500 md:ml-2 md:inline block"
            >to the evening chai.</span
          >
        </h2>
        <p class="font-display-hi text-cream-300/75 text-[20px] md:text-[28px]">
          सुबह की क्लास से शाम की चाय तक।
        </p>
      </div>
      <UCarousel
        :items="moments"
        arrows
        dots
        align="start"
        :ui="{
          item: 'basis-[280px] md:basis-[340px] pl-3 md:pl-6',
          container: '-ml-3 md:-ml-6',
          controls: 'mt-6 flex items-center justify-between gap-4',
          dots: 'flex items-center gap-[6px]',
          dot: 'h-[6px] w-[6px] rounded-full bg-gold-500/30 data-[state=active]:w-5 data-[state=active]:bg-gold-500 transition-all',
          arrows: 'flex gap-2',
        }"
      >
        <template #default="{ item }">
          <figure
            class="relative flex h-[340px] flex-col justify-end overflow-hidden rounded-[14px] bg-gradient-to-br md:h-[420px]"
            :class="item.bg"
          >
            <span
              aria-hidden="true"
              class="absolute inset-0"
              :class="item.glow"
            />
            <figcaption
              class="bg-cream-300/95 text-charcoal-800 relative flex flex-col gap-1 p-[14px] backdrop-blur"
            >
              <span
                class="bg-maroon-500/10 text-maroon-500 font-body-en self-start rounded-full px-2 py-[3px] text-[10px] font-medium tracking-[0.14em]"
              >
                {{ item.time }}
              </span>
              <span
                class="font-display-en text-indigo-500 text-[16px] md:text-lg"
              >
                {{ item.title }}
              </span>
            </figcaption>
          </figure>
        </template>
      </UCarousel>
    </div>
  </section>
</template>
