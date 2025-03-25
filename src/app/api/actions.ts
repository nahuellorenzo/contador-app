"use server"

import { db } from "./drizzle"
import { eq, desc } from 'drizzle-orm'
import { contador, contadorHistorial } from "./../db/schema"
import { revalidatePath } from 'next/cache'

export async function getContador() {
    const resultado = await db.select().from(contador).where(eq(contador.id, 1 ))
    
    if (resultado.length === 0) {
        await db.insert(contador).values({ valor: 0 })
        return 0
    }

    return resultado[0]?.valor ?? 0
}

export async function incrementar() {
    const actual = await getContador()
    const timestamp = new Date().toLocaleString()
    await db.update(contador)
    .set({ valor: actual + 1 })
    .where(eq(contador.id, 1))

    await db.insert(contadorHistorial)
    .values({accion: "Incremento a " + (actual + 1), timestamp})

    revalidatePath('/')
    return actual + 1
}

export async function decrementar() {
    const actual = await getContador()
    const timestamp = new Date().toLocaleString()
    await db.update(contador)
    .set({ valor: actual - 1 })
    .where(eq(contador.id, 1))

    await db.insert(contadorHistorial)
    .values({accion: "Decremento a " + (actual - 1), timestamp})

    revalidatePath('/')
    return actual - 1
}

export async function resetear() {
    const timestamp = new Date().toLocaleString()
    await db.update(contador)
    .set({ valor: 0 })
    .where(eq(contador.id, 1))

    await db.insert(contadorHistorial)
    .values({accion: "Reseteo a 0", timestamp})

    revalidatePath('/')
    return 0
}

export async function getHistorial() {
    const result =  await db.select().from(contadorHistorial).orderBy(desc(contadorHistorial.id))

    return result ?? []
}

export async function borrarHistorial() {
    await db.delete(contadorHistorial)
    revalidatePath('/')
}