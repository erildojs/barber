"use client"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form"
import { FiSearch } from "react-icons/fi"

export function Search2() {
  const router = useRouter()
  const formSchema = z.object({
    title: z.string().trim().min(1, {
      message: "Digite algo para buscar",
    }),
  })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  })

  function handleSubmit(data: z.infer<typeof formSchema>) {
    router.push(`/barbershops?title=${data.title}`)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="flex gap-2">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  placeholder="Buscar Barbearias"
                  {...field}
                  className="lg:mr-2 lg:h-9 lg:w-96 lg:rounded-lg lg:border-none lg:bg-[#26272B] lg:pl-3 lg:text-white lg:outline-none lg:placeholder:text-[#838896]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="lg:flex lg:h-9 lg:w-10 lg:items-center lg:justify-center lg:rounded-lg lg:bg-[#8162FF] lg:hover:bg-opacity-80"
        >
          <FiSearch size={14} />
        </Button>
      </form>
    </Form>
  )
}
