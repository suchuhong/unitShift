"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { notFound } from "next/navigation"

import { UnitConverter } from "@/components/converter/unit-converter"
import { CATEGORIES, UNIT_SYSTEMS } from "@/lib/constants"
import { generateJsonLd } from "@/components/seo/metadata"

interface CategoryPageProps {
  params: {
    category: string
  }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = CATEGORIES.find(c => c.id === params.category)
  
  if (!category) {
    return notFound()
  }
  
  const units = UNIT_SYSTEMS[category.id] || {}
  const unitList = Object.values(units)
  
  if (unitList.length < 2) {
    return (
      <div className="container py-12 text-center">
        <h1 className="text-3xl font-bold">该分类暂无可用的单位换算</h1>
        <p className="mt-4 text-muted-foreground">
          请尝试其他分类或稍后再试
        </p>
        <Link href="/" className="text-primary hover:underline mt-4 inline-block">
          返回首页
        </Link>
      </div>
    )
  }
  
  const jsonLd = generateJsonLd('category', { category })
  
  return (
    <div className="container max-w-5xl py-8 space-y-10">
      {/* SEO JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="space-y-2">
        <Link href="/" className="text-sm text-muted-foreground hover:text-primary inline-flex items-center">
          <ArrowRight className="h-4 w-4 mr-1 rotate-180" />
          返回首页
        </Link>
        <h1 className="text-3xl font-bold">{category.name}</h1>
        <p className="text-muted-foreground">{category.description}</p>
      </div>
      
      <UnitConverter categoryId={category.id} />

      <div className="space-y-6">
        <h2 className="text-xl font-bold">常用{category.name}换算</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {category.popularUnits.map(({ from, to }) => {
            const fromUnit = units[from]
            const toUnit = units[to]
            
            if (!fromUnit || !toUnit) return null
            
            return (
              <Link
                key={`${from}-${to}`}
                href={`/${category.id}/${from}/${to}`}
                className="p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{fromUnit.name}</span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  <span>{toUnit.name}</span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
      
      <div className="pt-6 prose dark:prose-invert max-w-none">
        <h2>关于{category.name}</h2>
        <p>
          {category.name}是衡量{getDescriptionByCategory(category.id)}的标准，在不同国家和领域可能使用不同的单位制。
          我们的在线{category.name}换算工具让你能够轻松在各种{category.name}单位之间进行精确转换。
        </p>
        
        <h3>如何使用{category.name}换算器</h3>
        <ol>
          <li>在数值框中输入您想要转换的数字</li>
          <li>选择您当前使用的单位（从单位）</li>
          <li>选择您想要转换到的单位（到单位）</li>
          <li>立即查看转换结果</li>
        </ol>
        
        <p>无论是在学习、工作还是日常生活中，我们的{category.name}换算工具都能满足您的需求。</p>
      </div>
    </div>
  )
}

function getDescriptionByCategory(categoryId: string): string {
  switch (categoryId) {
    case 'length':
      return '物体间距离或物体尺寸'
    case 'weight':
      return '物体质量'
    case 'area':
      return '平面所占空间大小'
    case 'volume':
      return '物体所占空间的体积'
    case 'temperature':
      return '物体热度'
    case 'speed':
      return '物体运动快慢'
    case 'time':
      return '事件持续的时间'
    case 'data':
      return '数字信息存储大小'
    case 'pressure':
      return '单位面积上的力'
    case 'energy':
      return '做功能力或热量'
    case 'power':
      return '做功速率'
    case 'angle':
      return '旋转或倾斜的程度'
    case 'frequency':
      return '周期性事件发生的次数'
    case 'fuel':
      return '燃油消耗效率'
    default:
      return '相关物理量'
  }
} 