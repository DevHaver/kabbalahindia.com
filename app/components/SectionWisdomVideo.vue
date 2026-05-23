<script setup lang="ts">
const videos = [
  {
    title: "What is Kabbalah, really?",
    meta: "2:48 · EN (HI subs)",
    bg: "from-indigo-500 via-indigo-700 to-charcoal-900",
  },
  {
    title: `Why we have desires we can't fulfill`,
    meta: "3:12 · EN",
    bg: "from-charcoal-900 via-charcoal-800 to-maroon-700",
  },
  {
    title: "The point in the heart",
    meta: "2:31 · EN",
    bg: "from-maroon-500 via-maroon-600 to-charcoal-900",
  },
];
</script>

<template>
  <section id="wisdom" class="bg-maroon-500 text-cream-300">
    <div
      class="mx-auto flex max-w-6xl flex-col gap-6 px-8 py-12 md:px-12 md:py-20"
    >
      <div class="flex flex-col gap-3 md:items-center md:text-center">
        <Eyebrow text="WISDOM FROM RAV · रब के वचन" tone="gold" />
        <h2
          class="font-display-en mt-2 text-[26px] leading-[1.1] md:text-[40px]"
        >
          <span class="md:inline block">Three minutes.</span>
          <span class="text-gold-500 md:ml-2 md:inline block"
            >Then it stays with you all week.</span
          >
        </h2>
        <p class="font-display-hi text-cream-300/75 text-[18px] md:text-[24px]">
          तीन मिनट। फिर पूरे हफ़्ते साथ रहता है।
        </p>
      </div>
      <UCarousel
        :items="videos"
        arrows
        dots
        align="start"
        :ui="{
          item: 'basis-[280px] md:basis-[380px] pl-3 md:pl-6',
          container: '-ml-3 md:-ml-6',
          controls: 'mt-6 flex items-center justify-between gap-4',
          dots: 'flex items-center gap-[6px]',
          dot: 'h-[6px] w-[6px] rounded-full bg-gold-500/30 data-[state=active]:w-5 data-[state=active]:bg-gold-500 transition-all',
          arrows: 'flex gap-2',
        }"
      >
        <template #default="{ item }">
          <article
            class="bg-cream-300 text-charcoal-800 flex flex-col overflow-hidden rounded-[12px]"
          >
            <button
              type="button"
              class="relative flex h-[180px] w-full items-center justify-center bg-gradient-to-br md:h-[220px]"
              :class="item.bg"
              :aria-label="`Play: ${item.title}`"
            >
              <span
                aria-hidden="true"
                class="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(245,235,215,0.18),transparent_60%)]"
              />
              <span
                class="bg-cream-300/95 relative flex h-14 w-14 items-center justify-center rounded-full transition-transform hover:scale-105 md:h-16 md:w-16"
              >
                <UIcon
                  name="i-lucide-play"
                  class="text-maroon-500 h-5 w-5 translate-x-[1px] md:h-6 md:w-6"
                />
              </span>
            </button>
            <div class="flex flex-col gap-[6px] p-[14px] md:p-5">
              <h3
                class="font-display-en text-indigo-500 text-[15px] md:text-lg"
              >
                {{ item.title }}
              </h3>
              <span
                class="font-body-en text-charcoal-500 text-[11px] md:text-sm"
              >
                {{ item.meta }}
              </span>
            </div>
          </article>
        </template>
      </UCarousel>
      <a
        href="https://www.youtube.com/@KabbalahInfo"
        target="_blank"
        rel="noopener"
        class="font-body-en text-gold-500 hover:text-cream-300 inline-flex items-center gap-1 self-start text-[12px] font-medium transition-colors md:text-sm"
      >
        All videos on YouTube
        <UIcon name="i-lucide-arrow-up-right" class="h-3 w-3" />
      </a>
    </div>
  </section>
</template>
