export const contactConfig = {
  emailAddress: "t9110001@gmail.com",
  whatsAppHref: "https://wa.me/8615024159685",
  facebookHref: "",
  facebookMessengerHref: ""
};

export const hasEmail = Boolean(
  contactConfig.emailAddress && !contactConfig.emailAddress.includes("REPLACE_WITH")
);

export const hasWhatsApp = Boolean(contactConfig.whatsAppHref);
export const hasFacebook = Boolean(contactConfig.facebookHref);
export const hasMessenger = Boolean(contactConfig.facebookMessengerHref);
