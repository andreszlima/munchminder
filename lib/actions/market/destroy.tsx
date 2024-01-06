// Create market from prisma/schema.prisma
"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// type of market
type Market = {
  id: number
};

export async function DestroyMarket(market: Market) {
  await prisma.market.delete({
    where: {
      id: market.id,
    },
  });
}
