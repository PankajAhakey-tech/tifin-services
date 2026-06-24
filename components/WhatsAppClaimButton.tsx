'use client'

import { MessageCircle } from 'lucide-react'

type WhatsAppClaimButtonProps = {
  couponCode: string
  reward: string
}

export default function WhatsAppClaimButton({ couponCode, reward }: WhatsAppClaimButtonProps) {
  const handleClick = () => {
    const message = `Hi Dabbawala India,\n\nI won a scratch card reward.\n\nCoupon Code: ${couponCode}\n\nI would like to place an order.`
    const encodedMessage = encodeURIComponent(message)
    window.open(`https://wa.me/919009208389?text=${encodedMessage}`, '_blank', 'noopener,noreferrer')
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#16a34a] px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:scale-[1.01] hover:bg-[#15803d]"
    >
      <MessageCircle className="h-4 w-4" />
      Claim on WhatsApp • {reward}
    </button>
  )
}
