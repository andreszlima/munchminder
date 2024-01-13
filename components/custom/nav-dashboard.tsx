"use client";

import Link from "next/link";

import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { UserButton } from "@clerk/nextjs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger
} from "../ui/dropdown-menu";
import NavLinkDashboard from "./nav-links";
import { usePathname } from "next/navigation";
import { ModeToggle } from "./toggle-dark";

export default function NavDashboard() {
  const pathname = usePathname();

  return (
    <div className="flex justify-between p-6 border bg-white dark:bg-gray-900 items-center">
      <Link href={"/dashboard"} className="items-center">Logo</Link>
      <div className="md:flex hidden items-center">
        <div className="px-2 items justify-center items-center"><ModeToggle /></div>
        <NavLinkDashboard reference="/dashboard/lists" text="Lists" />
        <NavLinkDashboard reference="/dashboard/items" text="Items" />
        <NavLinkDashboard reference="/dashboard/markets" text="Markets" />
        <div className="px-2">
          <UserButton />
        </div>
      </div>
      <div className="block md:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <HamburgerMenuIcon
              width={"32"}
              height={"32"}
              className="hover:primary hover:cursor-pointer"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/lists">Lists</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/items">Items</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/markets">Markets</Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <div className="flex justify-center">
              <UserButton />
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
