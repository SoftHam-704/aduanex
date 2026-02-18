import { useState } from "react";
import {
  User,
  Bell,
  Shield,
  Database,
  Palette,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardLayout } from "@/components/layout/dashboard-layout";

export function Settings() {
  const [activeTab, setActiveTab] = useState("perfil");

  return (
    <DashboardLayout>
      <div className="space-y-5">
        {/* Page header */}
        <div>
          <h1 className="text-xl font-semibold">Configurações</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Gerencie suas preferências
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="h-9 p-1">
            <TabsTrigger value="perfil" className="text-xs h-7 px-3">
              <User className="w-3.5 h-3.5 mr-1.5" />
              Perfil
            </TabsTrigger>
            <TabsTrigger value="notificacoes" className="text-xs h-7 px-3">
              <Bell className="w-3.5 h-3.5 mr-1.5" />
              Notificações
            </TabsTrigger>
            <TabsTrigger value="aparencia" className="text-xs h-7 px-3">
              <Palette className="w-3.5 h-3.5 mr-1.5" />
              Aparência
            </TabsTrigger>
            <TabsTrigger value="seguranca" className="text-xs h-7 px-3">
              <Shield className="w-3.5 h-3.5 mr-1.5" />
              Segurança
            </TabsTrigger>
          </TabsList>

          {/* Perfil */}
          <TabsContent value="perfil" className="space-y-4 mt-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Dados Pessoais</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label className="text-xs">Nome</Label>
                    <Input defaultValue="João Silva" className="h-9" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs">E-mail</Label>
                    <Input type="email" defaultValue="joao@aduanex.com" className="h-9" />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label className="text-xs">Telefone</Label>
                    <Input defaultValue="(11) 99999-9999" className="h-9" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs">Cargo</Label>
                    <Input defaultValue="Despachante Aduaneiro" className="h-9" />
                  </div>
                </div>
                <Button size="sm">Salvar</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Empresa</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label className="text-xs">Razão Social</Label>
                    <Input defaultValue="ADUANEX Logística LTDA" className="h-9" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs">CNPJ</Label>
                    <Input defaultValue="12.345.678/0001-90" className="h-9 font-mono" />
                  </div>
                </div>
                <Button size="sm">Salvar</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notificações */}
          <TabsContent value="notificacoes" className="space-y-4 mt-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Preferências de Notificação</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">E-mail</p>
                    <p className="text-xs text-muted-foreground">Receber notificações por e-mail</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Push</p>
                    <p className="text-xs text-muted-foreground">Notificações no navegador</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Alertas de Prazo</p>
                    <p className="text-xs text-muted-foreground">Avisos de vencimentos</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Exigências SISCOMEX</p>
                    <p className="text-xs text-muted-foreground">Novas exigências registradas</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Aparência */}
          <TabsContent value="aparencia" className="space-y-4 mt-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Tema</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1.5">
                  <Label className="text-xs">Modo de Cores</Label>
                  <Select defaultValue="system">
                    <SelectTrigger className="w-48 h-9">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Claro</SelectItem>
                      <SelectItem value="dark">Escuro</SelectItem>
                      <SelectItem value="system">Sistema</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">Densidade</Label>
                  <Select defaultValue="normal">
                    <SelectTrigger className="w-48 h-9">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="compact">Compacto</SelectItem>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="comfortable">Confortável</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Segurança */}
          <TabsContent value="seguranca" className="space-y-4 mt-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Alterar Senha</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1.5">
                  <Label className="text-xs">Senha Atual</Label>
                  <Input type="password" className="h-9 max-w-sm" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">Nova Senha</Label>
                  <Input type="password" className="h-9 max-w-sm" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">Confirmar Nova Senha</Label>
                  <Input type="password" className="h-9 max-w-sm" />
                </div>
                <Button size="sm">Alterar Senha</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Autenticação em Dois Fatores</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">2FA</p>
                    <p className="text-xs text-muted-foreground">Adicione uma camada extra de segurança</p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}

export default Settings;
