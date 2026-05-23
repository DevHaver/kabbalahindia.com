<script setup lang="ts">
const cols = [
  {
    header: "SITE · साइट",
    links: [
      { label: "Teachers", href: "#teachers" },
      { label: "Program", href: "#program" },
      { label: "Testimonials", href: "#students" },
      { label: "FAQ", href: "#faq" },
      { label: "Join free", href: "#signup" },
    ],
  },
];

const waUrl = useWhatsApp();

const social = computed(() => [
  {
    icon: "i-lucide-youtube",
    href: "https://www.youtube.com/@KabbalahInfo",
    label: "YouTube",
  },
  {
    icon: "i-lucide-message-circle",
    href: waUrl.value,
    label: "WhatsApp",
  },
]);
</script>

<template>
  <footer class="bg-charcoal-800 text-cream-300">
    <div
      class="mx-auto flex max-w-6xl flex-col gap-6 px-8 py-[22px] md:px-12 md:py-20"
    >
      <div class="flex flex-col gap-1">
        <span class="font-display-en text-cream-300 text-[20px] md:text-3xl">
          Kabbalah Academy India
        </span>
        <span class="font-display-hi text-gold-500 text-[15px] md:text-xl">
          कबाला अकादमी, भारत
        </span>
        <span class="font-body-en text-cream-300/60 text-[13px] md:text-base">
          A direct path to self-knowledge.
        </span>
        <span class="font-body-hi text-cream-300/50 text-[12px] md:text-sm">
          अपने आप तक का सीधा रास्ता।
        </span>
        <span class="font-body-en text-cream-300/40 mt-2 text-[11px]">
          In direct association with Bnei Baruch, Israel.
        </span>
      </div>

      <div class="grid grid-cols-2 gap-6 md:gap-10">
        <div
          v-for="col in cols"
          :key="col.header"
          class="flex flex-col gap-[10px]"
        >
          <h3
            class="font-body-en text-gold-500 text-[10px] font-medium tracking-[0.16em]"
          >
            {{ col.header }}
          </h3>
          <a
            v-for="l in col.links"
            :key="l.label"
            :href="l.href"
            class="font-body-en text-cream-300/70 hover:text-cream-300 text-[13px] transition-colors"
          >
            {{ l.label }}
          </a>
        </div>
        <div class="flex flex-col gap-[10px]">
          <h3
            class="font-body-en text-gold-500 text-[10px] font-medium tracking-[0.16em]"
          >
            SOCIAL · सोशल
          </h3>
          <div class="flex items-center gap-4">
            <a
              v-for="s in social"
              :key="s.label"
              :href="s.href"
              target="_blank"
              rel="noopener"
              :aria-label="s.label"
              class="text-gold-500 hover:text-cream-300 transition-colors"
            >
              <UIcon :name="s.icon" class="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>

      <TricolorStrip />

      <p class="font-body-en text-cream-300/45 text-[11px]">
        © 2026 Kabbalah Academy India · A Bnei Baruch India initiative
      </p>
    </div>
  </footer>
</template>
