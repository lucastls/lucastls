import "server-only";
import {
  createHash,
  createHmac,
  randomBytes,
  timingSafeEqual,
} from "node:crypto";
import { cookies } from "next/headers";

export const albumCookie = "lucastls-album";
export const sessionDuration = 60 * 60 * 24;

export function matchesPassword(candidate: string, password: string) {
  return timingSafeEqual(
    createHash("sha256").update(candidate).digest(),
    createHash("sha256").update(password).digest(),
  );
}

export function createSession(password: string) {
  const expires = Math.floor(Date.now() / 1000) + sessionDuration;
  const payload = `${expires}.${randomBytes(16).toString("hex")}`;
  return `${payload}.${createHmac("sha256", password).update(payload).digest("hex")}`;
}

export async function hasAlbumSession() {
  const password = process.env.NATAL_PASSWORD;
  const value = (await cookies()).get(albumCookie)?.value;
  if (!password || !value) return false;
  const [expires, nonce, signature, extra] = value.split(".");
  const now = Math.floor(Date.now() / 1000);
  if (
    extra ||
    !/^\d+$/.test(expires || "") ||
    !/^[a-f0-9]{32}$/.test(nonce || "") ||
    !/^[a-f0-9]{64}$/.test(signature || "")
  )
    return false;
  if (Number(expires) <= now || Number(expires) > now + sessionDuration)
    return false;
  const expected = createHmac("sha256", password)
    .update(`${expires}.${nonce}`)
    .digest("hex");
  return timingSafeEqual(
    Buffer.from(signature, "hex"),
    Buffer.from(expected, "hex"),
  );
}
