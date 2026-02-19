import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react"
import { Toaster as Sonner, type ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="light"
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-4 text-[#10B981]" />,
        info: <InfoIcon className="size-4 text-[#60A5FA]" />,
        warning: <TriangleAlertIcon className="size-4 text-[#FB923C]" />,
        error: <OctagonXIcon className="size-4 text-[#DC2626]" />,
        loading: <Loader2Icon className="size-4 animate-spin text-[#64748B]" />,
      }}
      style={
        {
          "--normal-bg": "#FFFFFF",
          "--normal-text": "#1E293B",
          "--normal-border": "#E2E8F0",
          "--border-radius": "6px",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
