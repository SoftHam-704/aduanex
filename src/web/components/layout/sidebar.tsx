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
  PanelLeftClose,
  PanelLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

// Fresh Corporate Palette
const COLORS = {
  green: "#10B981",
  greenLight: "#34D399",
  greenDark: "#059669",
};

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
      {/* Logo - Refined */}
      <div className={cn(
        "flex items-center gap-3 px-4 h-14 border-b border-[#E2E8F0] dark:border-[#334155]",
        collapsed && "justify-center px-2"
      )}>
        <div 
          className="flex items-center justify-center w-8 h-8 rounded-md font-bold text-white"
          style={{ 
            background: `linear-gradient(135deg, ${COLORS.green} 0%, ${COLORS.greenDark} 100%)`,
          }}
        >
          <span className="text-sm">A</span>
        </div>
        {!collapsed && (
          <div className="flex flex-col">
            <span className="font-semibold text-sm tracking-tight text-foreground">ADUANEX</span>
            <span className="text-[10px] text-muted-foreground -mt-0.5">Sistema Aduaneiro</span>
          </div>
        )}
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 py-3">
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
                      "w-full flex items-center gap-2.5 px-2.5 py-2 rounded-md text-sm transition-all duration-150",
                      active
                        ? "text-[#1E293B] dark:text-[#F8FAFC] font-medium"
                        : "text-[#64748B] hover:text-[#1E293B] dark:hover:text-[#F8FAFC] hover:bg-[#F1F5F9] dark:hover:bg-[#334155]",
                      collapsed && "justify-center px-2"
                    )}
                    style={active ? { 
                      backgroundColor: `${COLORS.green}10`,
                      borderLeft: `3px solid ${COLORS.green}`,
                      marginLeft: '-1px',
                      paddingLeft: 'calc(0.625rem - 2px)'
                    } : undefined}
                  >
                    <Icon 
                      className="w-4 h-4 flex-shrink-0 transition-colors" 
                      style={active ? { color: COLORS.green } : undefined}
                    />
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
                    <div 
                      className="mt-1 ml-4 pl-3 space-y-0.5"
                      style={{ borderLeft: `1px solid ${COLORS.green}30` }}
                    >
                      {item.children.map((child) => {
                        const childActive = location === child.href;
                        return (
                          <Link key={child.href} href={child.href}>
                            <span
                              className={cn(
                                "block px-2.5 py-1.5 rounded-md text-sm transition-all duration-150 cursor-pointer",
                                childActive
                                  ? "font-medium"
                                  : "text-[#64748B] hover:text-[#1E293B] dark:hover:text-[#F8FAFC] hover:bg-[#F1F5F9] dark:hover:bg-[#334155]"
                              )}
                              style={childActive ? { 
                                color: COLORS.green,
                                backgroundColor: `${COLORS.green}08`
                              } : undefined}
                            >
                              {child.label}
                            </span>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link key={item.label} href={item.href || "/"}>
                <span
                  className={cn(
                    "flex items-center gap-2.5 px-2.5 py-2 rounded-md text-sm transition-all duration-150 cursor-pointer",
                    active
                      ? "text-[#1E293B] dark:text-[#F8FAFC] font-medium"
                      : "text-[#64748B] hover:text-[#1E293B] dark:hover:text-[#F8FAFC] hover:bg-[#F1F5F9] dark:hover:bg-[#334155]",
                    collapsed && "justify-center px-2"
                  )}
                  style={active ? { 
                    backgroundColor: `${COLORS.green}10`,
                    borderLeft: `3px solid ${COLORS.green}`,
                    marginLeft: '-1px',
                    paddingLeft: 'calc(0.625rem - 2px)'
                  } : undefined}
                >
                  <Icon 
                    className="w-4 h-4 flex-shrink-0 transition-colors" 
                    style={active ? { color: COLORS.green } : undefined}
                  />
                  {!collapsed && <span className="truncate">{item.label}</span>}
                </span>
              </Link>
            );
          })}
        </nav>
      </ScrollArea>

      {/* Collapse toggle (desktop only) */}
      <div className="hidden lg:flex border-t border-[#E2E8F0] dark:border-[#334155] p-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggle}
          className={cn(
            "w-full justify-center text-muted-foreground hover:text-foreground transition-colors", 
            collapsed && "px-2"
          )}
        >
          {collapsed ? (
            <PanelLeft className="w-4 h-4" />
          ) : (
            <>
              <PanelLeftClose className="w-4 h-4" />
              <span className="ml-2 text-xs">Recolher</span>
            </>
          )}
        </Button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={onMobileClose}
        />
      )}

      {/* Mobile sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-64 bg-white dark:bg-[#1E293B] border-r border-[#E2E8F0] dark:border-[#334155] transform transition-transform duration-200 ease-out lg:hidden",
          mobileOpen ? "translate-x-0 shadow-xl" : "-translate-x-full"
        )}
      >
        <Button
          variant="ghost"
          size="icon-sm"
          className="absolute top-3 right-3 text-muted-foreground hover:text-foreground"
          onClick={onMobileClose}
        >
          <X className="w-4 h-4" />
        </Button>
        <NavContent />
      </aside>

      {/* Desktop sidebar */}
      <aside
        className={cn(
          "hidden lg:flex flex-col h-screen bg-white dark:bg-[#1E293B] border-r border-[#E2E8F0] dark:border-[#334155] transition-all duration-200 ease-out",
          collapsed ? "w-14" : "w-56",
          !collapsed && "shadow-sm"
        )}
      >
        <NavContent />
      </aside>
    </>
  );
}
