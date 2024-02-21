"use client";

import React, { useEffect, useState } from "react";
import Banner from "./banner.client";
import useTrackLocation from "@/hooks/useTrackingLocation";
import Card from "./card.server";
import { CoffeeStoreType } from "@/types";
import { fetchCoffeeStores } from "@/lib/shops";

export default function NearbyCShops() {
  const {
    handleTrackingLocation,
    isFindingLocation,
    longLat,
    locationErrorMsg,
  } = useTrackLocation();

  const [shops, setShops] = useState([]);

  const handleOnClick = () => {
    handleTrackingLocation();
  };

  useEffect(() => {
    async function shopsByLocation() {
      if (longLat) {
        try {
          const limit = 12;
          const response = await fetch(
            `/api/getShopsByLocation?longLat=${longLat}&limit=${limit}`
          );
          const shops = await response.json();
          setShops(shops);
        } catch (error) {
          console.error(error);
        }
      }
    }

    shopsByLocation();
  }, [longLat]);

  return (
    <div>
      <Banner
        handleOnClick={handleOnClick}
        buttonText={isFindingLocation ? "Locating..." : "View stores nearby"}
      />
      {locationErrorMsg && <p>Error: {locationErrorMsg}</p>}

      {shops.length > 0 && (
        <div className="mt-20">
          <h2 className="mt-8 pb-8 text-4xl font-bold text-white">
            Stores near me
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-2 lg:grid-cols-3 lg:gap-6">
            {shops.map((coffeeStore: CoffeeStoreType, idx: number) => (
              <Card
                key={`${coffeeStore.name}-${coffeeStore.id}`}
                name={coffeeStore.name}
                imgUrl={coffeeStore.imgUrl}
                href={`/shop/${coffeeStore.id}?idx=${idx}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
