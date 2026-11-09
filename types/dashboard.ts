import { type LucideIcon } from "lucide-react";

export type DashboardSidebarProps = {
    isSuperAdmin: boolean;
    isOpen: boolean;
    onClose: () => void;
};

export type NavItem = {
    label: string;
    href: string;
    icon: LucideIcon;
    children?: { label: string; href: string }[];
};