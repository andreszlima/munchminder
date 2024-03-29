// Create market from prisma/schema.prisma
"use server";

import prisma from "@/prisma/client";

export async function IndexMarkets() {
    const markets = await prisma.market.findMany({
        select: {
            id: true,
            name: true,
            province: true,
            updatedAt: true,
        },
        orderBy: {
            updatedAt: "desc",
        },
    });
    return markets;
}
