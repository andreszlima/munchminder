"use server"

import prisma from "@/prisma/client"

export async function GetListName(listId: number){
    const list = await prisma.list.findFirst({
        select: {
            name: true,
        },
        where: {
            id: listId,
        },
    });
    return list?.name ? list.name : "Shopping list";
}