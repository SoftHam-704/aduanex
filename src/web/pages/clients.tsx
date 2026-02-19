import { useState } from "react";
import { toast } from "sonner";
import {
  Search,
  Plus,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Building2,
  Globe,
  Phone,
  Mail,
  MapPin,
  Landmark,
  AlertTriangle,
  X,
  Check,
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
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardLayout } from "@/components/layout/dashboard-layout";

// Types
interface ContactInfo {
  nome: string;
  email: string;
  telefone: string;
}

interface BankInfo {
  banco: string;
  swift: string;
  iban: string;
  agencia: string;
  conta: string;
}

interface CommercialConditions {
  moedaPadrao: string;
  incoterm: string;
  condicaoPagamento: string;
  prazoDias: number;
  limiteCredito: number;
  observacoes: string;
}

interface Client {
  id: number;
  tipoPessoa: "juridica" | "fisica";
  cnpjCpf: string;
  razaoSocial: string;
  nomeFantasia: string;
  pais: string;
  // Endereço
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;
  cepZip: string;
  // Contatos
  comercial: ContactInfo;
  financeiro: ContactInfo;
  // Dados Bancários
  dadosBancarios: BankInfo;
  // Condições Comerciais
  condicoesComerciais: CommercialConditions;
  // Status e metadados
  status: "ativo" | "inativo";
  dataCadastro: string;
}

