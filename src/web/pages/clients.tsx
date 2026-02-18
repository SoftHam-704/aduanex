import { useState } from "react";
import {
  Search,
  Plus,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Building2,
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DashboardLayout } from "@/components/layout/dashboard-layout";

const clients = [
  {
    id: 1,
    name: "Tech Solutions LTDA",
    cnpj: "12.345.678/0001-90",
    email: "contato@techsolutions.com.br",
    phone: "(11) 3456-7890",
    city: "São Paulo",
    state: "SP",
    status: "ativo",
    processes: 15,
  },
  {
    id: 2,
    name: "Global Trade Corp",
    cnpj: "98.765.432/0001-10",
    email: "import@globaltrade.com.br",
    phone: "(21) 2345-6789",
    city: "Rio de Janeiro",
    state: "RJ",
    status: "ativo",
    processes: 8,
  },
  {
    id: 3,
    name: "Brasil Exports S.A.",
    cnpj: "45.678.901/0001-23",
    email: "export@brasilexports.com.br",
    phone: "(47) 3456-7890",
    city: "Itajaí",
    state: "SC",
    status: "ativo",
    processes: 12,
  },
  {
    id: 4,
    name: "Importadora Nacional",
    cnpj: "34.567.890/0001-12",
    email: "compras@importadoranacional.com.br",
    phone: "(41) 4567-8901",
    city: "Curitiba",
    state: "PR",
    status: "inativo",
    processes: 3,
  },
  {
    id: 5,
    name: "AgroExport Brasil",
    cnpj: "56.789.012/0001-34",
    email: "comercial@agroexport.com.br",
    phone: "(62) 5678-9012",
    city: "Goiânia",
    state: "GO",
    status: "ativo",
    processes: 20,
  },
];

const getInitials = (name: string) => {
  return name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();
};

export function Clients() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredClients = clients.filter((client) => {
    const matchesSearch =
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.cnpj.includes(searchTerm) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || client.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = [
    { label: "Ativos", value: clients.filter((c) => c.status === "ativo").length, color: "text-success" },
    { label: "Inativos", value: clients.filter((c) => c.status === "inativo").length, color: "text-muted-foreground" },
    { label: "Total Processos", value: clients.reduce((acc, c) => acc + c.processes, 0), color: "text-primary" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-5">
        {/* Page header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold">Clientes</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Importadores e exportadores
            </p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Novo Cliente
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Novo Cliente</DialogTitle>
                <DialogDescription>
                  Cadastrar cliente
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label className="text-xs">Razão Social</Label>
                    <Input placeholder="Nome da empresa" className="h-9" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs">CNPJ</Label>
                    <Input placeholder="00.000.000/0000-00" className="h-9 font-mono" />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label className="text-xs">E-mail</Label>
                    <Input type="email" placeholder="email@empresa.com" className="h-9" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs">Telefone</Label>
                    <Input placeholder="(00) 0000-0000" className="h-9" />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label className="text-xs">Cidade</Label>
                    <Input placeholder="Cidade" className="h-9" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs">Estado</Label>
                    <Select>
                      <SelectTrigger className="h-9">
                        <SelectValue placeholder="UF" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="SP">SP</SelectItem>
                        <SelectItem value="RJ">RJ</SelectItem>
                        <SelectItem value="SC">SC</SelectItem>
                        <SelectItem value="PR">PR</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" size="sm">Cancelar</Button>
                <Button size="sm">Cadastrar</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats row */}
        <div className="flex flex-wrap gap-6 py-3 px-4 bg-muted/30 rounded-lg">
          {stats.map((stat) => (
            <div key={stat.label} className="flex items-baseline gap-2">
              <span className={`text-xl font-semibold tabular-nums ${stat.color}`}>{stat.value}</span>
              <span className="text-xs text-muted-foreground">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar cliente..."
              className="pl-9 h-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-32 h-9">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="ativo">Ativos</SelectItem>
              <SelectItem value="inativo">Inativos</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Cliente</TableHead>
                  <TableHead className="hidden md:table-cell">CNPJ</TableHead>
                  <TableHead className="hidden lg:table-cell">Contato</TableHead>
                  <TableHead className="hidden md:table-cell">Local</TableHead>
                  <TableHead className="text-right">Processos</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-10"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClients.map((client) => (
                  <TableRow key={client.id} className="cursor-pointer">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <span className="text-xs font-medium text-primary">{getInitials(client.name)}</span>
                        </div>
                        <span className="text-sm font-medium truncate max-w-[180px]">{client.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <span className="text-sm font-mono text-muted-foreground">{client.cnpj}</span>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <span className="text-sm text-muted-foreground truncate max-w-[180px]">{client.email}</span>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <span className="text-sm">{client.city}/{client.state}</span>
                    </TableCell>
                    <TableCell className="text-right">
                      <span className="text-sm font-medium tabular-nums">{client.processes}</span>
                    </TableCell>
                    <TableCell>
                      <Badge variant={client.status === "ativo" ? "success" : "secondary"}>
                        {client.status === "ativo" ? "Ativo" : "Inativo"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon-sm">
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

            <div className="flex items-center justify-between px-4 py-3 border-t border-border">
              <p className="text-xs text-muted-foreground">
                {filteredClients.length} clientes
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}

export default Clients;
