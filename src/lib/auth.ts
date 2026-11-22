import "server-only";
import { compare } from "bcryptjs";
import NextAuth, { type Session, type User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { redirect } from "next/navigation";
import { cache } from "react";
import { normalizarEmail, validarSenha } from "@/lib/credenciais";
import { buscarUsuario } from "@/models/usuarios";

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  pages: { signIn: "/login" },
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      credentials: {
        email: { label: "E-mail", type: "email" },
        senha: { label: "Senha", type: "password" },
      },
      async authorize({ email, senha }): Promise<User | null> {
        const emailNormalizado = normalizarEmail(email);
        if (!emailNormalizado || !validarSenha(senha)) return null;

        const usuario = await buscarUsuario(emailNormalizado);
        if (!usuario || !(await compare(senha, usuario.senhaHash))) return null;

        return { id: usuario._id.toHexString(), name: usuario.nome, email: usuario.email };
      },
    }),
  ],
  callbacks: {
    session({ session, token }): Session {
      if (session.user && token.sub) session.user.id = token.sub;
      return session;
    },
  },
});

export const exigirUsuario = cache(async (): Promise<User & { id: string }> => {
  const usuario = (await auth())?.user;
  if (!usuario?.id) redirect("/login");
  return { ...usuario, id: usuario.id };
});
