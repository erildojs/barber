import { BarbershopItem } from "@/app/_components/barbershop-item"
import { Header } from "@/app/_components/header"
import { Search } from "@/app/_components/search"
import { db } from "@/app/_lib/prisma"

interface BarbershopPageProps {
  searchParams: {
    title?: string
    service?: string
  }
}

export default async function BarbershopPage({ searchParams, }: BarbershopPageProps) {
  const barbershops = await db.barbershop.findMany({
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

  // if (!barbershops) {
  //   return notFound()
  // }

  return (
    <div>
      <Header />
      <div className="my-6 px-5">
        <Search />
      </div>
      <div className="px-5">
        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Resultados para &quot;{searchParams?.title || searchParams?.service}
          &quot;
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {barbershops.map(barbershop => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>
    </div>

  )
}
