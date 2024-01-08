// Create market from prisma/schema.prisma
"use server";

import prisma from "@/prisma/client";

export async function IndexItems() {
    const markets = await prisma.item.findMany({
        select: {
            id: true,
            name: true,
            price: true,
            defaultAmount: true,
            tax: true,
            marketId: true,
            imageLink: true,
        },
        orderBy: {
            id: "desc",
        },
    });
    return markets;
}
