import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function ProductCardSkeleton() {
  return (
    <Card className="group border-0 shadow-lg bg-white overflow-hidden">
      <CardHeader className="p-0 relative overflow-hidden">
        <Skeleton className="w-full h-48" />
        <Skeleton className="absolute top-3 left-3 h-6 w-20 rounded-full" />
        <Skeleton className="absolute top-3 right-3 h-6 w-16 rounded-full" />
      </CardHeader>
      <CardContent className="p-6">
        <Skeleton className="h-5 w-3/4 mb-3" />
        <Skeleton className="h-4 w-1/2 mb-4" />
        <Skeleton className="h-6 w-1/3 mb-4" />
        <Skeleton className="h-3 w-full mb-2" />
        <Skeleton className="h-2 w-full" />
        <Skeleton className="h-3 w-1/4 mt-2" />
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Skeleton className="w-full h-10 rounded-xl" />
      </CardFooter>
    </Card>
  )
}
