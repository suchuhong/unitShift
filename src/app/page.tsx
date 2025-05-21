"use client"

import Link from "next/link"
import { Search } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"

import { CategoryCard } from "@/components/converter/category-card"
import { PopularConversion } from "@/components/converter/popular-conversion"
import { CATEGORIES, UNIT_SYSTEMS } from "@/lib/constants"
import { generateJsonLd } from "@/components/seo/metadata"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  const jsonLd = generateJsonLd('home')
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState<Array<{
    category: string;
    categoryName: string;
    fromUnit: string;
    fromUnitName: string;
    toUnit: string;
    toUnitName: string;
  }>>([])
  const [isSearching, setIsSearching] = useState(false)
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!searchTerm.trim()) {
      setSearchResults([])
      setIsSearching(false)
      return
    }
    
    setIsSearching(true)
    const results: Array<{
      category: string;
      categoryName: string;
      fromUnit: string;
      fromUnitName: string;
      toUnit: string;
      toUnitName: string;
    }> = []
    
    // Search through all categories and units
    CATEGORIES.forEach(category => {
      const units = UNIT_SYSTEMS[category.id] || {}
      const unitList = Object.values(units)
      
      // Search for matches in unit names
      unitList.forEach(fromUnit => {
        unitList.forEach(toUnit => {
          if (fromUnit.id === toUnit.id) return
          
          const searchString = `${fromUnit.name}转${toUnit.name} ${category.name} ${fromUnit.name} ${toUnit.name}`
          if (searchString.toLowerCase().includes(searchTerm.toLowerCase())) {
            results.push({
              category: category.id,
              categoryName: category.name,
              fromUnit: fromUnit.id,
              fromUnitName: fromUnit.name,
              toUnit: toUnit.id,
              toUnitName: toUnit.name
            })
          }
        })
      })
    })
    
    setSearchResults(results.slice(0, 10)) // Limit to 10 results
  }
  
  const clearSearch = () => {
    setSearchTerm("")
    setSearchResults([])
    setIsSearching(false)
  }
  
  return (
    <div className="container max-w-7xl py-8 space-y-12">
      {/* SEO JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <section className="py-12 px-4 text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          在线<span className="text-primary">单位换算</span>工具
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          免费、快速、精确的在线单位换算工具，支持长度、重量、温度、面积等各种单位转换
        </p>
        
        {/* Search Box - Now functional */}
        <form onSubmit={handleSearch} className="max-w-md mx-auto">
          <div className="flex relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-muted-foreground" />
            </div>
            <input
              type="text"
              placeholder="搜索单位换算，例如：米转厘米，千克转磅..."
              className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 pl-10 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button 
              type="submit" 
              className="ml-2"
              disabled={!searchTerm.trim()}
            >
              搜索
            </Button>
          </div>
        </form>
        
        {/* Search Results */}
        {isSearching && (
          <div className="max-w-2xl mx-auto mt-4">
            {searchResults.length > 0 ? (
              <div className="bg-card rounded-lg border p-4 shadow-sm">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-medium">搜索结果</h3>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={clearSearch}
                  >
                    清除
                  </Button>
                </div>
                <ul className="space-y-2">
                  {searchResults.map((result, index) => (
                    <li key={index}>
                      <Link 
                        href={`/${result.category}/${result.fromUnit}/${result.toUnit}`}
                        className="block hover:bg-muted p-2 rounded-md transition-colors"
                      >
                        <span className="font-medium">{result.fromUnitName}转{result.toUnitName}</span>
                        <span className="text-muted-foreground text-sm ml-2">({result.categoryName})</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="text-muted-foreground text-center p-4">
                没有找到匹配的结果，请尝试不同的搜索词
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={clearSearch}
                  className="ml-2"
                >
                  清除
                </Button>
              </div>
            )}
          </div>
        )}
      </section>

      {/* Categories Grid */}
      <section className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold tracking-tight">单位换算分类</h2>
          <Link href="/all" className="text-primary hover:underline">
            查看全部
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {CATEGORIES.slice(0, 8).map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      {/* Popular Conversions */}
      <section className="space-y-8">
        <h2 className="text-3xl font-bold tracking-tight">热门单位换算</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {CATEGORIES.slice(0, 4).map((category) => (
            <PopularConversion key={category.id} category={category} />
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center space-y-3 p-6">
            <h3 className="text-xl font-bold">精确换算</h3>
            <p className="text-muted-foreground">
              基于标准换算公式，提供高精度的单位转换结果
            </p>
          </div>
          <div className="text-center space-y-3 p-6">
            <h3 className="text-xl font-bold">多样单位</h3>
            <p className="text-muted-foreground">
              支持各种国际与本地单位，满足不同场景的换算需求
            </p>
          </div>
          <div className="text-center space-y-3 p-6">
            <h3 className="text-xl font-bold">简单易用</h3>
            <p className="text-muted-foreground">
              直观的界面设计，让单位换算变得简单快捷
            </p>
          </div>
        </div>
      </section>
    </div>
  )
} 