"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { debounce } from "lodash";
import { Item } from "@/lib/types";

export default function SearchItems() {

    const [items, setItems] = useState<Item[]>([]);

  function handleSearch(term: string) {

    debouncedUpdate(term);
    
  }

  const debouncedUpdate = debounce((text: string) => {

  }, 500);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Search item</CardTitle>
      </CardHeader>
      <CardContent>
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <Input
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
        />
      </CardContent>
    </Card>
  );
}
