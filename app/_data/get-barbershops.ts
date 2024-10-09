'use server'
import { db } from "../_lib/prisma"

type BarbershopPageProps = {
  searchParams: {
    title?: string
    services?: string
  }
}

export async function GetBarbershops({ searchParams }: BarbershopPageProps) {
  return db.barbershop.findMany({
    where: {
      OR: [
        searchParams?.title
          ? {
            name: {
              contains: searchParams?.title,
              mode: "insensitive",
            },
          }
          : {},
        searchParams.services
          ? {
            services: {
              some: {
                name: {
                  contains: searchParams.services,
                  mode: "insensitive",
                },
              },
            },
          }
          : {},
      ],
    },
  })
}