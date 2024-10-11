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
import Link from "next/link"
import { services } from "./_constants/services"

export default async function Home() {
  const session = await getServerSession(authOptions)
  const barbershops = await db.barbershop.findMany({})
  const popularBarbershops = await GetPopularBarbershops()
  const confirmedBookings = await GetConfirmedBookings()

  return (
    <div>
      <Header />
      <div className="p-5">
        <h2 className="text-xl font-bold">
          Olá {session?.user ? session.user.name : "Bem vindo"}
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
        <div className="mt-6 flex gap-3 overflow-scroll [&::-webkit-scrollbar]:hidden">
          {services.map((service) => (
            <Button
              className="gap-2"
              variant="secondary"
              key={service.title}
              asChild
            >
              <Link href={`/barbershops?services=${service.title}`}>
                <Image
                  src={service.imageUrl}
                  width={16}
                  height={16}
                  alt={service.title}
                />
                {service.title}
              </Link>
            </Button>
          ))}
        </div>
        <div className="relative mt-6 h-[150px] w-full">
          <Image
            src="/banner-01.png"
            fill
            className="rounded-xl object-cover"
            alt="Agende nos melhores com FSW Barber"
          />
        </div>
        {confirmedBookings.length > 0 && (
          <>
            <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
              Agendamentos
            </h2>
            <div className="flex gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden">
              {confirmedBookings.map((booking) => (
                <BookingItem
                  key={booking.id}
                  booking={JSON.parse(JSON.stringify(booking))}
                />
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
