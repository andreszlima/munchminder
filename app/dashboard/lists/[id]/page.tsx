"use client";

import { useParams } from "next/navigation";

export default function ListPage() {
  const params = useParams<{ id: string }>();

  // Route -> /shop/[tag]/[item]
  // URL -> /shop/shoes/nike-air-max-97
  // `params` -> { tag: 'shoes', item: 'nike-air-max-97' }
  console.log(params);

  return (<>
    <h1>List Page</h1>
    <p>Tag: {params.id}</p>
  </>);
}
