'use server'
import { db } from "../_lib/prisma";

export async function GetPopularBarbershops() {
  return db.barbershop.findMany({
    orderBy: {
      name: "desc",
    },
  })
}