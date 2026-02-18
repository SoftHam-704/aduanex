import { useState } from "react";
import {
  Ship,
  Plane,
  FileText,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle2,
  XCircle,
  RefreshCw,
  ArrowRight,
  Calendar,
  Filter,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

// Mock data
const metrics = [
  {
    title: "Processos em Andamento",
    value: "127",
    change: "+12%",
    trend: "up",
    icon: RefreshCw,
    color: "tech-blue",
  },
  {
    title: "DIs Registradas (Mês)",
    value: "48",
    change: "+8%",
    trend: "up",
    icon: FileText,
    color: "success",
  },
  {
    title: "DU-Es Emitidas (Mês)",
    value: "32",
    change: "-3%",
    trend: "down",
    icon: Plane,
    color: "purple",
  },
  {
    title: "Alertas Pendentes",
    value: "7",
    change: "+2",
    trend: "up",
    icon: AlertTriangle,
    color: "warning",
  },
];

const monthlyData = [
  { month: "Jan", importacao: 42, exportacao: 28 },
  { month: "Fev", importacao: 38, exportacao: 32 },
  { month: "Mar", importacao: 45, exportacao: 35 },
  { month: "Abr", importacao: 52, exportacao: 30 },
  { month: "Mai", importacao: 48, exportacao: 38 },
  { month: "Jun", importacao: 55, exportacao: 42 },
];

const statusData = [
  { name: "Desembaraçado", value: 45, color: "#00D68F" },
  { name: "Em Análise", value: 30, color: "#0066FF" },
  { name: "Aguardando Docs", value: 15, color: "#FF6B35" },
  { name: "Canal Vermelho", value: 10, color: "#EF4444" },
];

const recentProcesses = [
  {
    id: "IMP-2024-0089",
    client: "Tech Solutions LTDA",
    type: "importacao",
    status: "em_analise",
    eta: "15/01/2025",
    value: "R$ 125.000,00",
  },
  {
    id: "EXP-2024-0034",
    client: "Brasil Exports S.A.",
    type: "exportacao",
    status: "desembaracado",
    eta: "12/01/2025",
    value: "R$ 89.500,00",
  },
  {
    id: "IMP-2024-0088",
    client: "Global Trade Corp",
    type: "importacao",
    status: "aguardando_docs",
    eta: "18/01/2025",
    value: "R$ 245.000,00",
  },
  {
    id: "IMP-2024-0087",
    client: "Importadora Nacional",
    type: "importacao",
    status: "canal_vermelho",
    eta: "20/01/2025",
    value: "R$ 78.200,00",
  },
  {
    id: "EXP-2024-0033",
    client: "AgroExport Brasil",
    type: "exportacao",
    status: "em_analise",
    eta: "14/01/2025",
    value: "R$ 312.000,00",
  },
];

const timeline = [
  {
    id: 1,
    type: "success",
    title: "DI 24/0089123-5 Desembaraçada",
    description: "Canal verde - Liberação automática",
    time: "há 15 min",
    icon: CheckCircle2,
  },
  {
    id: 2,
    type: "warning",
    title: "Exigência SISCOMEX",
    description: "Processo IMP-2024-0085 - Fatura comercial",
    time: "há 1 hora",
    icon: AlertTriangle,
  },
  {
    id: 3,
    type: "info",
    title: "Nova DU-E Registrada",
    description: "EXP-2024-0034 - Brasil Exports S.A.",
    time: "há 2 horas",
    icon: FileText,
  },
  {
    id: 4,
    type: "error",
    title: "Canal Vermelho",
    description: "IMP-2024-0082 selecionado para conferência",
    time: "há 3 horas",
    icon: XCircle,
  },
  {
    id: 5,
    type: "info",
    title: "Chegada Prevista",
    description: "Navio MSC AURORA - Porto de Santos",
    time: "há 5 horas",
    icon: Ship,
  },
];

const statusConfig = {
  em_analise: { label: "Em Análise", color: "bg-tech-blue text-white" },
  desembaracado: { label: "Desembaraçado", color: "bg-success text-white" },
  aguardando_docs: { label: "Aguardando Docs", color: "bg-warning text-white" },
  canal_vermelho: { label: "Canal Vermelho", color: "bg-destructive text-white" },
};

const chartConfig = {
  importacao: {
    label: "Importação",
    color: "#0066FF",
  },
  exportacao: {
    label: "Exportação",
    color: "#00D68F",
  },
};

export function Dashboard() {
  const [period, setPeriod] = useState("30d");

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Visão geral das operações aduaneiras
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger className="w-[140px]">
                <Calendar className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Últimos 7 dias</SelectItem>
                <SelectItem value="30d">Últimos 30 dias</SelectItem>
                <SelectItem value="90d">Últimos 90 dias</SelectItem>
                <SelectItem value="1y">Último ano</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Filter className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Metrics cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <Card
                key={metric.title}
                className={`relative overflow-hidden animate-fade-in-up stagger-${index + 1} opacity-0`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-muted-foreground">
                        {metric.title}
                      </p>
                      <p className="text-3xl font-bold tracking-tight">{metric.value}</p>
                      <div className="flex items-center gap-1">
                        {metric.trend === "up" ? (
                          <TrendingUp className={`w-4 h-4 ${metric.color === "warning" ? "text-warning" : "text-success"}`} />
                        ) : (
                          <TrendingDown className="w-4 h-4 text-destructive" />
                        )}
                        <span
                          className={`text-sm font-medium ${
                            metric.trend === "up"
                              ? metric.color === "warning"
                                ? "text-warning"
                                : "text-success"
                              : "text-destructive"
                          }`}
                        >
                          {metric.change}
                        </span>
                        <span className="text-xs text-muted-foreground">vs mês anterior</span>
                      </div>
                    </div>
                    <div
                      className={`p-3 rounded-xl ${
                        metric.color === "tech-blue"
                          ? "bg-tech-blue/10"
                          : metric.color === "success"
                          ? "bg-success/10"
                          : metric.color === "purple"
                          ? "bg-purple/10"
                          : "bg-warning/10"
                      }`}
                    >
                      <Icon
                        className={`w-6 h-6 ${
                          metric.color === "tech-blue"
                            ? "text-tech-blue"
                            : metric.color === "success"
                            ? "text-success"
                            : metric.color === "purple"
                            ? "text-purple"
                            : "text-warning"
                        }`}
                      />
                    </div>
                  </div>
                </CardContent>
                <div
                  className={`absolute bottom-0 left-0 right-0 h-1 ${
                    metric.color === "tech-blue"
                      ? "bg-tech-blue"
                      : metric.color === "success"
                      ? "bg-success"
                      : metric.color === "purple"
                      ? "bg-purple"
                      : "bg-warning"
                  }`}
                />
              </Card>
            );
          })}
        </div>

        {/* Charts row */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Bar chart - Operations by month */}
          <Card className="lg:col-span-2 animate-fade-in-up stagger-5 opacity-0">
            <CardHeader>
              <CardTitle>Operações por Mês</CardTitle>
              <CardDescription>
                Comparativo de importações e exportações
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px] w-full">
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar
                    dataKey="importacao"
                    fill="#0066FF"
                    radius={[4, 4, 0, 0]}
                    name="Importação"
                  />
                  <Bar
                    dataKey="exportacao"
                    fill="#00D68F"
                    radius={[4, 4, 0, 0]}
                    name="Exportação"
                  />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Donut chart - Status distribution */}
          <Card className="animate-fade-in-up stagger-6 opacity-0">
            <CardHeader>
              <CardTitle>Status dos Processos</CardTitle>
              <CardDescription>Distribuição por situação atual</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px] w-full">
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip
                    content={({ payload }) => {
                      if (payload && payload[0]) {
                        const data = payload[0].payload;
                        return (
                          <div className="bg-popover border rounded-lg p-2 shadow-lg">
                            <p className="font-medium">{data.name}</p>
                            <p className="text-sm text-muted-foreground">{data.value} processos</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                </PieChart>
              </ChartContainer>
              <div className="grid grid-cols-2 gap-2 mt-4">
                {statusData.map((item) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-xs text-muted-foreground truncate">{item.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom row */}
        <div className="grid gap-6 lg:grid-cols-5">
          {/* Recent processes table */}
          <Card className="lg:col-span-3">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Processos Recentes</CardTitle>
                <CardDescription>Últimos processos cadastrados</CardDescription>
              </div>
              <Button variant="ghost" size="sm" className="text-primary">
                Ver todos <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentProcesses.map((process) => (
                  <div
                    key={process.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`p-2 rounded-lg ${
                          process.type === "importacao"
                            ? "bg-tech-blue/10"
                            : "bg-success/10"
                        }`}
                      >
                        {process.type === "importacao" ? (
                          <Ship
                            className={`w-5 h-5 ${
                              process.type === "importacao"
                                ? "text-tech-blue"
                                : "text-success"
                            }`}
                          />
                        ) : (
                          <Plane className="w-5 h-5 text-success" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{process.id}</p>
                        <p className="text-xs text-muted-foreground">{process.client}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right hidden sm:block">
                        <p className="text-sm font-medium">{process.value}</p>
                        <p className="text-xs text-muted-foreground">ETA: {process.eta}</p>
                      </div>
                      <Badge
                        className={`${
                          statusConfig[process.status as keyof typeof statusConfig].color
                        } text-xs`}
                      >
                        {statusConfig[process.status as keyof typeof statusConfig].label}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Timeline</CardTitle>
                <CardDescription>Atividades recentes</CardDescription>
              </div>
              <Button variant="ghost" size="icon">
                <RefreshCw className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {timeline.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.id} className="flex gap-3">
                      <div className="relative flex flex-col items-center">
                        <div
                          className={`p-2 rounded-full ${
                            item.type === "success"
                              ? "bg-success/10 text-success"
                              : item.type === "warning"
                              ? "bg-warning/10 text-warning"
                              : item.type === "error"
                              ? "bg-destructive/10 text-destructive"
                              : "bg-tech-blue/10 text-tech-blue"
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        {index < timeline.length - 1 && (
                          <div className="w-px h-full bg-border absolute top-10" />
                        )}
                      </div>
                      <div className="flex-1 pb-4">
                        <p className="text-sm font-medium">{item.title}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {item.description}
                        </p>
                        <div className="flex items-center gap-1 mt-2">
                          <Clock className="w-3 h-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{item.time}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick actions */}
        <Card className="bg-gradient-to-r from-tech-blue to-tech-blue-dark text-white">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h3 className="text-xl font-semibold">Ações Rápidas</h3>
                <p className="text-white/80 text-sm mt-1">
                  Acesse as funções mais utilizadas do sistema
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button variant="secondary" className="bg-white text-tech-blue hover:bg-white/90">
                  <Ship className="w-4 h-4 mr-2" />
                  Nova Importação
                </Button>
                <Button variant="secondary" className="bg-white/20 text-white hover:bg-white/30 border-white/30">
                  <Plane className="w-4 h-4 mr-2" />
                  Nova Exportação
                </Button>
                <Button variant="secondary" className="bg-white/20 text-white hover:bg-white/30 border-white/30">
                  <FileText className="w-4 h-4 mr-2" />
                  Registrar DI
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;
