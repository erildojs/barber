import { Header } from "./_components/header"
import { Button } from "./_components/ui/button"
import { BarbershopItem } from "./_components/barbershop-item"
import { Search } from "./_components/search"
import { getServerSession } from "next-auth"
import { authOptions } from "./_lib/auth"
import { format } from "date-fns"
import { pt } from "date-fns/locale"
import { GetPopularBarbershops } from "./_data/get-popular-barbershops"
import Image from "next/image"
import Link from "next/link"
import { db } from "./_lib/prisma"
import { services } from "./_constants/services"
import { FiChevronRight } from "react-icons/fi"
import { BookingItem } from "./_components/booking-item"
import { GetConfirmedBookings } from "./_data/get-confirmed-bookings"
import { Search2 } from "./_components/search2"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
} from "./_components/ui/carousel"

export default async function Home() {
  const session = await getServerSession(authOptions)
  const barbershops = await db.barbershop.findMany()
  const popularBarbershops = await GetPopularBarbershops()
  const confirmedBookings = await GetConfirmedBookings()

  return (
    <>
      <Header />
      {/** Mobile*/}
      <div className="p-5 lg:hidden">
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
        <div className="mt-6 flex gap-3 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
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
      </div>
      {/** Desktop */}
      <section
        className="hidden lg:relative lg:block lg:h-[22rem] lg:w-full lg:bg-cover lg:bg-center lg:bg-no-repeat"
        style={{ backgroundImage: "url('/bg-777.jpg')", opacity: 0.1 }}
      />
      <div className="hidden lg:absolute lg:left-[58px] lg:top-[118px] lg:mx-auto lg:my-0 lg:flex lg:w-full lg:max-w-6xl lg:justify-between">
        {/** Left */}
        <div>
          <h2 className="lg:mb-1 lg:text-2xl lg:font-normal lg:text-white">
            Olá {session?.user ? session.user.name : "Faça seu login"}
          </h2>
          <p className="lg:mb-6 lg:text-sm lg:font-normal lg:text-white">
            <span className="capitalize">
              {format(new Date(), "EEEE, dd", { locale: pt })}
            </span>
            <span>&nbsp;de&nbsp;</span>
            <span className="capitalize">
              {format(new Date(), "MMMM", { locale: pt })}
            </span>
          </p>
          <div className="lg:flex">
            <Search2 />
          </div>
          <h2 className="mb-3 mt-6 flex text-xs font-bold uppercase text-gray-400">
            Agendamentos
          </h2>
          {confirmedBookings.length >= 1 ? (
            <div className="flex lg:flex lg:gap-3 lg:overflow-x-auto lg:[&::-webkit-scrollbar]:hidden">
              {confirmedBookings.map((booking) => (
                <BookingItem
                  key={booking.id}
                  booking={JSON.parse(JSON.stringify(booking))}
                />
              ))}
            </div>
          ) : (
            <p className="text-sm lg:text-sm lg:font-bold lg:text-white">
              Nenhum agendamento confirmado no momento
            </p>
          )}
        </div>
        {/** Right */}
        <div className="lg:max-w-[590px]">
          <h1 className="lg:mb-5 lg:text-sm lg:font-bold lg:text-[#838896]">
            Recomendados
          </h1>
          {/**
           * <div className="lg:flex lg:gap-3 lg:overflow-x-scroll lg:[&::-webkit-scrollbar]:hidden">
            {barbershops.map((barbershop) => (
              <BarbershopItem key={barbershop.id} barbershop={barbershop} />
            ))}
          </div>
           */}
          <Carousel className="lg:flex lg:gap-3">
            <CarouselContent>
              {barbershops.map((barbershop) => (
                <CarouselItem
                  key={barbershop.id}
                  className="md:basis-1/2 lg:basis-1/3"
                >
                  <BarbershopItem key={barbershop.id} barbershop={barbershop} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselNext
              type="button"
              className="lg:absolute lg:right-[-28px] lg:top-[100px] lg:flex lg:h-14 lg:w-14 lg:items-center lg:justify-center lg:rounded-[28px] lg:bg-[#141518]"
            />
          </Carousel>
          {/** button de fazer scroll */}
          {/** <button
            type="button"
            className="lg:absolute lg:right-[-28px] lg:top-[100px] lg:flex lg:h-14 lg:w-14 lg:items-center lg:justify-center lg:rounded-[28px] lg:bg-[#141518]"
          >
            <FiChevronRight size={36} color="#FFF" />
          </button>
           * 
           */}
        </div>
      </div>

      <div className="p-5 lg:relative lg:mx-auto lg:my-0 lg:w-full lg:max-w-6xl lg:p-0">
        {/* Recomendados - no mobile */}
        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400 lg:hidden">
          Recomendados
        </h2>
        <h2 className="hidden lg:mb-3 lg:mt-6 lg:block lg:p-0 lg:text-xl lg:font-bold lg:text-white">
          Populares
        </h2>
        {/**
         * <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
          <button
            type="button"
            className="lg:absolute lg:right-[-28px] lg:top-[100px] lg:flex lg:h-14 lg:w-14 lg:items-center lg:justify-center lg:rounded-[28px] lg:border-2 lg:border-[#26272B] lg:bg-[#141518]"
          >
            <FiChevronRight className="" size={36} color="#FFF" />
          </button>
        </div>
         */}
        <Carousel className="lg:flex lg:gap-3">
          <CarouselContent>
            {barbershops.map((barbershop) => (
              <CarouselItem
                key={barbershop.id}
                className="md:basis-1/2 lg:basis-1/6"
              >
                <BarbershopItem key={barbershop.id} barbershop={barbershop} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselNext
            type="button"
            className="lg:absolute lg:right-[-28px] lg:top-[100px] lg:flex lg:h-14 lg:w-14 lg:items-center lg:justify-center lg:rounded-[28px] lg:bg-[#141518]"
          />
        </Carousel>

        {/* Populares - no mobile */}
        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400 lg:hidden">
          Populares
        </h2>
        {/** Mais visitados no desktop */}
        <h2 className="hidden lg:mb-3 lg:mt-6 lg:block lg:p-0 lg:text-xl lg:font-bold lg:text-white">
          Mais Visitados
        </h2>
        <div className="mb-4 flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {popularBarbershops.length === 0 ? (
            <div className="hidden lg:flex lg:h-[135px] lg:w-full lg:items-center lg:justify-center">
              <p className="text-sm lg:text-sm lg:font-bold lg:text-white">
                Nenhum barbershop no momento
              </p>
            </div>
          ) : (
            popularBarbershops.map((barbershop) => (
              <BarbershopItem key={barbershop.id} barbershop={barbershop} />
            ))
          )}
          {popularBarbershops.length > 6 && (
            <button
              type="button"
              className="lg:absolute lg:right-[-28px] lg:top-[420px] lg:flex lg:h-14 lg:w-14 lg:items-center lg:justify-center lg:rounded-[28px] lg:border-2 lg:border-[#26272B] lg:bg-[#141518]"
            >
              <FiChevronRight size={36} color="#FFF" />
            </button>
          )}
        </div>
      </div>
    </>
  )
}
