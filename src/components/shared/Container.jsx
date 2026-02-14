
import { cn } from "@/utils/cn";



export default function Container({ children, className}) {
  return <div className={cn("mx-auto max-w-[1640px] px-3 sm:px-4 md:px-16", className)}>{children}</div>;
}