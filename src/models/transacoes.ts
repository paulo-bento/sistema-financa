import "server-only";
import { ObjectId, type Collection, type Filter, type WithId } from "mongodb";
import { getMongoClient } from "@/lib/mongodb";
import type { DadosTransacao, FiltrosTransacao, Transacao } from "@/types/transacao";

async function colecaoTransacoes(): Promise<Collection<Transacao>> {
  const client = await getMongoClient();
  return client.db().collection<Transacao>("transacoes");
}

export async function listarTransacoes(userId: string, filtros: FiltrosTransacao): Promise<WithId<Transacao>[]> {
  const transacoes = await colecaoTransacoes();
  const consulta: Filter<Transacao> = { userId: new ObjectId(userId) };

  if (filtros.tipo) consulta.tipo = filtros.tipo;
  if (filtros.categoria) consulta.categoria = filtros.categoria;
  if (filtros.mes) {
    const inicio = new Date(`${filtros.mes}-01T00:00:00.000Z`);
    const fim = new Date(inicio.getTime());
    fim.setUTCMonth(fim.getUTCMonth() + 1);
    consulta.data = { $gte: inicio, $lt: fim };
  }

  return transacoes.find(consulta).sort({ data: -1, _id: -1 }).toArray();
}

export async function buscarTransacao(userId: string, id: string): Promise<WithId<Transacao> | null> {
  if (!ObjectId.isValid(id)) return null;

  const transacoes = await colecaoTransacoes();
  return transacoes.findOne({ _id: new ObjectId(id), userId: new ObjectId(userId) });
}

export async function criarTransacao(userId: string, dados: DadosTransacao): Promise<void> {
  const transacoes = await colecaoTransacoes();
  await transacoes.insertOne({ ...dados, userId: new ObjectId(userId) });
}

export async function atualizarTransacao(userId: string, id: string, dados: DadosTransacao): Promise<boolean> {
  if (!ObjectId.isValid(id)) return false;

  const transacoes = await colecaoTransacoes();
  const resultado = await transacoes.updateOne(
    { _id: new ObjectId(id), userId: new ObjectId(userId) },
    { $set: dados },
  );
  return resultado.matchedCount === 1;
}

export async function removerTransacao(userId: string, id: string): Promise<boolean> {
  if (!ObjectId.isValid(id)) return false;

  const transacoes = await colecaoTransacoes();
  const resultado = await transacoes.deleteOne({ _id: new ObjectId(id), userId: new ObjectId(userId) });
  return resultado.deletedCount === 1;
}
