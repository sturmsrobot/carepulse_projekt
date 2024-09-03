import * as sdk from "node-appwrite";

// export const {
//   PROJECT_ID,
//   API_KEY,
//   DATABASE_ID,
//   PATIENT_COLLECTION_ID,
//   DOCTOR_COLLECTION_ID,
//   APPOINTMENTS_COLLECTION_ID,
//   NEXT_PUBLIC_BUCKET_ID: BUCKET_ID,
//   NEXT_PUBLIC_ENDPOINT: ENDPOINT,
// } = process.env;

// console.log(DATABASE_ID);
// const ENDPOINT = process.env.NEXT_PUBLIC_ENDPOINT;
// console.log(ENDPOINT);

// export const PROJECT_ID = process.env.PROJECT_ID;
// export const API_KEY = process.env.API_KEY;
// export const DATABASE_ID = process.env.DATABASE_ID;
// export const PATIENT_COLLECTION_ID = process.env.PATIENT_COLLECTION_ID;
// export const DOCTOR_COLLECTION_ID = process.env.DOCTOR_COLLECTION_ID;
// export const APPOINTMENTS_COLLECTION_ID =
//   process.env.APPOINTMENTS_COLLECTION_ID;
// export const BUCKET_ID = process.env.BUCKET_ID;
// export const ENDPOINT = process.env.NEXT_PUBLIC_ENDPOINT;

export const PROJECT_ID = "66b2747b0027349ad3f3";
export const API_KEY =
  "6a33cfecfe1bbafc456f69edfb7609807b7c0635575adbad397622e8cdd558f9f9503c1ead0032edb4b97289229b2654fb54da7399936f9ced2529657eb256d9b51c6f5f442fc8e9bd7dd612a4b2263156465b2497f087765c610c9ed005333a8fa30457cc0f982f11397fbac95610f4cdd3909a8f9ee3e69ad6761b77e653009ced2529657eb256d9b51c6f5f442fc8e9bd7dd612a4b2263156465b2497f087765c610c9ed005333a8fa30457cc0f982f11397fbac95610f4cdd3909a8f9ee3e69ad6761b77e65300";
export const DATABASE_ID = "66b2753b001c4d25ab7d";
export const PATIENT_COLLECTION_ID = "66b27577001e2e26de69";
export const DOCTOR_COLLECTION_ID = "66b275ac002eaf511db1";
export const APPOINTMENTS_COLLECTION_ID = "66b275d2002c70f79c91";
export const BUCKET_ID = "66b2761400281151725f";
export const ENDPOINT = "https://cloud.appwrite.io/v1";

console.log(API_KEY);
console.log(PROJECT_ID);

export const corsOptions = {
  origin: "https://cloud.appwrite.io/v1",
  optionsSuccessStatus: 200,
};

const client = new sdk.Client();

client.setEndpoint(ENDPOINT!).setProject(PROJECT_ID!).setKey(API_KEY!);

export const databases = new sdk.Databases(client);
export const storage = new sdk.Storage(client);
export const messaging = new sdk.Messaging(client);
export const users = new sdk.Users(client);
