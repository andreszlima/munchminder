// Create market from prisma/schema.prisma
"use server";

import prisma from "@/prisma/client";
import lodash from "lodash";

export async function IndexItems() {
    const items = await prisma.item.findMany({
        select: {
            id: true,
            name: true,
            price: true,
            defaultAmount: true,
            tax: true,
            marketId: true,
            market: {
                select: {
                    name: true,
                },
            },
            imageLink: true,
        },
    });

    const orderedItems = lodash.sortBy(items, ["market.name", "name"], ["asc", "asc"])

    return orderedItems;
}
