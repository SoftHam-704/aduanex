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
  Calendar,
  ChevronLeft,
  ChevronRight,
  Globe,
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
    buyer: "American Trade Inc.",
    destination: "EUA",
    port: "Santos",
    status: "averbada",
    etd: "12/01/2025",
    value: "USD 89,500.00",
  },
  {
    id: "EXP-2024-0033",
    dueNumber: "24BR000123455",
    client: "AgroExport Brasil",
    buyer: "China Foods Import",
    destination: "China",
    port: "Paranaguá",
    status: "registrada",
    etd: "14/01/2025",
    value: "USD 312,000.00",
  },
  {
    id: "EXP-2024-0032",
    dueNumber: null,
    client: "Café Premium LTDA",
    buyer: "European Coffee Trading",
    destination: "Alemanha",
    port: "Santos",
    status: "em_preparacao",
    etd: "18/01/2025",
    value: "USD 156,000.00",
  },
  {
    id: "EXP-2024-0031",
    dueNumber: "24BR000123454",
    client: "Steel Brasil S.A.",
    buyer: "Japan Steel Corp",
    destination: "Japão",
    port: "Itajaí",
    status: "em_transito",
    etd: "08/01/2025",
    value: "USD 485,000.00",
  },
  {
    id: "EXP-2024-0030",
    dueNumber: "24BR000123453",
    client: "Brasil Exports S.A.",
    buyer: "Mexico Import Group",
    destination: "México",
    port: "Santos",
    status: "averbada",
    etd: "05/01/2025",
    value: "USD 67,200.00",
  },
];

const statusConfig: Record<string, { label: string; color: string }> = {
  em_preparacao: { label: "Em Preparação", color: "bg-muted text-muted-foreground" },
  registrada: { label: "Registrada", color: "bg-tech-blue text-white" },
  em_transito: { label: "Em Trânsito", color: "bg-purple text-white" },
  averbada: { label: "Averbada", color: "bg-success text-white" },
  cancelada: { label: "Cancelada", color: "bg-destructive text-white" },
};

export function ExportProcesses() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredProcesses = processes.filter((process) => {
    const matchesSearch =
      process.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      process.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      process.buyer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || process.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">
              Processos de Exportação
            </h1>
            <p className="text-muted-foreground mt-1">
              Gerencie todos os processos de exportação
            </p>
          </div>
          <Button className="bg-success hover:bg-success-dark">
            <Plus className="w-4 h-4 mr-2" />
            Nova Exportação
          </Button>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-gradient-to-br from-success/10 to-success/5 border-success/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total de Processos</p>
                  <p className="text-2xl font-bold text-success">45</p>
                </div>
                <Plane className="w-8 h-8 text-success/50" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Averbadas (Mês)</p>
                  <p className="text-2xl font-bold">32</p>
                </div>
                <Globe className="w-8 h-8 text-muted-foreground/50" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Em Trânsito</p>
                  <p className="text-2xl font-bold text-purple">8</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-purple/20 flex items-center justify-center">
                  <span className="text-purple font-bold">🚢</span>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Valor Total (Mês)</p>
                  <p className="text-2xl font-bold">USD 1.2M</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-success/20 flex items-center justify-center">
                  <span className="text-success font-bold">$</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por ID, cliente ou comprador..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="em_preparacao">Em Preparação</SelectItem>
                    <SelectItem value="registrada">Registrada</SelectItem>
                    <SelectItem value="em_transito">Em Trânsito</SelectItem>
                    <SelectItem value="averbada">Averbada</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Exportar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>Processo</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead className="hidden md:table-cell">Comprador</TableHead>
                  <TableHead className="hidden lg:table-cell">Destino</TableHead>
                  <TableHead className="hidden lg:table-cell">Porto</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden lg:table-cell">Valor</TableHead>
                  <TableHead className="hidden lg:table-cell">ETD</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProcesses.map((process) => (
                  <TableRow key={process.id} className="cursor-pointer hover:bg-muted/50">
                    <TableCell>
                      <div>
                        <p className="font-medium text-sm">{process.id}</p>
                        {process.dueNumber && (
                          <p className="text-xs text-muted-foreground">DU-E: {process.dueNumber}</p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm truncate max-w-[150px]">{process.client}</p>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <p className="text-sm truncate max-w-[150px]">{process.buyer}</p>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <p className="text-sm">{process.destination}</p>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <p className="text-sm">{process.port}</p>
                    </TableCell>
                    <TableCell>
                      <Badge className={statusConfig[process.status]?.color}>
                        {statusConfig[process.status]?.label}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <p className="text-sm font-medium">{process.value}</p>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-muted-foreground" />
                        <span className="text-sm">{process.etd}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="cursor-pointer">
                            <Eye className="w-4 h-4 mr-2" />
                            Visualizar
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer">
                            <Edit className="w-4 h-4 mr-2" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive cursor-pointer">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Excluir
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}

export default ExportProcesses;
