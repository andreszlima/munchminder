// Create market from prisma/schema.prisma
"use server";

import prisma from "@/prisma/client";

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
