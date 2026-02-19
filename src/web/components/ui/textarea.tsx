import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "border-[#E2E8F0] dark:border-[#334155] placeholder:text-[#94A3B8] dark:placeholder:text-[#64748B] focus:border-[#10B981] focus:ring-2 focus:ring-[#10B981]/20 flex field-sizing-content min-h-16 w-full rounded-md border bg-white dark:bg-[#1E293B] text-[#1E293B] dark:text-[#F8FAFC] px-3 py-2 text-sm transition-colors outline-none disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
