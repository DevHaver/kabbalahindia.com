/**
 * Returns the WhatsApp destination URL from public runtime config.
 *
 * Set `NUXT_PUBLIC_WHATSAPP_URL` to either:
 *   - a group invite — `https://chat.whatsapp.com/XXXXX`
 *   - a 1:1 deep link — `https://wa.me/919876543210`
 *
 * The composable just returns the value verbatim; consumers don't need to
 * know which shape it is.
 */
export const useWhatsApp = () => {
  const { public: pub } = useRuntimeConfig();
  return computed(() => pub.whatsappUrl);
};
