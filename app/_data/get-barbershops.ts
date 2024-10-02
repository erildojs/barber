'use server'
import { db } from "../_lib/prisma"

type BarbershopPageProps = {
  searchParams: {
    title?: string
    service?: string
  }
}

export function GetBarbershops({ searchParams }: BarbershopPageProps) {
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
        searchParams.service
          ? {
            services: {
              some: {
                name: {
                  contains: searchParams.service,
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