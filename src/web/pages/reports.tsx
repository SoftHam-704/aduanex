import { useState } from "react";
import {
  BarChart3,
  Download,
  Calendar,
  FileText,
  DollarSign,
  Ship,
  Plane,
  TrendingUp,
  Filter,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
  AreaChart,
  Area,
} from "recharts";

const monthlyData = [
  { month: "Jan", importacao: 42, exportacao: 28, valor: 1250000 },
  { month: "Fev", importacao: 38, exportacao: 32, valor: 1180000 },
  { month: "Mar", importacao: 45, exportacao: 35, valor: 1420000 },
  { month: "Abr", importacao: 52, exportacao: 30, valor: 1350000 },
  { month: "Mai", importacao: 48, exportacao: 38, valor: 1520000 },
  { month: "Jun", importacao: 55, exportacao: 42, valor: 1680000 },
];

const countryData = [
  { name: "China", value: 45, color: "#0066FF" },
  { name: "EUA", value: 20, color: "#00D68F" },
  { name: "Alemanha", value: 15, color: "#FF6B35" },
  { name: "Japão", value: 12, color: "#6E56CF" },
  { name: "Outros", value: 8, color: "#00B8D9" },
];

const statusData = [
  { status: "Desembaraçado", quantidade: 145, percentual: 58 },
  { status: "Em Análise", quantidade: 52, percentual: 21 },
  { status: "Trânsito", quantidade: 35, percentual: 14 },
  { status: "Exigência", quantidade: 18, percentual: 7 },
];

const reportTemplates = [
  {
    id: 1,
    title: "Relatório Mensal de Operações",
    description: "Consolidado de todas as operações do mês",
    type: "mensal",
    icon: Calendar,
  },
  {
    id: 2,
    title: "Relatório de Tributos",
    description: "Detalhamento de impostos por operação",
    type: "fiscal",
    icon: DollarSign,
  },
  {
    id: 3,
    title: "Relatório por Cliente",
    description: "Operações agrupadas por cliente",
    type: "cliente",
    icon: FileText,
  },
  {
    id: 4,
    title: "Relatório de Importações",
    description: "Análise detalhada de importações",
    type: "importacao",
    icon: Ship,
  },
  {
    id: 5,
    title: "Relatório de Exportações",
    description: "Análise detalhada de exportações",
    type: "exportacao",
    icon: Plane,
  },
  {
    id: 6,
    title: "Relatório de Performance",
    description: "KPIs e métricas de desempenho",
    type: "performance",
    icon: TrendingUp,
  },
];

const chartConfig = {
  importacao: {
    label: "Importação",
    color: "#0066FF",
  },
  exportacao: {
    label: "Exportação",
    color: "#00D68F",
  },
  valor: {
    label: "Valor",
    color: "#6E56CF",
  },
};

export function Reports() {
  const [period, setPeriod] = useState("6m");

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">Relatórios</h1>
            <p className="text-muted-foreground mt-1">
              Análises e relatórios gerenciais
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger className="w-[160px]">
                <Calendar className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1m">Último mês</SelectItem>
                <SelectItem value="3m">Últimos 3 meses</SelectItem>
                <SelectItem value="6m">Últimos 6 meses</SelectItem>
                <SelectItem value="1y">Último ano</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Filter className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-gradient-to-br from-tech-blue/10 to-tech-blue/5 border-tech-blue/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Processos</p>
                  <p className="text-2xl font-bold">250</p>
                  <p className="text-xs text-success mt-1">+15% vs período anterior</p>
                </div>
                <BarChart3 className="w-8 h-8 text-tech-blue/50" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-success/10 to-success/5 border-success/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Valor Total</p>
                  <p className="text-2xl font-bold">R$ 8.4M</p>
                  <p className="text-xs text-success mt-1">+22% vs período anterior</p>
                </div>
                <DollarSign className="w-8 h-8 text-success/50" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Importações</p>
                  <p className="text-2xl font-bold">178</p>
                  <p className="text-xs text-muted-foreground mt-1">71% do total</p>
                </div>
                <Ship className="w-8 h-8 text-muted-foreground/50" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Exportações</p>
                  <p className="text-2xl font-bold">72</p>
                  <p className="text-xs text-muted-foreground mt-1">29% do total</p>
                </div>
                <Plane className="w-8 h-8 text-muted-foreground/50" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Operations by month */}
          <Card>
            <CardHeader>
              <CardTitle>Operações por Mês</CardTitle>
              <CardDescription>Importações vs Exportações</CardDescription>
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
                  <Bar dataKey="importacao" fill="#0066FF" radius={[4, 4, 0, 0]} name="Importação" />
                  <Bar dataKey="exportacao" fill="#00D68F" radius={[4, 4, 0, 0]} name="Exportação" />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Value trend */}
          <Card>
            <CardHeader>
              <CardTitle>Evolução de Valores</CardTitle>
              <CardDescription>Valor total das operações (R$)</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px] w-full">
                <AreaChart data={monthlyData}>
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
                    tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
                  />
                  <ChartTooltip
                    content={({ payload }) => {
                      if (payload && payload[0]) {
                        return (
                          <div className="bg-popover border rounded-lg p-2 shadow-lg">
                            <p className="font-medium">
                              R$ {payload[0].value?.toLocaleString("pt-BR")}
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="valor"
                    stroke="#6E56CF"
                    fill="#6E56CF"
                    fillOpacity={0.2}
                  />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Countries */}
          <Card>
            <CardHeader>
              <CardTitle>Origem das Operações</CardTitle>
              <CardDescription>Distribuição por país</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-8">
                <ChartContainer config={chartConfig} className="h-[200px] w-[200px]">
                  <PieChart>
                    <Pie
                      data={countryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {countryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ChartContainer>
                <div className="space-y-3 flex-1">
                  {countryData.map((item) => (
                    <div key={item.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-sm">{item.name}</span>
                      </div>
                      <span className="text-sm font-medium">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Status breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Status dos Processos</CardTitle>
              <CardDescription>Distribuição atual</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {statusData.map((item) => (
                  <div key={item.status} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>{item.status}</span>
                      <span className="font-medium">{item.quantidade} ({item.percentual}%)</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-tech-blue rounded-full transition-all duration-500"
                        style={{ width: `${item.percentual}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Report templates */}
        <Card>
          <CardHeader>
            <CardTitle>Modelos de Relatórios</CardTitle>
            <CardDescription>Gere relatórios personalizados</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {reportTemplates.map((report) => {
                const Icon = report.icon;
                return (
                  <div
                    key={report.id}
                    className="flex items-start gap-4 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors cursor-pointer group"
                  >
                    <div className="p-2 rounded-lg bg-tech-blue/10 group-hover:bg-tech-blue/20 transition-colors">
                      <Icon className="w-5 h-5 text-tech-blue" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm mb-1">{report.title}</h4>
                      <p className="text-xs text-muted-foreground">{report.description}</p>
                    </div>
                    <Button variant="ghost" size="icon" className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}

export default Reports;
