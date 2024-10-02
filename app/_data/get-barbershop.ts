'use server'
import { db } from "../_lib/prisma";

type BarbershopPageProps = {
  params: {
    id: string
  }
}

export async function GetBarbershop({ params }: BarbershopPageProps) {
  return db.barbershop.findUnique({
    where: {
      id: params.id,
    },
    include: {
      services: true,
    },
  })
}