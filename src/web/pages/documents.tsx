import { useState } from "react";
import {
  Search,
  Filter,
  Upload,
  FileText,
  Eye,
  Download,
  Trash2,
  MoreHorizontal,
  CheckCircle2,
  Clock,
  AlertCircle,
  XCircle,
  Calendar,
  Building2,
  SlidersHorizontal,
  Grid3X3,
  List,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { cn } from "@/lib/utils";

// Mock data
const documents = [
  {
    id: "DI-2024-0089",
    type: "DI",
    number: "24/0089123-5",
    process: "IMP-2024-0089",
    client: "Tech Solutions LTDA",
    status: "registrada",
    protocol: "24/0089123-5",
    date: "11/01/2025",
    channel: "verde",
  },
  {
    id: "DI-2024-0088",
    type: "DI",
    number: "24/0088456-2",
    process: "IMP-2024-0088",
    client: "Global Trade Corp",
    status: "desembaracada",
    protocol: "24/0088456-2",
    date: "08/01/2025",
    channel: "verde",
  },
  {
    id: "DI-2024-0087",
    type: "DI",
    number: "24/0087789-8",
    process: "IMP-2024-0087",
    client: "Importadora Nacional",
    status: "em_exigencia",
    protocol: "24/0087789-8",
    date: "05/01/2025",
    channel: "vermelho",
  },
  {
    id: "DUE-2024-0034",
    type: "DU-E",
    number: "24BR000123456",
    process: "EXP-2024-0034",
    client: "Brasil Exports S.A.",
    status: "averbada",
    protocol: "24BR000123456",
    date: "12/01/2025",
    channel: null,
  },
  {
    id: "DUE-2024-0033",
    type: "DU-E",
    number: "24BR000123455",
    process: "EXP-2024-0033",
    client: "AgroExport Brasil",
    status: "registrada",
    protocol: "24BR000123455",
    date: "10/01/2025",
    channel: null,
  },
  {
    id: "DUIMP-2024-0001",
    type: "DUIMP",
    number: "24DU00001234",
    process: "IMP-2024-0090",
    client: "Nova Import LTDA",
    status: "em_analise",
    protocol: "24DU00001234",
    date: "13/01/2025",
    channel: "amarelo",
  },
];

const statusConfig: Record<string, { label: string; color: string; icon: React.ElementType }> = {
  registrada: { label: "Registrada", color: "bg-tech-blue text-white", icon: Clock },
  desembaracada: { label: "Desembaraçada", color: "bg-success text-white", icon: CheckCircle2 },
  em_exigencia: { label: "Em Exigência", color: "bg-warning text-white", icon: AlertCircle },
  cancelada: { label: "Cancelada", color: "bg-destructive text-white", icon: XCircle },
  averbada: { label: "Averbada", color: "bg-success text-white", icon: CheckCircle2 },
  em_analise: { label: "Em Análise", color: "bg-purple text-white", icon: Clock },
};

const channelConfig: Record<string, { label: string; color: string }> = {
  verde: { label: "Verde", color: "bg-success/20 text-success border-success/30" },
  amarelo: { label: "Amarelo", color: "bg-yellow-500/20 text-yellow-600 border-yellow-500/30" },
  vermelho: { label: "Vermelho", color: "bg-destructive/20 text-destructive border-destructive/30" },
};

const typeConfig: Record<string, { label: string; description: string; color: string }> = {
  DI: { label: "DI", description: "Declaração de Importação", color: "bg-tech-blue" },
  "DU-E": { label: "DU-E", description: "Declaração Única de Exportação", color: "bg-success" },
  DUIMP: { label: "DUIMP", description: "Declaração Única de Importação", color: "bg-purple" },
};

export function Documents() {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");
  const [activeTab, setActiveTab] = useState("all");

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.process.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.client.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "all" || doc.type === typeFilter;
    const matchesStatus = statusFilter === "all" || doc.status === statusFilter;
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "di" && doc.type === "DI") ||
      (activeTab === "due" && doc.type === "DU-E") ||
      (activeTab === "duimp" && doc.type === "DUIMP");
    return matchesSearch && matchesType && matchesStatus && matchesTab;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">
              Documentos Aduaneiros
            </h1>
            <p className="text-muted-foreground mt-1">
              Gerencie DIs, DU-Es e DUIMPs
            </p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-tech-blue hover:bg-tech-blue-dark">
                <Upload className="w-4 h-4 mr-2" />
                Novo Documento
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Registrar Novo Documento</DialogTitle>
                <DialogDescription>
                  Selecione o tipo de documento para iniciar o registro
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label>Tipo de Documento</Label>
                  <Select defaultValue="di">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="di">DI - Declaração de Importação</SelectItem>
                      <SelectItem value="due">DU-E - Declaração de Exportação</SelectItem>
                      <SelectItem value="duimp">DUIMP - Declaração Única</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Processo Vinculado</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um processo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="imp-0089">IMP-2024-0089 - Tech Solutions</SelectItem>
                      <SelectItem value="imp-0088">IMP-2024-0088 - Global Trade</SelectItem>
                      <SelectItem value="exp-0034">EXP-2024-0034 - Brasil Exports</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Número do Documento</Label>
                  <Input placeholder="Ex: 24/0089123-5" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline">Cancelar</Button>
                <Button className="bg-tech-blue hover:bg-tech-blue-dark">Registrar</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Object.entries(typeConfig).map(([type, config]) => {
            const count = documents.filter((d) => d.type === type).length;
            return (
              <Card key={type} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setActiveTab(type.toLowerCase().replace("-", ""))}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{config.description}</p>
                      <p className="text-2xl font-bold mt-1">{count}</p>
                    </div>
                    <div className={cn("p-3 rounded-xl", `${config.color}/10`)}>
                      <FileText className={cn("w-6 h-6", config.color.replace("bg-", "text-"))} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Em Exigência</p>
                  <p className="text-2xl font-bold text-warning mt-1">
                    {documents.filter((d) => d.status === "em_exigencia").length}
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-warning/10">
                  <AlertCircle className="w-6 h-6 text-warning" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <TabsList>
                  <TabsTrigger value="all">Todos</TabsTrigger>
                  <TabsTrigger value="di">DI</TabsTrigger>
                  <TabsTrigger value="due">DU-E</TabsTrigger>
                  <TabsTrigger value="duimp">DUIMP</TabsTrigger>
                </TabsList>

                <div className="flex flex-wrap gap-2">
                  <div className="relative flex-1 min-w-[200px]">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar documento..."
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>

                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="registrada">Registrada</SelectItem>
                      <SelectItem value="desembaracada">Desembaraçada</SelectItem>
                      <SelectItem value="em_exigencia">Em Exigência</SelectItem>
                      <SelectItem value="averbada">Averbada</SelectItem>
                    </SelectContent>
                  </Select>

                  <div className="flex border rounded-md">
                    <Button
                      variant={viewMode === "table" ? "secondary" : "ghost"}
                      size="icon"
                      onClick={() => setViewMode("table")}
                    >
                      <List className="w-4 h-4" />
                    </Button>
                    <Button
                      variant={viewMode === "grid" ? "secondary" : "ghost"}
                      size="icon"
                      onClick={() => setViewMode("grid")}
                    >
                      <Grid3X3 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Tabs>
          </CardContent>
        </Card>

        {/* Content */}
        {viewMode === "table" ? (
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead>Tipo</TableHead>
                    <TableHead>Número</TableHead>
                    <TableHead>Processo</TableHead>
                    <TableHead className="hidden md:table-cell">Cliente</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden lg:table-cell">Canal</TableHead>
                    <TableHead className="hidden lg:table-cell">Data</TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDocuments.map((doc) => {
                    const StatusIcon = statusConfig[doc.status]?.icon || Clock;
                    return (
                      <TableRow key={doc.id} className="cursor-pointer hover:bg-muted/50">
                        <TableCell>
                          <Badge className={cn(typeConfig[doc.type]?.color, "text-white")}>
                            {doc.type}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <p className="font-mono font-medium">{doc.number}</p>
                        </TableCell>
                        <TableCell>
                          <p className="text-sm text-tech-blue font-medium">{doc.process}</p>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <p className="text-sm truncate max-w-[150px]">{doc.client}</p>
                        </TableCell>
                        <TableCell>
                          <Badge className={statusConfig[doc.status]?.color}>
                            {statusConfig[doc.status]?.label}
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          {doc.channel ? (
                            <Badge variant="outline" className={channelConfig[doc.channel]?.color}>
                              {channelConfig[doc.channel]?.label}
                            </Badge>
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Calendar className="w-3 h-3" />
                            {doc.date}
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
                                <Download className="w-4 h-4 mr-2" />
                                Baixar PDF
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-destructive cursor-pointer">
                                <Trash2 className="w-4 h-4 mr-2" />
                                Cancelar
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredDocuments.map((doc) => {
              const StatusIcon = statusConfig[doc.status]?.icon || Clock;
              return (
                <Card key={doc.id} className="hover:shadow-lg transition-shadow cursor-pointer group">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <Badge className={cn(typeConfig[doc.type]?.color, "text-white")}>
                        {doc.type}
                      </Badge>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="cursor-pointer">
                            <Eye className="w-4 h-4 mr-2" />
                            Visualizar
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer">
                            <Download className="w-4 h-4 mr-2" />
                            Baixar PDF
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <p className="font-mono font-bold text-lg mb-1">{doc.number}</p>
                    <p className="text-sm text-tech-blue font-medium mb-4">{doc.process}</p>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                      <Building2 className="w-4 h-4" />
                      <span className="truncate">{doc.client}</span>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t">
                      <Badge className={statusConfig[doc.status]?.color}>
                        {statusConfig[doc.status]?.label}
                      </Badge>
                      {doc.channel && (
                        <Badge variant="outline" className={channelConfig[doc.channel]?.color}>
                          {channelConfig[doc.channel]?.label}
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default Documents;
