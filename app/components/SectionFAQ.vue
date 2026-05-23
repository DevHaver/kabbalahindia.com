<script setup lang="ts">
import type { AccordionItem } from "@nuxt/ui";

const faqs: AccordionItem[] = [
  {
    label: "Is this really free?",
    content:
      "Yes — completely. No fees, no premium tier, no card on file. Bnei Baruch is funded by donations from people who have already studied. You receive what you receive.",
  },
  {
    label: "Do I need to know anything in advance?",
    content:
      "Not at all. We start from zero. No Hebrew, no Jewish background, no prior reading is required to learn Kabbalah.",
  },
  {
    label: "Is this connected to Hinduism or my own religion?",
    content:
      "Kabbalah is the science of how we connect — it sits underneath every religion, not over them. Hindus, Muslims, Christians, Sikhs, atheists all study together. You keep your own practice.",
  },
  {
    label: "How much time per week?",
    content:
      "Plan on about 3–4 hours per week for the foundations course. One live morning lesson (60 min, recorded), plus reading and a small group call. You set the pace.",
  },
  {
    label: "Who is Dr. Michael Laitman?",
    content: `A Russian-born scientist who became the personal student and successor of Rabash (Baal HaSulam's son). He has taught the authentic Kabbalah method since 1979 and leads Bnei Baruch from Israel.`,
  },
  {
    label: "Do I have to convert to Judaism?",
    content: `No. Kabbalah doesn't ask you to convert to any religion. You stay who you are. This is purely a study.`,
  },
  {
    label: "How are the live lessons run? In English or Hindi?",
    content:
      "Both. We have separate live cohorts in English and Hindi. Most teachers are bilingual. You can also watch any lesson with subtitles after.",
  },
  {
    label: "Is there a paid version after the free one?",
    content:
      "No. There is no paid tier — not now, not later. Every course, lesson, book, and gathering is free, forever. We rely on donations from past students who want to keep this going.",
  },
];
</script>

<template>
  <section id="faq" class="bg-cream-300">
    <div class="mx-auto flex max-w-3xl flex-col gap-[22px] px-8 py-12 md:py-20">
      <Eyebrow text="COMMON QUESTIONS · आम सवाल" tone="maroon" />
      <BilingualHeading
        :en-lines="[`Everything you'd want to ask`, 'before you start.']"
        hi="शुरू करने से पहले — हर सवाल जो आपके मन में है।"
        :accent-index="1"
        size="sm"
      />

      <UAccordion
        :items="faqs"
        :default-value="faqs[0]!.label"
        :ui="{
          root: 'ring-border-maroon rounded-[12px] bg-white ring-1 divide-y divide-border-maroon',
          item: '',
          trigger:
            'font-body-en text-indigo-500 text-[15px] md:text-base font-medium py-4 px-[14px] md:px-6 text-left',
          content: 'pb-4 px-[14px] md:px-6',
          body: 'font-body-en text-charcoal-700 text-[14px] md:text-base leading-relaxed pb-2',
          trailingIcon: 'text-maroon-500 size-[18px] shrink-0',
        }"
      >
        <template #trailing="{ open }">
          <UIcon
            :name="open ? 'i-lucide-minus' : 'i-lucide-plus'"
            class="text-maroon-500 size-[18px] shrink-0"
          />
        </template>
      </UAccordion>

      <div
        class="bg-forest-500/10 flex items-start gap-2 rounded-[10px] p-[14px]"
      >
        <UIcon
          name="i-lucide-message-circle"
          class="text-forest-500 mt-[2px] h-4 w-4 shrink-0"
        />
        <p class="font-body-en text-charcoal-700 text-[12px] md:text-sm">
          Other questions? WhatsApp us — a real teacher replies, usually within
          an hour.
        </p>
      </div>
    </div>
  </section>
</template>
