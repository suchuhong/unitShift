"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { CategoryCard } from "@/components/converter/category-card"
import { CATEGORIES } from "@/lib/constants"

export default function AllCategoriesPage() {
  return (
    <div className="container max-w-7xl py-8 space-y-10">
      <div className="space-y-2">
        <Link href="/" className="text-sm text-muted-foreground hover:text-primary inline-flex items-center">
          <ArrowRight className="h-4 w-4 mr-1 rotate-180" />
          返回首页
        </Link>
        <h1 className="text-3xl font-bold">所有单位换算工具</h1>
        <p className="text-muted-foreground">
          浏览我们提供的所有单位换算工具，满足您在学习、工作和生活中的各种换算需求
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {CATEGORIES.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
      
      <div className="space-y-6 prose dark:prose-invert max-w-none">
        <h2>关于单位换算</h2>
        <p>
          单位换算是在不同度量标准之间转换数值的过程。在全球化的今天，不同的国家和领域可能使用不同的计量单位系统，
          因此单位换算成为我们日常生活和工作中常见的需求。
        </p>
        
        <h3>常见单位换算系统</h3>
        <ul>
          <li><strong>国际单位制（SI）</strong>：全球最广泛使用的标准化计量系统，包括米、千克、秒等基本单位</li>
          <li><strong>英制单位</strong>：主要在美国和一些英联邦国家使用，包括英寸、英尺、磅等单位</li>
          <li><strong>中国传统单位</strong>：如市斤、市尺等，在中国日常生活中仍有使用</li>
        </ul>
        
        <h3>为什么需要单位换算工具？</h3>
        <p>
          在全球化的今天，我们经常需要在不同的单位系统之间进行转换。以下是使用单位换算工具的常见原因：
        </p>
        <ul>
          <li>国际交流和贸易需要在不同计量系统间转换</li>
          <li>学习和研究中需要使用不同的单位</li>
          <li>旅行时理解当地使用的度量标准</li>
          <li>烹饪和DIY项目中需要转换不同的计量单位</li>
          <li>专业工作中需要精确的单位换算</li>
        </ul>
        
        <h3>如何使用我们的单位换算工具</h3>
        <p>
          我们的单位换算工具直观易用，只需三个简单步骤：
        </p>
        <ol>
          <li>选择您需要的单位换算类别（如长度、重量、温度等）</li>
          <li>输入您要转换的数值和原始单位</li>
          <li>选择目标单位，立即获得精确的换算结果</li>
        </ol>
        
        <p>
          无论您是学生、专业人士，还是在日常生活中需要进行单位换算，我们的工具都能满足您的需求。
          选择上方的任何单位类别，开始您的单位换算之旅吧！
        </p>
      </div>
    </div>
  )
} 