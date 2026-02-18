import { useState } from "react";
import { Bell, Search, Sun, Moon, Menu, User, LogOut, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  onMobileMenuToggle: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

const notifications = [
  { id: 1, title: "DI 23/1234567-8 aprovada", time: "há 5 min", type: "success" },
  { id: 2, title: "Alerta de prazo: Processo IMP-2024-001", time: "há 1 hora", type: "warning" },
  { id: 3, title: "Nova exigência SISCOMEX", time: "há 2 horas", type: "info" },
];

export function Header({ onMobileMenuToggle, darkMode, onToggleDarkMode }: HeaderProps) {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <header className="sticky top-0 z-30 h-14 flex items-center justify-between gap-4 px-4 lg:px-6 bg-background border-b border-border">
      {/* Left side */}
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon-sm"
          className="lg:hidden text-muted-foreground"
          onClick={onMobileMenuToggle}
        >
          <Menu className="w-4 h-4" />
        </Button>

        {/* Search */}
        <div className="hidden md:flex items-center relative">
          <Search className="absolute left-3 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Buscar processos..."
            className="pl-9 w-72 h-8 text-sm bg-muted border-0"
          />
          <kbd className="absolute right-2.5 pointer-events-none hidden lg:inline-flex h-5 select-none items-center gap-0.5 rounded border bg-background px-1.5 font-mono text-[10px] text-muted-foreground">
            <span className="text-xs">⌘</span>K
          </kbd>
        </div>

        {/* Mobile search toggle */}
        <Button
          variant="ghost"
          size="icon-sm"
          className="md:hidden text-muted-foreground"
          onClick={() => setShowSearch(!showSearch)}
        >
          <Search className="w-4 h-4" />
        </Button>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-1">
        {/* Dark mode toggle */}
        <Button variant="ghost" size="icon-sm" onClick={onToggleDarkMode} className="text-muted-foreground">
          {darkMode ? (
            <Sun className="w-4 h-4" />
          ) : (
            <Moon className="w-4 h-4" />
          )}
        </Button>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon-sm" className="relative text-muted-foreground">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-72">
            <div className="flex items-center justify-between px-3 py-2 border-b">
              <span className="font-medium text-sm">Notificações</span>
              <span className="text-xs text-muted-foreground">3 novas</span>
            </div>
            {notifications.map((notification) => (
              <DropdownMenuItem key={notification.id} className="flex flex-col items-start gap-0.5 p-3 cursor-pointer">
                <span className="text-sm">{notification.title}</span>
                <span className="text-xs text-muted-foreground">{notification.time}</span>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="justify-center text-primary text-sm cursor-pointer">
              Ver todas
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 px-2 h-8">
              <Avatar className="h-6 w-6">
                <AvatarFallback className="bg-primary/10 text-primary text-xs font-medium">
                  JS
                </AvatarFallback>
              </Avatar>
              <span className="hidden lg:block text-sm">João Silva</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <div className="px-3 py-2 border-b">
              <p className="font-medium text-sm">João Silva</p>
              <p className="text-xs text-muted-foreground">joao@aduanex.com</p>
            </div>
            <DropdownMenuItem className="cursor-pointer text-sm">
              <User className="w-4 h-4 mr-2" />
              Perfil
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer text-sm">
              <Settings className="w-4 h-4 mr-2" />
              Configurações
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive cursor-pointer text-sm">
              <LogOut className="w-4 h-4 mr-2" />
              Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Mobile search bar */}
      {showSearch && (
        <div className="absolute top-full left-0 right-0 p-3 bg-background border-b border-border md:hidden">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar..."
              className="pl-9 w-full h-9"
              autoFocus
            />
          </div>
        </div>
      )}
    </header>
  );
}
