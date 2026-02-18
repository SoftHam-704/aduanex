import { useState } from "react";
import { Link, useLocation } from "wouter";
import {
  LayoutDashboard,
  Ship,
  Plane,
  FileText,
  Users,
  Building2,
  Package,
  FileBox,
  Receipt,
  BarChart3,
  Settings,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface NavItem {
  label: string;
  icon: React.ElementType;
  href?: string;
  children?: { label: string; href: string }[];
}

const navItems: NavItem[] = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/" },
  { label: "Importação", icon: Ship, href: "/importacao" },
  { label: "Exportação", icon: Plane, href: "/exportacao" },
  {
    label: "Documentos Aduaneiros",
    icon: FileText,
    children: [
      { label: "DI", href: "/documentos/di" },
      { label: "DU-E", href: "/documentos/due" },
      { label: "DUIMP", href: "/documentos/duimp" },
    ],
  },
  { label: "Clientes", icon: Users, href: "/clientes" },
  { label: "Fornecedores", icon: Building2, href: "/fornecedores" },
  { label: "Produtos / NCM", icon: Package, href: "/produtos" },
  { label: "Manifestos", icon: FileBox, href: "/manifestos" },
  {
    label: "Documentos Fiscais",
    icon: Receipt,
    children: [
      { label: "NF-e", href: "/fiscal/nfe" },
      { label: "CT-e", href: "/fiscal/cte" },
      { label: "MDF-e", href: "/fiscal/mdfe" },
    ],
  },
  { label: "Relatórios", icon: BarChart3, href: "/relatorios" },
  { label: "Configurações", icon: Settings, href: "/configuracoes" },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

export function Sidebar({ collapsed, onToggle, mobileOpen, onMobileClose }: SidebarProps) {
  const [location] = useLocation();
  const [expandedItems, setExpandedItems] = useState<string[]>(["Documentos Aduaneiros", "Documentos Fiscais"]);

  const toggleExpanded = (label: string) => {
    setExpandedItems((prev) =>
      prev.includes(label) ? prev.filter((item) => item !== label) : [...prev, label]
    );
  };

  const isActive = (href?: string, children?: { href: string }[]) => {
    if (href) return location === href;
    return children?.some((child) => location === child.href);
  };

  const NavContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className={cn(
        "flex items-center gap-3 px-4 h-14 border-b border-sidebar-border",
        collapsed && "justify-center px-2"
      )}>
        <div className="flex items-center justify-center w-8 h-8 rounded bg-primary text-primary-foreground">
          <span className="text-sm font-semibold">A</span>
        </div>
        {!collapsed && (
          <span className="font-semibold text-sm tracking-tight text-foreground">ADUANEX</span>
        )}
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 py-2">
        <nav className="px-2 space-y-0.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href, item.children);
            const expanded = expandedItems.includes(item.label);

            if (item.children) {
              return (
                <div key={item.label}>
                  <button
                    onClick={() => !collapsed && toggleExpanded(item.label)}
                    className={cn(
                      "w-full flex items-center gap-2.5 px-2.5 py-2 rounded text-sm transition-colors",
                      active
                        ? "text-primary bg-primary/5"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted",
                      collapsed && "justify-center px-2"
                    )}
                  >
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    {!collapsed && (
                      <>
                        <span className="flex-1 text-left truncate">{item.label}</span>
                        {expanded ? (
                          <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
                        ) : (
                          <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />
                        )}
                      </>
                    )}
                  </button>

                  {!collapsed && expanded && (
                    <div className="mt-0.5 ml-4 pl-2.5 border-l border-border space-y-0.5">
                      {item.children.map((child) => (
                        <Link key={child.href} href={child.href}>
                          <span
                            className={cn(
                              "block px-2.5 py-1.5 rounded text-sm transition-colors cursor-pointer",
                              location === child.href
                                ? "text-primary bg-primary/5 font-medium"
                                : "text-muted-foreground hover:text-foreground hover:bg-muted"
                            )}
                          >
                            {child.label}
                          </span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link key={item.label} href={item.href || "/"}>
                <span
                  className={cn(
                    "flex items-center gap-2.5 px-2.5 py-2 rounded text-sm transition-colors cursor-pointer",
                    active
                      ? "text-primary bg-primary/5 font-medium"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted",
                    collapsed && "justify-center px-2"
                  )}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  {!collapsed && <span className="truncate">{item.label}</span>}
                </span>
              </Link>
            );
          })}
        </nav>
      </ScrollArea>

      {/* Collapse toggle (desktop only) */}
      <div className="hidden lg:flex border-t border-sidebar-border p-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggle}
          className={cn("w-full justify-center text-muted-foreground", collapsed && "px-2")}
        >
          <Menu className="w-4 h-4" />
          {!collapsed && <span className="ml-2 text-xs">Recolher</span>}
        </Button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={onMobileClose}
        />
      )}

      {/* Mobile sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-64 bg-sidebar border-r border-sidebar-border transform transition-transform duration-200 lg:hidden",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <Button
          variant="ghost"
          size="icon-sm"
          className="absolute top-3 right-3 text-muted-foreground"
          onClick={onMobileClose}
        >
          <X className="w-4 h-4" />
        </Button>
        <NavContent />
      </aside>

      {/* Desktop sidebar */}
      <aside
        className={cn(
          "hidden lg:flex flex-col h-screen bg-sidebar border-r border-sidebar-border transition-all duration-200",
          collapsed ? "w-14" : "w-56"
        )}
      >
        <NavContent />
      </aside>
    </>
  );
}
