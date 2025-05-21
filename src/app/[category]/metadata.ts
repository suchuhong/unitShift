import { Metadata } from "next"
import { CATEGORIES } from "@/lib/constants"
import { generateCategoryMetadata } from "@/components/seo/metadata"

export function generateMetadata({ params }: { params: { category: string } }): Metadata {
  const category = CATEGORIES.find(c => c.id === params.category)
  
  if (!category) {
    return {
      title: "页面未找到",
    }
  }
  
  return generateCategoryMetadata(category)
} 