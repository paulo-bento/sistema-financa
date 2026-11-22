import "server-only";
import { MongoClient } from "mongodb";

const mongoGlobal = globalThis as typeof globalThis & {
  mongoClientPromise?: Promise<MongoClient>;
};

export function getMongoClient(): Promise<MongoClient> {
  if (!mongoGlobal.mongoClientPromise) {
    const uri = process.env.MONGODB_URI?.trim();
    if (!uri) {
      throw new Error("MONGODB_URI não configurada. Defina a variável no ambiente do servidor.");
    }

    mongoGlobal.mongoClientPromise = MongoClient.connect(uri).catch(() => {
      delete mongoGlobal.mongoClientPromise;
      throw new Error("Falha ao conectar ao MongoDB. Verifique MONGODB_URI e o acesso de rede ao Atlas.");
    });
  }

  return mongoGlobal.mongoClientPromise;
}
