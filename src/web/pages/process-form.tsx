import { useState } from "react";
import { Link } from "wouter";
import {
  ArrowLeft,
  Save,
  Ship,
  FileText,
  Package,
  DollarSign,
  Clock,
  Plus,
  Trash2,
  Upload,
  Eye,
  Download,
  CheckCircle2,
  AlertCircle,
  XCircle,
  MoreHorizontal,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { DashboardLayout } from "@/components/layout/dashboard-layout";

// Mock data
const mockDocuments = [
  { id: 1, name: "Invoice_2024001.pdf", type: "Fatura Comercial", size: "245 KB", status: "aprovado" },
  { id: 2, name: "BL_MSC123456.pdf", type: "B/L", size: "189 KB", status: "aprovado" },
  { id: 3, name: "Packing_List.xlsx", type: "Packing List", size: "78 KB", status: "pendente" },
  { id: 4, name: "Certificado_Origem.pdf", type: "Cert. Origem", size: "156 KB", status: "rejeitado" },
];

const mockItems = [
  { id: 1, ncm: "8471.30.19", description: "Computador portátil", qty: 100, unit: "UN", unitValue: 450.00, totalValue: 45000.00 },
  { id: 2, ncm: "8528.72.00", description: "Monitor LED 24\"", qty: 50, unit: "UN", unitValue: 180.00, totalValue: 9000.00 },
  { id: 3, ncm: "8471.60.53", description: "Teclado USB", qty: 200, unit: "UN", unitValue: 15.00, totalValue: 3000.00 },
];

const mockExpenses = [
  { id: 1, type: "Frete Internacional", value: 2500.00, currency: "USD" },
  { id: 2, type: "Seguro", value: 450.00, currency: "USD" },
  { id: 3, type: "THC", value: 850.00, currency: "BRL" },
  { id: 4, type: "Armazenagem", value: 1200.00, currency: "BRL" },
];

const mockTimeline = [
  { id: 1, title: "Processo criado", date: "10/01/2025 09:30", status: "completed" },
  { id: 2, title: "Documentos enviados", date: "10/01/2025 14:15", status: "completed" },
  { id: 3, title: "DI registrada", date: "11/01/2025 08:00", status: "completed" },
  { id: 4, title: "Em análise fiscal", date: "11/01/2025 08:30", status: "current" },
  { id: 5, title: "Desembaraço", date: "—", status: "pending" },
  { id: 6, title: "Entrega", date: "—", status: "pending" },
];

const docStatusConfig: Record<string, { variant: "success" | "warning" | "destructive" }> = {
  aprovado: { variant: "success" },
  pendente: { variant: "warning" },
  rejeitado: { variant: "destructive" },
};

export function ProcessForm() {
  const [activeTab, setActiveTab] = useState("geral");

  return (
    <DashboardLayout>
      <div className="space-y-5">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link href="/importacao">
              <Button variant="ghost" size="icon-sm">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-semibold font-mono">IMP-2024-0089</h1>
                <Badge variant="default">Em Análise</Badge>
              </div>
              <p className="text-sm text-muted-foreground">Tech Solutions LTDA</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">Cancelar</Button>
            <Button size="sm">
              <Save className="w-4 h-4 mr-2" />
              Salvar
            </Button>
          </div>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-4 px-4 py-3 bg-muted/30 rounded-lg">
          <Progress value={60} className="h-1.5 flex-1" />
          <span className="text-xs text-muted-foreground">60%</span>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="h-9 p-1">
            <TabsTrigger value="geral" className="text-xs h-7 px-3">
              <Ship className="w-3.5 h-3.5 mr-1.5" />
              Dados Gerais
            </TabsTrigger>
            <TabsTrigger value="documentos" className="text-xs h-7 px-3">
              <FileText className="w-3.5 h-3.5 mr-1.5" />
              Documentos
            </TabsTrigger>
            <TabsTrigger value="itens" className="text-xs h-7 px-3">
              <Package className="w-3.5 h-3.5 mr-1.5" />
              Itens
            </TabsTrigger>
            <TabsTrigger value="despesas" className="text-xs h-7 px-3">
              <DollarSign className="w-3.5 h-3.5 mr-1.5" />
              Despesas
            </TabsTrigger>
            <TabsTrigger value="timeline" className="text-xs h-7 px-3">
              <Clock className="w-3.5 h-3.5 mr-1.5" />
              Timeline
            </TabsTrigger>
          </TabsList>

          {/* Dados Gerais */}
          <TabsContent value="geral" className="space-y-4 mt-4">
            <div className="grid gap-4 lg:grid-cols-2">
              {/* Informações Principais */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Informações Principais</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <Label className="text-xs">Nº Processo</Label>
                      <Input value="IMP-2024-0089" disabled className="h-9 bg-muted/50" />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs">Nº DI</Label>
                      <Input defaultValue="24/0089123-5" className="h-9 font-mono" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs">Cliente/Importador</Label>
                    <Select defaultValue="tech">
                      <SelectTrigger className="h-9">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tech">Tech Solutions LTDA</SelectItem>
                        <SelectItem value="global">Global Trade Corp</SelectItem>
                        <SelectItem value="abc">ABC Comercial</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs">Fornecedor</Label>
                    <Select defaultValue="shenzhen">
                      <SelectTrigger className="h-9">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="shenzhen">Shenzhen Electronics Co.</SelectItem>
                        <SelectItem value="berlin">Berlin Machinery GmbH</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <Label className="text-xs">País de Origem</Label>
                      <Select defaultValue="china">
                        <SelectTrigger className="h-9">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="china">China</SelectItem>
                          <SelectItem value="alemanha">Alemanha</SelectItem>
                          <SelectItem value="eua">EUA</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs">Procedência</Label>
                      <Select defaultValue="china">
                        <SelectTrigger className="h-9">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="china">China</SelectItem>
                          <SelectItem value="singapura">Singapura</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Transporte */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Transporte</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <Label className="text-xs">Modal</Label>
                      <Select defaultValue="maritimo">
                        <SelectTrigger className="h-9">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="maritimo">Marítimo</SelectItem>
                          <SelectItem value="aereo">Aéreo</SelectItem>
                          <SelectItem value="rodoviario">Rodoviário</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs">Porto</Label>
                      <Select defaultValue="santos">
                        <SelectTrigger className="h-9">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="santos">Santos</SelectItem>
                          <SelectItem value="paranagua">Paranaguá</SelectItem>
                          <SelectItem value="itajai">Itajaí</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <Label className="text-xs">Navio/Voo</Label>
                      <Input defaultValue="MSC AURORA" className="h-9" />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs">B/L / AWB</Label>
                      <Input defaultValue="MSCUXXX123456" className="h-9 font-mono" />
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <Label className="text-xs">Container(s)</Label>
                      <Input defaultValue="MSCU1234567" className="h-9 font-mono" />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs">Incoterm</Label>
                      <Select defaultValue="fob">
                        <SelectTrigger className="h-9">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="exw">EXW</SelectItem>
                          <SelectItem value="fob">FOB</SelectItem>
                          <SelectItem value="cif">CIF</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <Label className="text-xs">ETD</Label>
                      <Input type="date" defaultValue="2025-01-05" className="h-9" />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs">ETA</Label>
                      <Input type="date" defaultValue="2025-01-15" className="h-9" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Valores */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Valores</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <Label className="text-xs">Moeda</Label>
                      <Select defaultValue="usd">
                        <SelectTrigger className="h-9">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="usd">USD</SelectItem>
                          <SelectItem value="eur">EUR</SelectItem>
                          <SelectItem value="gbp">GBP</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs">Taxa Câmbio</Label>
                      <Input type="number" step="0.0001" defaultValue="5.0000" className="h-9 tabular-nums" />
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="space-y-1.5">
                      <Label className="text-xs">FOB</Label>
                      <Input type="number" defaultValue="45000.00" className="h-9 tabular-nums" />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs">Frete</Label>
                      <Input type="number" defaultValue="2500.00" className="h-9 tabular-nums" />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs">Seguro</Label>
                      <Input type="number" defaultValue="450.00" className="h-9 tabular-nums" />
                    </div>
                  </div>
                  <div className="p-3 bg-muted/30 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">Total CIF</span>
                      <span className="text-lg font-semibold tabular-nums">USD 47,950.00</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Observações */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Observações</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Notas adicionais..."
                    className="min-h-[120px] text-sm"
                    defaultValue="Carga com material eletrônico. Verificar licenciamento DECEX."
                  />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Documentos */}
          <TabsContent value="documentos" className="space-y-4 mt-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <CardTitle>Documentos</CardTitle>
                <Button size="sm">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload
                </Button>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Arquivo</TableHead>
                      <TableHead className="hidden sm:table-cell">Tipo</TableHead>
                      <TableHead className="hidden md:table-cell">Tamanho</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="w-10"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockDocuments.map((doc) => (
                      <TableRow key={doc.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm font-medium">{doc.name}</span>
                          </div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell text-sm text-muted-foreground">
                          {doc.type}
                        </TableCell>
                        <TableCell className="hidden md:table-cell text-sm text-muted-foreground">
                          {doc.size}
                        </TableCell>
                        <TableCell>
                          <Badge variant={docStatusConfig[doc.status]?.variant || "default"}>
                            {doc.status === "aprovado" ? "Aprovado" : doc.status === "pendente" ? "Pendente" : "Rejeitado"}
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
                                <Download className="w-4 h-4 mr-2" />
                                Download
                              </DropdownMenuItem>
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
              </CardContent>
            </Card>
          </TabsContent>

          {/* Itens */}
          <TabsContent value="itens" className="space-y-4 mt-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <CardTitle>Mercadorias</CardTitle>
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar
                </Button>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>NCM</TableHead>
                      <TableHead>Descrição</TableHead>
                      <TableHead className="text-right">Qtd</TableHead>
                      <TableHead className="hidden md:table-cell text-right">Unit.</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                      <TableHead className="w-10"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-mono text-sm">{item.ncm}</TableCell>
                        <TableCell className="text-sm">{item.description}</TableCell>
                        <TableCell className="text-right tabular-nums">{item.qty} {item.unit}</TableCell>
                        <TableCell className="hidden md:table-cell text-right tabular-nums">${item.unitValue.toFixed(2)}</TableCell>
                        <TableCell className="text-right font-medium tabular-nums">${item.totalValue.toLocaleString()}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon-sm">
                            <Trash2 className="w-4 h-4 text-muted-foreground" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="p-4 border-t bg-muted/20">
                  <div className="flex justify-end gap-8">
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Total de Itens</p>
                      <p className="text-sm font-medium">{mockItems.length}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Valor Total</p>
                      <p className="text-lg font-semibold tabular-nums">$57,000.00</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Despesas */}
          <TabsContent value="despesas" className="space-y-4 mt-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <CardTitle>Despesas</CardTitle>
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar
                </Button>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tipo</TableHead>
                      <TableHead className="text-right">Moeda</TableHead>
                      <TableHead className="text-right">Valor</TableHead>
                      <TableHead className="w-10"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockExpenses.map((expense) => (
                      <TableRow key={expense.id}>
                        <TableCell className="text-sm">{expense.type}</TableCell>
                        <TableCell className="text-right text-sm text-muted-foreground">{expense.currency}</TableCell>
                        <TableCell className="text-right font-medium tabular-nums">{expense.value.toLocaleString()}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon-sm">
                            <Trash2 className="w-4 h-4 text-muted-foreground" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="p-4 border-t bg-muted/20">
                  <div className="flex justify-end">
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Total Despesas</p>
                      <p className="text-lg font-semibold tabular-nums">R$ 7,500.00</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Timeline */}
          <TabsContent value="timeline" className="space-y-4 mt-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Timeline do Processo</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockTimeline.map((item, index) => (
                    <div key={item.id} className="flex gap-3">
                      <div className="relative flex flex-col items-center">
                        <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${
                          item.status === "completed" 
                            ? "bg-success" 
                            : item.status === "current" 
                            ? "bg-primary" 
                            : "bg-muted"
                        }`} />
                        {index < mockTimeline.length - 1 && (
                          <div className={`w-px flex-1 min-h-[40px] ${
                            item.status === "completed" ? "bg-success/30" : "bg-border"
                          }`} />
                        )}
                      </div>
                      <div className="pb-4 flex-1">
                        <p className={`text-sm font-medium ${
                          item.status === "pending" ? "text-muted-foreground" : ""
                        }`}>
                          {item.title}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">{item.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}

export default ProcessForm;
