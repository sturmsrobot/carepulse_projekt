import z from "zod";

export const UserFormValidation = z.object({
  name: z
    .string()
    .min(2, "Der Benutzername muss mindestens 2 Zeichen lang sein.")
    .max(50, "Der Benutzername darf maximal 50 Zeichen lang sein."),
  email: z.string().email("Die E-Mail-Adresse ist ungültig."),
  phone: z
    .string()
    .refine(
      (phone) => /^\+\d{10,15}$/.test(phone),
      "Die Telefonnummer ist ungültig."
    ),
});
