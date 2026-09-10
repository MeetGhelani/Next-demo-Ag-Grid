"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
    LayoutDashboard,
    Users,
    Package,
    ShoppingCart,
    FileText,
    Settings,
} from "lucide-react";

const menuItems = [
    {
        title: "Dashboard",
        href: "/",
        icon: LayoutDashboard,
    },
    {
        title: "Customers",
        href: "/customers",
        icon: Users,
    },
    {
        title: "Products",
        href: "/products",
        icon: Package,
    },
    {
        title: "Orders",
        href: "/orders",
        icon: ShoppingCart,
    },
    {
        title: "Records",
        href: "/records",
        icon: FileText,
    },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="flex min-h-screen w-28 flex-col items-center border-r bg-white px-2 py-6">

            <div className="mb-5 flex w-full flex-col items-center gap-1 rounded-md py-2 text-xs">
                <div className="mb-0 w-12 h-12 flex items-center justify-center bg-orange-200 rounded-full font-bold text-sm">
                AX
                </div>
                <h1 className="text-sm font-semibold font-family: 'Montserrat'">
                    Axiom
                </h1>
                
            </div>

            <nav className="flex w-full flex-col items-center gap-4">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex w-full flex-col items-center gap-1 rounded-md py-2 text-xs ${isActive
                                ? "bg-gray-100 font-medium"
                                : "hover:bg-gray-100"
                                }`}
                        >
                            <Icon
                                size={20}
                                strokeWidth={1.8}
                            />

                            <span>{item.title}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="my-8 w-4/5 border-t" />

            <Link
                href="/settings"
                className={`flex w-full flex-col items-center gap-1 rounded-md py-2 mt-auto text-xs ${pathname === "/settings"
                    ? "bg-gray-100 font-medium"
                    : "hover:bg-gray-100"
                    }`}
            >
                <Settings
                    size={20}
                    strokeWidth={1.8}
                />

                <span>Settings</span>
            </Link>

        </aside>
    );
}