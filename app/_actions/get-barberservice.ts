"use server"
import { db } from "../_lib/prisma"

export async function GetBarberservice() {
  return db.barbershopService.findMany()
  // revalidatePath('/barbershops/[id]')
  // revalidatePath('/bookings')
}