"use server";

import { google } from "googleapis";

export async function getConsentScreenUri() {
  const oauth = new google.auth.OAuth2({
    clientId: process.env.GOOGLE_CLOUD_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLOUD_CLIENT_SECRET,
    redirectUri: `http://localhost:3000/api/auth/callback`,
  });

  return oauth.generateAuthUrl({
    access_type: "offline",
    response_type: "code",
    scope: [
      "https://www.googleapis.com/auth/documents",
      "https://www.googleapis.com/auth/drive",
      "https://mail.google.com",
    ],
  });
}
