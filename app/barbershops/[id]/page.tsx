import { Header2 } from "@/app/_components/header2"
import { PhoneItem } from "@/app/_components/phone-item"
import { ServiceItem } from "@/app/_components/service-item"
import { Sidebar } from "@/app/_components/sidebar"
import { Avatar, AvatarImage } from "@/app/_components/ui/avatar"
import { Button } from "@/app/_components/ui/button"
import { Card, CardContent } from "@/app/_components/ui/card"
import { Sheet, SheetTrigger } from "@/app/_components/ui/sheet"
import { GetBarbershop } from "@/app/_data/get-barbershop"
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

interface BarbershopPageProps {
  params: {
    id: string
  }
}

export default async function BarbershopPage({ params }: BarbershopPageProps) {
  const barbershop = await GetBarbershop({ params })
  if (!barbershop) {
    return notFound()
  }

  return (
    <>
      {/** Desktop */}
      <Header2 />
      <div className="sm:mx-auto sm:my-0 sm:flex sm:w-full sm:max-w-6xl sm:justify-between">
        {/** left */}
        <div className="hidden sm:mt-10 sm:flex sm:max-w-[758px] sm:gap-10">
          <div className="sm:max-h-[486px] sm:w-full">
            <Image
              alt={barbershop.name}
              src={barbershop?.imageUrl}
              className="object-cover sm:rounded-md"
              width={748}
              height={486}
              // sizes="(max-width: 758px)"
            />
          </div>
        </div>
        {/** right */}
        <div className="hidden sm:mt-10 sm:flex sm:max-h-[829px] sm:w-full sm:max-w-[386px] sm:rounded-2xl sm:bg-[#1A1B1F] sm:p-5">
          <div className="sm:space-y-5">
            <div className="sm:relative sm:mb-5 sm:flex sm:h-[180px] sm:items-end">
              <Image
                fill
                src="/map.png"
                className="rounded-xl sm:object-cover"
                alt={`Mapa da barbearia ${barbershop.name}`}
              />
              <Card className="z-50 mx-5 mb-3 w-full rounded-xl">
                <CardContent className="flex items-center gap-3 px-5 py-3">
                  <Avatar>
                    <AvatarImage src={barbershop.imageUrl} />
                  </Avatar>
                  <div>
                    <h3 className="sm:font-bold">{barbershop.name}</h3>
                    <p className="sm:text-xs">{barbershop.address}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div>
              <h3 className="sm:text-sm sm:font-bold sm:text-[#838896]">
                SOBRE NÓS
              </h3>
              <p className="font-normal sm:mb-6 sm:text-sm sm:text-[#838896]">
                {barbershop.description}
              </p>
            </div>
            <div className="sm:w-full sm:border-[1px] sm:border-[#26272B]"></div>
            {barbershop.phones.map((phone) => (
              <PhoneItem key={phone} phone={phone} />
            ))}
            <div className="sm:w-full sm:border-[1px] sm:border-[#26272B]"></div>
          </div>
        </div>
      </div>

      {/* IMAGEM */}
      <div className="relative h-[250px] w-full sm:hidden">
        <Image
          alt={barbershop.name}
          src={barbershop?.imageUrl}
          className="object-cover"
          fill
          sizes="(max-width: 390px)"
        />

        <Button
          size="icon"
          variant="secondary"
          className="absolute left-4 top-4"
          asChild
        >
          <Link href="/">
            <ChevronLeftIcon />
          </Link>
        </Button>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              size="icon"
              variant="outline"
              className="absolute right-4 top-4"
            >
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <Sidebar />
        </Sheet>
      </div>

      {/* TÍTULO */}
      <div className="border-b border-solid p-5 sm:mx-24 sm:flex sm:w-full sm:max-w-[730px] sm:justify-between sm:px-0">
        {/* <h1 className="mb-3 text-xl font-bold sm:hidden">{barbershop.name}</h1> */}
        <div className="mb-2 flex items-center gap-2 sm:flex sm:flex-col sm:gap-0">
          <h1 className="mb-3 text-xl font-bold">{barbershop.name}</h1>
          <MapPinIcon className="text-primary sm:hidden" size={18} />
          <p className="text-sm sm:hidden">{barbershop?.address}</p>
          <div className="hidden sm:flex">
            <MapPinIcon className="text-primary sm:mr-2" size={18} />
            <p className="text-sm">{barbershop?.address}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:h-[68px] sm:w-[121px] sm:items-center sm:justify-center sm:rounded-md sm:bg-[#1A1B1F]">
          <StarIcon className="fill-primary text-primary sm:hidden" size={18} />
          <p className="text-sm sm:hidden">5,0 (499 avaliações)</p>
          <div className="sm:text-center">
            <StarIcon
              className="hidden sm:mr-2 sm:inline sm:fill-primary sm:text-primary"
              size={18}
            />
            <span className="hidden sm:inline-block sm:text-sm">5,0</span>
            <span className="hidden sm:mx-auto sm:inline-block sm:text-center sm:text-sm">
              499 avaliações
            </span>
          </div>
        </div>
      </div>

      {/* DESCRIÇÃO */}
      <div className="space-y-2 border-b border-solid p-5 sm:mx-24 sm:w-full sm:max-w-[730px] sm:px-0">
        <h2 className="text-xs font-bold uppercase text-gray-400">Sobre nós</h2>
        <p className="text-justify text-sm">{barbershop?.description}</p>
      </div>

      {/* SERVIÇOS */}
      <div className="space-y-3 border-b border-solid p-5 sm:mx-24 sm:max-w-[730px] sm:px-0">
        <h2 className="text-xs font-bold uppercase text-gray-400">Serviços</h2>
        <div className="space-y-3 sm:flex sm:flex-1 sm:flex-shrink-0 sm:basis-1/2 sm:flex-wrap sm:gap-2 sm:space-y-0">
          {barbershop.services.map((service) => (
            <ServiceItem
              key={service.id}
              barbershop={JSON.parse(JSON.stringify(barbershop))}
              service={JSON.parse(JSON.stringify(service))}
            />
          ))}
        </div>
      </div>

      {/* CONTATO */}
      <div className="space-y-3 p-5 sm:hidden">
        {barbershop.phones.map((phone) => (
          <PhoneItem key={phone} phone={phone} />
        ))}
      </div>
    </>
  )
}
