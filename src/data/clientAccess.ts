export type ClientAccess = {
  id: string; name: string; company: string; email: string;
  password: string; active: boolean; [key: string]: unknown;
};

export const CLIENTS_STORAGE_KEY = 'meta_admin_clients';
export const LUNNA_ACCESS: ClientAccess = { id: 'lunna-atelier', name: 'Lunna Atelier', company: 'Lunna Atelier', email: 'lunna@cliente.com', password: 'PRESENCA-LUNNA', active: true };

export function normalizeAccessKey(value: string) {
  return value.trim().toLocaleUpperCase('pt-BR').replace(/[\s_-]+/g, '');
}

export function getStoredClients<T extends ClientAccess>(): T[] {
  try {
    const stored = JSON.parse(localStorage.getItem(CLIENTS_STORAGE_KEY) || '[]') as T[];
    if (!stored.length) return [LUNNA_ACCESS as T];
    return stored.map(client => client.id === LUNNA_ACCESS.id ? { ...client, password: LUNNA_ACCESS.password } : client);
  }
  catch { return [LUNNA_ACCESS as T]; }
}

export function findClientByAccessKey(value: string) {
  const key = normalizeAccessKey(value);
  return getStoredClients<ClientAccess>().find(client => client.active && normalizeAccessKey(client.password) === key);
}

export function findClientById(id?: string) {
  if (!id) return undefined;
  return getStoredClients<ClientAccess>().find(client => client.id === id);
}

export function createAccessKey(company: string) {
  const base = company.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-zA-Z0-9]/g, '').slice(0, 10).toUpperCase() || 'CLIENTE';
  return `${base}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
}
