import { pgTable, pgSchema, uuid, varchar, char, timestamp, boolean, text, decimal, integer, smallint } from "drizzle-orm/pg-core";

// Tabelas do Schema Public (Master/Compartilhadas)
// No Drizzle, para o schema 'public', usamos pgTable diretamente sem definir pgSchema("public")

export const empresas = pgTable("empresas", {
    id: integer("id").primaryKey(),
    cnpj: varchar("cnpj", { length: 18 }).notNull().unique(),
    razaoSocial: varchar("razao_social", { length: 200 }).notNull(),
    nomeFantasia: varchar("nome_fantasia", { length: 200 }),
    emailContato: varchar("email_contato", { length: 150 }),
    telefone: varchar("telefone", { length: 20 }),
    status: varchar("status", { length: 20 }),
    dataAdesao: timestamp("data_adesao"),
    dataVencimento: timestamp("data_vencimento"),
    valorMensalidade: decimal("valor_mensalidade", { precision: 10, scale: 2 }),
    limiteUsuarios: integer("limite_usuarios"),
    dbHost: varchar("db_host", { length: 255 }),
    dbNome: varchar("db_nome", { length: 100 }),
    dbUsuario: varchar("db_usuario", { length: 100 }),
    dbSenha: varchar("db_senha", { length: 255 }),
    dbPorta: integer("db_porta"),
    dbSchema: varchar("db_schema", { length: 50 }),
    ramoAtv: varchar("ramoatv", { length: 100 }),
    moduloBiAtivo: boolean("modulo_bi_ativo").default(false),
    moduloWhatsappAtivo: boolean("modulo_whatsapp_ativo").default(false),
    planoIaNivel: varchar("plano_ia_nivel", { length: 20 }),
});

// Tabelas Compartilhadas (Schema Public)
export const paises = pgTable("paises", {
    id: integer("id").primaryKey(),
    codigoBacen: varchar("codigo_bacen", { length: 5 }).notNull(),
    codigoIso: char("codigo_iso", { length: 2 }).notNull(),
    nomePt: varchar("nome_pt", { length: 80 }).notNull(),
    nomeEn: varchar("nome_en", { length: 80 }).notNull(),
    ativo: boolean("ativo").default(true),
});

export const cidades = pgTable("cidades", {
    id: integer("id").primaryKey(),
    codigoIbge: char("codigo_ibge", { length: 7 }).notNull().unique(),
    nome: varchar("nome", { length: 100 }).notNull(),
    uf: char("uf", { length: 2 }).notNull(),
    paisId: integer("pais_id").notNull(),
    ativo: boolean("ativo").default(true),
});

export const ncm = pgTable("ncm", {
    id: integer("id").primaryKey(),
    codigo: char("codigo", { length: 8 }).notNull().unique(),
    descricao: varchar("descricao", { length: 300 }).notNull(),
    unidadeMedida: varchar("unidade_medida", { length: 6 }),
    ativo: boolean("ativo").default(true),
});

// Tabelas de Tenant (Perfil Específico da Empresa)
// Usamos pgTable sem schema para que ela respeite o search_path definido pelo middleware
export const fornecedores = pgTable("fornecedores", {
    id: uuid("id").primaryKey().defaultRandom(),
    cnpj: char("cnpj", { length: 14 }).notNull().unique(),
    razaoSocial: varchar("razao_social", { length: 150 }).notNull(),
    nomeFantasia: varchar("nome_fantasia", { length: 150 }),
    logradouro: varchar("logradouro", { length: 100 }).notNull(),
    numero: varchar("numero", { length: 10 }).notNull(),
    bairro: varchar("bairro", { length: 60 }).notNull(),
    cidadeId: integer("cidade_id").notNull(),
    cep: char("cep", { length: 8 }).notNull(),
    paisId: integer("pais_id").notNull(),
    email: varchar("email", { length: 100 }),
    telefone: varchar("telefone", { length: 15 }),
    ativo: boolean("ativo").default(true),
    criadoEm: timestamp("criado_em").defaultNow(),
});

export const produtos = pgTable("produtos", {
    id: uuid("id").primaryKey().defaultRandom(),
    codigoInterno: varchar("codigo_interno", { length: 30 }).notNull().unique(),
    ncmId: integer("ncm_id").notNull(),
    descricaoPt: varchar("descricao_pt", { length: 200 }).notNull(),
    pesoLiquidoUn: decimal("peso_liquido_un", { precision: 10, scale: 4 }),
    pesoBrutoUn: decimal("peso_bruto_un", { precision: 10, scale: 4 }),
    ativo: boolean("ativo").default(true),
    criadoEm: timestamp("criado_em").defaultNow(),
});
