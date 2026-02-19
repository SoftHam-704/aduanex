import { useState } from "react";
import {
  Search,
  Upload,
  FileText,
  Eye,
  Download,
  Trash2,
  MoreHorizontal,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardLayout } from "@/components/layout/dashboard-layout";

// Mock data
const documents = [
  {
    id: "DI-2024-0089",
    type: "DI",
    number: "24/0089123-5",
    process: "IMP-2024-0089",
    client: "Tech Solutions LTDA",
    status: "registrada",
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
    date: "13/01/2025",
    channel: "amarelo",
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
  registrada: { label: "Registrada", variant: "info" },
  desembaracada: { label: "Liberada", variant: "success" },
  em_exigencia: { label: "Exigência", variant: "warning" },
  cancelada: { label: "Cancelada", variant: "destructive" },
  averbada: { label: "Averbada", variant: "success" },
  em_analise: { label: "Em Análise", variant: "info" },
};

const channelConfig: Record<string, { label: string; color: string }> = {
  verde: { label: "Verde", color: `text-[${COLORS.green}]` },
  amarelo: { label: "Amarelo", color: `text-[${COLORS.yellow}]` },
  vermelho: { label: "Vermelho", color: `text-[${COLORS.red}]` },
};

export function Documents() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [activeTab, setActiveTab] = useState("all");

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.process.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.client.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || doc.status === statusFilter;
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "di" && doc.type === "DI") ||
      (activeTab === "due" && doc.type === "DU-E") ||
      (activeTab === "duimp" && doc.type === "DUIMP");
    return matchesSearch && matchesStatus && matchesTab;
  });

  const stats = [
    { label: "DI", value: documents.filter((d) => d.type === "DI").length, color: `text-[${COLORS.blue}]` },
    { label: "DU-E", value: documents.filter((d) => d.type === "DU-E").length, color: `text-[${COLORS.green}]` },
    { label: "DUIMP", value: documents.filter((d) => d.type === "DUIMP").length, color: `text-[${COLORS.orange}]` },
    { label: "Exigências", value: documents.filter((d) => d.status === "em_exigencia").length, color: `text-[${COLORS.yellow}]` },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-5">
        {/* Page header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold">Documentos Aduaneiros</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Gerencie DIs, DU-Es e DUIMPs
            </p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Upload className="w-4 h-4 mr-2" />
                Novo Documento
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[400px]">
              <DialogHeader>
                <DialogTitle>Novo Documento</DialogTitle>
                <DialogDescription>
                  Registrar documento aduaneiro
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-1.5">
                  <Label className="text-xs">Tipo</Label>
                  <Select defaultValue="di">
                    <SelectTrigger className="h-9">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="di">DI - Declaração de Importação</SelectItem>
                      <SelectItem value="due">DU-E - Declaração de Exportação</SelectItem>
                      <SelectItem value="duimp">DUIMP</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">Processo</Label>
                  <Select>
                    <SelectTrigger className="h-9">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="imp-0089">IMP-2024-0089</SelectItem>
                      <SelectItem value="imp-0088">IMP-2024-0088</SelectItem>
                      <SelectItem value="exp-0034">EXP-2024-0034</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">Número</Label>
                  <Input placeholder="24/0089123-5" className="h-9 font-mono" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" size="sm">Cancelar</Button>
                <Button size="sm">Registrar</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
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
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="h-9 p-1">
              <TabsTrigger value="all" className="text-xs h-7 px-3">Todos</TabsTrigger>
              <TabsTrigger value="di" className="text-xs h-7 px-3">DI</TabsTrigger>
              <TabsTrigger value="due" className="text-xs h-7 px-3">DU-E</TabsTrigger>
              <TabsTrigger value="duimp" className="text-xs h-7 px-3">DUIMP</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex flex-1 gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Buscar..."
                className="pl-9 h-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-36 h-9">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="registrada">Registrada</SelectItem>
                <SelectItem value="desembaracada">Liberada</SelectItem>
                <SelectItem value="em_exigencia">Exigência</SelectItem>
                <SelectItem value="averbada">Averbada</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Documento</TableHead>
                  <TableHead className="hidden md:table-cell">Processo</TableHead>
                  <TableHead className="hidden lg:table-cell">Cliente</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden md:table-cell">Canal</TableHead>
                  <TableHead className="hidden lg:table-cell">Data</TableHead>
                  <TableHead className="w-10"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDocuments.map((doc) => (
                  <TableRow key={doc.id} className="cursor-pointer text-xs">
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <FileText className="w-3.5 h-3.5 text-muted-foreground" />
                        <div>
                          <p className="font-medium font-mono text-xs">{doc.number}</p>
                          <p className="text-[10px] text-muted-foreground">{doc.type}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <span className="font-mono text-xs">{doc.process}</span>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <span className="text-xs truncate max-w-[140px]">{doc.client}</span>
                    </TableCell>
                    <TableCell>
                      <Badge variant={statusConfig[doc.status]?.variant || "default"} className="text-[10px] px-1.5 py-0">
                        {statusConfig[doc.status]?.label}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {doc.channel ? (
                        <span className={`text-xs font-medium ${channelConfig[doc.channel]?.color}`}>
                          {channelConfig[doc.channel]?.label}
                        </span>
                      ) : (
                        <span className="text-xs text-muted-foreground">—</span>
                      )}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <span className="text-xs text-muted-foreground">{doc.date}</span>
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
                            <Download className="w-3.5 h-3.5 mr-1.5" />
                            Download
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
                {filteredDocuments.length} documentos
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}

export default Documents;
