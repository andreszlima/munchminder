// Create market from prisma/schema.prisma
"use server";

import prisma from "@/prisma/client";

export async function IndexMarkets() {
    const markets = await prisma.market.findMany({
        select: {
            id: true,
            name: true,
            province: true,
        },
        orderBy: {
            id: "desc",
        },
    });
    return markets;
}
