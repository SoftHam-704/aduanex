import { useState } from "react";
import {
  Search,
  Plus,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Package,
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
import { Textarea } from "@/components/ui/textarea";
import { DashboardLayout } from "@/components/layout/dashboard-layout";

const products = [
  {
    id: 1,
    ncm: "8471.30.19",
    description: "Computadores portáteis (notebooks)",
    unit: "UN",
    category: "Eletrônicos",
    ii: 16,
    ipi: 15,
    status: "ativo",
    usageCount: 45,
  },
  {
    id: 2,
    ncm: "8528.72.00",
    description: "Monitores de vídeo LED/LCD",
    unit: "UN",
    category: "Eletrônicos",
    ii: 20,
    ipi: 15,
    status: "ativo",
    usageCount: 32,
  },
  {
    id: 3,
    ncm: "8471.60.53",
    description: "Teclados para computadores",
    unit: "UN",
    category: "Periféricos",
    ii: 16,
    ipi: 10,
    status: "ativo",
    usageCount: 28,
  },
  {
    id: 4,
    ncm: "8517.62.59",
    description: "Roteadores digitais",
    unit: "UN",
    category: "Telecomunicações",
    ii: 16,
    ipi: 15,
    status: "ativo",
    usageCount: 15,
  },
  {
    id: 5,
    ncm: "3926.90.90",
    description: "Artigos de plástico diversos",
    unit: "KG",
    category: "Plásticos",
    ii: 18,
    ipi: 5,
    status: "inativo",
    usageCount: 8,
  },
];

export function Products() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products.filter((product) =>
    product.ncm.includes(searchTerm) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = [
    { label: "Cadastrados", value: products.length, color: "text-foreground" },
    { label: "Ativos", value: products.filter((p) => p.status === "ativo").length, color: "text-success" },
    { label: "Categorias", value: 4, color: "text-primary" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-5">
        {/* Page header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold">Produtos / NCM</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Cadastro de produtos e classificação fiscal
            </p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Novo Produto
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Novo Produto</DialogTitle>
                <DialogDescription>
                  Cadastrar produto com classificação NCM
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label className="text-xs">NCM</Label>
                    <Input placeholder="0000.00.00" className="h-9 font-mono" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs">Unidade</Label>
                    <Input placeholder="UN, KG, etc" className="h-9" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">Descrição</Label>
                  <Textarea placeholder="Descrição do produto" className="min-h-[80px]" />
                </div>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="space-y-1.5">
                    <Label className="text-xs">II (%)</Label>
                    <Input type="number" placeholder="0" className="h-9 tabular-nums" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs">IPI (%)</Label>
                    <Input type="number" placeholder="0" className="h-9 tabular-nums" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs">PIS/COFINS (%)</Label>
                    <Input type="number" placeholder="0" className="h-9 tabular-nums" />
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

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por NCM ou descrição..."
            className="pl-9 h-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>NCM</TableHead>
                  <TableHead>Descrição</TableHead>
                  <TableHead className="hidden md:table-cell">Categoria</TableHead>
                  <TableHead className="hidden lg:table-cell text-right">II</TableHead>
                  <TableHead className="hidden lg:table-cell text-right">IPI</TableHead>
                  <TableHead className="text-right">Uso</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-10"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product.id} className="cursor-pointer">
                    <TableCell>
                      <span className="text-sm font-medium font-mono">{product.ncm}</span>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm truncate max-w-[250px]">{product.description}</p>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <span className="text-sm text-muted-foreground">{product.category}</span>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell text-right">
                      <span className="text-sm tabular-nums">{product.ii}%</span>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell text-right">
                      <span className="text-sm tabular-nums">{product.ipi}%</span>
                    </TableCell>
                    <TableCell className="text-right">
                      <span className="text-sm font-medium tabular-nums">{product.usageCount}</span>
                    </TableCell>
                    <TableCell>
                      <Badge variant={product.status === "ativo" ? "success" : "secondary"}>
                        {product.status === "ativo" ? "Ativo" : "Inativo"}
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
                {filteredProducts.length} produtos
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}

export default Products;
