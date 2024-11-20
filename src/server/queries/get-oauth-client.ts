"use server";
import { cookies } from "next/headers";
import { google } from "googleapis";

export async function getOAu2hClient() {
  const cookieStore = await cookies();
  const access_token = cookieStore.get("access_token")?.value;
  const refresh_token = cookieStore.get("refresh_token")?.value;

  if (!access_token) {
    throw new Error("No access token found");
  }

  if (!refresh_token) {
    throw new Error("No refresh token found");
  }

  const oauth2 = new google.auth.OAuth2({
    clientId: process.env.GOOGLE_CLOUD_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLOUD_CLIENT_SECRET,
    redirectUri: `http://localhost:3000/api/auth/callback`,
  });

  oauth2.setCredentials({
    access_token: access_token,
    refresh_token: refresh_token,
  });

  return oauth2;
}
