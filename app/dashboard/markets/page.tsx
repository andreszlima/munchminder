"use client";

import { useEffect, useState } from "react";
import { CreateMarket } from "@/lib/actions/market/create";
import { IndexMarkets } from "@/lib/actions/market";
import NewMarket from "@/components/custom/market/new-market";
import AllMarkets from "@/components/custom/market/all-markets";

import {
  Card,
  CardContent,
  CardDescription, CardHeader,
  CardTitle
} from "@/components/ui/card";

type Market = {
  id: number;
  name: string;
  province: string;
};

type NewMarket = {
  name: string;
  province: string;
};

function MarketsPage() {
  const [markets, setMarkets] = useState<Market[]>([]);

  const fetchMarkets = async () => {
    const data = await IndexMarkets();
    setMarkets(data);
  };

  const handleCreateMarket = async (market: NewMarket) => {
    await CreateMarket(market);
    fetchMarkets();
  };

  useEffect(() => {
    fetchMarkets();
  }, []);

  return (
    <div>
      <div className="flex justify-center p-8">
        <Card>
          <CardHeader>
            <CardTitle>New market</CardTitle>
            <CardDescription>
              Add a new market to have items assigned to
            </CardDescription>
          </CardHeader>
          <CardContent>
            <NewMarket action={handleCreateMarket} />
          </CardContent>
        </Card>
      </div>
      <div className="p-8">
        <AllMarkets markets={markets} fetchMarkets={fetchMarkets} />
      </div>
    </div>
  );
}

export default MarketsPage;
