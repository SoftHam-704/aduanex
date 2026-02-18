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
  Ship,
  ChevronLeft,
  ChevronRight,
  X,
  SlidersHorizontal,
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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { cn } from "@/lib/utils";

// Mock data
const processes = [
  {
    id: "IMP-2024-0089",
    diNumber: "24/0089123-5",
    client: "Tech Solutions LTDA",
    supplier: "Shenzhen Electronics Co.",
    origin: "China",
    port: "Santos",
    status: "em_analise",
    channel: null,
    eta: "15/01/2025",
    value: "USD 45,000.00",
    valueBrl: "R$ 225.000",
    createdAt: "10/01/2025",
  },
  {
    id: "IMP-2024-0088",
    diNumber: "24/0088456-2",
    client: "Global Trade Corp",
    supplier: "Berlin Machinery GmbH",
    origin: "Alemanha",
    port: "Paranaguá",
    status: "desembaracado",
    channel: "verde",
    eta: "12/01/2025",
    value: "EUR 85,000.00",
    valueBrl: "R$ 467.500",
    createdAt: "05/01/2025",
  },
  {
    id: "IMP-2024-0087",
    diNumber: "24/0087789-8",
    client: "Importadora Nacional",
    supplier: "Tokyo Industrial Ltd",
    origin: "Japão",
    port: "Santos",
    status: "canal_vermelho",
    channel: "vermelho",
    eta: "18/01/2025",
    value: "JPY 12,500,000",
    valueBrl: "R$ 412.500",
    createdAt: "03/01/2025",
  },
  {
    id: "IMP-2024-0086",
    diNumber: null,
    client: "ABC Comercial",
    supplier: "Milan Fashion SpA",
    origin: "Itália",
    port: "Santos",
    status: "aguardando_docs",
    channel: null,
    eta: "20/01/2025",
    value: "EUR 32,000.00",
    valueBrl: "R$ 176.000",
    createdAt: "02/01/2025",
  },
  {
    id: "IMP-2024-0085",
    diNumber: "24/0085012-3",
    client: "Distribuidora XYZ",
    supplier: "Seoul Tech Corp",
    origin: "Coreia do Sul",
    port: "Itajaí",
    status: "exigencia",
    channel: "amarelo",
    eta: "22/01/2025",
    value: "USD 28,500.00",
    valueBrl: "R$ 142.500",
    createdAt: "28/12/2024",
  },
  {
    id: "IMP-2024-0084",
    diNumber: "24/0084345-9",
    client: "Mega Imports S.A.",
    supplier: "American Supplies Inc",
    origin: "EUA",
    port: "Santos",
    status: "desembaracado",
    channel: "verde",
    eta: "08/01/2025",
    value: "USD 67,800.00",
    valueBrl: "R$ 339.000",
    createdAt: "20/12/2024",
  },
  {
    id: "IMP-2024-0083",
    diNumber: "24/0083678-1",
    client: "Tech Solutions LTDA",
    supplier: "Taiwan Components Ltd",
    origin: "Taiwan",
    port: "Santos",
    status: "transito",
    channel: null,
    eta: "25/01/2025",
    value: "USD 54,200.00",
    valueBrl: "R$ 271.000",
    createdAt: "18/12/2024",
  },
];

const statusConfig: Record<string, { label: string; variant: "default" | "success" | "warning" | "destructive" | "info" }> = {
  em_analise: { label: "Em Análise", variant: "default" },
  desembaracado: { label: "Liberado", variant: "success" },
  aguardando_docs: { label: "Aguardando", variant: "warning" },
  canal_vermelho: { label: "Canal Vermelho", variant: "destructive" },
  exigencia: { label: "Exigência", variant: "warning" },
  transito: { label: "Trânsito", variant: "info" },
};

