<script setup lang="ts">
withDefaults(
  defineProps<{
    enLines: string[];
    hi?: string;
    size?: "sm" | "md" | "lg" | "xl";
    tone?: "on-light" | "on-dark" | "on-maroon";
    accentIndex?: number;
  }>(),
  {
    hi: "",
    size: "lg",
    tone: "on-light",
    accentIndex: -1,
  },
);

const enSizes = {
  sm: "text-[22px] md:text-[28px]",
  md: "text-[26px] md:text-[36px]",
  lg: "text-[28px] md:text-[44px]",
  xl: "text-[32px] md:text-[56px]",
};

const hiSizes = {
  sm: "text-[16px] md:text-[20px]",
  md: "text-[18px] md:text-[24px]",
  lg: "text-[18px] md:text-[28px]",
  xl: "text-[22px] md:text-[32px]",
};

const toneClass = {
  "on-light": "text-indigo-500",
  "on-dark": "text-cream-300",
  "on-maroon": "text-cream-300",
};

const accentClass = {
  "on-light": "text-maroon-500",
  "on-dark": "text-gold-500",
  "on-maroon": "text-gold-500",
};

const hiClass = {
  "on-light": "text-charcoal-500",
  "on-dark": "text-cream-300/75",
  "on-maroon": "text-gold-500",
};
</script>

<template>
  <div class="flex flex-col gap-[6px]">
    <h2 :class="['font-display-en text-balance leading-[1.05]', enSizes[size]]">
      <span
        v-for="(line, i) in enLines"
        :key="i"
        class="block"
        :class="i === accentIndex ? accentClass[tone] : toneClass[tone]"
      >
        {{ line }}
      </span>
    </h2>
    <p
      v-if="hi"
      :class="['font-display-hi text-pretty', hiSizes[size], hiClass[tone]]"
    >
      {{ hi }}
    </p>
  </div>
</template>
