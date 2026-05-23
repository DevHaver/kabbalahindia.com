<script setup lang="ts">
const teachers = [
  {
    name: "Shamir Galsurkar",
    role: "Senior teacher · Mumbai",
    bio: "Indian Jew, engineer. 12+ years studying with Laitman.",
    pills: ["Hindi · English · Marathi"],
    photo: "bg-maroon-500",
  },
  {
    name: "Priya Krishnan",
    role: "South India · Bengaluru",
    bio: "Software architect. 8 years studying. Connects Kabbalah with Vedantic roots.",
    pills: ["English · Tamil · Hindi"],
    photo: "bg-gold-500",
  },
  {
    name: "Anand Sharma",
    role: "Delhi NCR teacher",
    bio: "Translator of RABASH into Hindi. Runs the Delhi weekly study since 2019.",
    pills: ["Hindi · English"],
    photo: "bg-indigo-500",
  },
];
</script>

<template>
  <section id="teachers" class="bg-cream-300">
    <div
      class="mx-auto flex max-w-6xl flex-col gap-[22px] px-8 py-[20px] md:px-12 md:py-20"
    >
      <Eyebrow text="YOUR TEACHERS · आपके शिक्षक" tone="maroon" />
      <BilingualHeading
        :en-lines="[
          'Indians. Engineers, mothers, scholars.',
          'Students of Rav.',
        ]"
        hi="भारतीय। इंजीनियर, माँएँ, विद्वान। रब के छात्र।"
        :accent-index="1"
        size="md"
      />
      <p class="font-body-en text-charcoal-500 text-[12px] md:text-base">
        Multiple teachers, no single guru.
        <span class="font-body-hi">हम साथ पढ़ते हैं, साथ चलते हैं।</span>
      </p>
      <div
        class="-mx-8 flex gap-3 overflow-x-auto px-8 md:mx-0 md:grid md:grid-cols-3 md:px-0 md:gap-6"
      >
        <article
          v-for="t in teachers"
          :key="t.name"
          class="bg-cream-300 ring-border-maroon flex w-[180px] shrink-0 flex-col rounded-[12px] ring-1 md:w-auto md:bg-white"
        >
          <div :class="['h-[200px] rounded-t-[12px] md:h-[280px]', t.photo]" />
          <div class="flex flex-col gap-1 p-3 md:p-5">
            <h3 class="font-display-en text-indigo-500 text-lg md:text-xl">
              {{ t.name }}
            </h3>
            <p class="font-body-en text-charcoal-500 text-[11px] md:text-sm">
              {{ t.role }}
            </p>
            <p
              class="font-body-en text-charcoal-700 text-[12px] leading-snug md:text-sm"
            >
              {{ t.bio }}
            </p>
            <div class="mt-1 flex flex-wrap gap-[6px]">
              <UBadge
                v-for="p in t.pills"
                :key="p"
                :label="p"
                color="primary"
                variant="soft"
                size="sm"
              />
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
