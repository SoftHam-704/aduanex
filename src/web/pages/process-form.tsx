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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
import { cn } from "@/lib/utils";

// Mock data for demonstration
const mockDocuments = [
  { id: 1, name: "Invoice_2024001.pdf", type: "Fatura Comercial", size: "245 KB", status: "aprovado" },
  { id: 2, name: "BL_MSC123456.pdf", type: "B/L", size: "189 KB", status: "aprovado" },
  { id: 3, name: "Packing_List.xlsx", type: "Packing List", size: "78 KB", status: "pendente" },
  { id: 4, name: "Certificado_Origem.pdf", type: "Certificado de Origem", size: "156 KB", status: "rejeitado" },
];

const mockItems = [
  { id: 1, ncm: "8471.30.19", description: "Computador portátil", qty: 100, unit: "UN", unitValue: 450.00, totalValue: 45000.00 },
  { id: 2, ncm: "8528.72.00", description: "Monitor LED 24 polegadas", qty: 50, unit: "UN", unitValue: 180.00, totalValue: 9000.00 },
  { id: 3, ncm: "8471.60.53", description: "Teclado USB", qty: 200, unit: "UN", unitValue: 15.00, totalValue: 3000.00 },
];

const mockExpenses = [
  { id: 1, type: "Frete Internacional", value: 2500.00, currency: "USD" },
  { id: 2, type: "Seguro", value: 450.00, currency: "USD" },
  { id: 3, type: "THC", value: 850.00, currency: "BRL" },
  { id: 4, type: "Armazenagem", value: 1200.00, currency: "BRL" },
  { id: 5, type: "Despachante", value: 2500.00, currency: "BRL" },
];

const mockTimeline = [
  { id: 1, title: "Processo criado", description: "Cadastro inicial do processo", date: "10/01/2025 09:30", status: "completed" },
  { id: 2, title: "Documentos enviados", description: "Upload de Invoice e B/L", date: "10/01/2025 14:15", status: "completed" },
  { id: 3, title: "DI registrada", description: "Registro no SISCOMEX: 24/0089123-5", date: "11/01/2025 08:00", status: "completed" },
  { id: 4, title: "Em análise fiscal", description: "Aguardando parametrização", date: "11/01/2025 08:30", status: "current" },
  { id: 5, title: "Desembaraço", description: "Pendente", date: "-", status: "pending" },
  { id: 6, title: "Entrega", description: "Pendente", date: "-", status: "pending" },
];

const docStatusConfig: Record<string, { label: string; color: string; icon: React.ElementType }> = {
  aprovado: { label: "Aprovado", color: "text-success", icon: CheckCircle2 },
  pendente: { label: "Pendente", color: "text-warning", icon: AlertCircle },
  rejeitado: { label: "Rejeitado", color: "text-destructive", icon: XCircle },
};

