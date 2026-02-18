import { useState } from "react";
import {
  Search,
  Plus,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Package,
  Tag,
  DollarSign,
  AlertTriangle,
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
import { Textarea } from "@/components/ui/textarea";
import { DashboardLayout } from "@/components/layout/dashboard-layout";

const products = [
  {
    id: 1,
    ncm: "8471.30.19",
    description: "Computador portátil (laptop)",
    ii: 16,
    ipi: 15,
    pis: 2.1,
    cofins: 9.65,
    icms: 18,
    exTarifario: null,
    status: "ativo",
  },
  {
    id: 2,
    ncm: "8528.72.00",
    description: "Monitor de vídeo LED/LCD",
    ii: 20,
    ipi: 15,
    pis: 2.1,
    cofins: 9.65,
    icms: 18,
    exTarifario: null,
    status: "ativo",
  },
  {
    id: 3,
    ncm: "8471.60.53",
    description: "Teclado para computador",
    ii: 16,
    ipi: 15,
    pis: 2.1,
    cofins: 9.65,
    icms: 18,
    exTarifario: null,
    status: "ativo",
  },
  {
    id: 4,
    ncm: "8517.62.59",
    description: "Roteador de rede wireless",
    ii: 16,
    ipi: 15,
    pis: 2.1,
    cofins: 9.65,
    icms: 18,
    exTarifario: "Ex 001",
    status: "ativo",
  },
  {
    id: 5,
    ncm: "8471.50.10",
    description: "Unidade de processamento (CPU)",
    ii: 0,
    ipi: 0,
    pis: 2.1,
    cofins: 9.65,
    icms: 18,
    exTarifario: "Ex 002",
    status: "ativo",
  },
  {
    id: 6,
    ncm: "8473.30.49",
    description: "Partes e acessórios para computadores",
    ii: 14,
    ipi: 10,
    pis: 2.1,
    cofins: 9.65,
    icms: 18,
    exTarifario: null,
    status: "inativo",
  },
];

export function Products() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.ncm.includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || product.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">Produtos / NCM</h1>
            <p className="text-muted-foreground mt-1">
              Cadastro de produtos e classificação fiscal
            </p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-tech-blue hover:bg-tech-blue-dark">
                <Plus className="w-4 h-4 mr-2" />
                Novo Produto
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Cadastrar Novo Produto</DialogTitle>
                <DialogDescription>
                  Preencha os dados do produto e classificação fiscal
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>NCM</Label>
                    <Input placeholder="0000.00.00" />
                  </div>
                  <div className="space-y-2">
                    <Label>Ex-Tarifário</Label>
                    <Input placeholder="Ex 000 (opcional)" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Descrição do Produto</Label>
                  <Textarea placeholder="Descrição detalhada do produto..." />
                </div>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="space-y-2">
                    <Label>II (%)</Label>
                    <Input type="number" placeholder="0" />
                  </div>
                  <div className="space-y-2">
                    <Label>IPI (%)</Label>
                    <Input type="number" placeholder="0" />
                  </div>
                  <div className="space-y-2">
                    <Label>ICMS (%)</Label>
                    <Input type="number" placeholder="0" />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>PIS (%)</Label>
                    <Input type="number" placeholder="0" />
                  </div>
                  <div className="space-y-2">
                    <Label>COFINS (%)</Label>
                    <Input type="number" placeholder="0" />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline">Cancelar</Button>
                <Button className="bg-tech-blue hover:bg-tech-blue-dark">Salvar</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-tech-blue/10">
                  <Package className="w-6 h-6 text-tech-blue" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total de Produtos</p>
                  <p className="text-2xl font-bold">{products.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-success/10">
                  <Tag className="w-6 h-6 text-success" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">NCMs Cadastrados</p>
                  <p className="text-2xl font-bold text-success">{products.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-purple/10">
                  <DollarSign className="w-6 h-6 text-purple" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Com Ex-Tarifário</p>
                  <p className="text-2xl font-bold text-purple">
                    {products.filter((p) => p.exTarifario).length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-warning/10">
                  <AlertTriangle className="w-6 h-6 text-warning" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Inativos</p>
                  <p className="text-2xl font-bold text-warning">
                    {products.filter((p) => p.status === "inativo").length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por NCM ou descrição..."
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
                  <SelectItem value="ativo">Ativos</SelectItem>
                  <SelectItem value="inativo">Inativos</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>NCM</TableHead>
                  <TableHead>Descrição</TableHead>
                  <TableHead className="text-center hidden md:table-cell">II</TableHead>
                  <TableHead className="text-center hidden md:table-cell">IPI</TableHead>
                  <TableHead className="text-center hidden lg:table-cell">PIS/COFINS</TableHead>
                  <TableHead className="text-center hidden lg:table-cell">ICMS</TableHead>
                  <TableHead className="hidden lg:table-cell">Ex-Tarifário</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product.id} className="cursor-pointer hover:bg-muted/50">
                    <TableCell>
                      <Badge variant="outline" className="font-mono text-sm">
                        {product.ncm}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <p className="font-medium text-sm max-w-[300px] truncate">
                        {product.description}
                      </p>
                    </TableCell>
                    <TableCell className="text-center hidden md:table-cell">
                      <span className={product.ii === 0 ? "text-success font-medium" : ""}>
                        {product.ii}%
                      </span>
                    </TableCell>
                    <TableCell className="text-center hidden md:table-cell">
                      <span className={product.ipi === 0 ? "text-success font-medium" : ""}>
                        {product.ipi}%
                      </span>
                    </TableCell>
                    <TableCell className="text-center hidden lg:table-cell">
                      {product.pis}% / {product.cofins}%
                    </TableCell>
                    <TableCell className="text-center hidden lg:table-cell">
                      {product.icms}%
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      {product.exTarifario ? (
                        <Badge className="bg-purple/20 text-purple border-purple/30" variant="outline">
                          {product.exTarifario}
                        </Badge>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={
                          product.status === "ativo"
                            ? "bg-success/20 text-success border-success/30"
                            : "bg-muted text-muted-foreground"
                        }
                        variant="outline"
                      >
                        {product.status === "ativo" ? "Ativo" : "Inativo"}
                      </Badge>
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
                            Detalhes
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

export default Products;
