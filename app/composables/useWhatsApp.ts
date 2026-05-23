/**
 * Returns the WhatsApp deep link based on the public runtime config.
 * Set `NUXT_PUBLIC_WHATSAPP_NUMBER=919876543210` (no `+`) in your env.
 */
export const useWhatsApp = (message?: string) => {
  const { public: pub } = useRuntimeConfig();
  const number = pub.whatsappNumber;
  return computed(() => {
    const url = `https://wa.me/${number}`;
    return message ? `${url}?text=${encodeURIComponent(message)}` : url;
  });
};
