<script setup lang="ts">
type Tone = "gold" | "maroon" | "saffron" | "cream";

const props = withDefaults(
  defineProps<{
    text: string;
    tone?: Tone;
  }>(),
  { tone: "gold" },
);

const toneClass: Record<Tone, string> = {
  gold: "text-gold-500",
  maroon: "text-maroon-500",
  saffron: "text-saffron-500",
  cream: "text-cream-300",
};

const ruleClass: Record<Tone, string> = {
  gold: "bg-gold-500",
  maroon: "bg-maroon-500",
  saffron: "bg-saffron-500",
  cream: "bg-cream-300",
};
</script>

<template>
  <div class="flex items-center gap-[10px]">
    <span class="h-px w-[22px]" :class="ruleClass[props.tone]" />
    <span
      class="font-body-en text-[10px] font-medium uppercase"
      :class="toneClass[props.tone]"
      style="letter-spacing: 0.18em"
    >
      {{ props.text }}
    </span>
  </div>
</template>
