"use client"
import { Prisma } from "@prisma/client"
import { Avatar, AvatarImage } from "./ui/avatar"
import { Badge } from "./ui/badge"
import { Card, CardContent } from "./ui/card"
import { format, isFuture } from "date-fns"
import { pt } from "date-fns/locale"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet"
import Image from "next/image"
import { PhoneItem } from "./phone-item"
import { Button } from "./ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import { DeleteBooking } from "../_actions/delete-booking"
import { toast } from "sonner"
import { useState } from "react"
import { BookingSummary } from "./booking-summary"

type BookingItemProps = {
  booking: Prisma.BookingGetPayload<{
    include: {
      service: {
        include: {
          barbershop: true
        }
      }
    }
  }>
}

export function BookingItem({ booking }: BookingItemProps) {
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const {
    service: { barbershop },
  } = booking
  const isConfirmed = isFuture(booking.date)
  async function handleCancelBookingClick() {
    try {
      await DeleteBooking(booking.id)
      setIsSheetOpen(false)
      toast.success("Reserva cancelada com sucesso!")
    } catch (error) {
      console.log(error)
      toast.error("Erro ao cancelar reserva. Tente novamente!")
    }
  }
  function handleSheetOpenChange(isOpen: boolean) {
    setIsSheetOpen(isOpen)
  }

  return (
    <Sheet open={isSheetOpen} onOpenChange={handleSheetOpenChange}>
      <SheetTrigger className="min-w-[90%] lg:w-full lg:min-w-[0] lg:max-w-[444px]">
        <Card className="min-w-[90%]">
          <CardContent className="flex justify-between p-0">
            <div className="flex flex-col gap-2 py-5 pl-5">
              <Badge
                className="w-fit"
                variant={isConfirmed ? "default" : "secondary"}
              >
                {isConfirmed ? "Confirmado" : "Finalizado"}
              </Badge>
              <h3 className="font-semibold">{booking.service.name}</h3>

              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={booking.service.barbershop.imageUrl} />
                </Avatar>
                <p className="text-sm">{booking.service.barbershop.name}</p>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center border-l-2 border-solid px-5">
              <p className="text-sm capitalize">
                {format(booking.date, "MMMM", { locale: pt })}
              </p>
              <p className="text-2xl">
                {format(booking.date, "dd", { locale: pt })}
              </p>
              <p className="text-sm">
                {format(booking.date, "HH:mm", { locale: pt })}
              </p>
            </div>
          </CardContent>
        </Card>
      </SheetTrigger>
      <SheetContent className="w-[85%]">
        <SheetHeader>
          <SheetTitle>Informações da Reserva</SheetTitle>
        </SheetHeader>
        <div className="relative mt-6 flex h-[180px] w-full items-end">
          <Image
            fill
            src="/map.png"
            className="rounded-xl object-cover"
            alt={`Mapa da barbearia ${booking.service.barbershop.name}`}
          />
          <Card className="z-50 mx-5 mb-3 w-full rounded-xl">
            <CardContent className="flex items-center gap-3 px-5 py-3">
              <Avatar>
                <AvatarImage src={barbershop.imageUrl} />
              </Avatar>
              <div>
                <h3 className="font-bold">{barbershop.name}</h3>
                <p className="text-xs">{barbershop.address}</p>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="mt-6">
          <Badge
            className="w-fit"
            variant={isConfirmed ? "default" : "secondary"}
          >
            {isConfirmed ? "Confirmado" : "Finalizado"}
          </Badge>
          <div className="mb-3 mt-6">
            <BookingSummary
              barbershop={barbershop}
              service={booking.service}
              selectedDate={booking.date}
            />
          </div>
          <div className="space-y-3">
            {barbershop.phones.map(
              (
                phone,
                index, //colocar o index nao eh recomendado
              ) => (
                <PhoneItem key={index} phone={phone} />
              ),
            )}
          </div>
        </div>

        <SheetFooter className="mt-6">
          <div className="flex items-center gap-3">
            <SheetClose asChild>
              <Button variant="outline" className="w-full">
                voltar
              </Button>
            </SheetClose>
            {isConfirmed && (
              <Dialog>
                <DialogTrigger className="w-full">
                  <Button variant="destructive" className="w-full">
                    Cancelar reserva
                  </Button>
                </DialogTrigger>
                <DialogContent className="w-[90%]">
                  <DialogHeader>
                    <DialogTitle>Você que cancelar sua reserva?</DialogTitle>
                    <DialogDescription>
                      Tem certeza que deseja fazer o cancelamento? Essa ação é
                      irreversível.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter className="flex flex-row gap-3">
                    <DialogClose asChild>
                      <Button variant="secondary" className="w-full">
                        Voltar
                      </Button>
                    </DialogClose>
                    <DialogClose className="w-full">
                      <Button
                        variant="destructive"
                        className="w-full"
                        onClick={handleCancelBookingClick}
                      >
                        Confirmar
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
