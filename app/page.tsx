import Banner from "@/components/banner.client";
import Card from "@/components/card.server";
import NearbyShops from "@/components/nearby-shops.client";
import { fetchCoffeeStores } from "@/lib/shops";
import { CoffeeStoreType } from "@/types";
import { getDomain } from "@/utils/getDomain";
import { Metadata } from "next";

async function getData() {
  const TORONTO_LONG_LAT = "-79.3789680885594%2C43.653833032607096";
  return await fetchCoffeeStores(TORONTO_LONG_LAT, 6);
}

export const metadata: Metadata = {
  title: "Coffee Connoisseur",
  description: "Discover your local coffee shops",
  metadataBase: getDomain(),
  alternates: {
    canonical: "/",
  },
};

export default async function Home() {
  const coffeeStores = await getData();

  return (
    <div className="mb-56">
      <main className="mx-auto mt-10 max-w-6xl px-4">
        <div className="mt-20">
          <NearbyShops />
          <h2 className="mt-8 pb-8 text-4xl font-bold text-white">
            Toronto Stores
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-2 lg:grid-cols-3 lg:gap-6">
            {coffeeStores.map((coffeeStore: CoffeeStoreType, idx: number) => (
              <Card
                key={`${coffeeStore.name}-${coffeeStore.id}`}
                name={coffeeStore.name}
                imgUrl={coffeeStore.imgUrl}
                href={`/shop/${coffeeStore.id}?id=${idx}`}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
