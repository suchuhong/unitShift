import { Metadata } from "next"
import { CATEGORIES, UNIT_SYSTEMS } from "@/lib/constants"
import { generateConversionMetadata } from "@/components/seo/metadata"

export function generateMetadata({ params }: { params: { category: string, fromUnit: string, toUnit: string } }): Metadata {
  const { category: categoryId, fromUnit: fromUnitId, toUnit: toUnitId } = params
  
  const category = CATEGORIES.find(c => c.id === categoryId)
  if (!category) {
    return { title: "页面未找到" }
  }
  
  const units = UNIT_SYSTEMS[categoryId] || {}
  const fromUnit = units[fromUnitId]
  const toUnit = units[toUnitId]
  
  if (!fromUnit || !toUnit) {
    return { title: "页面未找到" }
  }
  
  return generateConversionMetadata(categoryId, category.name, fromUnit, toUnit)
} 