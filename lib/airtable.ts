import { AirtableRecordType, CoffeeStoreType } from "@/types";

var Airtable = require("airtable");
var base = new Airtable({ apiKey: process.env.AIRTABLE_TOKEN }).base(
  "appy0bFe3maijLCDv"
);

const table = base("shops");

const getMinifiedRecords = (records: Array<AirtableRecordType>) => {
  return records.map((record: AirtableRecordType) => {
    return {
      recordId: record.id,
      ...record.fields,
    };
  });
};

const findRecordByFilter = async (id: string) => {
  const findRecords = await table
    .select({
      filterByFormula: `id="${id}"`,
    })
    .firstPage();

  return getMinifiedRecords(findRecords);
};

export const createShopRecord = async (shop: CoffeeStoreType, id: string) => {
  const { name, address, votes = 0, imgUrl } = shop;

  try {
    if (id) {
      const records = await findRecordByFilter(id);
      if (records.length === 0) {
        const createRecords = await table.create([
          {
            fields: {
              id,
              name,
              address,
              votes,
              imgUrl,
            },
          },
        ]);
        if (createRecords.length > 0) {
          console.log("Created a store with id", id);
          return getMinifiedRecords(createRecords);
        }
      } else {
        console.log("Coffee store exists");
        return records;
      }
    } else {
      console.error("Store id is missing");
    }
  } catch (error) {
    console.error("Error creating or finding a store", error);
  }
};

export const updateShopRecord = async (id: string) => {
  try {
    if (id) {
      const records = await findRecordByFilter(id);
      if (records.length !== 0) {
        const record = records[0];
        const updatedVote = record.votes + 1;

        const updatedRecords = await table.update([
          {
            id: record.recordId,
            fields: {
              votes: updatedVote,
            },
          },
        ]);

        if (updatedRecords.length > 0) {
          console.log("Created a store with id", id);
          return getMinifiedRecords(updatedRecords);
        }
      } else {
        console.log("Coffee store does not exist");
      }
    } else {
      console.error("Store id is missing");
    }
  } catch (error) {
    console.error("Error upvoting a coffee store", error);
  }
};
