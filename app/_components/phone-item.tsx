"use client"
import { SmartphoneIcon } from "lucide-react"
import { Button } from "./ui/button"
import { toast } from "sonner"

interface PhoneItemProps {
  phone: string
}

export function PhoneItem({ phone }: PhoneItemProps) {
  function handleCopyPhoneClick(phone: string) {
    navigator.clipboard.writeText(phone)
    toast.success("telefone copiado com sucesso")
  }

  return (
    <div className="flex justify-between" key={phone}>
      <div className="flex items-center gap-2">
        <SmartphoneIcon />
        <p className="text-sm">{phone}</p>
      </div>
      <Button
        variant="outline"
        className="bg-[#26272B]"
        size="sm"
        onClick={() => handleCopyPhoneClick(phone)}
      >
        copiar
      </Button>
    </div>
  )
}
