"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { HamburgerMenuIcon, Pencil2Icon } from "@radix-ui/react-icons";
import { UserButton, UserProfile } from "@clerk/nextjs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import NavLinkDashboard from "./nav-links";
import { usePathname } from "next/navigation";

export default function NavDashboard() {
  const pathname = usePathname();

  return (
    <div className="flex justify-between p-6 border border-white rounded-b-2xl">
      <Link href={"/dashboard"} className="items-center">Logo</Link>
      <div className="md:flex hidden items-center">
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
              className="hover:text-blue-500 hover:cursor-pointer"
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
