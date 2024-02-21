"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.log(error);
  }, [error]);

  return (
    <div className="m-12 p-12 text-white">
      <h2 className="text-3xl">Something went wrong</h2>
      <p className="p-2">
        You need to configure your environment variables, check the Readne.md
        file.
      </p>
      <p className="p-2">
        The environment variables are MAPBOX_API, UNSPLASH_ACCESS_KEY and
        AIRTABLE_TOKEN. Create these environment values inside a .env.local
        file.
      </p>
      <p>{error.message}</p>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
