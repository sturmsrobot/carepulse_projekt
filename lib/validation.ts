import { z } from "zod";

export const UserFormValidation = z.object({
  name: z
    .string()
    .min(2, "Der Name muss mindestens 2 Zeichen lang sein")
    .max(50, "Der Name darf höchstens 50 Zeichen lang sein"),
  email: z.string().email("Ungültige E-Mail-Adresse"),
  phone: z
    .string()
    .refine((phone) => /^\+\d{10,15}$/.test(phone), "Ungültige Telefonnummer"),
});

export const PatientFormValidation = z.object({
  name: z
    .string()
    .min(2, "Der Name muss mindestens 2 Zeichen lang sein")
    .max(50, "Der Name darf höchstens 50 Zeichen lang sein"),
  email: z.string().email("Ungültige E-Mail-Adresse"),
  phone: z
    .string()
    .refine((phone) => /^\+\d{10,15}$/.test(phone), "Ungültige Telefonnummer"),
  birthDate: z.coerce.date(),
  gender: z.enum(["Männlich", "Weiblich"]),
  address: z
    .string()
    .min(5, "Die Adresse muss mindestens 5 Zeichen lang sein")
    .max(500, "Die Adresse darf höchstens 500 Zeichen lang sein"),
  occupation: z
    .string()
    .min(2, "Der Beruf muss mindestens 2 Zeichen lang sein")
    .max(500, "Der Beruf darf höchstens 500 Zeichen lang sein"),
  emergencyContactName: z
    .string()
    .min(2, "Der Name des Notfallkontakts muss mindestens 2 Zeichen lang sein")
    .max(
      50,
      "Der Name des Notfallkontakts darf höchstens 50 Zeichen lang sein"
    ),
  emergencyContactNumber: z
    .string()
    .refine(
      (emergencyContactNumber) => /^\+\d{10,15}$/.test(emergencyContactNumber),
      "Ungültige Telefonnummer"
    ),
  primaryPhysician: z.string().min(2, "Wählen Sie mindestens einen Arzt aus"),
  insuranceProvider: z
    .string()
    .min(2, "Der Versicherungsname muss mindestens 2 Zeichen lang sein")
    .max(50, "Der Versicherungsname darf höchstens 50 Zeichen lang sein"),
  insurancePolicyNumber: z
    .string()
    .min(2, "Die Policennummer muss mindestens 2 Zeichen lang sein")
    .max(50, "Die Policennummer darf höchstens 50 Zeichen lang sein"),
  allergies: z.string().optional(),
  currentMedication: z.string().optional(),
  familyMedicalHistory: z.string().optional(),
  pastMedicalHistory: z.string().optional(),
  identificationType: z.string().optional(),
  identificationNumber: z.string().optional(),
  identificationDocument: z.custom<File[]>().optional(),
  treatmentConsent: z
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message: "Sie müssen der Behandlung zustimmen, um fortzufahren",
    }),
  disclosureConsent: z
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message: "Sie müssen der Offenlegung zustimmen, um fortzufahren",
    }),
  privacyConsent: z
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message:
        "Sie müssen der Datenschutzrichtlinie zustimmen, um fortzufahren",
    }),
});

export const CreateAppointmentSchema = z.object({
  // primaryPhysician: z.string().min(2, "Wählen Sie mindestens einen Arzt aus"),
  schedule: z.coerce.date(),
  reason: z
    .string()
    .min(2, "Der Grund muss mindestens 2 Zeichen lang sein")
    .max(500, "Der Grund darf höchstens 500 Zeichen lang sein"),
  note: z.string().optional(),
  cancellationReason: z.string().optional(),
});

export const ScheduleAppointmentSchema = z.object({
  // primaryPhysician: z.string().min(2, "Wählen Sie mindestens einen Arzt aus"),
  schedule: z.coerce.date(),
  reason: z.string().optional(),
  note: z.string().optional(),
  cancellationReason: z.string().optional(),
});

export const CancelAppointmentSchema = z.object({
  // primaryPhysician: z.string().min(2, "Wählen Sie mindestens einen Arzt aus"),
  schedule: z.coerce.date(),
  reason: z.string().optional(),
  note: z.string().optional(),
  cancellationReason: z
    .string()
    .min(2, "Der Grund muss mindestens 2 Zeichen lang sein")
    .max(500, "Der Grund darf höchstens 500 Zeichen lang sein"),
});

export function getAppointmentSchema(type: string) {
  switch (type) {
    case "create":
      return CreateAppointmentSchema;
    case "cancel":
      return CancelAppointmentSchema;
    default:
      return ScheduleAppointmentSchema;
  }
}
