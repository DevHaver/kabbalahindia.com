<script setup lang="ts">
const photos = [
  {
    bg: "bg-gold-500",
    text: "text-charcoal-800",
    caption: "student listening",
  },
  { bg: "bg-maroon-500", text: "text-cream-300", caption: "books open, Sulam" },
  { bg: "bg-forest-500", text: "text-cream-300", caption: "group of students" },
];
</script>

<template>
  <section class="bg-indigo-500 text-cream-300">
    <div
      class="mx-auto flex max-w-6xl flex-col gap-[18px] px-7 py-[22px] md:gap-8 md:px-12 md:py-16 md:grid md:grid-cols-2 md:items-center"
    >
      <div class="flex flex-col gap-[18px]">
        <Eyebrow text="FINALLY · आख़िरकार" tone="gold" />
        <p class="font-display-hi text-gold-500 text-[18px] md:text-[24px]">
          असली कबाला, अब भारत में।
        </p>
        <h1
          class="font-display-en text-cream-300 text-[44px] leading-[1.05] md:text-[72px]"
        >
          <span class="block">Real Kabbalah.</span>
          <span class="block">In India.</span>
        </h1>
        <p
          class="font-body-en text-cream-300/80 text-[13px] md:text-[16px] max-w-prose"
        >
          Free. In Hindi and English. From real teachers in the unbroken Bnei
          Baruch lineage — no gurus, no mysticism.
        </p>
        <div
          class="flex flex-col gap-[10px] md:flex-row md:items-center md:gap-5"
        >
          <UButton
            to="#signup"
            size="xl"
            trailing-icon="i-lucide-arrow-right"
            class="text-charcoal-800"
          >
            Start Free Course · मुफ़्त कोर्स शुरू करें
          </UButton>
          <a
            href="#wisdom"
            class="font-body-en text-gold-500 inline-flex items-center gap-[6px] text-[12px] font-medium md:text-[14px]"
          >
            Watch a 90-second intro
            <UIcon name="i-lucide-play" class="h-3 w-3" />
          </a>
        </div>
        <div class="flex flex-wrap items-center gap-3 pt-2">
          <AvatarPill />
          <TrustStrip tone="cream-on-dark" />
        </div>
      </div>

      <div class="flex flex-col gap-2 md:gap-3">
        <div
          class="bg-saffron-500 text-charcoal-800 flex h-[200px] items-end justify-start rounded-[14px] p-3 md:h-[420px]"
        >
          <span class="font-body-en text-[10px] opacity-70 md:text-xs">
            rav teaching, warm lamp light
          </span>
        </div>
        <div class="grid grid-cols-3 gap-2 md:gap-3">
          <div
            v-for="(p, i) in photos"
            :key="i"
            class="flex h-[90px] items-end rounded-[10px] p-2 md:h-[130px]"
            :class="[p.bg, p.text]"
          >
            <span class="font-body-en text-[9px] opacity-80 md:text-[10px]">
              {{ p.caption }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