// Initial mock data
const initialClients: Client[] = [
  {
    id: 1,
    tipoPessoa: "juridica",
    cnpjCpf: "12.345.678/0001-90",
    razaoSocial: "Tech Solutions International LTDA",
    nomeFantasia: "Tech Solutions",
    pais: "Brasil",
    logradouro: "Av. Paulista",
    numero: "1000",
    complemento: "Sala 1501",
    bairro: "Bela Vista",
    cidade: "São Paulo",
    estado: "SP",
    cepZip: "01310-100",
    comercial: {
      nome: "Carlos Silva",
      email: "carlos@techsolutions.com.br",
      telefone: "(11) 3456-7890",
    },
    financeiro: {
      nome: "Ana Costa",
      email: "financeiro@techsolutions.com.br",
      telefone: "(11) 3456-7891",
    },
    dadosBancarios: {
      banco: "Banco do Brasil",
      swift: "BRASBRRJXXX",
      iban: "",
      agencia: "1234-5",
      conta: "12345-6",
    },
    condicoesComerciais: {
      moedaPadrao: "USD",
      incoterm: "FOB",
      condicaoPagamento: "À Vista",
      prazoDias: 30,
      limiteCredito: 500000,
      observacoes: "Cliente preferencial. Desconto de 5% em volumes acima de USD 100k.",
    },
    status: "ativo",
    dataCadastro: "2023-05-15",
  },
  {
    id: 2,
    tipoPessoa: "juridica",
    cnpjCpf: "98.765.432/0001-10",
    razaoSocial: "Global Trade Corporation",
    nomeFantasia: "Global Trade",
    pais: "Estados Unidos",
    logradouro: "123 Commerce Street",
    numero: "500",
    complemento: "Floor 20",
    bairro: "",
    cidade: "Miami",
    estado: "FL",
    cepZip: "33131",
    comercial: {
      nome: "John Smith",
      email: "john@globaltrade.com",
      telefone: "+1 (305) 555-0100",
    },
    financeiro: {
      nome: "Sarah Johnson",
      email: "finance@globaltrade.com",
      telefone: "+1 (305) 555-0101",
    },
    dadosBancarios: {
      banco: "Bank of America",
      swift: "BOFAUS3N",
      iban: "",
      agencia: "",
      conta: "4567890123",
    },
    condicoesComerciais: {
      moedaPadrao: "USD",
      incoterm: "CIF",
      condicaoPagamento: "30/60/90",
      prazoDias: 60,
      limiteCredito: 1000000,
      observacoes: "Parceiro estratégico na América do Norte.",
    },
    status: "ativo",
    dataCadastro: "2022-11-20",
  },
  {
    id: 3,
    tipoPessoa: "juridica",
    cnpjCpf: "45.678.901/0001-23",
    razaoSocial: "Europa Import Export GmbH",
    nomeFantasia: "Europa IE",
    pais: "Alemanha",
    logradouro: "Hauptstraße",
    numero: "42",
    complemento: "",
    bairro: "",
    cidade: "Hamburg",
    estado: "HH",
    cepZip: "20095",
    comercial: {
      nome: "Hans Mueller",
      email: "hans@europa-ie.de",
      telefone: "+49 40 123456",
    },
    financeiro: {
      nome: "Greta Weber",
      email: "buchhaltung@europa-ie.de",
      telefone: "+49 40 123457",
    },
    dadosBancarios: {
      banco: "Deutsche Bank",
      swift: "DEUTDEFF",
      iban: "DE89370400440532013000",
      agencia: "",
      conta: "",
    },
    condicoesComerciais: {
      moedaPadrao: "EUR",
      incoterm: "EXW",
      condicaoPagamento: "Carta de Crédito",
      prazoDias: 45,
      limiteCredito: 750000,
      observacoes: "Requer documentação EUR.1 para preferência tarifária.",
    },
    status: "ativo",
    dataCadastro: "2023-01-10",
  },
  {
    id: 4,
    tipoPessoa: "juridica",
    cnpjCpf: "34.567.890/0001-12",
    razaoSocial: "Importadora Sul Americana S.A.",
    nomeFantasia: "Sul Americana",
    pais: "Argentina",
    logradouro: "Av. 9 de Julio",
    numero: "1500",
    complemento: "Piso 8",
    bairro: "Centro",
    cidade: "Buenos Aires",
    estado: "CABA",
    cepZip: "C1073AAO",
    comercial: {
      nome: "Diego Fernández",
      email: "diego@sulamericana.com.ar",
      telefone: "+54 11 4567-8900",
    },
    financeiro: {
      nome: "María García",
      email: "contabilidad@sulamericana.com.ar",
      telefone: "+54 11 4567-8901",
    },
    dadosBancarios: {
      banco: "Banco Nación Argentina",
      swift: "NACNARBA",
      iban: "",
      agencia: "450",
      conta: "7890123",
    },
    condicoesComerciais: {
      moedaPadrao: "USD",
      incoterm: "FOB",
      condicaoPagamento: "Antecipado",
      prazoDias: 0,
      limiteCredito: 100000,
      observacoes: "Sujeito a restrições cambiais. Verificar regulamentações vigentes.",
    },
    status: "inativo",
    dataCadastro: "2021-08-05",
  },
  {
    id: 5,
    tipoPessoa: "juridica",
    cnpjCpf: "56.789.012/0001-34",
    razaoSocial: "Asia Pacific Trading Ltd",
    nomeFantasia: "APT Trading",
    pais: "China",
    logradouro: "88 Century Avenue",
    numero: "Tower 2",
    complemento: "Suite 3608",
    bairro: "Pudong",
    cidade: "Shanghai",
    estado: "SH",
    cepZip: "200120",
    comercial: {
      nome: "Li Wei",
      email: "liwei@apt-trading.cn",
      telefone: "+86 21 5888 9000",
    },
    financeiro: {
      nome: "Zhang Ming",
      email: "finance@apt-trading.cn",
      telefone: "+86 21 5888 9001",
    },
    dadosBancarios: {
      banco: "Bank of China",
      swift: "BKCHCNBJ",
      iban: "",
      agencia: "Shanghai Branch",
      conta: "6225881234567890",
    },
    condicoesComerciais: {
      moedaPadrao: "USD",
      incoterm: "FOB",
      condicaoPagamento: "T/T",
      prazoDias: 30,
      limiteCredito: 2000000,
      observacoes: "Maior fornecedor de eletrônicos. Contrato anual de exclusividade.",
    },
    status: "ativo",
    dataCadastro: "2020-03-22",
  },
];

// Helper functions
const getInitials = (name: string) => {
  return name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();
};

const formatCurrency = (value: number, currency: string = "USD") => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: currency,
  }).format(value);
};

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString("pt-BR");
};

// Empty client template
const emptyClient: Omit<Client, "id" | "dataCadastro"> = {
  tipoPessoa: "juridica",
  cnpjCpf: "",
  razaoSocial: "",
  nomeFantasia: "",
  pais: "Brasil",
  logradouro: "",
  numero: "",
  complemento: "",
  bairro: "",
  cidade: "",
  estado: "",
  cepZip: "",
  comercial: { nome: "", email: "", telefone: "" },
  financeiro: { nome: "", email: "", telefone: "" },
  dadosBancarios: { banco: "", swift: "", iban: "", agencia: "", conta: "" },
  condicoesComerciais: {
    moedaPadrao: "USD",
    incoterm: "FOB",
    condicaoPagamento: "À Vista",
    prazoDias: 30,
    limiteCredito: 0,
    observacoes: "",
  },
  status: "ativo",
};

