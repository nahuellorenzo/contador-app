"use server";

import { db } from "./drizzle";
import { eq } from 'drizzle-orm';
import { contador } from "./../db/schema";

export async function getContador() {
    const resultado = await db.select().from(contador).where(eq(contador.id, 1 )).get();
    return resultado?.valor ?? 0;
}

export async function incrementar() {
    const actual = await getContador();
    await db.update(contador)
    .set({ valor: actual + 1 })
    .where(eq(contador.id, 1)).run();
}

export async function decrementar() {
    const actual = await getContador();
    await db.update(contador)
    .set({ valor: actual - 1 })
    .where(eq(contador.id, 1)).run();
}

export async function resetear() {
    await db.update(contador)
    .set({ valor: 0 })
    .where(eq(contador.id, 1)).run();
}