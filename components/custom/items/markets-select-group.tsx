import { SelectContent, SelectGroup, SelectItem } from "@/components/ui/select";
import React, { useEffect, useState } from "react";

export default function MarketsSelect({markets, fetchMarkets, onMarketSelect}: any) {

    const [marketState, setMarketState] = useState(markets);

    const handleMarketSelect = (marketId: number) => {
        onMarketSelect(marketId);
      };

    useEffect(() => {
        setMarketState(markets);
      }, [markets]);

  return (
        <>
            {
                marketState.map((market: any) => {
                    return <SelectItem key={market.id} value={String(market.id)}>{market.name.toString()}</SelectItem>
                })
            }
        </>
  );
}
