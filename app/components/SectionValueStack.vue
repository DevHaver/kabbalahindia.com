<script setup lang="ts">
const values = [
  {
    icon: "i-lucide-book-open",
    en: "Free e-books · ई-किताबें",
    body: "Baal HaSulam, Rav, the foundational texts.",
  },
  {
    icon: "i-lucide-graduation-cap",
    en: "Intro course · परिचय कोर्स",
    body: "Self-paced. Begin in week one.",
  },
  {
    icon: "i-lucide-message-circle",
    en: "24/7 instructors · शिक्षक",
    body: "Real people. Real answers. Anytime.",
  },
  {
    icon: "i-lucide-library",
    en: "Largest library · लाइब्रेरी",
    body: "Thousands of lessons, translations.",
  },
  {
    icon: "i-lucide-users",
    en: "Congresses · सम्मेलन",
    body: "India, Israel, US, Japan and beyond.",
  },
  {
    icon: "i-lucide-globe",
    en: "100+ country community",
    body: "One study, one path, worldwide.",
  },
  {
    icon: "i-lucide-sun",
    en: "Daily live class · रोज़ क्लास",
    body: "Live every morning, 6:30 AM IST.",
  },
  {
    icon: "i-lucide-calendar",
    en: "Weekly meetups · साप्ताहिक",
    body: "Online plus in-person across India.",
  },
];

const expanded = ref(false);
const visible = computed(() => (expanded.value ? values : values.slice(0, 6)));
const hiddenCount = computed(() => values.length - 6);
</script>

<template>
  <section class="bg-cream-300">
    <div
      class="mx-auto flex max-w-6xl flex-col gap-5 px-8 py-[20px] md:px-12 md:py-20"
    >
      <UBadge
        label="EVERYTHING FREE"
        size="md"
        class="bg-forest-500 text-cream-300 self-start tracking-[0.18em]"
      />
      <BilingualHeading
        :en-lines="['Everything you need', 'to begin.']"
        hi="जुड़ते ही, सब कुछ मिलता है।"
        :accent-index="1"
        size="md"
      />
      <p class="font-body-en text-charcoal-500 text-[12px] md:text-base">
        Eight things, all free, the moment you join.
        <span class="font-body-hi">आठ चीज़ें — समुदाय में जुड़ते ही।</span>
      </p>
      <div class="grid grid-cols-2 gap-[10px] md:grid-cols-3 md:gap-4">
        <div
          v-for="(v, i) in visible"
          :key="i"
          class="ring-border-maroon flex flex-col gap-2 rounded-[12px] bg-white p-[14px] ring-1 md:p-5"
        >
          <UIcon :name="v.icon" class="text-saffron-500 h-[22px] w-[22px]" />
          <h3
            class="font-body-en text-indigo-500 text-[13px] font-medium md:text-base"
          >
            {{ v.en }}
          </h3>
          <p
            class="font-body-en text-charcoal-500 text-[11px] leading-snug md:text-sm"
          >
            {{ v.body }}
          </p>
        </div>
      </div>
      <UButton
        v-if="hiddenCount > 0"
        :label="expanded ? 'Show less' : `+ ${hiddenCount} more`"
        :trailing-icon="
          expanded ? 'i-lucide-chevron-up' : 'i-lucide-chevron-down'
        "
        color="neutral"
        variant="link"
        size="sm"
        class="text-maroon-500 hover:text-maroon-600 self-start !px-0"
        @click="expanded = !expanded"
      />
    </div>
  </section>
</template>
