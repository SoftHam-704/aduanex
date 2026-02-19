import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none transition-colors overflow-hidden",
  {
    variants: {
      variant: {
        // Primary - Green (aprovado/ativo)
        default: "bg-[#10B981]/10 text-[#059669] dark:bg-[#10B981]/20 dark:text-[#34D399]",
        // Success - Green (aprovado/ativo/liberado)
        success: "bg-[#10B981]/10 text-[#059669] dark:bg-[#10B981]/20 dark:text-[#34D399]",
        // Warning - Orange (pendente/review/aguardando)
        warning: "bg-[#FB923C]/10 text-[#EA580C] dark:bg-[#FB923C]/20 dark:text-[#FDBA74]",
        // Info - Blue (trânsito/em análise)
        info: "bg-[#60A5FA]/10 text-[#2563EB] dark:bg-[#60A5FA]/20 dark:text-[#93C5FD]",
        // Attention - Yellow (atenção/canal amarelo)
        attention: "bg-[#EAB308]/10 text-[#CA8A04] dark:bg-[#EAB308]/20 dark:text-[#FDE047]",
        // Destructive - Red (rejeitado/bloqueado/canal vermelho)
        destructive: "bg-[#DC2626]/10 text-[#B91C1C] dark:bg-[#DC2626]/20 dark:text-[#F87171]",
        // Secondary - Neutral
        secondary: "bg-[#F1F5F9] text-[#64748B] dark:bg-[#334155] dark:text-[#94A3B8]",
        // Outline - Bordered
        outline: "border border-[#E2E8F0] dark:border-[#334155] text-[#1E293B] dark:text-[#F8FAFC]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "span"

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
