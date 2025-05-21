"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { notFound } from "next/navigation"

import { UnitConverter } from "@/components/converter/unit-converter"
import { CATEGORIES, UNIT_SYSTEMS } from "@/lib/constants"
import { generateJsonLd } from "@/components/seo/metadata"

interface ConversionPageProps {
  params: {
    category: string
    fromUnit: string
    toUnit: string
  }
}

export default function ConversionPage({ params }: ConversionPageProps) {
  const { category: categoryId, fromUnit: fromUnitId, toUnit: toUnitId } = params
  
  const category = CATEGORIES.find(c => c.id === categoryId)
  if (!category) {
    return notFound()
  }
  
  const units = UNIT_SYSTEMS[categoryId] || {}
  const fromUnit = units[fromUnitId]
  const toUnit = units[toUnitId]
  
  if (!fromUnit || !toUnit) {
    return notFound()
  }
  
  const jsonLd = generateJsonLd('conversion', { category, fromUnit, toUnit })
  const otherConversions = category.popularUnits.filter(
    pair => !(pair.from === fromUnitId && pair.to === toUnitId)
  )
  
  return (
    <div className="container max-w-5xl py-8 space-y-10">
      {/* SEO JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="space-y-2">
        <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary">
            首页
          </Link>
          <span>/</span>
          <Link href={`/${categoryId}`} className="hover:text-primary">
            {category.name}
          </Link>
          <span>/</span>
          <span className="text-foreground">
            {fromUnit.name}转{toUnit.name}
          </span>
        </div>
        <h1 className="text-3xl font-bold">
          {fromUnit.name}转{toUnit.name}换算
        </h1>
        <p className="text-muted-foreground">
          在线{fromUnit.name}({fromUnit.symbol})转换为{toUnit.name}({toUnit.symbol})换算工具
        </p>
      </div>
      
      <UnitConverter 
        categoryId={categoryId} 
        initialFromUnit={fromUnitId} 
        initialToUnit={toUnitId} 
      />
      
      {otherConversions.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-xl font-bold">其他{category.name}换算</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {otherConversions.map(({ from, to }) => {
              const otherFromUnit = units[from]
              const otherToUnit = units[to]
              
              if (!otherFromUnit || !otherToUnit) return null
              
              return (
                <Link
                  key={`${from}-${to}`}
                  href={`/${categoryId}/${from}/${to}`}
                  className="p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{otherFromUnit.name}</span>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    <span>{otherToUnit.name}</span>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      )}
      
      <div className="pt-6 prose dark:prose-invert max-w-none">
        <h2>{fromUnit.name}与{toUnit.name}的换算关系</h2>
        <p>
          {fromUnit.name}({fromUnit.symbol})和{toUnit.name}({toUnit.symbol})是{category.name}的两种不同单位。
          它们之间的换算关系如下：
        </p>
        
        <ul>
          <li>1 {fromUnit.name} = {calculateConversion(categoryId, fromUnitId, toUnitId, 1)} {toUnit.name}</li>
          <li>1 {toUnit.name} = {calculateConversion(categoryId, toUnitId, fromUnitId, 1)} {fromUnit.name}</li>
        </ul>
        
        <h3>换算公式</h3>
        <p>
          {fromUnit.name}({fromUnit.symbol})转换为{toUnit.name}({toUnit.symbol})的计算公式为：
        </p>
        
        <pre className="bg-muted p-2 rounded">{getConversionFormula(fromUnit.name, fromUnit.symbol, toUnit.name, toUnit.symbol)}</pre>
        
        <h3>实际应用场景</h3>
        <p>
          {fromUnit.name}转{toUnit.name}换算在以下场景中非常有用：
        </p>
        <ul>
          {getApplicationScenarios(categoryId, fromUnitId, toUnitId).map((scenario, index) => (
            <li key={index}>{scenario}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function calculateConversion(categoryId: string, fromUnitId: string, toUnitId: string, value: number): string {
  const units = UNIT_SYSTEMS[categoryId] || {}
  const fromUnit = units[fromUnitId]
  const toUnit = units[toUnitId]
  
  if (!fromUnit || !toUnit) {
    return "计算错误"
  }
  
  let result: number

  const isTemperature = categoryId === 'temperature'
  
  if (isTemperature) {
    let valueInCelsius: number
    
    if (typeof fromUnit.conversion === "function") {
      valueInCelsius = (fromUnit.conversion as Function)(value)
    } else {
      valueInCelsius = value * (fromUnit.conversion as number)
    }
    
    if (typeof toUnit.reverseConversion === "function") {
      result = (toUnit.reverseConversion as Function)(valueInCelsius)
    } else {
      result = valueInCelsius * (toUnit.reverseConversion as number)
    }
  } else {
    const valueInBaseUnit = value * (fromUnit.conversion as number)
    result = valueInBaseUnit * (toUnit.reverseConversion as number)
  }
  
  return result.toFixed(6).replace(/\.?0+$/, '')
}

function getConversionFormula(
  fromName: string, 
  fromSymbol: string, 
  toName: string, 
  toSymbol: string
): string {
  return `${toName} = ${fromName} × 换算系数\n${toSymbol} = ${fromSymbol} × 换算系数`
}

function getApplicationScenarios(categoryId: string, fromUnitId: string, toUnitId: string): string[] {
  switch (categoryId) {
    case 'length':
      return [
        '工程与建筑测量中使用不同的长度单位',
        '国际贸易中需要在公制和英制单位间转换',
        '旅行时理解不同国家使用的距离单位',
        '科学实验中需要精确的长度测量转换'
      ]
    case 'weight':
      return [
        '烹饪和食谱中使用不同的重量单位',
        '物流和运输中计算货物重量',
        '健康和医疗场景中的体重测量',
        '商品交易中需要精确的重量转换'
      ]
    case 'temperature':
      return [
        '天气预报中不同温标的转换',
        '烹饪食谱中使用不同温度单位',
        '科学实验需要准确的温度转换',
        '国际旅行时理解当地温度标准'
      ]
    case 'area':
      return [
        '房地产交易中的面积计算',
        '土地测量和农业生产',
        '室内装修和设计',
        '国际贸易中使用不同面积单位的商品'
      ]
    case 'volume':
      return [
        '烹饪和食谱中使用不同的容量单位',
        '液体和气体的容器规格转换',
        '化学实验中需要精确的体积测量',
        '燃油和其他液体的购买与使用'
      ]
    default:
      return [
        `在专业领域使用不同的${categoryId}单位`,
        `国际交流中需要单位转换`,
        `学术研究和科学实验`,
        `日常生活和工作中的换算需求`
      ]
  }
} 