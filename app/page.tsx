import { Header } from "./_components/header"
// import { Button } from "./_components/ui/button"
import { BarbershopItem } from "./_components/barbershop-item"
import { db } from "./_lib/prisma"
// import Image from "next/image"
import { BookingItem } from "./_components/booking-item"
// import { Search } from "./_components/search"
// import { getServerSession } from "next-auth"
// import { authOptions } from "./_lib/auth"
// import { format } from "date-fns"
// import { pt } from "date-fns/locale"
import { GetConfirmedBookings } from "./_data/get-confirmed-bookings"
import { GetPopularBarbershops } from "./_data/get-popular-barbershops"
// import Link from "next/link"
// import { services } from "./_constants/services"
import { FiSearch } from "react-icons/fi"
export default async function Home() {
  // const session = await getServerSession(authOptions)
  const barbershops = await db.barbershop.findMany()
  const popularBarbershops = await GetPopularBarbershops()
  const confirmedBookings = await GetConfirmedBookings()

  return (
    <div>
      <Header />
      {/* <div className="p-5"> - so no mobile eu acho */}
      <div className="">
        {/** css para telas quase mobile, nao tenho certeza ainda
         * algumas coisas precisam sair mesmo no mobile
         */}
        {/* <h2 className="text-xl font-bold">
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
        </div> */}

        <section
          className="sm:relative sm:h-[22rem] sm:w-full sm:bg-cover sm:bg-center sm:bg-no-repeat"
          style={{ backgroundImage: "url('/bg.jpg')", opacity: 0.1 }}
        ></section>

        <div className="sm:left-26 sm:absolute sm:top-36 sm:flex">
          <div className="mr-32">
            <h1 className="sm:mb-1 sm:text-2xl sm:font-normal sm:text-white">
              Olá, Faça seu login!
            </h1>
            <p className="sm:mb-12 sm:text-sm sm:font-normal sm:text-white">
              Sexta, 2 de Fevereiro
            </p>
            <div className="sm:flex">
              <input
                type="text"
                placeholder="Buscar Barbearias"
                className="sm:mr-2 sm:h-9 sm:w-96 sm:rounded-lg sm:border-none sm:bg-[#26272B] sm:pl-3 sm:text-white sm:outline-none sm:placeholder:text-[#838896]"
              />
              <button className="sm:flex sm:h-9 sm:w-10 sm:items-center sm:justify-center sm:rounded-lg sm:bg-[#8162FF]">
                <FiSearch size={14} />
              </button>
            </div>
          </div>
          <div className="sm:max-w-[510px] sm:overflow-x-auto sm:[&::-webkit-scrollbar]:hidden">
            <h1 className="sm:mb-5 sm:text-sm sm:font-bold sm:text-[#838896]">
              Recomendados
            </h1>
            <div className="sm:flex sm:gap-3">
              {barbershops.map((barbershop) => (
                <BarbershopItem key={barbershop.id} barbershop={barbershop} />
              ))}
            </div>
          </div>
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
        <h2 className="mb-3 mt-6 uppercase text-gray-400 sm:text-xl sm:font-bold sm:text-white">
          {/* Recomendados - no mobile */}
          Populares
        </h2>
        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
        <h2 className="mb-3 mt-6 text-sm uppercase text-gray-400 sm:text-xl sm:font-bold sm:text-white">
          {/* Populares - no mobile */}
          Mais Visitados
        </h2>
        <div className="mb-4 flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {popularBarbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>
    </div>
  )
}
