import { Route, Switch } from "wouter";
import Index from "./pages/index";
import ImportProcesses from "./pages/import-processes";
import ExportProcesses from "./pages/export-processes";
import ProcessForm from "./pages/process-form";
import Documents from "./pages/documents";
import Clients from "./pages/clients";
import Products from "./pages/products";
import Reports from "./pages/reports";
import Settings from "./pages/settings";
import { Provider } from "./components/provider";

function App() {
  return (
    <Provider>
      <Switch>
        <Route path="/" component={Index} />
        <Route path="/importacao" component={ImportProcesses} />
        <Route path="/importacao/novo" component={ProcessForm} />
        <Route path="/importacao/:id" component={ProcessForm} />
        <Route path="/exportacao" component={ExportProcesses} />
        <Route path="/documentos/di" component={Documents} />
        <Route path="/documentos/due" component={Documents} />
        <Route path="/documentos/duimp" component={Documents} />
        <Route path="/clientes" component={Clients} />
        <Route path="/fornecedores" component={Clients} />
        <Route path="/produtos" component={Products} />
        <Route path="/manifestos" component={ImportProcesses} />
        <Route path="/fiscal/nfe" component={Documents} />
        <Route path="/fiscal/cte" component={Documents} />
        <Route path="/fiscal/mdfe" component={Documents} />
        <Route path="/relatorios" component={Reports} />
        <Route path="/configuracoes" component={Settings} />
      </Switch>
    </Provider>
  );
}

export default App;
