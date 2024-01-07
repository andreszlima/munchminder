// Create market from prisma/schema.prisma
"use server";

import prisma from "@/prisma/client";

// type of market
type Market = {
  name: string;
  province: string;
};

export async function CreateMarket(market: Market) {
  await prisma.market.create({
    data: {
      name: market.name,
      province: market.province,
    },
  });
}
