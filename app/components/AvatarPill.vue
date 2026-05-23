<script setup lang="ts">
withDefaults(
  defineProps<{
    avatars?: { initials: string; bg: string; fg: string }[];
    count?: string;
  }>(),
  {
    avatars: () => [
      { initials: "RP", bg: "bg-gold-500", fg: "text-charcoal-800" },
      { initials: "AS", bg: "bg-saffron-500", fg: "text-charcoal-800" },
      { initials: "NK", bg: "bg-forest-500", fg: "text-cream-300" },
    ],
    count: "12,400+ Indians learning",
  },
);
</script>

<template>
  <div
    class="inline-flex items-center gap-2 rounded-full bg-white/95 px-[14px] py-[6px]"
  >
    <div class="flex h-[22px] items-center">
      <span
        v-for="(a, i) in avatars"
        :key="i"
        class="-mr-[6px] flex h-[22px] w-[22px] items-center justify-center rounded-full text-[9px] font-medium last:mr-0"
        :class="[a.bg, a.fg]"
      >
        {{ a.initials }}
      </span>
    </div>
    <span class="font-body-en text-charcoal-800 text-[12px] font-medium">
      {{ count }}
    </span>
  </div>
</template>
