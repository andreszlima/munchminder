import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IndexMarkets } from "@/lib/actions/market";
import React, { useEffect, useState } from "react";

export default function MarketsSelect({
  markets,
  fetchMarkets,
  onMarketSelect,
}: any) {
  const [marketState, setMarketState] = useState(markets);
  useEffect(() => {
    setMarketState(markets);
  }, [markets]);

  const handleMarketSelect = (marketId: number) => {
    onMarketSelect(marketId);
  };

  

  return (
    <>
      {marketState.map((market: any) => (
        <SelectItem
          key={market.id}
          value={market.id.toString()}
          onSelect={() => handleMarketSelect(market.id)}
        >
          {market.name}
        </SelectItem>
      ))}
    </>
  );
}
