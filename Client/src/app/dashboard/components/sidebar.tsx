"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  LayoutDashboard,
  Router,
  User
} from "lucide-react";

const sidebarNavItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Devices",
    href: "/dashboard/device-management",
    icon: Router,
  },
  {
    title: "User Management",
    href: "/dashboard/user-management",
    icon: User,
  }
];

export function Sidebar() {
  const pathname = usePathname();
  return (
    <ScrollArea className="h-screen">
      <div className="space-y-4 py-8">
        <div className="px-3 py-2">
          <div className="space-y-1">
            {sidebarNavItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Button
                  key={item.href}
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start",
                    isActive
                      ? "bg-secondary hover:bg-secondary/80"
                      : "hover:bg-secondary/10"
                  )}
                  asChild
                >
                  <Link href={item.href} className="flex items-center">
                    <item.icon className="mr-2 h-4 w-4" />
                    <span className="text-sm font-medium">{item.title}</span>
                  </Link>
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}
