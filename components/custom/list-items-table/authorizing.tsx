"use client";

import { Authorize } from '@/lib/actions/list-items/authorize';
import { useParams } from 'next/navigation';
import React from 'react'

function Authorizer() {
    const params = useParams<{ id: string }>();
  
  Authorize({
    listId: parseInt(params.id),
    userId: "1",
  });
  return (
    params.id
  )
}

export default Authorizer
