"use server";

import prisma from "@/prisma/client";

// type of item
type ListId = {
    id: number;
    openList: boolean;
  };
  
  export async function UpdateOpenList(list: ListId) {
  
    // Update the openList field for the list
    const updatedList = await prisma.list.update({
      where: {
        id: list.id,
      },
      data: {
        openList: list.openList,
      },
    });

  }