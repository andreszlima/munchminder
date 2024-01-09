"use server";

import prisma from "@/prisma/client";

type TypeChecked = {
  id: number;
  selected: boolean;
};

export async function UpdateChecked(formData: TypeChecked) {
  const item = await prisma.listItem.update({
    where: {
      id: formData.id,
    },
    data: {
      selected: formData.selected,
    },
  });
  return item;
}
