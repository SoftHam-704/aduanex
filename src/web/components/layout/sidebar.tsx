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
  Anchor,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
      { label: "DI - Declaração Importação", href: "/documentos/di" },
      { label: "DU-E - Declaração Exportação", href: "/documentos/due" },
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
        "flex items-center gap-3 px-4 py-5 border-b border-sidebar-border",
        collapsed && "justify-center px-2"
      )}>
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-tech-blue to-tech-blue-dark shadow-lg">
          <Anchor className="w-5 h-5 text-white" />
        </div>
        {!collapsed && (
          <div className="flex flex-col">
            <span className="font-bold text-lg tracking-tight text-foreground">ADUANEX</span>
            <span className="text-[10px] text-muted-foreground tracking-wider uppercase">Sistema Aduaneiro</span>
          </div>
        )}
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 py-4">
        <nav className="space-y-1 px-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href, item.children);
            const expanded = expandedItems.includes(item.label);

            if (item.children) {
              return (
                <div key={item.label}>
                  <Tooltip delayDuration={0}>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => !collapsed && toggleExpanded(item.label)}
                        className={cn(
                          "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                          active
                            ? "bg-primary/10 text-primary"
                            : "text-muted-foreground hover:bg-accent hover:text-foreground",
                          collapsed && "justify-center px-2"
                        )}
                      >
                        <Icon className={cn("w-5 h-5 flex-shrink-0", active && "text-primary")} />
                        {!collapsed && (
                          <>
                            <span className="flex-1 text-left">{item.label}</span>
                            {expanded ? (
                              <ChevronDown className="w-4 h-4" />
                            ) : (
                              <ChevronRight className="w-4 h-4" />
                            )}
                          </>
                        )}
                      </button>
                    </TooltipTrigger>
                    {collapsed && (
                      <TooltipContent side="right" className="font-medium">
                        {item.label}
                      </TooltipContent>
                    )}
                  </Tooltip>

                  {!collapsed && expanded && (
                    <div className="mt-1 ml-4 pl-4 border-l-2 border-border space-y-1">
                      {item.children.map((child) => (
                        <Link key={child.href} href={child.href}>
                          <span
                            className={cn(
                              "block px-3 py-2 rounded-lg text-sm transition-all duration-200 cursor-pointer",
                              location === child.href
                                ? "bg-primary/10 text-primary font-medium"
                                : "text-muted-foreground hover:bg-accent hover:text-foreground"
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
              <Tooltip key={item.label} delayDuration={0}>
                <TooltipTrigger asChild>
                  <Link href={item.href || "/"}>
                    <span
                      className={cn(
                        "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer",
                        active
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:bg-accent hover:text-foreground",
                        collapsed && "justify-center px-2"
                      )}
                    >
                      <Icon className={cn("w-5 h-5 flex-shrink-0", active && "text-primary")} />
                      {!collapsed && <span>{item.label}</span>}
                    </span>
                  </Link>
                </TooltipTrigger>
                {collapsed && (
                  <TooltipContent side="right" className="font-medium">
                    {item.label}
                  </TooltipContent>
                )}
              </Tooltip>
            );
          })}
        </nav>
      </ScrollArea>

      {/* Collapse toggle (desktop only) */}
      <div className="hidden lg:flex border-t border-sidebar-border p-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggle}
          className={cn("w-full justify-center", collapsed && "px-2")}
        >
          <Menu className="w-4 h-4" />
          {!collapsed && <span className="ml-2">Recolher menu</span>}
        </Button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onMobileClose}
        />
      )}

      {/* Mobile sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-72 bg-sidebar border-r border-sidebar-border transform transition-transform duration-300 lg:hidden",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4"
          onClick={onMobileClose}
        >
          <X className="w-5 h-5" />
        </Button>
        <NavContent />
      </aside>

      {/* Desktop sidebar */}
      <aside
        className={cn(
          "hidden lg:flex flex-col h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300",
          collapsed ? "w-16" : "w-64"
        )}
      >
        <NavContent />
      </aside>
    </>
  );
}
