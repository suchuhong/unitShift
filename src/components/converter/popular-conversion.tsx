"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

import { Category, UNIT_SYSTEMS } from "@/lib/constants"

interface PopularConversionProps {
  category: Category
}

export function PopularConversion({ category }: PopularConversionProps) {
  const { id, popularUnits, name } = category
  
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">{name}热门换算</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {popularUnits.map(({ from, to }) => {
          const fromUnit = UNIT_SYSTEMS[id]?.[from]
          const toUnit = UNIT_SYSTEMS[id]?.[to]
          
          if (!fromUnit || !toUnit) return null

          return (
            <Link 
              key={`${from}-${to}`} 
              href={`/${id}/${from}/${to}`}
              className="no-underline"
            >
              <Button
                variant="outline"
                className="w-full justify-start h-auto py-3 px-4 gap-3"
              >
                <span className="font-medium">
                  {fromUnit.name}
                </span>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
                <span>
                  {toUnit.name}
                </span>
              </Button>
            </Link>
          )
        })}
      </div>
    </div>
  )
} 