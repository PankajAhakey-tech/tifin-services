import SuccessClient from './SuccessClient'

export const dynamic = 'force-dynamic'

export default function SuccessPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>
}) {
  const couponCode =
    typeof searchParams?.coupon === 'string'
      ? searchParams.coupon
      : 'DABBA-WELCOME'

  return <SuccessClient couponCode={couponCode} />
}
