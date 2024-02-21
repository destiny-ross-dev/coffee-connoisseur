"use server";

import { updateShopRecord } from "@/lib/airtable";

export const upvoteAction = async (prevState: { id: string }) => {
  const { id } = prevState;

  const data = await updateShopRecord(id);
  console.log({ data });

  if (data) {
    return {
      votes: data.length > 0 ? data[0].votes : 0,
      id,
    };
  }
};
