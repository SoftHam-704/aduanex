import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-9 w-full min-w-0 rounded-md border border-[#E2E8F0] dark:border-[#334155] bg-white dark:bg-[#1E293B] px-3 py-1 text-sm text-[#1E293B] dark:text-[#F8FAFC] placeholder:text-[#94A3B8] dark:placeholder:text-[#64748B] transition-colors outline-none file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:cursor-not-allowed disabled:opacity-50",
        "focus:border-[#10B981] focus:ring-2 focus:ring-[#10B981]/20",
        className
      )}
      {...props}
    />
  )
}

export { Input }
