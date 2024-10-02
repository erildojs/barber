import { Barbershop, BarbershopService } from "@prisma/client";
import { Card, CardContent } from "./ui/card";
import { pt } from "date-fns/locale";
import { format } from "date-fns";

interface BookingSummaryProps {
  service: Pick<BarbershopService, 'name' | 'price'>
  barbershop: Pick<Barbershop, 'name'>
  selectedDate: Date
}

export function BookingSummary({ selectedDate, service, barbershop }: BookingSummaryProps) {
  return (
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
            {format(selectedDate, "d 'de' MMMM", {
              locale: pt
            })}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <h2 className="text-sm text-gray-400">Horário</h2>
          <p className="text-sm">
            {format(selectedDate, "HH:mm")}
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
  )
}