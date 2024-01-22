"use server";

import prisma from "@/prisma/client";

// type of item
type ListName = {
    id: number;
    name: string;
  };
  
  export async function UpdateListName(list: ListName) {
  
    // Update the openList field for the list
    const updatedList = await prisma.list.update({
      where: {
        id: list.id,
      },
      data: {
        name: list.name,
      },
    });

  }