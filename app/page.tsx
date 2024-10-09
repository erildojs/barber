import { Header } from "./_components/header"
import { Button } from "./_components/ui/button"
import { BarbershopItem } from "./_components/barbershop-item"
import { db } from "./_lib/prisma"
import Image from "next/image"
import { BookingItem } from "./_components/booking-item"
import { Search } from "./_components/search"
import { getServerSession } from "next-auth"
import { authOptions } from "./_lib/auth"
import { format } from "date-fns"
import { pt } from "date-fns/locale"
import { GetConfirmedBookings } from "./_data/get-confirmed-bookings"
import { GetPopularBarbershops } from "./_data/get-popular-barbershops"
import { GetBarberservice } from "./_actions/get-barberservice"
import Link from "next/link"

export default async function Home() {
  const session = await getServerSession(authOptions)
  const barbershops = await db.barbershop.findMany({})
  const popularBarbershops = await GetPopularBarbershops()
  const confirmedBookings = await GetConfirmedBookings()
  const barberservices = await GetBarberservice()

  return (
    <div>
      <Header />
      <div className="p-5">
        <h2 className="text-xl font-bold">
          Olá {session?.user ? session.user.name : 'Bem vindo'}
        </h2>
        <p>
          <span className="capitalize">
            {format(new Date(), "EEEE, dd", { locale: pt })}
          </span>
          <span>&nbsp;de&nbsp;</span>
          <span className="capitalize">
            {format(new Date(), "MMMM", { locale: pt })}
          </span>
        </p>
        <div className="mt-6">
          <Search />
        </div>
        <div
          className="mt-6 flex gap-3 overflow-scroll [&::-webkit-scrollbar]:hidden"
        >
          {barberservices.map(service => (
            <Button key={service.id}
              className="gap-2"
              variant="secondary"
            >
              <Link href={`/barbershops?services=${service.name}`} className="flex">
                <Image src={service.imageUrl} width={20} height={20} alt={service.name} className="rounded-[8px] pr-1" />
                {service.name}
              </Link>
            </Button>
          ))}
        </div>
        <div className="relative mt-6 h-[150px] w-full">
          <Image src="/banner-01.png" fill className="rounded-xl object-cover" alt="Agende nos melhores com FSW Barber"
          />
        </div>
        {confirmedBookings.length > 0 && (
          <>
            <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
              Agendamentos
            </h2>
            <div className="flex overflow-x-auto gap-3 [&::-webkit-scrollbar]:hidden">
              {confirmedBookings.map(booking => (
                <BookingItem key={booking.id} booking={JSON.parse(JSON.stringify(booking))} />
              ))}
            </div>
          </>
        )}
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
