import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DestroyList } from "@/lib/actions/list/destroy";
import { UpdateOpenList } from "@/lib/actions/list/open-list";
import Link from "next/link";
import React, { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";

type List = {
  id: number;
  name: string;
  userId: string;
  openList: boolean;
};

type ListId = {
  id: number;
  openList: boolean;
};

type AllListProps = {
  lists: List[];
  getUpdatedLists: () => Promise<void>;
};

function MyLists({ lists, getUpdatedLists }: AllListProps) {
  const handleDestroy = async (list: List) => {
    await DestroyList(list);
    getUpdatedLists();
  };

  const handleChangeOpenList = async (list: ListId) => {
    await UpdateOpenList(list);
    getUpdatedLists();
  };

  return (
    <div className="flex flex-row">
      <div className="flex flex-1 w-32"></div>
      <div className="flex flex-auto w-64">
        <Table>
          <TableCaption>List of lists</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">List name</TableHead>
              <TableHead className="text-center">Visible for all</TableHead>
              <TableHead className="text-center">Remove list</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {lists.map((list) => (
              <TableRow key={list.id}>
                <TableCell className="flex justify-center">
                  <Link
                    className="hover:text-blue-500"
                    href={`/dashboard/lists/${list.id}`}
                  >
                    📋 {list.name}
                  </Link>
                </TableCell>
                <TableCell>
                  <div className="flex justify-center items-center">
                    <Switch
                      checked={list.openList}
                      onCheckedChange={(value) => {
                        const changedList = {
                          id: list.id,
                          openList: value,
                        };
                        handleChangeOpenList(changedList);
                      }}
                      id="airplane-mode"
                    />
                    <Label htmlFor="airplane-mode" className="px-2">Visible</Label>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex justify-center">
                    <IoCloseSharp
                      className="hover:text-red-600 hover:cursor-pointer text-2xl"
                      onClick={() => handleDestroy(list)}
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

export default MyLists;
