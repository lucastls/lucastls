"use client";

import { useActionState } from "react";
import { unlockAlbum } from "@/app/natal-2022/actions";
import { Arrow } from "./icons";

export function AlbumPasswordForm() {
  const [state, action, pending] = useActionState(unlockAlbum, { error: "" });
  return (
    <form className="private-form" action={action}>
      <label htmlFor="album-password">Album password</label>
      <input
        type="password"
        name="password"
        id="album-password"
        autoComplete="current-password"
        required
        maxLength={256}
        aria-invalid={Boolean(state.error)}
        aria-describedby={state.error ? "password-error" : undefined}
      />
      {state.error && (
        <p className="form-error" id="password-error" role="alert">
          {state.error}
        </p>
      )}
      <button className="solid-button" type="submit" disabled={pending}>
        {pending ? "Opening album…" : "Open the album"}
        <Arrow />
      </button>
    </form>
  );
}
