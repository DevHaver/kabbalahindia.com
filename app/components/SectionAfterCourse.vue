<script setup lang="ts">
const cards = [
  {
    en: "Ongoing live lessons",
    hi: "लगातार लाइव क्लासें",
    body: "Continue with instructors and peers, weekly, in English and Hindi.",
    photo: "bg-maroon-500",
    brief: "Hindi study circle on Zoom, hands raised",
  },
  {
    en: "Volunteer and deepen",
    hi: "स्वयंसेवा और गहराई",
    body: `Translate, organize, mentor newer students. Service deepens what you've learned.`,
    photo: "bg-gold-500",
    brief: "student translating a page of Baal HaSulam",
  },
  {
    en: "Local + global Congresses",
    hi: "स्थानीय + वैश्विक सम्मेलन",
    body: "Multi-day gatherings. Study, music, shared meals. India, Israel, and beyond.",
    photo: "bg-indigo-500",
    brief: "Congress crowd shot, diverse faces, warm light",
  },
];
</script>

<template>
  <section class="bg-cream-300">
    <div
      class="mx-auto flex max-w-6xl flex-col gap-[22px] px-8 py-[20px] md:px-12 md:py-20"
    >
      <Eyebrow text="AFTER THE COURSE · कोर्स के बाद" tone="maroon" />
      <BilingualHeading
        :en-lines="[`The journey doesn't end.`, `It begins.`]"
        hi="सफ़र ख़त्म नहीं होता। शुरू होता है।"
        :accent-index="1"
        size="md"
      />
      <div class="flex flex-col gap-4 md:grid md:grid-cols-3 md:gap-6">
        <article
          v-for="c in cards"
          :key="c.en"
          class="ring-border-maroon flex flex-col gap-[10px] rounded-[12px] bg-white p-[14px] ring-1 md:p-5"
        >
          <div
            class="flex h-[140px] items-end rounded-[8px] p-3 md:h-[180px]"
            :class="c.photo"
          >
            <span
              class="font-body-en text-cream-300/60 text-[9px] md:text-[11px]"
            >
              {{ c.brief }}
            </span>
          </div>
          <h3 class="font-display-en text-indigo-500 text-lg md:text-xl">
            {{ c.en }}
          </h3>
          <p class="font-display-hi text-maroon-500 text-sm md:text-base">
            {{ c.hi }}
          </p>
          <p class="font-body-en text-charcoal-700 text-[13px] md:text-sm">
            {{ c.body }}
          </p>
        </article>
      </div>
    </div>
  </section>
</template>
