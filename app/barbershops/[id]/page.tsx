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
      <div className="lg:mx-auto lg:my-0 lg:flex lg:w-full lg:max-w-6xl lg:justify-between">
        {/** left */}
        <div className="hidden lg:mt-10 lg:flex lg:max-w-[758px] lg:gap-10">
          <div className="lg:max-h-[486px] lg:w-full">
            <Image
              alt={barbershop.name}
              src={barbershop?.imageUrl}
              className="object-cover lg:rounded-md"
              width={748}
              height={486}
              // sizes="(max-width: 758px)"
            />
          </div>
        </div>
        {/** right */}
        <div className="hidden lg:mt-10 lg:flex lg:max-h-[829px] lg:w-full lg:max-w-[386px] lg:rounded-2xl lg:bg-[#1A1B1F] lg:p-5">
          <div className="lg:space-y-5">
            <div className="lg:relative lg:mb-5 lg:flex lg:h-[180px] lg:items-end">
              <Image
                fill
                src="/map.png"
                className="rounded-xl lg:object-cover"
                alt={`Mapa da barbearia ${barbershop.name}`}
              />
              <Card className="z-50 mx-5 mb-3 w-full rounded-xl">
                <CardContent className="flex items-center gap-3 px-5 py-3">
                  <Avatar>
                    <AvatarImage src={barbershop.imageUrl} />
                  </Avatar>
                  <div>
                    <h3 className="lg:font-bold">{barbershop.name}</h3>
                    <p className="lg:text-xs">{barbershop.address}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div>
              <h3 className="lg:text-lg lg:font-bold lg:text-[#838896]">
                SOBRE NÓS
              </h3>
              <p className="font-normal lg:mb-6 lg:text-lg lg:text-[#838896]">
                {barbershop.description}
              </p>
            </div>
            <div className="lg:w-full lg:border-[1px] lg:border-[#26272B]"></div>
            {barbershop.phones.map((phone) => (
              <PhoneItem key={phone} phone={phone} />
            ))}
            <div className="lg:w-full lg:border-[1px] lg:border-[#26272B]"></div>
          </div>
        </div>
      </div>

      {/* IMAGEM */}
      <div className="relative h-[250px] w-full lg:hidden">
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
      <div className="border-b border-solid p-5 lg:mx-24 lg:flex lg:w-full lg:max-w-[730px] lg:justify-between lg:px-0">
        {/* <h1 className="mb-3 text-xl font-bold lg:hidden">{barbershop.name}</h1> */}
        <div className="mb-2 flex items-center gap-2 lg:flex lg:flex-col lg:gap-0">
          <h1 className="mb-3 text-xl font-bold">{barbershop.name}</h1>
          <MapPinIcon className="text-primary lg:hidden" size={18} />
          <p className="text-lg lg:hidden">{barbershop?.address}</p>
          <div className="hidden lg:flex">
            <MapPinIcon className="text-primary lg:mr-2" size={18} />
            <p className="text-lg">{barbershop?.address}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 lg:h-[68px] lg:w-[121px] lg:items-center lg:justify-center lg:rounded-md lg:bg-[#1A1B1F]">
          <StarIcon className="fill-primary text-primary lg:hidden" size={18} />
          <p className="text-lg lg:hidden">5,0 (499 avaliações)</p>
          <div className="lg:text-center">
            <StarIcon
              className="hidden lg:mr-2 lg:inline lg:fill-primary lg:text-primary"
              size={18}
            />
            <span className="hidden lg:inline-block lg:text-lg">5,0</span>
            <span className="hidden lg:mx-auto lg:inline-block lg:text-center lg:text-lg">
              499 avaliações
            </span>
          </div>
        </div>
      </div>

      {/* DESCRIÇÃO */}
      <div className="space-y-2 border-b border-solid p-5 lg:mx-24 lg:w-full lg:max-w-[730px] lg:px-0">
        <h2 className="text-xs font-bold uppercase text-gray-400">Sobre nós</h2>
        <p className="text-justify text-lg">{barbershop?.description}</p>
      </div>

      {/* SERVIÇOS */}
      <div className="space-y-3 border-b border-solid p-5 lg:mx-24 lg:max-w-[730px] lg:px-0">
        <h2 className="text-xs font-bold uppercase text-gray-400">Serviços</h2>
        <div className="space-y-3 lg:flex lg:flex-1 lg:flex-shrink-0 lg:basis-1/2 lg:flex-wrap lg:gap-2 lg:space-y-0">
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
      <div className="space-y-3 p-5 lg:hidden">
        {barbershop.phones.map((phone) => (
          <PhoneItem key={phone} phone={phone} />
        ))}
      </div>
    </>
  )
}
