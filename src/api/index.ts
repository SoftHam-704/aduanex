import { Hono } from 'hono';
import { cors } from "hono/cors";
import { masterDb, getTenantDb } from "./database";
import { empresas, paises, cidades, fornecedores, produtos } from "./database/schema";
import { eq } from "drizzle-orm";

type Bindings = {
  // Cloudflare Bindings here if needed
}

type Variables = {
  db: any;
  tenant: any;
}

const app = new Hono<{ Bindings: Bindings, Variables: Variables }>()
  .basePath('api');

app.use(cors({
  origin: "*"
}))

// Middleware de Tenant
app.use('*', async (c, next) => {
  const tenantHeader = c.req.header('x-tenant-slug'); // Slugs como 'colorado'

  if (tenantHeader) {
    try {
      // Busca no Banco Master qual o schema deste tenant
      const [empresa] = await masterDb
        .select()
        .from(empresas)
        .where(eq(empresas.dbSchema, tenantHeader))
        .limit(1);

      if (empresa && empresa.dbSchema) {
        // Configura o search_path dinamicamente para esta requisição
        const tenantDb = await getTenantDb(empresa.dbSchema);
        c.set('db', tenantDb);
        c.set('tenant', empresa);
      }
    } catch (error) {
      console.error('Tenant identification error:', error);
    }
  }

  await next();
});

// --- Rotas Shared (Public) ---

app.get('/paises', async (c) => {
  const db = c.get('db') || masterDb; // Tenta usar o db do contexto ou master (ambos têm acesso a public)
  try {
    const data = await db.select().from(paises).where(eq(paises.ativo, true));
    return c.json(data);
  } catch (error: any) {
    return c.json({ error: error.message }, 500);
  }
});

app.get('/cidades', async (c) => {
  const db = c.get('db') || masterDb;
  const paisId = c.req.query('paisId');

  try {
    let query = db.select().from(cidades).where(eq(cidades.ativo, true));
    if (paisId) {
      query = db.select().from(cidades).where(eq(cidades.paisId, parseInt(paisId)));
    }
    const data = await query;
    return c.json(data);
  } catch (error: any) {
    return c.json({ error: error.message }, 500);
  }
});

app.get('/ping', (c) => c.json({ message: `Pong! ${Date.now()}` }));

// --- Rotas de Tenant (Requerem x-tenant-slug) ---

app.get('/fornecedores', async (c) => {
  const db = c.get('db');
  if (!db) return c.json({ error: "Tenant not identified" }, 401);

  try {
    const data = await db.select().from(fornecedores);
    return c.json(data);
  } catch (error: any) {
    return c.json({ error: error.message }, 500);
  }
});

app.get('/produtos', async (c) => {
  const db = c.get('db');
  if (!db) return c.json({ error: "Tenant not identified" }, 401);

  try {
    const data = await db.select().from(produtos);
    return c.json(data);
  } catch (error: any) {
    return c.json({ error: error.message }, 500);
  }
});

export default app;