export function ProcessForm() {
  const [activeTab, setActiveTab] = useState("geral");

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link href="/importacao">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">IMP-2024-0089</h1>
                <Badge className="bg-tech-blue text-white">Em Análise</Badge>
              </div>
              <p className="text-muted-foreground mt-1">Tech Solutions LTDA</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">Cancelar</Button>
            <Button className="bg-tech-blue hover:bg-tech-blue-dark">
              <Save className="w-4 h-4 mr-2" />
              Salvar Alterações
            </Button>
          </div>
        </div>

        {/* Progress bar */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Progresso do Processo</span>
              <span className="text-sm text-muted-foreground">60%</span>
            </div>
            <Progress value={60} className="h-2" />
            <div className="flex justify-between mt-2 text-xs text-muted-foreground">
              <span>Cadastro</span>
              <span>Documentos</span>
              <span>Registro</span>
              <span>Análise</span>
              <span>Desembaraço</span>
              <span>Entrega</span>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:inline-grid">
            <TabsTrigger value="geral" className="gap-2">
              <Ship className="w-4 h-4 hidden sm:block" />
              Dados Gerais
            </TabsTrigger>
            <TabsTrigger value="documentos" className="gap-2">
              <FileText className="w-4 h-4 hidden sm:block" />
              Documentos
            </TabsTrigger>
            <TabsTrigger value="itens" className="gap-2">
              <Package className="w-4 h-4 hidden sm:block" />
              Itens
            </TabsTrigger>
            <TabsTrigger value="despesas" className="gap-2">
              <DollarSign className="w-4 h-4 hidden sm:block" />
              Despesas
            </TabsTrigger>
            <TabsTrigger value="timeline" className="gap-2">
              <Clock className="w-4 h-4 hidden sm:block" />
              Timeline
            </TabsTrigger>
          </TabsList>

          {/* Dados Gerais */}
          <TabsContent value="geral" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Informações Principais */}
              <Card>
                <CardHeader>
                  <CardTitle>Informações Principais</CardTitle>
                  <CardDescription>Dados básicos do processo de importação</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="processo">Nº Processo</Label>
                      <Input id="processo" value="IMP-2024-0089" disabled />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="di">Nº DI</Label>
                      <Input id="di" value="24/0089123-5" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cliente">Cliente/Importador</Label>
                    <Select defaultValue="tech">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tech">Tech Solutions LTDA</SelectItem>
                        <SelectItem value="global">Global Trade Corp</SelectItem>
                        <SelectItem value="abc">ABC Comercial</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fornecedor">Fornecedor/Exportador</Label>
                    <Select defaultValue="shenzhen">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="shenzhen">Shenzhen Electronics Co.</SelectItem>
                        <SelectItem value="berlin">Berlin Machinery GmbH</SelectItem>
                        <SelectItem value="tokyo">Tokyo Industrial Ltd</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="origem">País de Origem</Label>
                      <Select defaultValue="china">
                        <SelectTrigger>
                          <SelectValue />
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
                      <Label htmlFor="procedencia">País de Procedência</Label>
                      <Select defaultValue="china">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="china">China</SelectItem>
                          <SelectItem value="singapura">Singapura</SelectItem>
                          <SelectItem value="hong-kong">Hong Kong</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Transporte */}
              <Card>
                <CardHeader>
                  <CardTitle>Dados de Transporte</CardTitle>
                  <CardDescription>Informações sobre o transporte da carga</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="modal">Modal</Label>
                      <Select defaultValue="maritimo">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="maritimo">Marítimo</SelectItem>
                          <SelectItem value="aereo">Aéreo</SelectItem>
                          <SelectItem value="rodoviario">Rodoviário</SelectItem>
                          <SelectItem value="multimodal">Multimodal</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="porto">Porto/Aeroporto</Label>
                      <Select defaultValue="santos">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="santos">Santos</SelectItem>
                          <SelectItem value="paranagua">Paranaguá</SelectItem>
                          <SelectItem value="itajai">Itajaí</SelectItem>
                          <SelectItem value="guarulhos">Guarulhos</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="navio">Navio/Voo</Label>
                      <Input id="navio" defaultValue="MSC AURORA" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bl">Nº B/L / AWB</Label>
                      <Input id="bl" defaultValue="MSCUXXX123456" />
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="container">Container(s)</Label>
                      <Input id="container" defaultValue="MSCU1234567, MSCU7654321" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="incoterm">Incoterm</Label>
                      <Select defaultValue="fob">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="exw">EXW</SelectItem>
                          <SelectItem value="fob">FOB</SelectItem>
                          <SelectItem value="cfr">CFR</SelectItem>
                          <SelectItem value="cif">CIF</SelectItem>
                          <SelectItem value="ddp">DDP</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="etd">ETD (Embarque)</Label>
                      <Input id="etd" type="date" defaultValue="2025-01-05" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="eta">ETA (Chegada)</Label>
                      <Input id="eta" type="date" defaultValue="2025-01-15" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Valores */}
              <Card>
                <CardHeader>
                  <CardTitle>Valores da Operação</CardTitle>
                  <CardDescription>Informações financeiras</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="moeda">Moeda</Label>
                      <Select defaultValue="usd">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="usd">USD - Dólar Americano</SelectItem>
                          <SelectItem value="eur">EUR - Euro</SelectItem>
                          <SelectItem value="gbp">GBP - Libra Esterlina</SelectItem>
                          <SelectItem value="jpy">JPY - Iene Japonês</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="taxa">Taxa de Câmbio</Label>
                      <Input id="taxa" type="number" step="0.0001" defaultValue="5.0000" />
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="valorFob">Valor FOB</Label>
                      <Input id="valorFob" type="number" defaultValue="45000.00" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="valorFrete">Valor Frete</Label>
                      <Input id="valorFrete" type="number" defaultValue="2500.00" />
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="valorSeguro">Valor Seguro</Label>
                      <Input id="valorSeguro" type="number" defaultValue="450.00" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="valorCif">Valor CIF (Total)</Label>
                      <Input id="valorCif" type="number" value="47950.00" disabled className="bg-muted font-semibold" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Observações */}
              <Card>
                <CardHeader>
                  <CardTitle>Observações</CardTitle>
                  <CardDescription>Notas e informações adicionais</CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Digite observações sobre o processo..."
                    className="min-h-[150px]"
                    defaultValue="Carga com material eletrônico. Verificar licenciamento DECEX. Cliente solicita liberação urgente."
                  />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Documentos */}
          <TabsContent value="documentos" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Documentos do Processo</CardTitle>
                  <CardDescription>Gerencie os documentos relacionados ao processo</CardDescription>
                </div>
                <Button className="bg-tech-blue hover:bg-tech-blue-dark">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload
                </Button>
              </CardHeader>
              <CardContent>
                {/* Upload area */}
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center mb-6 hover:border-tech-blue/50 transition-colors cursor-pointer">
                  <Upload className="w-10 h-10 mx-auto text-muted-foreground mb-3" />
                  <p className="font-medium">Arraste arquivos aqui ou clique para selecionar</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    PDF, XLSX, DOC até 10MB cada
                  </p>
                </div>

                {/* Documents list */}
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Documento</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Tamanho</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="w-12"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockDocuments.map((doc) => {
                      const StatusIcon = docStatusConfig[doc.status].icon;
                      return (
                        <TableRow key={doc.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="p-2 rounded-lg bg-tech-blue/10">
                                <FileText className="w-4 h-4 text-tech-blue" />
                              </div>
                              <span className="font-medium text-sm">{doc.name}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-sm">{doc.type}</TableCell>
                          <TableCell className="text-sm text-muted-foreground">{doc.size}</TableCell>
                          <TableCell>
                            <div className={cn("flex items-center gap-1.5", docStatusConfig[doc.status].color)}>
                              <StatusIcon className="w-4 h-4" />
                              <span className="text-sm font-medium">{docStatusConfig[doc.status].label}</span>
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
                                  Baixar
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive cursor-pointer">
                                  <Trash2 className="w-4 h-4 mr-2" />
                                  Excluir
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
          </TabsContent>

          {/* Itens/Mercadorias */}
          <TabsContent value="itens" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Itens da Importação</CardTitle>
                  <CardDescription>Lista de mercadorias importadas</CardDescription>
                </div>
                <Button className="bg-tech-blue hover:bg-tech-blue-dark">
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar Item
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>NCM</TableHead>
                      <TableHead>Descrição</TableHead>
                      <TableHead className="text-right">Qtd</TableHead>
                      <TableHead>Unid</TableHead>
                      <TableHead className="text-right">Valor Unit (USD)</TableHead>
                      <TableHead className="text-right">Valor Total (USD)</TableHead>
                      <TableHead className="w-12"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <Badge variant="outline" className="font-mono">
                            {item.ncm}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-medium">{item.description}</TableCell>
                        <TableCell className="text-right">{item.qty}</TableCell>
                        <TableCell>{item.unit}</TableCell>
                        <TableCell className="text-right">{item.unitValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</TableCell>
                        <TableCell className="text-right font-semibold">
                          {item.totalValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
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
                                Detalhes NCM
                              </DropdownMenuItem>
                              <DropdownMenuItem className="cursor-pointer">
                                <Package className="w-4 h-4 mr-2" />
                                Editar
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive cursor-pointer">
                                <Trash2 className="w-4 h-4 mr-2" />
                                Remover
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {/* Total */}
                <div className="flex justify-end mt-4 pt-4 border-t">
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Total dos Itens</p>
                    <p className="text-2xl font-bold text-tech-blue">
                      USD {mockItems.reduce((sum, item) => sum + item.totalValue, 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Despesas */}
          <TabsContent value="despesas" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-3">
              <Card className="lg:col-span-2">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Despesas do Processo</CardTitle>
                    <CardDescription>Custos relacionados à importação</CardDescription>
                  </div>
                  <Button className="bg-tech-blue hover:bg-tech-blue-dark">
                    <Plus className="w-4 h-4 mr-2" />
                    Nova Despesa
                  </Button>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Tipo de Despesa</TableHead>
                        <TableHead className="text-right">Valor</TableHead>
                        <TableHead>Moeda</TableHead>
                        <TableHead className="w-12"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockExpenses.map((expense) => (
                        <TableRow key={expense.id}>
                          <TableCell className="font-medium">{expense.type}</TableCell>
                          <TableCell className="text-right">
                            {expense.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{expense.currency}</Badge>
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Resumo de Custos</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b">
                    <span className="text-muted-foreground">Valor CIF</span>
                    <span className="font-semibold">USD 47,950.00</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b">
                    <span className="text-muted-foreground">Despesas (USD)</span>
                    <span className="font-semibold">USD 2,950.00</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b">
                    <span className="text-muted-foreground">Despesas (BRL)</span>
                    <span className="font-semibold">R$ 4,550.00</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b">
                    <span className="text-muted-foreground">II (Estimado)</span>
                    <span className="font-semibold">R$ 35,962.50</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b">
                    <span className="text-muted-foreground">IPI (Estimado)</span>
                    <span className="font-semibold">R$ 14,385.00</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b">
                    <span className="text-muted-foreground">ICMS (Estimado)</span>
                    <span className="font-semibold">R$ 52,178.00</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 text-lg">
                    <span className="font-semibold">Total Estimado</span>
                    <span className="font-bold text-tech-blue">R$ 361,825.50</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Timeline */}
          <TabsContent value="timeline" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Histórico do Processo</CardTitle>
                <CardDescription>Acompanhe todas as etapas e eventos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  {mockTimeline.map((event, index) => (
                    <div key={event.id} className="flex gap-4 pb-8 last:pb-0">
                      {/* Line */}
                      <div className="relative flex flex-col items-center">
                        <div
                          className={cn(
                            "w-10 h-10 rounded-full flex items-center justify-center z-10",
                            event.status === "completed"
                              ? "bg-success/20 text-success"
                              : event.status === "current"
                              ? "bg-tech-blue/20 text-tech-blue animate-pulse-glow"
                              : "bg-muted text-muted-foreground"
                          )}
                        >
                          {event.status === "completed" ? (
                            <CheckCircle2 className="w-5 h-5" />
                          ) : event.status === "current" ? (
                            <Clock className="w-5 h-5" />
                          ) : (
                            <div className="w-3 h-3 rounded-full bg-current" />
                          )}
                        </div>
                        {index < mockTimeline.length - 1 && (
                          <div
                            className={cn(
                              "absolute top-10 w-0.5 h-full",
                              event.status === "completed" ? "bg-success" : "bg-border"
                            )}
                          />
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 pt-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold">{event.title}</h4>
                          <span className="text-sm text-muted-foreground">{event.date}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{event.description}</p>
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
