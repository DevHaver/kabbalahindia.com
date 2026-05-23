<script setup lang="ts">
const steps = [
  {
    n: "01",
    title: "Foundations · नींव",
    body: "A 12-lesson introduction. No prerequisites. Hindi and English, side by side. Most students finish in 4–6 weeks.",
  },
  {
    n: "02",
    title: "Daily study · रोज़ का अध्ययन",
    body: "Live morning lesson with a teacher, recorded for evening replay. 60 minutes. Hindi and English groups, every day.",
  },
  {
    n: "03",
    title: "Friends, not followers · साथी",
    body: "Small WhatsApp study groups (8–12 people). You study together, you talk, you support. This is where it becomes real.",
  },
  {
    n: "04",
    title: "Depth · गहराई",
    body: "Original texts — Zohar, Talmud Eser Sefirot, the writings of Baal HaSulam — studied slowly, with translation and commentary.",
  },
];
</script>

<template>
  <section id="program" class="bg-cream-300">
    <div
      class="mx-auto flex max-w-6xl flex-col gap-8 px-8 py-[20px] md:items-center md:gap-12 md:py-24"
    >
      <Eyebrow text="THE PROGRAM · कार्यक्रम" tone="gold" />
      <div class="flex max-w-3xl flex-col gap-3 md:items-center md:text-center">
        <h2
          class="font-display-en text-indigo-500 text-[30px] leading-[1.05] md:text-[44px]"
        >
          A clear path, four steps deep.
        </h2>
        <p class="font-display-hi text-maroon-500 text-[22px] md:text-[28px]">
          एक साफ़ रास्ता, चार कदम गहरा।
        </p>
        <p class="font-body-en text-charcoal-700 text-[13px] md:text-base">
          Every student begins with the foundations. You move at your own pace —
          no exams, no grading, no hurry.
        </p>
      </div>

      <!-- Mobile: vertical ladder -->
      <ol class="flex w-full flex-col items-stretch md:hidden">
        <template v-for="(s, i) in steps" :key="s.n">
          <li
            class="bg-cream-300 ring-border-maroon flex flex-col gap-[6px] rounded-[12px] bg-white p-[14px] ring-1"
          >
            <span class="font-display-en text-gold-500 text-[32px]">{{
              s.n
            }}</span>
            <h3 class="font-display-en text-indigo-500 text-lg">
              {{ s.title }}
            </h3>
            <p
              class="font-body-en text-charcoal-700 text-[13px] leading-relaxed"
            >
              {{ s.body }}
            </p>
          </li>
          <span
            v-if="i < steps.length - 1"
            aria-hidden="true"
            class="bg-gold-500/50 mx-auto h-6 w-px"
          />
        </template>
      </ol>

      <!-- Desktop: horizontal ladder with gold connector line -->
      <div class="relative hidden w-full md:block">
        <span
          aria-hidden="true"
          class="bg-gold-500/40 absolute left-[10%] right-[10%] top-[48px] h-px"
        />
        <ol class="relative grid grid-cols-4 gap-6">
          <li
            v-for="s in steps"
            :key="s.n"
            class="flex flex-col items-center gap-3 text-center"
          >
            <span
              class="bg-cream-300 ring-gold-500/60 font-display-en text-gold-500 relative z-10 flex h-[96px] w-[96px] items-center justify-center rounded-full text-[40px] ring-1"
            >
              {{ s.n }}
            </span>
            <h3 class="font-display-en text-indigo-500 text-xl">
              {{ s.title }}
            </h3>
            <p class="font-body-en text-charcoal-700 text-sm leading-relaxed">
              {{ s.body }}
            </p>
          </li>
        </ol>
      </div>

      <div
        class="bg-gold-500/10 flex w-full max-w-2xl items-start gap-2 rounded-[10px] p-[14px]"
      >
        <UIcon
          name="i-lucide-info"
          class="text-maroon-500 mt-[2px] h-4 w-4 shrink-0"
        />
        <p class="font-body-en text-charcoal-700 text-[12px] md:text-sm">
          Start with step 1 today. Steps 2–4 open as you're ready — no pressure,
          no deadlines.
        </p>
      </div>
      <UButton
        to="#signup"
        size="xl"
        trailing-icon="i-lucide-arrow-right"
        class="text-charcoal-800"
      >
        Begin with the foundations
      </UButton>
    </div>
  </section>
</template>
