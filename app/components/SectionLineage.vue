<script setup lang="ts">
const lineage = [
  { name: "The Ari", dates: "1534–1572", role: "Father of modern Kabbalah" },
  {
    name: "Baal HaSulam",
    dates: "1885–1954",
    role: "Translated the Ari for the modern age",
  },
  { name: "RABASH", dates: "1907–1991", role: "His son and successor" },
  {
    name: "Dr. Michael Laitman",
    dates: "1946–",
    role: "Founder, Bnei Baruch · Israel",
  },
  {
    name: `Today's Indian teachers`,
    dates: "2018–",
    role: "Direct students of Dr. Laitman",
  },
];
</script>

<template>
  <section class="bg-indigo-500 text-cream-300">
    <div
      class="mx-auto flex max-w-6xl flex-col gap-8 px-8 py-[20px] md:items-center md:gap-14 md:px-12 md:py-24"
    >
      <Eyebrow text="AN UNBROKEN LINEAGE · अटूट परंपरा" tone="gold" />
      <div class="flex max-w-3xl flex-col gap-3 md:items-center md:text-center">
        <h2 class="font-display-en text-[26px] leading-[1.1] md:text-[44px]">
          <span class="md:inline block">Teacher to student.</span>
          <span class="md:inline md:ml-3 block">Five hundred years.</span>
          <span class="text-gold-500 md:inline md:ml-3 block">Unbroken.</span>
        </h2>
        <p class="font-display-hi text-cream-300/75 text-[18px] md:text-[24px]">
          गुरु से शिष्य तक। पाँच सौ साल। अटूट।
        </p>
      </div>

      <!-- Mobile: vertical chain. Desktop: horizontal row with gold connector. -->
      <ul class="flex w-full flex-col items-center gap-0 md:hidden">
        <template v-for="(node, i) in lineage" :key="node.name">
          <li class="flex flex-col items-center gap-2 text-center">
            <div
              class="bg-gold-500 ring-cream-300/10 h-[80px] w-[80px] rounded-full ring-2"
            />
            <span class="font-display-en text-cream-300 text-[16px]">
              {{ node.name }}
            </span>
            <span class="font-body-en text-cream-300/55 text-[11px]">
              {{ node.dates }}
            </span>
            <span
              class="font-body-en text-cream-300/70 px-4 text-center text-[11px]"
            >
              {{ node.role }}
            </span>
          </li>
          <li
            v-if="i < lineage.length - 1"
            aria-hidden="true"
            class="bg-gold-500/70 my-3 h-7 w-px"
          />
        </template>
      </ul>

      <div class="relative hidden w-full md:block">
        <span
          aria-hidden="true"
          class="bg-gold-500/40 absolute left-[10%] right-[10%] top-[80px] h-px"
        />
        <ul class="relative grid grid-cols-5 gap-4">
          <li
            v-for="node in lineage"
            :key="node.name"
            class="flex flex-col items-center gap-2 px-2 text-center"
          >
            <div
              class="bg-gold-500 ring-indigo-500 relative z-10 h-[140px] w-[140px] rounded-full ring-4"
            />
            <span class="font-display-en text-cream-300 mt-1 text-lg">
              {{ node.name }}
            </span>
            <span
              class="font-body-en text-gold-500 text-[11px] tracking-[0.1em]"
            >
              {{ node.dates }}
            </span>
            <span
              class="font-body-en text-cream-300/70 text-[12px] leading-snug"
            >
              {{ node.role }}
            </span>
          </li>
        </ul>
      </div>

      <p
        class="font-body-en text-gold-500 text-[10px] tracking-[0.18em] md:text-xs"
      >
        BNEI BARUCH · ISRAEL · SINCE 1991
      </p>
    </div>
  </section>
</template>
