"use client"

import Link from "next/link"
import { LucideIcon } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Category } from "@/lib/constants"

interface CategoryCardProps {
  category: Category
}

export function CategoryCard({ category }: CategoryCardProps) {
  const { id, name, description, icon: Icon, color } = category

  return (
    <Link href={`/${id}`} className="block group">
      <Card className="h-full overflow-hidden transition-all hover:shadow-md">
        <CardHeader className={`${color} text-white`}>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold">{name}</CardTitle>
            <Icon className="h-6 w-6 transition-transform group-hover:scale-110" />
          </div>
        </CardHeader>
        <CardContent className="p-4 pt-4">
          <CardDescription className="line-clamp-2">{description}</CardDescription>
        </CardContent>
      </Card>
    </Link>
  )
} 