import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface BreadcrumbItem {
  label: string
  href: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  className?: string
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav aria-label="breadcrumb" className={cn("flex", className)}>
      <ol className="flex items-center space-x-2 text-sm text-gray-500">
        {items.map((item, index) => (
          <li key={item.href} className="flex items-center">
            <Link
              href={item.href}
              className={cn(
                "hover:text-primary transition-colors duration-200",
                index === items.length - 1 && "font-medium text-gray-900 cursor-default",
              )}
              aria-current={index === items.length - 1 ? "page" : undefined}
            >
              {item.label}
            </Link>
            {index < items.length - 1 && <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />}
          </li>
        ))}
      </ol>
    </nav>
  )
}
