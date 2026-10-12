"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  albumCookie,
  createSession,
  matchesPassword,
  sessionDuration,
} from "@/lib/album-session";

export async function unlockAlbum(
  _previous: { error: string },
  formData: FormData,
): Promise<{ error: string }> {
  const password = process.env.NATAL_PASSWORD;
  if (!password)
    return {
      error: "This album isn’t available just yet. Please check back later.",
    };
  const candidate = formData.get("password");
  if (
    typeof candidate !== "string" ||
    candidate.length > 256 ||
    !matchesPassword(candidate, password)
  ) {
    return { error: "That password doesn’t look right. Please try again." };
  }
  (await cookies()).set(albumCookie, createSession(password), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/natal-2022",
    maxAge: sessionDuration,
  });
  redirect("/natal-2022");
}

export async function lockAlbum() {
  (await cookies()).set(albumCookie, "", {
    path: "/natal-2022",
    maxAge: 0,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  redirect("/natal-2022");
}