const channelConfig: Record<string, { label: string; color: string }> = {
  verde: { label: "Verde", color: "text-success" },
  amarelo: { label: "Amarelo", color: "text-warning" },
  vermelho: { label: "Vermelho", color: "text-destructive" },
};

export function ImportProcesses() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [portFilter, setPortFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const itemsPerPage = 10;

  const filteredProcesses = processes.filter((process) => {
    const matchesSearch =
      process.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      process.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      process.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (process.diNumber && process.diNumber.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === "all" || process.status === statusFilter;
    const matchesPort = portFilter === "all" || process.port === portFilter;
    return matchesSearch && matchesStatus && matchesPort;
  });

  const totalPages = Math.ceil(filteredProcesses.length / itemsPerPage);
  const paginatedProcesses = filteredProcesses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const toggleRowSelection = (id: string) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const toggleAllSelection = () => {
    if (selectedRows.length === paginatedProcesses.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(paginatedProcesses.map((p) => p.id));
    }
  };

  const stats = [
    { label: "Total", value: 127, color: "text-foreground" },
    { label: "Liberados", value: 48, color: "text-success" },
    { label: "Em Andamento", value: 72, color: "text-primary" },
    { label: "Exigências", value: 7, color: "text-destructive" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-5">
        {/* Page header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold">Importação</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Gerencie processos de importação
            </p>
          </div>
          <Link href="/importacao/novo">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Novo Processo
            </Button>
          </Link>
        </div>

        {/* Stats - compact row */}
        <div className="flex flex-wrap gap-6 py-3 px-4 bg-muted/30 rounded-lg">
          {stats.map((stat) => (
            <div key={stat.label} className="flex items-baseline gap-2">
              <span className={`text-xl font-semibold tabular-nums ${stat.color}`}>{stat.value}</span>
              <span className="text-xs text-muted-foreground">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Filters and search */}
        <div className="flex flex-col lg:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por ID, cliente, fornecedor..."
              className="pl-9 h-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-36 h-9">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="em_analise">Em Análise</SelectItem>
                <SelectItem value="desembaracado">Liberado</SelectItem>
                <SelectItem value="aguardando_docs">Aguardando</SelectItem>
                <SelectItem value="canal_vermelho">Canal Vermelho</SelectItem>
                <SelectItem value="exigencia">Exigência</SelectItem>
                <SelectItem value="transito">Trânsito</SelectItem>
              </SelectContent>
            </Select>

            <Select value={portFilter} onValueChange={setPortFilter}>
              <SelectTrigger className="w-32 h-9">
                <SelectValue placeholder="Porto" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="Santos">Santos</SelectItem>
                <SelectItem value="Paranaguá">Paranaguá</SelectItem>
                <SelectItem value="Itajaí">Itajaí</SelectItem>
              </SelectContent>
            </Select>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="h-9 w-9">
                  <SlidersHorizontal className="w-4 h-4" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Filtros Avançados</SheetTitle>
                  <SheetDescription>
                    Refine sua busca
                  </SheetDescription>
                </SheetHeader>
                <div className="space-y-5 py-5">
                  <div className="space-y-2">
                    <Label className="text-xs">Período</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <Input type="date" className="h-9" />
                      <Input type="date" className="h-9" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs">País de Origem</Label>
                    <Select>
                      <SelectTrigger className="h-9">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="china">China</SelectItem>
                        <SelectItem value="alemanha">Alemanha</SelectItem>
                        <SelectItem value="eua">EUA</SelectItem>
                        <SelectItem value="japao">Japão</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs">Valor (USD)</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <Input type="number" placeholder="Mín" className="h-9" />
                      <Input type="number" placeholder="Máx" className="h-9" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs">Canal</Label>
                    <Select>
                      <SelectTrigger className="h-9">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="verde">Verde</SelectItem>
                        <SelectItem value="amarelo">Amarelo</SelectItem>
                        <SelectItem value="vermelho">Vermelho</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <SheetFooter>
                  <Button variant="outline" size="sm">Limpar</Button>
                  <Button size="sm">Aplicar</Button>
                </SheetFooter>
              </SheetContent>
            </Sheet>

            <Button variant="outline" size="sm" className="h-9">
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </Button>
          </div>
        </div>

        {/* Active filters */}
        {(statusFilter !== "all" || portFilter !== "all" || searchTerm) && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-muted-foreground">Filtros:</span>
            {searchTerm && (
              <Badge variant="secondary" className="gap-1 text-xs">
                "{searchTerm}"
                <X className="w-3 h-3 cursor-pointer" onClick={() => setSearchTerm("")} />
              </Badge>
            )}
            {statusFilter !== "all" && (
              <Badge variant="secondary" className="gap-1 text-xs">
                {statusConfig[statusFilter]?.label}
                <X className="w-3 h-3 cursor-pointer" onClick={() => setStatusFilter("all")} />
              </Badge>
            )}
            {portFilter !== "all" && (
              <Badge variant="secondary" className="gap-1 text-xs">
                {portFilter}
                <X className="w-3 h-3 cursor-pointer" onClick={() => setPortFilter("all")} />
              </Badge>
            )}
            <button
              className="text-xs text-muted-foreground hover:text-foreground"
              onClick={() => {
                setSearchTerm("");
                setStatusFilter("all");
                setPortFilter("all");
              }}
            >
              Limpar
            </button>
          </div>
        )}

        {/* Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-10">
                    <input
                      type="checkbox"
                      className="rounded border-input w-4 h-4"
                      checked={selectedRows.length === paginatedProcesses.length && paginatedProcesses.length > 0}
                      onChange={toggleAllSelection}
                    />
                  </TableHead>
                  <TableHead>Processo</TableHead>
                  <TableHead className="hidden md:table-cell">Cliente</TableHead>
                  <TableHead className="hidden lg:table-cell">Origem</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden md:table-cell">Canal</TableHead>
                  <TableHead className="hidden lg:table-cell text-right">Valor</TableHead>
                  <TableHead className="w-10"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedProcesses.map((process) => (
                  <TableRow
                    key={process.id}
                    className={cn(
                      "cursor-pointer",
                      selectedRows.includes(process.id) && "bg-primary/5"
                    )}
                  >
                    <TableCell>
                      <input
                        type="checkbox"
                        className="rounded border-input w-4 h-4"
                        checked={selectedRows.includes(process.id)}
                        onChange={() => toggleRowSelection(process.id)}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium text-sm font-mono">{process.id}</p>
                        {process.diNumber && (
                          <p className="text-xs text-muted-foreground font-mono">DI {process.diNumber}</p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <p className="text-sm truncate max-w-[180px]">{process.client}</p>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <p className="text-sm">{process.origin}</p>
                    </TableCell>
                    <TableCell>
                      <Badge variant={statusConfig[process.status]?.variant || "default"}>
                        {statusConfig[process.status]?.label}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {process.channel ? (
                        <span className={`text-sm font-medium ${channelConfig[process.channel]?.color}`}>
                          {channelConfig[process.channel]?.label}
                        </span>
                      ) : (
                        <span className="text-sm text-muted-foreground">—</span>
                      )}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell text-right">
                      <span className="text-sm font-medium tabular-nums">{process.valueBrl}</span>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon-sm" className="h-8 w-8">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="text-sm">
                            <Eye className="w-4 h-4 mr-2" />
                            Visualizar
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-sm">
                            <Edit className="w-4 h-4 mr-2" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive text-sm">
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

            {/* Pagination */}
            <div className="flex items-center justify-between px-4 py-3 border-t border-border">
              <p className="text-xs text-muted-foreground">
                {filteredProcesses.length} processos
              </p>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <span className="text-sm px-2">
                  {currentPage} / {totalPages || 1}
                </span>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                >
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

export default ImportProcesses;
