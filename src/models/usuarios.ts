import "server-only";
import { MongoServerError, type WithId } from "mongodb";
import { getMongoClient } from "@/lib/mongodb";
import type { Usuario } from "@/types/usuario";

export async function buscarUsuario(email: string): Promise<WithId<Usuario> | null> {
  const client = await getMongoClient();
  return client.db().collection<Usuario>("usuarios").findOne({ email });
}

export async function cadastrarUsuario(usuario: Usuario): Promise<boolean> {
  const client = await getMongoClient();
  const usuarios = client.db().collection<Usuario>("usuarios");
  await usuarios.createIndex({ email: 1 }, { unique: true });

  try {
    await usuarios.insertOne(usuario);
    return true;
  } catch (error) {
    if (error instanceof MongoServerError && error.code === 11000) {
      return false;
    }
    throw error;
  }
}
