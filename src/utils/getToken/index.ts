"use server";

import { cookies } from "next/headers";

export const getToken = async (): Promise<string | undefined> => {
  const cookieStore = await cookies();

  const token = cookieStore.get("@nextauth.token")?.value;
  
  return token;
};
