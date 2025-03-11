import { BarbershopItem } from "@/app/_components/barbershop-item"
import { Header } from "@/app/_components/header"
import { Search } from "@/app/_components/search"
import { GetBarbershops } from "../_data/get-barbershops"
import { Header2 } from "../_components/header2"

type BarbershopPageProps = {
  searchParams: {
    title?: string
    services?: string
  }
}

export default async function BarbershopPage({
  searchParams,
}: BarbershopPageProps) {
  const barbershops = await GetBarbershops({ searchParams })
  return (
    <div>
      <div className="lg:hidden">
        <Header />
      </div>
      <div className="hidden lg:block">
        <Header2 />
      </div>
      <div className="my-6 px-5 lg:mx-auto lg:my-6 lg:w-full lg:max-w-6xl lg:px-0">
        <Search />
      </div>
      <div className="px-5 lg:mx-auto lg:my-0 lg:w-full lg:max-w-6xl lg:px-0">
        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Resultados para &quot;{searchParams?.title || searchParams?.services}
          &quot;
        </h2>
        <div className="grid grid-cols-2 gap-4 lg:max-w-[590px]">
          {barbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>
    </div>
  )
}
