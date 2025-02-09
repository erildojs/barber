"use server"
import { db } from "../_lib/prisma"

export async function GetPopularBarbershops() {
  return db.barbershop.findMany({
    where: {
      notes: {
        gt: 4,
      },
    },
    orderBy: {
      name: "desc",
    },
  })
}
