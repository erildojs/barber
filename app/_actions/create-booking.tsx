"use server"

import { db } from "../_lib/prisma"

type CreateBookingProps = {
  userId: string
  serviceId: string
  date: Date
}
export async function CreateBooking(params: CreateBookingProps) {
  await db.booking.create({
    data: params
  })
}