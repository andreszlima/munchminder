// Create market from prisma/schema.prisma
"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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
