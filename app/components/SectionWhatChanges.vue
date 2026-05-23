<script setup lang="ts">
const changes = [
  { en: "A new way of seeing.", hi: "देखने का नया तरीक़ा।" },
  { en: "Less stress, deeper sleep.", hi: "कम तनाव, गहरी नींद।" },
  {
    en: "Clarity about what you actually want.",
    hi: "असली में क्या चाहिए — साफ़ समझ।",
  },
  {
    en: "Real abundance — in work, in love.",
    hi: "काम और रिश्तों में असली बहुतायत।",
  },
  {
    en: "The feeling of belonging somewhere real.",
    hi: "कहीं असली में जुड़े होने का एहसास।",
  },
];
</script>

<template>
  <section class="bg-cream-400">
    <div
      class="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-8 py-[20px] md:grid-cols-2 md:gap-20 md:px-12 md:py-24"
    >
      <div class="flex flex-col gap-[18px]">
        <Eyebrow
          text="WHAT CHANGES IN YOU · आपमें क्या बदलता है"
          tone="maroon"
        />
        <BilingualHeading
          :en-lines="[`Wisdom isn't read.`, `It's lived.`]"
          hi="ज्ञान पढ़ा नहीं जाता। जिया जाता है।"
          :accent-index="1"
          size="md"
        />
        <p class="font-body-en text-charcoal-500 text-[12px] md:text-base">
          Five quiet shifts students keep describing — usually within ninety
          days.
        </p>
      </div>
      <ol class="flex flex-col">
        <li
          v-for="(c, i) in changes"
          :key="i"
          class="border-charcoal-200/60 flex items-start gap-4 py-5 first:pt-0 last:border-b-0 md:gap-6"
          :class="i < changes.length - 1 ? 'border-b' : ''"
        >
          <span
            class="font-display-en text-gold-500 w-9 shrink-0 text-[22px] md:text-[28px]"
          >
            {{ String(i + 1).padStart(2, "0") }}
          </span>
          <div class="flex flex-col gap-[2px]">
            <span
              class="font-display-en text-indigo-500 text-[16px] md:text-xl"
            >
              {{ c.en }}
            </span>
            <span
              class="font-body-hi text-charcoal-500 text-[13px] md:text-base"
            >
              {{ c.hi }}
            </span>
          </div>
        </li>
      </ol>
    </div>
  </section>
</template>
