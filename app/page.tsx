import { Header } from "./_components/header"
import { Button } from "./_components/ui/button"
import { BarbershopItem } from "./_components/barbershop-item"
import { db } from "./_lib/prisma"
import Image from "next/image"
import { BookingItem } from "./_components/booking-item"
import { Search } from "./_components/search"
import { useSession } from "next-auth/react"
import { getServerSession } from "next-auth"
import { authOptions } from "./_lib/auth"

export default async function Home() {
  const { data } = useSession()
  const session = await getServerSession(authOptions)
  const barbershops = await db.barbershop.findMany({})
  const popularBarbershops = await db.barbershop.findMany({
    orderBy: {
      name: "desc",
    },
  })
  const confirmedBookings = session?.user ? await db.booking.findMany({
    where: {
      userId: (session.user as any).id,
      date: {
        gte: new Date()
      }
    },
    include: {
      service: {
        include: {
          barbershop: true
        }
      }
    }, orderBy: { date: 'asc' }
  }) : []

  return (
    <div>
      <Header />
      <div className="p-5">
        <h2 className="text-xl font-bold">Óla {data?.user && data?.user?.name}</h2>
        <p>Terça-feira, 04 de Setembro</p>
        <div className="mt-6">
          <Search />
        </div>
        <div className="mt-6 flex gap-3 overflow-scroll [&::-webkit-scrollbar]:hidden">
          <Button className="gap-2" variant="secondary">
            {/* <Link href={`/barbershops?services=${option.title}`}></Link> */}
            <Image src="/cabelo.svg" width={16} height={16} alt="Barba" />
            Cabelo
          </Button>
          <Button className="gap-2" variant="secondary">
            <Image src="/barba.svg" width={16} height={16} alt="Cabelo" />
            Barba
          </Button>
          <Button className="gap-2" variant="secondary">
            <Image
              src="/acabamento.svg"
              width={16}
              height={16}
              alt="Acabamento"
            />
            Acabamento
          </Button>
          <Button className="gap-2" variant="secondary">
            <Image src="/massagem.svg" width={16} height={16} alt="Massagem" />
            Massagem
          </Button>
          <Button className="gap-2" variant="secondary">
            <Image
              src="/acabamento.svg"
              width={16}
              height={16}
              alt="Acabamento"
            />
            Acabamento
          </Button>
        </div>
        <div className="relative mt-6 h-[150px] w-full">
          <Image
            src="/banner-01.png"
            fill
            className="rounded-xl object-cover"
            alt="Agende nos melhores com FSW Barber"
          />
        </div>
        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Agendamentos
        </h2>
        <div className="flex overflow-x-auto gap-3 [&::-webkit-scrollbar]:hidden">
          {confirmedBookings.map(booking => (
            <BookingItem key={booking.id} booking={booking} />
          ))}
        </div>
        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Recomendados
        </h2>
        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Populares
        </h2>
        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {popularBarbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>
    </div>
  )
}
