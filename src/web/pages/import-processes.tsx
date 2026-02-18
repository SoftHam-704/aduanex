import { useState } from "react";
import { Link } from "wouter";
import {
  Search,
  Filter,
  Plus,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Download,
  Ship,
  Calendar,
  ChevronLeft,
  ChevronRight,
  X,
  SlidersHorizontal,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
    valueBrl: "R$ 225.000,00",
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
    valueBrl: "R$ 467.500,00",
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
    valueBrl: "R$ 412.500,00",
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
    valueBrl: "R$ 176.000,00",
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
    valueBrl: "R$ 142.500,00",
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
    valueBrl: "R$ 339.000,00",
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
    valueBrl: "R$ 271.000,00",
    createdAt: "18/12/2024",
  },
];

const statusConfig: Record<string, { label: string; color: string }> = {
  em_analise: { label: "Em Análise", color: "bg-tech-blue text-white" },
  desembaracado: { label: "Desembaraçado", color: "bg-success text-white" },
  aguardando_docs: { label: "Aguardando Docs", color: "bg-warning text-white" },
  canal_vermelho: { label: "Canal Vermelho", color: "bg-destructive text-white" },
  exigencia: { label: "Exigência", color: "bg-purple text-white" },
  transito: { label: "Em Trânsito", color: "bg-info text-white" },
};

