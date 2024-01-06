// Create market from prisma/schema.prisma
"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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
