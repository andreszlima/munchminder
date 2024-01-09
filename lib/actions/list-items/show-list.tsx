// Create market from prisma/schema.prisma
"use server";

import prisma from "@/prisma/client";

export async function ShowListItems(listId: number) {
    const listItems = await prisma.listItem.findMany({
        select: {
            id: true,
            listId: true,
            itemId: true,
            amount: true,
            newPrice: true,
            item: {
                select: {
                    name: true,
                    price: true,
                },
            },
        },
        where: {
            listId: listId,
        },
        orderBy: {
            updatedAt: "desc",
        },
    });
    return listItems;
}
