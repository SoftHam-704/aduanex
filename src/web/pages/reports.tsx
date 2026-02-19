import { useState } from "react";
import {
  Download,
  FileText,
  Calendar,
  TrendingUp,
  BarChart3,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  LineChart,
  Line,
} from "recharts";

const monthlyData = [
  { month: "Jan", importacao: 42, exportacao: 28 },
  { month: "Fev", importacao: 38, exportacao: 32 },
  { month: "Mar", importacao: 45, exportacao: 35 },
  { month: "Abr", importacao: 52, exportacao: 30 },
  { month: "Mai", importacao: 48, exportacao: 38 },
  { month: "Jun", importacao: 55, exportacao: 42 },
];

const valueData = [
  { month: "Jan", value: 1250000 },
  { month: "Fev", value: 1180000 },
  { month: "Mar", value: 1420000 },
  { month: "Abr", value: 1580000 },
  { month: "Mai", value: 1320000 },
  { month: "Jun", value: 1650000 },
];

// Fresh Corporate Palette
const COLORS = {
  green: "#10B981",
  orange: "#FB923C",
  blue: "#60A5FA",
  yellow: "#EAB308",
  red: "#DC2626",
};

const chartConfig = {
  importacao: { label: "Importação", color: COLORS.blue },
  exportacao: { label: "Exportação", color: COLORS.green },
  value: { label: "Valor", color: COLORS.green },
};

const reports = [
  { id: 1, name: "Processos por Status", description: "Distribuição de processos por situação", type: "chart" },
  { id: 2, name: "Operações por Cliente", description: "Volume de operações por importador/exportador", type: "table" },
  { id: 3, name: "Valores por Período", description: "Análise de valores movimentados", type: "chart" },
  { id: 4, name: "Documentos Aduaneiros", description: "DIs, DU-Es e DUIMPs registrados", type: "table" },
  { id: 5, name: "Performance Operacional", description: "Tempo médio de desembaraço", type: "chart" },
];

export function Reports() {
  const [period, setPeriod] = useState("30d");

  const stats = [
    { label: "Processos", value: 127, change: "+12%", color: "text-foreground" },
    { label: "Valor Total", value: "R$ 8.4M", change: "+18%", color: `text-[${COLORS.blue}]` },
    { label: "Liberados", value: 48, change: "+8%", color: `text-[${COLORS.green}]` },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-5">
        {/* Page header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold">Relatórios</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Análises e métricas operacionais
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger className="w-36 h-9">
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
            <Button variant="outline" size="sm" className="h-9">
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </Button>
          </div>
        </div>

        {/* Stats row */}
        <div className="flex flex-wrap gap-4 py-2 px-3 bg-muted/30 rounded-md text-xs">
          {stats.map((stat) => (
            <div key={stat.label} className="flex items-baseline gap-1.5">
              <span className={`text-base font-semibold tabular-nums ${stat.color}`}>{stat.value}</span>
              <span className="text-[#10B981]">{stat.change}</span>
              <span className="text-muted-foreground">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Operações por Mês</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <ChartContainer config={chartConfig} className="h-[250px] w-full">
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
                  <Bar dataKey="importacao" fill={COLORS.blue} radius={[2, 2, 0, 0]} />
                  <Bar dataKey="exportacao" fill={COLORS.green} radius={[2, 2, 0, 0]} />
                </BarChart>
              </ChartContainer>
              <div className="flex justify-center gap-6 mt-2">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: COLORS.blue }} />
                  <span className="text-xs text-muted-foreground">Importação</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: COLORS.green }} />
                  <span className="text-xs text-muted-foreground">Exportação</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle>Valores Movimentados</CardTitle>
                <div className="flex items-center gap-1" style={{ color: COLORS.green }}>
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span className="text-xs font-medium">+18%</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <ChartContainer config={chartConfig} className="h-[250px] w-full">
                <LineChart data={valueData}>
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
                    width={50}
                    tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
                  />
                  <ChartTooltip
                    content={({ payload }) => {
                      if (payload && payload[0]) {
                        return (
                          <div className="bg-popover border rounded px-2 py-1.5 text-xs">
                            <p className="font-medium">R$ {payload[0].value?.toLocaleString()}</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke={COLORS.green}
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Reports list */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Relatórios Disponíveis</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="divide-y divide-border">
              {reports.map((report) => (
                <div
                  key={report.id}
                  className="flex items-center justify-between py-3 first:pt-0 last:pb-0"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-muted flex items-center justify-center">
                      {report.type === "chart" ? (
                        <BarChart3 className="w-4 h-4 text-muted-foreground" />
                      ) : (
                        <FileText className="w-4 h-4 text-muted-foreground" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{report.name}</p>
                      <p className="text-xs text-muted-foreground">{report.description}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Gerar
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}

export default Reports;