// Countries list
const countries = [
  "Brasil", "Estados Unidos", "China", "Alemanha", "Argentina", "Japão", 
  "Reino Unido", "França", "Itália", "México", "Canadá", "Portugal"
];

// States (Brazil)
const brazilStates = [
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS",
  "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC",
  "SP", "SE", "TO"
];

// Currencies
const currencies = ["USD", "EUR", "BRL", "GBP", "CNY", "JPY", "ARS"];

// Incoterms
const incoterms = ["EXW", "FCA", "FAS", "FOB", "CFR", "CIF", "CPT", "CIP", "DAP", "DPU", "DDP"];

// Payment conditions
const paymentConditions = ["À Vista", "Antecipado", "30/60/90", "T/T", "Carta de Crédito", "Cobrança Documentária"];

// Fresh Corporate Palette
const COLORS = {
  green: "#10B981",
  orange: "#FB923C",
  blue: "#60A5FA",
  yellow: "#EAB308",
  red: "#DC2626",
};

export function Clients() {
  const [clients, setClients] = useState<Client[]>(initialClients);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [countryFilter, setCountryFilter] = useState<string>("all");

  // Dialog states
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [formData, setFormData] = useState<Omit<Client, "id" | "dataCadastro">>(emptyClient);
  const [activeTab, setActiveTab] = useState("cadastrais");

  // Filter clients
  const filteredClients = clients.filter((client) => {
    const matchesSearch =
      client.razaoSocial.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.cnpjCpf.includes(searchTerm) ||
      client.nomeFantasia.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || client.status === statusFilter;
    const matchesCountry = countryFilter === "all" || client.pais === countryFilter;
    return matchesSearch && matchesStatus && matchesCountry;
  });

  // Stats
  const stats = [
    { label: "Ativos", value: clients.filter((c) => c.status === "ativo").length, color: `text-[${COLORS.green}]` },
    { label: "Inativos", value: clients.filter((c) => c.status === "inativo").length, color: "text-muted-foreground" },
    { label: "Total", value: clients.length, color: `text-[${COLORS.blue}]` },
  ];

  // Unique countries for filter
  const uniqueCountries = [...new Set(clients.map(c => c.pais))];

  // Handlers
  const handleCreate = () => {
    setFormData(emptyClient);
    setActiveTab("cadastrais");
    setIsCreateDialogOpen(true);
  };

  const handleView = (client: Client) => {
    setSelectedClient(client);
    setActiveTab("cadastrais");
    setIsViewDialogOpen(true);
  };

  const handleEdit = (client: Client) => {
    setSelectedClient(client);
    setFormData({
      tipoPessoa: client.tipoPessoa,
      cnpjCpf: client.cnpjCpf,
      razaoSocial: client.razaoSocial,
      nomeFantasia: client.nomeFantasia,
      pais: client.pais,
      logradouro: client.logradouro,
      numero: client.numero,
      complemento: client.complemento,
      bairro: client.bairro,
      cidade: client.cidade,
      estado: client.estado,
      cepZip: client.cepZip,
      comercial: { ...client.comercial },
      financeiro: { ...client.financeiro },
      dadosBancarios: { ...client.dadosBancarios },
      condicoesComerciais: { ...client.condicoesComerciais },
      status: client.status,
    });
    setActiveTab("cadastrais");
    setIsEditDialogOpen(true);
  };

  const handleDelete = (client: Client) => {
    setSelectedClient(client);
    setIsDeleteDialogOpen(true);
  };

  const confirmCreate = () => {
    if (!formData.razaoSocial || !formData.cnpjCpf) {
      toast.error("Preencha os campos obrigatórios");
      return;
    }
    const newClient: Client = {
      ...formData,
      id: Math.max(...clients.map(c => c.id)) + 1,
      dataCadastro: new Date().toISOString().split("T")[0],
    };
    setClients([...clients, newClient]);
    setIsCreateDialogOpen(false);
    toast.success("Cliente cadastrado com sucesso");
  };

  const confirmEdit = () => {
    if (!selectedClient || !formData.razaoSocial || !formData.cnpjCpf) {
      toast.error("Preencha os campos obrigatórios");
      return;
    }
    setClients(clients.map(c => 
      c.id === selectedClient.id 
        ? { ...formData, id: c.id, dataCadastro: c.dataCadastro }
        : c
    ));
    setIsEditDialogOpen(false);
    toast.success("Cliente atualizado com sucesso");
  };

  const confirmDelete = () => {
    if (!selectedClient) return;
    setClients(clients.filter(c => c.id !== selectedClient.id));
    setIsDeleteDialogOpen(false);
    toast.success("Cliente excluído com sucesso");
  };

  // Form field updaters
  const updateField = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const updateNestedField = (parent: keyof typeof formData, field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [parent]: { ...(prev[parent] as object), [field]: value }
    }));
  };

  // Render form content (shared between create and edit)
  const renderFormContent = () => (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="w-full justify-start mb-4">
        <TabsTrigger value="cadastrais">Dados Cadastrais</TabsTrigger>
        <TabsTrigger value="endereco">Endereço</TabsTrigger>
        <TabsTrigger value="contatos">Contatos</TabsTrigger>
        <TabsTrigger value="bancarios">Dados Bancários</TabsTrigger>
        <TabsTrigger value="comerciais">Condições Comerciais</TabsTrigger>
      </TabsList>

      <TabsContent value="cadastrais" className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label className="text-xs">Tipo de Pessoa <span className="text-destructive">*</span></Label>
            <Select 
              value={formData.tipoPessoa} 
              onValueChange={(v) => updateField("tipoPessoa", v)}
            >
              <SelectTrigger className="h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="juridica">Pessoa Jurídica</SelectItem>
                <SelectItem value="fisica">Pessoa Física</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">
              {formData.tipoPessoa === "juridica" ? "CNPJ" : "CPF"} <span className="text-destructive">*</span>
            </Label>
            <Input 
              placeholder={formData.tipoPessoa === "juridica" ? "00.000.000/0000-00" : "000.000.000-00"}
              className="h-9 font-mono"
              value={formData.cnpjCpf}
              onChange={(e) => updateField("cnpjCpf", e.target.value)}
            />
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label className="text-xs">Razão Social <span className="text-destructive">*</span></Label>
            <Input 
              placeholder="Nome completo ou razão social"
              className="h-9"
              value={formData.razaoSocial}
              onChange={(e) => updateField("razaoSocial", e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Nome Fantasia</Label>
            <Input 
              placeholder="Nome fantasia"
              className="h-9"
              value={formData.nomeFantasia}
              onChange={(e) => updateField("nomeFantasia", e.target.value)}
            />
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label className="text-xs">País <span className="text-destructive">*</span></Label>
            <Select 
              value={formData.pais} 
              onValueChange={(v) => updateField("pais", v)}
            >
              <SelectTrigger className="h-9">
                <SelectValue placeholder="Selecione o país" />
              </SelectTrigger>
              <SelectContent>
                {countries.map((country) => (
                  <SelectItem key={country} value={country}>{country}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Status</Label>
            <Select 
              value={formData.status} 
              onValueChange={(v) => updateField("status", v as "ativo" | "inativo")}
            >
              <SelectTrigger className="h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ativo">Ativo</SelectItem>
                <SelectItem value="inativo">Inativo</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="endereco" className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="sm:col-span-2 space-y-1.5">
            <Label className="text-xs">Logradouro</Label>
            <Input 
              placeholder="Rua, Avenida, etc."
              className="h-9"
              value={formData.logradouro}
              onChange={(e) => updateField("logradouro", e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Número</Label>
            <Input 
              placeholder="Nº"
              className="h-9"
              value={formData.numero}
              onChange={(e) => updateField("numero", e.target.value)}
            />
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label className="text-xs">Complemento</Label>
            <Input 
              placeholder="Sala, Andar, Bloco"
              className="h-9"
              value={formData.complemento}
              onChange={(e) => updateField("complemento", e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Bairro</Label>
            <Input 
              placeholder="Bairro"
              className="h-9"
              value={formData.bairro}
              onChange={(e) => updateField("bairro", e.target.value)}
            />
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-1.5">
            <Label className="text-xs">Cidade</Label>
            <Input 
              placeholder="Cidade"
              className="h-9"
              value={formData.cidade}
              onChange={(e) => updateField("cidade", e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Estado / UF</Label>
            {formData.pais === "Brasil" ? (
              <Select 
                value={formData.estado} 
                onValueChange={(v) => updateField("estado", v)}
              >
                <SelectTrigger className="h-9">
                  <SelectValue placeholder="UF" />
                </SelectTrigger>
                <SelectContent>
                  {brazilStates.map((state) => (
                    <SelectItem key={state} value={state}>{state}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <Input 
                placeholder="Estado"
                className="h-9"
                value={formData.estado}
                onChange={(e) => updateField("estado", e.target.value)}
              />
            )}
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">CEP / ZIP Code</Label>
            <Input 
              placeholder={formData.pais === "Brasil" ? "00000-000" : "ZIP Code"}
              className="h-9 font-mono"
              value={formData.cepZip}
              onChange={(e) => updateField("cepZip", e.target.value)}
            />
          </div>
        </div>
      </TabsContent>

      <TabsContent value="contatos" className="space-y-6">
        <div>
          <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
            <Building2 className="w-4 h-4 text-muted-foreground" />
            Contato Comercial
          </h4>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-1.5">
              <Label className="text-xs">Nome</Label>
              <Input 
                placeholder="Nome do contato"
                className="h-9"
                value={formData.comercial.nome}
                onChange={(e) => updateNestedField("comercial", "nome", e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">E-mail</Label>
              <Input 
                type="email"
                placeholder="email@empresa.com"
                className="h-9"
                value={formData.comercial.email}
                onChange={(e) => updateNestedField("comercial", "email", e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Telefone</Label>
              <Input 
                placeholder="(00) 0000-0000"
                className="h-9"
                value={formData.comercial.telefone}
                onChange={(e) => updateNestedField("comercial", "telefone", e.target.value)}
              />
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
            <Landmark className="w-4 h-4 text-muted-foreground" />
            Contato Financeiro
          </h4>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-1.5">
              <Label className="text-xs">Nome</Label>
              <Input 
                placeholder="Nome do contato"
                className="h-9"
                value={formData.financeiro.nome}
                onChange={(e) => updateNestedField("financeiro", "nome", e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">E-mail</Label>
              <Input 
                type="email"
                placeholder="email@empresa.com"
                className="h-9"
                value={formData.financeiro.email}
                onChange={(e) => updateNestedField("financeiro", "email", e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Telefone</Label>
              <Input 
                placeholder="(00) 0000-0000"
                className="h-9"
                value={formData.financeiro.telefone}
                onChange={(e) => updateNestedField("financeiro", "telefone", e.target.value)}
              />
            </div>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="bancarios" className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label className="text-xs">Banco</Label>
            <Input 
              placeholder="Nome do banco"
              className="h-9"
              value={formData.dadosBancarios.banco}
              onChange={(e) => updateNestedField("dadosBancarios", "banco", e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">SWIFT / BIC</Label>
            <Input 
              placeholder="XXXXXXXX"
              className="h-9 font-mono uppercase"
              value={formData.dadosBancarios.swift}
              onChange={(e) => updateNestedField("dadosBancarios", "swift", e.target.value.toUpperCase())}
            />
          </div>
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs">IBAN</Label>
          <Input 
            placeholder="XX00 0000 0000 0000 0000 00"
            className="h-9 font-mono uppercase"
            value={formData.dadosBancarios.iban}
            onChange={(e) => updateNestedField("dadosBancarios", "iban", e.target.value.toUpperCase())}
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label className="text-xs">Agência</Label>
            <Input 
              placeholder="0000-0"
              className="h-9 font-mono"
              value={formData.dadosBancarios.agencia}
              onChange={(e) => updateNestedField("dadosBancarios", "agencia", e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Conta</Label>
            <Input 
              placeholder="00000-0"
              className="h-9 font-mono"
              value={formData.dadosBancarios.conta}
              onChange={(e) => updateNestedField("dadosBancarios", "conta", e.target.value)}
            />
          </div>
        </div>
      </TabsContent>

      <TabsContent value="comerciais" className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-1.5">
            <Label className="text-xs">Moeda Padrão</Label>
            <Select 
              value={formData.condicoesComerciais.moedaPadrao} 
              onValueChange={(v) => updateNestedField("condicoesComerciais", "moedaPadrao", v)}
            >
              <SelectTrigger className="h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {currencies.map((currency) => (
                  <SelectItem key={currency} value={currency}>{currency}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Incoterm</Label>
            <Select 
              value={formData.condicoesComerciais.incoterm} 
              onValueChange={(v) => updateNestedField("condicoesComerciais", "incoterm", v)}
            >
              <SelectTrigger className="h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {incoterms.map((incoterm) => (
                  <SelectItem key={incoterm} value={incoterm}>{incoterm}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Condição de Pagamento</Label>
            <Select 
              value={formData.condicoesComerciais.condicaoPagamento} 
              onValueChange={(v) => updateNestedField("condicoesComerciais", "condicaoPagamento", v)}
            >
              <SelectTrigger className="h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {paymentConditions.map((condition) => (
                  <SelectItem key={condition} value={condition}>{condition}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label className="text-xs">Prazo (dias)</Label>
            <Input 
              type="number"
              placeholder="30"
              className="h-9"
              value={formData.condicoesComerciais.prazoDias}
              onChange={(e) => updateNestedField("condicoesComerciais", "prazoDias", parseInt(e.target.value) || 0)}
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Limite de Crédito ({formData.condicoesComerciais.moedaPadrao})</Label>
            <Input 
              type="number"
              placeholder="0.00"
              className="h-9"
              value={formData.condicoesComerciais.limiteCredito}
              onChange={(e) => updateNestedField("condicoesComerciais", "limiteCredito", parseFloat(e.target.value) || 0)}
            />
          </div>
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs">Observações</Label>
          <Textarea 
            placeholder="Observações sobre o cliente..."
            className="min-h-20"
            value={formData.condicoesComerciais.observacoes}
            onChange={(e) => updateNestedField("condicoesComerciais", "observacoes", e.target.value)}
          />
        </div>
      </TabsContent>
    </Tabs>
  );

  // Render view content (read-only)
  const renderViewContent = () => {
    if (!selectedClient) return null;
    return (
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full justify-start mb-4">
          <TabsTrigger value="cadastrais">Dados Cadastrais</TabsTrigger>
          <TabsTrigger value="endereco">Endereço</TabsTrigger>
          <TabsTrigger value="contatos">Contatos</TabsTrigger>
          <TabsTrigger value="bancarios">Dados Bancários</TabsTrigger>
          <TabsTrigger value="comerciais">Condições Comerciais</TabsTrigger>
        </TabsList>

        <TabsContent value="cadastrais" className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <InfoItem label="Tipo de Pessoa" value={selectedClient.tipoPessoa === "juridica" ? "Pessoa Jurídica" : "Pessoa Física"} />
            <InfoItem label={selectedClient.tipoPessoa === "juridica" ? "CNPJ" : "CPF"} value={selectedClient.cnpjCpf} mono />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <InfoItem label="Razão Social" value={selectedClient.razaoSocial} />
            <InfoItem label="Nome Fantasia" value={selectedClient.nomeFantasia || "-"} />
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <InfoItem label="País" value={selectedClient.pais} icon={<Globe className="w-3.5 h-3.5" />} />
            <InfoItem label="Status" value={
              <Badge variant={selectedClient.status === "ativo" ? "success" : "secondary"}>
                {selectedClient.status === "ativo" ? "Ativo" : "Inativo"}
              </Badge>
            } />
            <InfoItem label="Data de Cadastro" value={formatDate(selectedClient.dataCadastro)} />
          </div>
        </TabsContent>

        <TabsContent value="endereco" className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="sm:col-span-2">
              <InfoItem label="Logradouro" value={selectedClient.logradouro || "-"} icon={<MapPin className="w-3.5 h-3.5" />} />
            </div>
            <InfoItem label="Número" value={selectedClient.numero || "-"} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <InfoItem label="Complemento" value={selectedClient.complemento || "-"} />
            <InfoItem label="Bairro" value={selectedClient.bairro || "-"} />
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <InfoItem label="Cidade" value={selectedClient.cidade || "-"} />
            <InfoItem label="Estado / UF" value={selectedClient.estado || "-"} />
            <InfoItem label="CEP / ZIP Code" value={selectedClient.cepZip || "-"} mono />
          </div>
        </TabsContent>

        <TabsContent value="contatos" className="space-y-6">
          <div>
            <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-muted-foreground" />
              Contato Comercial
            </h4>
            <div className="grid gap-4 sm:grid-cols-3">
              <InfoItem label="Nome" value={selectedClient.comercial.nome || "-"} />
              <InfoItem label="E-mail" value={selectedClient.comercial.email || "-"} icon={<Mail className="w-3.5 h-3.5" />} />
              <InfoItem label="Telefone" value={selectedClient.comercial.telefone || "-"} icon={<Phone className="w-3.5 h-3.5" />} />
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
              <Landmark className="w-4 h-4 text-muted-foreground" />
              Contato Financeiro
            </h4>
            <div className="grid gap-4 sm:grid-cols-3">
              <InfoItem label="Nome" value={selectedClient.financeiro.nome || "-"} />
              <InfoItem label="E-mail" value={selectedClient.financeiro.email || "-"} icon={<Mail className="w-3.5 h-3.5" />} />
              <InfoItem label="Telefone" value={selectedClient.financeiro.telefone || "-"} icon={<Phone className="w-3.5 h-3.5" />} />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="bancarios" className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <InfoItem label="Banco" value={selectedClient.dadosBancarios.banco || "-"} icon={<Landmark className="w-3.5 h-3.5" />} />
            <InfoItem label="SWIFT / BIC" value={selectedClient.dadosBancarios.swift || "-"} mono />
          </div>
          <InfoItem label="IBAN" value={selectedClient.dadosBancarios.iban || "-"} mono />
          <div className="grid gap-4 sm:grid-cols-2">
            <InfoItem label="Agência" value={selectedClient.dadosBancarios.agencia || "-"} mono />
            <InfoItem label="Conta" value={selectedClient.dadosBancarios.conta || "-"} mono />
          </div>
        </TabsContent>

        <TabsContent value="comerciais" className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-3">
            <InfoItem label="Moeda Padrão" value={selectedClient.condicoesComerciais.moedaPadrao} />
            <InfoItem label="Incoterm" value={selectedClient.condicoesComerciais.incoterm} />
            <InfoItem label="Condição de Pagamento" value={selectedClient.condicoesComerciais.condicaoPagamento} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <InfoItem label="Prazo (dias)" value={`${selectedClient.condicoesComerciais.prazoDias} dias`} />
            <InfoItem label="Limite de Crédito" value={formatCurrency(selectedClient.condicoesComerciais.limiteCredito, selectedClient.condicoesComerciais.moedaPadrao)} />
          </div>
          {selectedClient.condicoesComerciais.observacoes && (
            <div className="space-y-1.5">
              <p className="text-xs text-muted-foreground">Observações</p>
              <div className="p-3 bg-muted/30 rounded text-sm">
                {selectedClient.condicoesComerciais.observacoes}
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    );
  };

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
          <Button onClick={handleCreate}>
            <Plus className="w-4 h-4 mr-2" />
            Novo Cliente
          </Button>
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
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome, CNPJ ou fantasia..."
              className="pl-9 h-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={countryFilter} onValueChange={setCountryFilter}>
            <SelectTrigger className="w-36 h-9">
              <SelectValue placeholder="País" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos países</SelectItem>
              {uniqueCountries.map((country) => (
                <SelectItem key={country} value={country}>{country}</SelectItem>
              ))}
            </SelectContent>
          </Select>
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
                  <TableHead className="hidden md:table-cell">CNPJ/CPF</TableHead>
                  <TableHead className="hidden lg:table-cell">País</TableHead>
                  <TableHead className="hidden lg:table-cell">Moeda</TableHead>
                  <TableHead className="hidden md:table-cell">Cadastro</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-10"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClients.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-6 text-muted-foreground text-xs">
                      Nenhum cliente encontrado
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredClients.map((client) => (
                    <TableRow key={client.id} className="cursor-pointer text-xs" onClick={() => handleView(client)}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded bg-[#10B981]/10 flex items-center justify-center flex-shrink-0">
                            <span className="text-[10px] font-medium text-[#10B981]">{getInitials(client.razaoSocial)}</span>
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs font-medium truncate max-w-[160px]">{client.razaoSocial}</p>
                            {client.nomeFantasia && (
                              <p className="text-[10px] text-muted-foreground truncate max-w-[160px]">{client.nomeFantasia}</p>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <span className="text-xs font-mono text-muted-foreground">{client.cnpjCpf}</span>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <span className="text-xs">{client.pais}</span>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <span className="text-xs font-mono">{client.condicoesComerciais.moedaPadrao}</span>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <span className="text-xs text-muted-foreground">{formatDate(client.dataCadastro)}</span>
                      </TableCell>
                      <TableCell>
                        <Badge variant={client.status === "ativo" ? "success" : "secondary"} className="text-[10px] px-1.5 py-0">
                          {client.status === "ativo" ? "Ativo" : "Inativo"}
                        </Badge>
                      </TableCell>
                      <TableCell onClick={(e) => e.stopPropagation()} className="w-8">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon-sm" className="h-6 w-6">
                              <MoreHorizontal className="w-3.5 h-3.5" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem className="text-xs" onClick={() => handleView(client)}>
                              <Eye className="w-3.5 h-3.5 mr-1.5" />
                              Visualizar
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-xs" onClick={() => handleEdit(client)}>
                              <Edit className="w-3.5 h-3.5 mr-1.5" />
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive text-xs" onClick={() => handleDelete(client)}>
                              <Trash2 className="w-3.5 h-3.5 mr-1.5" />
                              Excluir
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>

            <div className="flex items-center justify-between px-4 py-3 border-t border-border">
              <p className="text-xs text-muted-foreground">
                {filteredClients.length} de {clients.length} clientes
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Create Dialog */}
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogContent className="sm:max-w-[700px] max-h-[85vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Novo Cliente</DialogTitle>
              <DialogDescription>
                Preencha os dados do cliente
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              {renderFormContent()}
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" size="sm">Cancelar</Button>
              </DialogClose>
              <Button size="sm" onClick={confirmCreate}>
                <Check className="w-4 h-4 mr-2" />
                Cadastrar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* View Dialog */}
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="sm:max-w-[700px] max-h-[85vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-3">
                <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-medium text-primary">
                    {selectedClient ? getInitials(selectedClient.razaoSocial) : ""}
                  </span>
                </div>
                <div>
                  <span>{selectedClient?.razaoSocial}</span>
                  {selectedClient?.nomeFantasia && (
                    <p className="text-sm font-normal text-muted-foreground">{selectedClient.nomeFantasia}</p>
                  )}
                </div>
              </DialogTitle>
            </DialogHeader>
            <div className="py-4">
              {renderViewContent()}
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" size="sm">Fechar</Button>
              </DialogClose>
              <Button size="sm" onClick={() => {
                setIsViewDialogOpen(false);
                if (selectedClient) handleEdit(selectedClient);
              }}>
                <Edit className="w-4 h-4 mr-2" />
                Editar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[700px] max-h-[85vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Editar Cliente</DialogTitle>
              <DialogDescription>
                Atualize os dados do cliente
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              {renderFormContent()}
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" size="sm">Cancelar</Button>
              </DialogClose>
              <Button size="sm" onClick={confirmEdit}>
                <Check className="w-4 h-4 mr-2" />
                Salvar Alterações
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent className="sm:max-w-[400px]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-destructive">
                <AlertTriangle className="w-5 h-5" />
                Confirmar Exclusão
              </DialogTitle>
              <DialogDescription>
                Tem certeza que deseja excluir o cliente <strong>{selectedClient?.razaoSocial}</strong>? 
                Esta ação não pode ser desfeita.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="mt-4">
              <DialogClose asChild>
                <Button variant="outline" size="sm">Cancelar</Button>
              </DialogClose>
              <Button variant="destructive" size="sm" onClick={confirmDelete}>
                <Trash2 className="w-4 h-4 mr-2" />
                Excluir Cliente
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}

// Helper component for read-only info display
interface InfoItemProps {
  label: string;
  value: React.ReactNode;
  mono?: boolean;
  icon?: React.ReactNode;
}

function InfoItem({ label, value, mono, icon }: InfoItemProps) {
  return (
    <div className="space-y-1">
      <p className="text-xs text-muted-foreground flex items-center gap-1.5">
        {icon}
        {label}
      </p>
      <p className={`text-sm ${mono ? "font-mono" : ""}`}>{value}</p>
    </div>
  );
}

export default Clients;
