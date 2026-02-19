import { useState } from "react";
import { Link } from "wouter";
import {
  Search,
  Plus,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Download,
  Plane,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { cn } from "@/lib/utils";

const processes = [
  {
    id: "EXP-2024-0034",
    dueNumber: "24BR000123456",
    client: "Brasil Exports S.A.",
    destination: "Estados Unidos",
    port: "Santos",
    status: "averbada",
    value: "USD 89,500.00",
    valueBrl: "R$ 447.500",
    date: "12/01/2025",
  },
  {
    id: "EXP-2024-0033",
    dueNumber: "24BR000123455",
    client: "AgroExport Brasil",
    destination: "China",
    port: "Paranaguá",
    status: "registrada",
    value: "USD 312,000.00",
    valueBrl: "R$ 1.560.000",
    date: "10/01/2025",
  },
  {
    id: "EXP-2024-0032",
    dueNumber: "24BR000123454",
    client: "Tech Solutions LTDA",
    destination: "Alemanha",
    port: "Santos",
    status: "em_analise",
    value: "USD 67,800.00",
    valueBrl: "R$ 339.000",
    date: "08/01/2025",
  },
  {
    id: "EXP-2024-0031",
    dueNumber: null,
    client: "Global Trade Corp",
    destination: "Argentina",
    port: "Rio Grande",
    status: "aguardando_docs",
    value: "USD 45,200.00",
    valueBrl: "R$ 226.000",
    date: "05/01/2025",
  },
];

// Fresh Corporate Palette
const COLORS = {
  green: "#10B981",
  orange: "#FB923C",
  blue: "#60A5FA",
  yellow: "#EAB308",
  red: "#DC2626",
};

const statusConfig: Record<string, { label: string; variant: "info" | "success" | "warning" | "destructive" }> = {
  em_analise: { label: "Em Análise", variant: "info" },
  registrada: { label: "Registrada", variant: "info" },
  averbada: { label: "Averbada", variant: "success" },
  aguardando_docs: { label: "Aguardando", variant: "warning" },
  cancelada: { label: "Cancelada", variant: "destructive" },
};

export function ExportProcesses() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredProcesses = processes.filter((process) => {
    const matchesSearch =
      process.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      process.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (process.dueNumber && process.dueNumber.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === "all" || process.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = [
    { label: "Total", value: 32, color: "text-foreground" },
    { label: "Averbadas", value: 18, color: `text-[${COLORS.green}]` },
    { label: "Em Andamento", value: 12, color: `text-[${COLORS.blue}]` },
    { label: "Pendentes", value: 2, color: `text-[${COLORS.orange}]` },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-5">
        {/* Page header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold">Exportação</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Gerencie processos de exportação
            </p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Novo Processo
          </Button>
        </div>

        {/* Stats row */}
        <div className="flex flex-wrap gap-4 py-2 px-3 bg-muted/30 rounded-md text-xs">
          {stats.map((stat) => (
            <div key={stat.label} className="flex items-baseline gap-1.5">
              <span className={`text-base font-semibold tabular-nums ${stat.color}`}>{stat.value}</span>
              <span className="text-muted-foreground">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col lg:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar..."
              className="pl-9 h-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-36 h-9">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="em_analise">Em Análise</SelectItem>
                <SelectItem value="registrada">Registrada</SelectItem>
                <SelectItem value="averbada">Averbada</SelectItem>
                <SelectItem value="aguardando_docs">Aguardando</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" size="sm" className="h-9">
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </Button>
          </div>
        </div>

        {/* Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Processo</TableHead>
                  <TableHead className="hidden md:table-cell">Cliente</TableHead>
                  <TableHead className="hidden lg:table-cell">Destino</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden lg:table-cell text-right">Valor</TableHead>
                  <TableHead className="w-10"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProcesses.map((process) => (
                  <TableRow key={process.id} className="cursor-pointer text-xs">
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${COLORS.green}15` }}>
                          <Plane className="w-3 h-3" style={{ color: COLORS.green }} />
                        </div>
                        <div>
                          <p className="font-medium font-mono text-xs">{process.id}</p>
                          {process.dueNumber && (
                            <p className="text-[10px] text-muted-foreground font-mono">DU-E {process.dueNumber}</p>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <p className="text-xs truncate max-w-[160px]">{process.client}</p>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <p className="text-xs">{process.destination}</p>
                    </TableCell>
                    <TableCell>
                      <Badge variant={statusConfig[process.status]?.variant || "default"} className="text-[10px] px-1.5 py-0">
                        {statusConfig[process.status]?.label}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell text-right">
                      <span className="text-xs font-medium tabular-nums">{process.valueBrl}</span>
                    </TableCell>
                    <TableCell className="w-8">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon-sm" className="h-6 w-6">
                            <MoreHorizontal className="w-3.5 h-3.5" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="text-xs">
                            <Eye className="w-3.5 h-3.5 mr-1.5" />
                            Visualizar
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-xs">
                            <Edit className="w-3.5 h-3.5 mr-1.5" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive text-xs">
                            <Trash2 className="w-3.5 h-3.5 mr-1.5" />
                            Excluir
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <div className="flex items-center justify-between px-4 py-3 border-t border-border">
              <p className="text-xs text-muted-foreground">
                {filteredProcesses.length} processos
              </p>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon-sm" disabled>
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <span className="text-sm px-2">1 / 1</span>
                <Button variant="ghost" size="icon-sm" disabled>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}

export default ExportProcesses;
