"use server";

import prisma from "@/prisma/client"

export async function IndexLists(userSelection: string){
    const lists = await prisma.list.findMany({
        select: {
            id: true,
            name: true,
            userId: true,
        },
        where: {
            userId: userSelection,
        },
        orderBy: {
            id: "desc",
        },
    });
    return lists;
}