const channelConfig: Record<string, { label: string; color: string }> = {
  verde: { label: "Verde", color: "bg-success/20 text-success border-success/30" },
  amarelo: { label: "Amarelo", color: "bg-yellow-500/20 text-yellow-600 border-yellow-500/30" },
  vermelho: { label: "Vermelho", color: "bg-destructive/20 text-destructive border-destructive/30" },
  cinza: { label: "Cinza", color: "bg-gray-500/20 text-gray-600 border-gray-500/30" },
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

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">
              Processos de Importação
            </h1>
            <p className="text-muted-foreground mt-1">
              Gerencie todos os processos de importação
            </p>
          </div>
          <Link href="/importacao/novo">
            <Button className="bg-tech-blue hover:bg-tech-blue-dark">
              <Plus className="w-4 h-4 mr-2" />
              Novo Processo
            </Button>
          </Link>
        </div>

        {/* Stats cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-gradient-to-br from-tech-blue/10 to-tech-blue/5 border-tech-blue/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total de Processos</p>
                  <p className="text-2xl font-bold text-tech-blue">127</p>
                </div>
                <Ship className="w-8 h-8 text-tech-blue/50" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-success/10 to-success/5 border-success/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Desembaraçados</p>
                  <p className="text-2xl font-bold text-success">48</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-success/20 flex items-center justify-center">
                  <span className="text-success font-bold">✓</span>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-warning/10 to-warning/5 border-warning/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Em Andamento</p>
                  <p className="text-2xl font-bold text-warning">72</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-warning/20 flex items-center justify-center">
                  <span className="text-warning font-bold">⏳</span>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-destructive/10 to-destructive/5 border-destructive/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Exigências</p>
                  <p className="text-2xl font-bold text-destructive">7</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-destructive/20 flex items-center justify-center">
                  <span className="text-destructive font-bold">!</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and search */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por ID, cliente, fornecedor ou DI..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Quick filters */}
              <div className="flex flex-wrap gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os status</SelectItem>
                    <SelectItem value="em_analise">Em Análise</SelectItem>
                    <SelectItem value="desembaracado">Desembaraçado</SelectItem>
                    <SelectItem value="aguardando_docs">Aguardando Docs</SelectItem>
                    <SelectItem value="canal_vermelho">Canal Vermelho</SelectItem>
                    <SelectItem value="exigencia">Exigência</SelectItem>
                    <SelectItem value="transito">Em Trânsito</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={portFilter} onValueChange={setPortFilter}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Porto" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os portos</SelectItem>
                    <SelectItem value="Santos">Santos</SelectItem>
                    <SelectItem value="Paranaguá">Paranaguá</SelectItem>
                    <SelectItem value="Itajaí">Itajaí</SelectItem>
                    <SelectItem value="Rio Grande">Rio Grande</SelectItem>
                  </SelectContent>
                </Select>

                {/* Advanced filters sheet */}
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="icon">
                      <SlidersHorizontal className="w-4 h-4" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Filtros Avançados</SheetTitle>
                      <SheetDescription>
                        Refine sua busca com filtros adicionais
                      </SheetDescription>
                    </SheetHeader>
                    <div className="space-y-6 py-6">
                      <div className="space-y-2">
                        <Label>Período de Cadastro</Label>
                        <div className="grid grid-cols-2 gap-2">
                          <Input type="date" placeholder="De" />
                          <Input type="date" placeholder="Até" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>País de Origem</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="china">China</SelectItem>
                            <SelectItem value="alemanha">Alemanha</SelectItem>
                            <SelectItem value="eua">EUA</SelectItem>
                            <SelectItem value="japao">Japão</SelectItem>
                            <SelectItem value="italia">Itália</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Valor (USD)</Label>
                        <div className="grid grid-cols-2 gap-2">
                          <Input type="number" placeholder="Mínimo" />
                          <Input type="number" placeholder="Máximo" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Canal Parametrizado</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="verde">Verde</SelectItem>
                            <SelectItem value="amarelo">Amarelo</SelectItem>
                            <SelectItem value="vermelho">Vermelho</SelectItem>
                            <SelectItem value="cinza">Cinza</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Cliente</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="tech">Tech Solutions LTDA</SelectItem>
                            <SelectItem value="global">Global Trade Corp</SelectItem>
                            <SelectItem value="abc">ABC Comercial</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <SheetFooter>
                      <Button variant="outline">Limpar Filtros</Button>
                      <Button className="bg-tech-blue hover:bg-tech-blue-dark">Aplicar</Button>
                    </SheetFooter>
                  </SheetContent>
                </Sheet>

                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Exportar
                </Button>
              </div>
            </div>

            {/* Active filters */}
            {(statusFilter !== "all" || portFilter !== "all" || searchTerm) && (
              <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t">
                <span className="text-sm text-muted-foreground">Filtros ativos:</span>
                {searchTerm && (
                  <Badge variant="secondary" className="gap-1">
                    Busca: {searchTerm}
                    <X
                      className="w-3 h-3 cursor-pointer"
                      onClick={() => setSearchTerm("")}
                    />
                  </Badge>
                )}
                {statusFilter !== "all" && (
                  <Badge variant="secondary" className="gap-1">
                    Status: {statusConfig[statusFilter]?.label}
                    <X
                      className="w-3 h-3 cursor-pointer"
                      onClick={() => setStatusFilter("all")}
                    />
                  </Badge>
                )}
                {portFilter !== "all" && (
                  <Badge variant="secondary" className="gap-1">
                    Porto: {portFilter}
                    <X
                      className="w-3 h-3 cursor-pointer"
                      onClick={() => setPortFilter("all")}
                    />
                  </Badge>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-destructive h-6"
                  onClick={() => {
                    setSearchTerm("");
                    setStatusFilter("all");
                    setPortFilter("all");
                  }}
                >
                  Limpar todos
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Table */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="w-12">
                      <input
                        type="checkbox"
                        className="rounded border-input"
                        checked={selectedRows.length === paginatedProcesses.length && paginatedProcesses.length > 0}
                        onChange={toggleAllSelection}
                      />
                    </TableHead>
                    <TableHead>Processo</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead className="hidden md:table-cell">Fornecedor</TableHead>
                    <TableHead className="hidden lg:table-cell">Origem</TableHead>
                    <TableHead className="hidden lg:table-cell">Porto</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden md:table-cell">Canal</TableHead>
                    <TableHead className="hidden lg:table-cell">Valor</TableHead>
                    <TableHead className="hidden lg:table-cell">ETA</TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedProcesses.map((process) => (
                    <TableRow
                      key={process.id}
                      className={cn(
                        "cursor-pointer hover:bg-muted/50 transition-colors",
                        selectedRows.includes(process.id) && "bg-primary/5"
                      )}
                    >
                      <TableCell>
                        <input
                          type="checkbox"
                          className="rounded border-input"
                          checked={selectedRows.includes(process.id)}
                          onChange={() => toggleRowSelection(process.id)}
                          onClick={(e) => e.stopPropagation()}
                        />
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium text-sm">{process.id}</p>
                          {process.diNumber && (
                            <p className="text-xs text-muted-foreground">DI: {process.diNumber}</p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm truncate max-w-[150px]">{process.client}</p>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <p className="text-sm truncate max-w-[150px]">{process.supplier}</p>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <p className="text-sm">{process.origin}</p>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <p className="text-sm">{process.port}</p>
                      </TableCell>
                      <TableCell>
                        <Badge className={`${statusConfig[process.status]?.color} text-xs whitespace-nowrap`}>
                          {statusConfig[process.status]?.label}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {process.channel ? (
                          <Badge
                            variant="outline"
                            className={`${channelConfig[process.channel]?.color} text-xs`}
                          >
                            {channelConfig[process.channel]?.label}
                          </Badge>
                        ) : (
                          <span className="text-xs text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <div>
                          <p className="text-sm font-medium">{process.value}</p>
                          <p className="text-xs text-muted-foreground">{process.valueBrl}</p>
                        </div>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-muted-foreground" />
                          <span className="text-sm">{process.eta}</span>
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
                            <DropdownMenuItem className="cursor-pointer">
                              <Download className="w-4 h-4 mr-2" />
                              Exportar PDF
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
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between px-4 py-4 border-t">
              <p className="text-sm text-muted-foreground">
                Mostrando {(currentPage - 1) * itemsPerPage + 1} a{" "}
                {Math.min(currentPage * itemsPerPage, filteredProcesses.length)} de{" "}
                {filteredProcesses.length} processos
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className={currentPage === page ? "bg-tech-blue hover:bg-tech-blue-dark" : ""}
                  >
                    {page}
                  </Button>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
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
