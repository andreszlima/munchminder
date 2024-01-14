"use server"

import prisma from "@/prisma/client"

export async function GetItem(id: string) {
    const item = await prisma.item.findUnique({
        where: {
            id: Number(id)
        },
        select: {
            id: true,
            name: true,
            price: true,
            defaultAmount: true,
            tax: true,
            marketId: true,
            imageLink: true,
            createdAt: true,
            updatedAt: true,
        }
    });
    return item;
}