import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DestroyListItem } from "@/lib/actions/list-items/destroy";
import { UpdateChecked } from "@/lib/actions/list-items/updateChecked";
import lodash from "lodash";
import { IoCloseSharp } from "react-icons/io5";

type ListItem = {
  id: number;
  listId: number;
  itemId: number;
  amount: number;
  newPrice: number;
  selected: boolean;
  item: {
    name: string;
    price: number;
    market: {
      name: string;
    };
  };
};

type AllProps = {
  items: ListItem[] | undefined;
  fetchListItems: () => void;
};

type TypeChecked = {
  id: number;
  selected: boolean;
};

export default function FullTable({ items, fetchListItems }: AllProps) {
  // Sum all item's newPrices
  const sum = items
    ?.map((item) => item.newPrice * item.amount)
    .reduce((a, b) => a + b, 0)
    .toFixed(2);

  let summed = lodash(items)
    .groupBy("item.market.name")
    .map((objs, key) => ({
      market: key,
      totalprice: lodash(objs).sumBy((o) => o.newPrice * o.amount),
      checkedTotal: lodash(objs)
        .filter("selected")
        .sumBy((o) => o.newPrice * o.amount),
    }))
    .value();

  // Destroy item
  async function handleDestroy(item: ListItem) {
    await DestroyListItem(item);
    fetchListItems(); // Update the markets after a market is deleted
  }

  async function updateSelected(item: TypeChecked) {
    await UpdateChecked(item);
    fetchListItems(); // Update the markets after a market is deleted
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <div>Total price: ${sum}</div>
        {
          // @ts-ignore
          summed?.map((item) => (
            <div key={item.market} className="">
              <span className="font-bold">{item.market}</span> - Total: $
              {item.totalprice.toFixed(2)} | Checked: $
              {item.checkedTotal.toFixed(2)}
            </div>
          ))
        }
      </div>
      <Table>
        <TableCaption className="p-3">
          {/* <div>
            <div>Total price: ${sum}</div>
            {
              // @ts-ignore
              summed?.map((item) => (
                <div key={item.market}>
                  <span className="font-bold">{item.market}</span> - Total: $
                  {item.totalprice.toFixed(2)} | Checked: $
                  {item.checkedTotal.toFixed(2)}
                </div>
              ))
            }
          </div> */}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">Market</TableHead>
            <TableHead className="text-center">Chk</TableHead>
            <TableHead className="text-center">Item</TableHead>
            <TableHead className="text-center">Qty</TableHead>
            <TableHead className="text-center">Price</TableHead>
            <TableHead className="text-center">Remove</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items?.map((item) => (
            <TableRow
              key={item.id}
              onClick={() => {
                const checked: TypeChecked = {
                  id: item.id,
                  selected: !item.selected,
                };
                updateSelected(checked);
              }}
            >
              <TableCell>{item.item.market.name}</TableCell>
              <TableCell className="">
                <Checkbox
                  checked={item.selected}
                  className="flex"
                  id={item.id.toString()}
                  onCheckedChange={(a) => {
                    const checked: TypeChecked = {
                      id: item.id,
                      selected: a as boolean,
                    };
                    updateSelected(checked);
                  }}
                />
              </TableCell>
              <TableCell className="">{item.item.name}</TableCell>
              <TableCell>{item.amount}</TableCell>
              <TableCell>{"Unit price: $" + item.newPrice + " - Total: $" + item.amount*item.newPrice}</TableCell>
              <TableCell className="flex justify-center">
                <div className="flex justify-center">
                  <IoCloseSharp
                    className="hover:text-red-600 hover:cursor-pointer text-2xl"
                    onClick={(e: any) => {
                      e.stopPropagation(); // Prevent the TableRow onClick event from firing
                      handleDestroy(item);
                    }}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
