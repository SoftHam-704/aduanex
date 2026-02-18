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
  ArrowRight,
  Calendar,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";

// Mock data
const metrics = [
  {
    title: "Processos Ativos",
    value: "127",
    change: "+12%",
    trend: "up" as const,
    description: "vs. mês anterior",
  },
  {
    title: "DIs Registradas",
    value: "48",
    change: "+8%",
    trend: "up" as const,
    description: "este mês",
  },
  {
    title: "DU-Es Emitidas",
    value: "32",
    change: "-3%",
    trend: "down" as const,
    description: "este mês",
  },
  {
    title: "Alertas",
    value: "7",
    change: "+2",
    trend: "up" as const,
    description: "pendentes",
    isAlert: true,
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

const trendData = [
  { month: "Jan", value: 65 },
  { month: "Fev", value: 70 },
  { month: "Mar", value: 80 },
  { month: "Abr", value: 82 },
  { month: "Mai", value: 86 },
  { month: "Jun", value: 97 },
];

const statusData = [
  { name: "Desembaraçado", value: 45, color: "#059669" },
  { name: "Em Análise", value: 30, color: "#2563EB" },
  { name: "Aguardando", value: 15, color: "#D97706" },
  { name: "Canal Vermelho", value: 10, color: "#DC2626" },
];

const recentProcesses = [
  {
    id: "IMP-2024-0089",
    client: "Tech Solutions LTDA",
    type: "importacao",
    status: "em_analise",
    eta: "15/01/2025",
    value: "R$ 125.000",
  },
  {
    id: "EXP-2024-0034",
    client: "Brasil Exports S.A.",
    type: "exportacao",
    status: "desembaracado",
    eta: "12/01/2025",
    value: "R$ 89.500",
  },
  {
    id: "IMP-2024-0088",
    client: "Global Trade Corp",
    type: "importacao",
    status: "aguardando_docs",
    eta: "18/01/2025",
    value: "R$ 245.000",
  },
  {
    id: "IMP-2024-0087",
    client: "Importadora Nacional",
    type: "importacao",
    status: "canal_vermelho",
    eta: "20/01/2025",
    value: "R$ 78.200",
  },
];

const timeline = [
  {
    id: 1,
    type: "success",
    title: "DI Desembaraçada",
    description: "24/0089123-5 • Canal verde",
    time: "15 min",
  },
  {
    id: 2,
    type: "warning",
    title: "Exigência SISCOMEX",
    description: "IMP-2024-0085 • Fatura comercial",
    time: "1h",
  },
  {
    id: 3,
    type: "info",
    title: "DU-E Registrada",
    description: "EXP-2024-0034 • Brasil Exports",
    time: "2h",
  },
  {
    id: 4,
    type: "error",
    title: "Canal Vermelho",
    description: "IMP-2024-0082 • Conferência",
    time: "3h",
  },
];

const statusConfig: Record<string, { label: string; variant: "default" | "success" | "warning" | "destructive" }> = {
  em_analise: { label: "Em Análise", variant: "default" },
  desembaracado: { label: "Liberado", variant: "success" },
  aguardando_docs: { label: "Aguardando", variant: "warning" },
  canal_vermelho: { label: "Canal Vermelho", variant: "destructive" },
};

const chartConfig = {
  importacao: {
    label: "Importação",
    color: "#2563EB",
  },
  exportacao: {
    label: "Exportação",
    color: "#059669",
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
            <h1 className="text-xl font-semibold">Dashboard</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Visão geral das operações
            </p>
          </div>
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-36 h-8 text-sm">
              <Calendar className="w-3.5 h-3.5 mr-2 text-muted-foreground" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">7 dias</SelectItem>
              <SelectItem value="30d">30 dias</SelectItem>
              <SelectItem value="90d">90 dias</SelectItem>
              <SelectItem value="1y">1 ano</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Metrics - asymmetric grid */}
        <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric) => (
            <Card key={metric.title} className={metric.isAlert ? "border-warning/30 bg-warning/5" : ""}>
              <CardContent className="pt-4 pb-4">
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                  {metric.title}
                </p>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-2xl font-semibold tabular-nums">{metric.value}</span>
                  <span className={`text-xs font-medium ${
                    metric.isAlert 
                      ? "text-warning" 
                      : metric.trend === "up" 
                        ? "text-success" 
                        : "text-destructive"
                  }`}>
                    {metric.change}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">{metric.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main content - asymmetric layout */}
        <div className="grid gap-4 lg:grid-cols-12">
          {/* Operations by month - larger */}
          <Card className="lg:col-span-5">
            <CardHeader className="pb-2">
              <CardTitle>Operações por Mês</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <ChartContainer config={chartConfig} className="h-[220px] w-full">
                <BarChart data={monthlyData} barGap={2}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" strokeOpacity={0.5} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
                    tickMargin={8}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
                    width={30}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="importacao" fill="#2563EB" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="exportacao" fill="#059669" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ChartContainer>
              <div className="flex justify-center gap-6 mt-2">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-sm bg-[#2563EB]" />
                  <span className="text-xs text-muted-foreground">Importação</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-sm bg-[#059669]" />
                  <span className="text-xs text-muted-foreground">Exportação</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Trend chart - medium */}
          <Card className="lg:col-span-4">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle>Processos Concluídos</CardTitle>
                <div className="flex items-center gap-1 text-success">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span className="text-xs font-medium">+12.8%</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <ChartContainer config={chartConfig} className="h-[220px] w-full">
                <AreaChart data={trendData}>
                  <defs>
                    <linearGradient id="fillValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563EB" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
                    tickMargin={8}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
                    width={30}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#2563EB"
                    strokeWidth={1.5}
                    fill="url(#fillValue)"
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Status distribution - smaller */}
          <Card className="lg:col-span-3">
            <CardHeader className="pb-2">
              <CardTitle>Status</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <ChartContainer config={chartConfig} className="h-[160px] w-full mx-auto">
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={60}
                    paddingAngle={2}
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
                          <div className="bg-popover border rounded px-2 py-1.5 text-xs">
                            <p className="font-medium">{data.name}</p>
                            <p className="text-muted-foreground">{data.value} processos</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                </PieChart>
              </ChartContainer>
              <div className="grid grid-cols-2 gap-x-3 gap-y-1.5">
                {statusData.map((item) => (
                  <div key={item.name} className="flex items-center gap-1.5">
                    <div
                      className="w-2 h-2 rounded-sm flex-shrink-0"
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
        <div className="grid gap-4 lg:grid-cols-3">
          {/* Recent processes - 2 columns */}
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <CardTitle>Processos Recentes</CardTitle>
              <Button variant="ghost" size="sm" className="text-xs text-muted-foreground hover:text-foreground h-7">
                Ver todos <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="divide-y divide-border">
                {recentProcesses.map((process) => (
                  <div
                    key={process.id}
                    className="flex items-center justify-between py-2.5 first:pt-0 last:pb-0"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`w-7 h-7 rounded flex items-center justify-center flex-shrink-0 ${
                        process.type === "importacao" ? "bg-primary/10" : "bg-success/10"
                      }`}>
                        {process.type === "importacao" ? (
                          <Ship className="w-3.5 h-3.5 text-primary" />
                        ) : (
                          <Plane className="w-3.5 h-3.5 text-success" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium font-mono">{process.id}</p>
                        <p className="text-xs text-muted-foreground truncate">{process.client}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <div className="text-right hidden sm:block">
                        <p className="text-sm font-medium tabular-nums">{process.value}</p>
                        <p className="text-xs text-muted-foreground">ETA {process.eta}</p>
                      </div>
                      <Badge variant={statusConfig[process.status].variant}>
                        {statusConfig[process.status].label}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Timeline - 1 column */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Atividade</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                {timeline.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className={`w-6 h-6 rounded flex items-center justify-center flex-shrink-0 ${
                      item.type === "success"
                        ? "bg-success/10 text-success"
                        : item.type === "warning"
                        ? "bg-warning/10 text-warning"
                        : item.type === "error"
                        ? "bg-destructive/10 text-destructive"
                        : "bg-primary/10 text-primary"
                    }`}>
                      {item.type === "success" ? (
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      ) : item.type === "warning" ? (
                        <AlertTriangle className="w-3.5 h-3.5" />
                      ) : item.type === "error" ? (
                        <XCircle className="w-3.5 h-3.5" />
                      ) : (
                        <FileText className="w-3.5 h-3.5" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{item.title}</p>
                      <p className="text-xs text-muted-foreground truncate">{item.description}</p>
                    </div>
                    <span className="text-xs text-muted-foreground flex-shrink-0">{item.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;
