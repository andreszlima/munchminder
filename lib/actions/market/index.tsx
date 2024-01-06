// Create market from prisma/schema.prisma
"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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
