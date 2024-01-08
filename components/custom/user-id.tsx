"use server";

import { currentUser } from "@clerk/nextjs";
import React from "react";

async function UserId() {
  const user = await currentUser();

  return <div>{user?.firstName}</div>;
}

export default UserId;
