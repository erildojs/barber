"use server"
import { revalidatePath } from "next/cache"
import { db } from "../_lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "../_lib/auth"

type CreateBookingProps = {
  serviceId: string
  date: Date
}
export async function CreateBooking(params: CreateBookingProps) {
  const user = await getServerSession(authOptions)
  if (!user) {
    throw new Error("Usuario não autenticado")
  }
  await db.booking.create({
    data: { ...params, userId: (user.user as any).id },
  })
  revalidatePath("/barbershops/[id]")
  revalidatePath("/bookings")
}
