<script setup lang="ts">
const stories = [
  {
    name: "Priya Sharma",
    initials: "PS",
    city: "Pune · School teacher",
    quote:
      "For years I read books, attended talks, tried Vedanta. Nothing landed. Then I sat with a teacher who could actually answer my questions.",
    lang: "en" as const,
  },
  {
    name: "रोहित अग्रवाल",
    initials: "रो",
    city: "बेंगलुरु · सॉफ्टवेयर इंजीनियर",
    quote:
      "मैं इंजीनियर हूँ। मुझे logic चाहिए था, mystery नहीं। यहाँ कबाला एक science की तरह सिखाई जाती है।",
    lang: "hi" as const,
  },
  {
    name: "Anjali Krishnan",
    initials: "AK",
    city: "Chennai · Homemaker",
    quote:
      "I was tired of godmen telling me to surrender. Here nobody asks me to surrender anything — they ask me to study.",
    lang: "en" as const,
  },
];
</script>

<template>
  <section id="students" class="bg-maroon-500 text-cream-300">
    <div
      class="mx-auto flex max-w-6xl flex-col gap-[22px] px-8 py-[20px] md:px-12 md:py-20"
    >
      <Eyebrow text="REAL STUDENTS · असली छात्र" tone="gold" />
      <h2
        class="font-display-en text-cream-300 text-[32px] leading-[1.05] md:text-[48px]"
      >
        Real lives, not Instagram posts.
      </h2>
      <p class="font-display-hi text-gold-500 text-[22px] md:text-[28px]">
        असली ज़िंदगियाँ, इंस्टा रील्स नहीं।
      </p>
      <p
        class="font-body-en text-cream-300/75 max-w-prose text-[13px] md:text-base"
      >
        From across India — students who stopped searching and started studying.
      </p>
      <div class="flex flex-col gap-3 md:grid md:grid-cols-3 md:gap-6">
        <figure
          v-for="s in stories"
          :key="s.name"
          class="bg-cream-300 text-charcoal-800 flex flex-col gap-[10px] rounded-[12px] p-[14px] md:p-6"
        >
          <blockquote
            class="font-display-en text-charcoal-800 text-[16px] leading-[1.4] md:text-lg"
            :class="{ 'font-body-hi font-normal': s.lang === 'hi' }"
          >
            {{ s.quote }}
          </blockquote>
          <figcaption class="flex items-center gap-[10px]">
            <UAvatar
              :text="s.initials"
              size="xl"
              class="bg-gold-500 text-charcoal-800 font-body-en shrink-0"
              :class="{ 'font-body-hi': s.lang === 'hi' }"
            />
            <div class="flex flex-col gap-1">
              <span
                class="text-indigo-500 text-[13px] font-medium"
                :class="s.lang === 'hi' ? 'font-body-hi' : 'font-body-en'"
              >
                {{ s.name }}
              </span>
              <span
                class="text-charcoal-500 text-[11px]"
                :class="s.lang === 'hi' ? 'font-body-hi' : 'font-body-en'"
              >
                {{ s.city }}
              </span>
            </div>
          </figcaption>
        </figure>
      </div>
      <div class="flex items-center pt-2">
        <span
          class="text-cream-300/75 inline-flex items-center gap-2 text-[12px]"
        >
          <UIcon name="i-lucide-users" class="text-gold-500 h-4 w-4" />
          700+ stories like these
        </span>
      </div>
    </div>
  </section>
</template>
