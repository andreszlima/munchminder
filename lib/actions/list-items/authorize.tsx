"use server";

import prisma from "@/prisma/client";

export async function Authorize({
  listId,
  userId,
}: {
  listId: number;
  userId: string;
}) {
  const authorize = await prisma.list.findUnique({
    where: {
      id: listId,
    },
    select: {
      userId: true,
      openList: true,
    },
  });
  return authorize?.userId === userId || authorize?.openList === true;
}
