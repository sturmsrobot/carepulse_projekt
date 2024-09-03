import { ID, Query } from "node-appwrite";
import { users } from "../appwrite.config";
import { parseStringify } from "../utils";

export const createUser = async (user: CreateUserParams) => {
  try {
    const newuser = await users.create(
      ID.unique(),
      user.email,
      user.phone,
      undefined,
      user.name
    );
    return parseStringify(newuser);
  } catch (error: any) {
    // Checking existing user
    if (error && error?.code == 409) {
      const document = await users.list([Query.equal("email", [user.email])]);

      return document?.users[0];
    }
    console.error("An error occured while creating a new user:", error);
  }
};

export default createUser;
