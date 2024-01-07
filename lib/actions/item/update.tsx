// Create market from prisma/schema.prisma
"use server";

import prisma from "@/prisma/client";

// type of market
type Market = {
  id: number;
  name: string;
  province: string;
};

export async function UpdateMarket(market: Market) {
  await prisma.market.update({
    where: {
      id: market.id,
    },
    data: {
      name: market.name,
      province: market.province,
    },
  });
}
