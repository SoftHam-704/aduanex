import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

// Conexão com o Banco Master (SalesMasters Central)
const masterConnectionString = `postgresql://${process.env.MASTER_DB_USER}:${process.env.MASTER_DB_PASSWORD}@${process.env.MASTER_DB_HOST}:${process.env.MASTER_DB_PORT}/${process.env.MASTER_DB_DATABASE}`;
const masterClient = postgres(masterConnectionString);
export const masterDb = drizzle(masterClient);

// Conexão com o Banco Operacional (Aduaneiro)
// Nota: Em runtime, usaremos SET search_path para trocar de schema (tenant)
const dbConnectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
const client = postgres(dbConnectionString);
export const db = drizzle(client);

/**
 * Função utilitária para obter uma conexão com o schema do tenant definido
 */
export async function getTenantDb(tenantSchema: string) {
    // Ajusta o search_path para o tenant específico e inclui o public para tabelas compartilhadas
    await client.unsafe(`SET search_path TO ${tenantSchema}, public`);
    return db;
}