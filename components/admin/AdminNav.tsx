"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Sparkles,
  Wrench,
  MessageSquare,
  MapPin,
  Package,
  Users,
} from "lucide-react";

const navItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Custom Designs",
    href: "/admin/custom-designs",
    icon: Sparkles,
  },
  {
    title: "Service Tickets",
    href: "/admin/service-tickets",
    icon: Wrench,
  },
  {
    title: "Reviews",
    href: "/admin/reviews",
    icon: MessageSquare,
  },
  {
    title: "Branches",
    href: "/admin/branches",
    icon: MapPin,
  },
  {
    title: "Products",
    href: "/admin/products",
    icon: Package,
  },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="space-y-1">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
              isActive
                ? "bg-gray-900 text-white"
                : "text-gray-700 hover:bg-gray-100"
            )}
          >
            <Icon className="h-5 w-5" />
            {item.title}
          </Link>
        );
      })}
    </nav>
  );
}
