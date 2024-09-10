export const GenderOptions = ["Männlich", "Weiblich"];

export const PatientFormDefaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  birthDate: new Date(Date.now()),
  gender: "Male" as Gender,
  address: "",
  occupation: "",
  emergencyContactName: "",
  emergencyContactNumber: "",
  primaryPhysician: "",
  insuranceProvider: "",
  insurancePolicyNumber: "",
  allergies: "",
  currentMedication: "",
  familyMedicalHistory: "",
  pastMedicalHistory: "",
  identificationType: "Birth Certificate",
  identificationNumber: "",
  identificationDocument: [],
  treatmentConsent: false,
  disclosureConsent: false,
  privacyConsent: false,
};

export const IdentificationTypes = [
  "Geburtsurkunde",
  "Führerschein",
  "Krankenversicherungskarte",
  "Militärausweis",
  "Personalausweis",
  "Reisepass",
  "Aufenthaltsgenehmigung",
  "Sozialversicherungskarte",
  "Studentenausweis",
];

export const Doctors = [
  {
    image: "/assets/images/dr-green.png",
    name: "Prof. Dr. med. Max Müller",
  },
  {
    image: "/assets/images/dr-cameron.png",
    name: "Prof. Dr. med. Anna Schmitz",
  },
  {
    image: "/assets/images/dr-livingston.png",
    name: "Dr. med. Peter Wagner, MSc",
  },
  {
    image: "/assets/images/dr-peter.png",
    name: "Dr. med. Thomas Schneider, MSc",
  },
  {
    image: "/assets/images/dr-powell.png",
    name: "Dr. med. Lisa Meier, PhD",
  },
  {
    image: "/assets/images/dr-remirez.png",
    name: "Dr. med. Klaus Fischer, PhD",
  },
  {
    image: "/assets/images/dr-lee.png",
    name: "Dr. med. Maria Hoffmann, MSc",
  },
  {
    image: "/assets/images/dr-cruz.png",
    name: "Dr. med. Sabine Becker, Prof. Dr. med.",
  },
  {
    image: "/assets/images/dr-sharma.png",
    name: "Dr. Julian Weber",
  },
];

export const StatusIcon = {
  scheduled: "/assets/icons/check.svg",
  pending: "/assets/icons/pending.svg",
  cancelled: "/assets/icons/cancelled.svg",
};
