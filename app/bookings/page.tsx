import { Header } from "../_components/header"
import { BookingItem } from "../_components/booking-item"
import { GetConfirmedBookings } from "../_data/get-confirmed-bookings"
import { GetConcluedBookings } from "../_data/get-conclued-bookings"
import { getServerSession } from "next-auth"
import { authOptions } from "../_lib/auth"
import { redirect } from "next/navigation"
import Image from "next/image"
import { Card, CardContent } from "../_components/ui/card"
import { Avatar, AvatarImage } from "../_components/ui/avatar"
import { PhoneItem } from "../_components/phone-item"

export default async function Bookings() {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    return redirect("/")
  }
  const confirmedBookings = await GetConfirmedBookings()
  const concludedBookings = await GetConcluedBookings()

  return (
    <>
      <Header />
      <div className="space-y-3 p-5 sm:mx-auto sm:my-0 sm:flex sm:max-w-[928px]">
        <div className="sm:w-full">
          <h1 className="text-xl font-bold">Agendamentos</h1>
          {confirmedBookings.length === 0 && concludedBookings.length === 0 && (
            <p className="text-gray-400">Você não tem agendamentos.</p>
          )}
          {confirmedBookings.length > 0 && (
            <>
              <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
                Confirmados
              </h2>
              {confirmedBookings.map((booking) => (
                <BookingItem
                  key={booking.id}
                  booking={JSON.parse(JSON.stringify(booking))}
                />
              ))}
            </>
          )}
          {concludedBookings.length > 0 && (
            <>
              <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
                Finalizados
              </h2>
              {concludedBookings.map((booking) => (
                <BookingItem
                  key={booking.id}
                  booking={JSON.parse(JSON.stringify(booking))}
                />
              ))}
            </>
          )}
        </div>

        {/** right - Only Desktop */}
        <div className="hidden sm:mt-10 sm:flex sm:max-h-[729px] sm:w-full sm:max-w-[386px] sm:rounded-2xl sm:bg-[#1A1B1F] sm:p-5">
          <div className="sm:space-y-5">
            <div className="sm:relative sm:mb-5 sm:flex sm:h-[180px] sm:items-end">
              <Image
                fill
                src="/map.png"
                className="rounded-xl sm:object-cover"
                // alt={`Mapa da barbearia ${booking.service.barbershop.name}`}
                alt={`Mapa da barbearia`}
              />
              <Card className="z-50 mx-5 mb-3 w-full rounded-xl">
                <CardContent className="flex items-center gap-3 px-5 py-3">
                  <Avatar>
                    {/* <AvatarImage src={booking.service.barbershop.imageUrl} /> */}
                    <AvatarImage src="" />
                  </Avatar>
                  <div>
                    {/* <h3 className="sm:font-bold">{booking.service.barbershop.name}</h3> */}
                    <h3 className="sm:font-bold">name</h3>
                    {/* <p className="sm:text-xs">{booking.service.barbershop.address}</p> */}
                    <p className="sm:text-xs">address</p>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div>
              <h3 className="sm:text-sm sm:font-bold sm:text-[#838896]">
                SOBRE NÓS
              </h3>
              <p className="font-normal sm:mb-6 sm:text-sm sm:text-[#838896]">
                description
              </p>
            </div>
            <div className="sm:w-full sm:border-[1px] sm:border-[#26272B]"></div>
            {/* {booking.service.barbershop.phones.map((phone) => (
                <PhoneItem key={phone} phone={phone} />
              ))} */}
            <PhoneItem phone="485208454950487584" />
            <div className="sm:w-full sm:border-[1px] sm:border-[#26272B]"></div>
          </div>
        </div>
      </div>
    </>
  )
}
