import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DestroyMarket } from "@/lib/actions/market/destroy";
import React, { useEffect, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { debounce } from "lodash";
import { UpdateMarket } from "@/lib/actions/market/update";

type Market = {
  id: number;
  name: string;
  province: string;
};

type AllMarketsProps = {
  markets: Market[];
  fetchMarkets: () => Promise<void>; // Add this line
};

export default function AllMarkets({ markets, fetchMarkets }: AllMarketsProps) {
  async function handleDestroy(market: Market) {
    await DestroyMarket(market);
    fetchMarkets(); // Update the markets after a market is deleted
  }

  const [marketState, setMarketState] = useState(markets);

  // Add this useEffect hook
  useEffect(() => {
    setMarketState(markets);
  }, [markets]);

  const handleInputChange = (id: number, field: string, value: string) => {
    const newMarketState = marketState.map((market) => {
      if (market.id === id) {
        return { ...market, [field]: value };
      }
      return market;
    });
    setMarketState(newMarketState);

    const market = newMarketState.find((market) => market.id === id);
    if (market) {
      debouncedUpdate(market.id, market.name, market.province);
    }
  };

  const debouncedUpdate = debounce(
    (id: number, newName: string, newProvince: string) => {
      // Do something with the new name
      UpdateMarket({ id, name: newName, province: newProvince });
    },
    2000
  );

  return (
    <div className="flex flex-row">
      <div className="flex flex-1 w-32"></div>
      <div className="flex flex-auto w-64">
        <Table>
          <TableCaption>List of markets</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Market name</TableHead>
              <TableHead className="text-center">Province</TableHead>
              <TableHead className="text-center">Remove market</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {marketState.map((market) => (
              <TableRow key={market.id}>
                <TableCell>
                  <Input
                    type="text"
                    value={market.name}
                    onChange={(e) =>
                      handleInputChange(market.id, "name", e.target.value)
                    }
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="text"
                    value={market.province}
                    onChange={(e) =>
                      handleInputChange(market.id, "province", e.target.value)
                    }
                  />
                </TableCell>
                <TableCell>
                  <div className="flex justify-center">
                    <IoCloseSharp
                      className="hover:text-red-600 hover:cursor-pointer text-2xl"
                      onClick={() => handleDestroy(market)}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex flex-1 w-32"></div>
    </div>
  );
}
