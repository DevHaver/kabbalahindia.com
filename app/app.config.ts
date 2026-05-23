export default defineAppConfig({
  ui: {
    colors: {
      primary: "saffron",
      neutral: "charcoal",
    },
    button: {
      slots: {
        base: "font-body-en font-medium rounded-full",
      },
      defaultVariants: {
        size: "lg",
        color: "primary",
      },
    },
    input: {
      slots: {
        base: "font-body-en rounded-[10px] bg-white",
      },
    },
    formField: {
      slots: {
        label:
          "font-body-en text-maroon-500 text-[9px] font-medium tracking-[0.16em] uppercase",
      },
    },
    accordion: {
      slots: {
        item: "border-border-maroon border-b last:border-b-0",
        trigger: "font-body-en text-indigo-500 font-medium py-4",
        content: "font-body-en text-charcoal-700 pb-4",
      },
    },
    badge: {
      slots: {
        base: "font-body-en font-medium rounded-full",
      },
    },
  },
});
