import { Category, UnitData } from "@/lib/constants"

export function generateHomeMetadata() {
  return {
    title: "单位换算 | 在线单位转换工具",
    description: "免费的在线单位换算工具，支持长度、重量、面积、体积、温度等单位的换算，精确快速地完成各种计量单位转换。",
    keywords: "单位换算,单位转换器,在线单位换算,计量单位换算,免费单位换算器",
  }
}

export function generateCategoryMetadata(category: Category) {
  const { name, description, seoKeywords } = category
  
  return {
    title: `${name} | 在线${name}工具`,
    description,
    keywords: seoKeywords.join(","),
  }
}

export function generateConversionMetadata(
  categoryId: string,
  categoryName: string,
  fromUnit: UnitData,
  toUnit: UnitData
) {
  const title = `${fromUnit.name}转${toUnit.name} | 在线${categoryName}`
  const description = `在线${fromUnit.name}转换为${toUnit.name}换算工具，支持快速精确转换，适用于学习、工作和日常生活中的${categoryName}需求。`
  const keywords = `${fromUnit.name}转${toUnit.name},${fromUnit.name}换算${toUnit.name},${categoryName},单位换算,在线计算器`
  
  return {
    title,
    description,
    keywords,
  }
}

export function generateJsonLd(
  pageType: 'home' | 'category' | 'conversion', 
  data?: { 
    category?: Category, 
    fromUnit?: UnitData, 
    toUnit?: UnitData 
  }
) {
  const baseUrl = 'https://unitshift.example.com'
  
  if (pageType === 'home') {
    return {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: '单位换算',
      url: baseUrl,
      description: '在线单位换算工具，支持各种计量单位的转换',
    }
  }
  
  if (pageType === 'category' && data?.category) {
    return {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: `${data.category.name} | 单位换算`,
      url: `${baseUrl}/${data.category.id}`,
      description: data.category.description,
    }
  }
  
  if (pageType === 'conversion' && data?.category && data?.fromUnit && data?.toUnit) {
    return {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: `${data.fromUnit.name}转${data.toUnit.name} | ${data.category.name}`,
      url: `${baseUrl}/${data.category.id}/${data.fromUnit.id}/${data.toUnit.id}`,
      description: `在线${data.fromUnit.name}转换为${data.toUnit.name}换算工具`,
      mainEntity: {
        '@type': 'SoftwareApplication',
        name: `${data.fromUnit.name}转${data.toUnit.name}换算器`,
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'Web',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'CNY'
        }
      }
    }
  }
  
  return {}
} 