'use client'
import { Barbershop, BarbershopService, Booking } from "@prisma/client"
import Image from "next/image"
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle } from "./ui/sheet"
import { Calendar } from "./ui/calendar"
import { pt, ptBR } from "date-fns/locale"
import { useEffect, useState } from "react"
import { format, set } from "date-fns"
import { CreateBooking } from "../_actions/create-booking"
import { useSession } from "next-auth/react"
import { toast } from "sonner"
import { getBookings } from "../_actions/get-bookings"
import { Dialog, DialogContent } from "./ui/dialog"
import { SignInDialog } from "./sign-in-dialog"

interface ServiceItemProps {
  service: BarbershopService
  barbershop: Pick<Barbershop, 'name'>//pega apenas um campo
}
const TIME_LIST = [
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
]
function getTimeList(bookings: Booking[]) {
  return TIME_LIST.filter(time => {
    const hour = Number(time.split(':')[0])
    const minutes = Number(time.split(':')[1])
    const hasBookingOnCurrentTime = bookings.some(booking => {
      booking.date.getHours() === hour &&
        booking.date.getMinutes() === minutes
    })
    if (hasBookingOnCurrentTime) return false
    return true
  })
}

export function ServiceItem({ service, barbershop }: ServiceItemProps) {
  const { data } = useSession()
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState<string | undefined>(undefined)
  const [dayBookings, setDayBookings] = useState<Booking[]>([])
  const [bookingSheetIsOpen, setBookingSheetIsopen] = useState(false)
  const [signInDialogIsOpen, setSignInDialogIsOpen] = useState(false)
  useEffect(() => {
    const fetch = async () => {
      if (!selectedDay) return
      const bookings = await getBookings({ date: selectedDay, serviceId: service.id })
      setDayBookings(bookings)
    }
    fetch()
  }, [selectedDay, service.id])
  function handleBookingClick() {
    if (data?.user) {
      return setBookingSheetIsopen(true)
    }
    return setSignInDialogIsOpen(true)
  }
  function handleBookingSheetOpenChange() {
    setSelectedDay(undefined)
    setSelectedTime(undefined)
    setDayBookings([])
    setBookingSheetIsopen(false)
  }
  function handleDateSelect(date: Date | undefined) {
    setSelectedDay(date)
  }
  function handleTimeSelect(time: string) {
    setSelectedTime(time)
  }
  async function handleCreateBooking() {

    try {
      if (!selectedDay || selectedTime) return
      const hour = Number(selectedTime?.split(':')[0])
      const minute = Number(selectedTime?.split(':')[0])
      const newDate = set(selectedDay, {
        minutes: minute,
        hours: hour
      })
      await CreateBooking({
        serviceId: service.id,
        date: newDate
      })
      handleBookingSheetOpenChange()
      toast.success('Reserva criada com sucesso')
    } catch (error) {
      console.error(error)
      toast.error('Erro ao fazer a reserva')
    }
  }

  return (
    <>
      <Card>
        <CardContent className="flex items-center gap-3 p-3">
          <div className="relative max-h-[110px] min-h-[110px] min-w-[110px] max-w-[110px]">
            <Image
              src={service.imageUrl}
              alt={service.name}
              fill
              className="rounded-lg object-cover"
            />
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-semibold">{service.name}</h3>
            <p className="text-sm text-gray-400">{service.description}</p>

            <div className="flex items-center justify-between">
              <p className="text-sm font-bold text-primary">
                {Intl.NumberFormat("pt-AO", {
                  style: "currency",
                  currency: "KWZ",
                }).format(Number(service.price))}
              </p>
              <Sheet open={bookingSheetIsOpen} onOpenChange={handleBookingSheetOpenChange}>

                <Button size="sm" variant="secondary" onClick={handleBookingClick}>
                  Reservar
                </Button>

                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Fazer Reserva</SheetTitle>
                  </SheetHeader>
                  <div className="py-5 border-b border-solid">
                    <Calendar mode="single" locale={ptBR} selected={selectedDay} onSelect={handleDateSelect}
                      fromDate={new Date()}
                      styles={{
                        head_cell: {
                          width: "100%",
                          textTransform: "capitalize",
                        },
                        cell: {
                          width: "100%",
                        },
                        button: {
                          width: "100%",
                        },
                        nav_button_previous: {
                          width: "32px",
                          height: "32px",
                        },
                        nav_button_next: {
                          width: "32px",
                          height: "32px",
                        },
                        caption: {
                          textTransform: "capitalize",
                        },
                      }}
                    />
                  </div>
                  {selectedDay && (
                    <div className="gap-3 flex overflow-x-auto p-5 [&::webkit-scrollbar]:hidden border-b border-solid">
                      {getTimeList(dayBookings).map(time => (
                        <Button key={time} variant={selectedTime === time ? 'default' : 'outline'}
                          className="rounded-full"
                          onClick={() => handleTimeSelect(time)}>
                          {time}
                        </Button>
                      ))}
                    </div>
                  )}
                  {selectedTime && selectedDay && (
                    <div className="p-5">
                      <Card>
                        <CardContent className="p-3 space-y-3">
                          <div className="flex items-center justify-between">
                            <h2 className="font-bold">{service.name}</h2>
                            <p className="text-sm font-bold">
                              {Intl.NumberFormat("pt-AO", {
                                style: "currency",
                                currency: "KWZ",
                              }).format(Number(service.price))}
                            </p>
                          </div>
                          <div className="flex items-center justify-between">
                            <h2 className="text-sm text-gray-400">Data</h2>
                            <p className="text-sm">
                              {format(selectedDay, "d 'de' MMMM", {
                                locale: pt
                              })}
                            </p>
                          </div>
                          <div className="flex items-center justify-between">
                            <h2 className="text-sm text-gray-400">Horário</h2>
                            <p className="text-sm">
                              {selectedTime}
                            </p>
                          </div>
                          <div className="flex items-center justify-between">
                            <h2 className="text-sm text-gray-400">Barbearia</h2>
                            <p className="text-sm">
                              {barbershop.name}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )}
                  <SheetFooter className="px-5 mt-5">
                    <Button type="submit" disabled={!selectedTime || !selectedDay} onClick={handleCreateBooking}>
                      Confirmar
                    </Button>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={signInDialogIsOpen} onOpenChange={(open => setSignInDialogIsOpen(open))}>
        <DialogContent className="w-[90%]">
          <SignInDialog />
        </DialogContent>
      </Dialog>
    </>
  )
}
