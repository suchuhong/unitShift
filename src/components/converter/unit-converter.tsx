"use client"

import { useState, useEffect } from "react"
import { ArrowRight, Repeat } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UNIT_SYSTEMS } from "@/lib/constants"
import { formatNumber } from "@/lib/utils"
import { UnitData } from "@/lib/constants"

interface UnitConverterProps {
  categoryId: string
  initialFromUnit?: string
  initialToUnit?: string
  initialValue?: number
}

export function UnitConverter({ 
  categoryId, 
  initialFromUnit, 
  initialToUnit,
  initialValue = 1
}: UnitConverterProps) {
  const units = UNIT_SYSTEMS[categoryId] || {}
  const unitList = Object.values(units)
  
  const [fromUnit, setFromUnit] = useState<string>(initialFromUnit || (unitList.length > 0 ? unitList[0].id : ""))
  const [toUnit, setToUnit] = useState<string>(initialToUnit || (unitList.length > 1 ? unitList[1].id : ""))
  const [value, setValue] = useState<string>(initialValue.toString())
  const [result, setResult] = useState<string>("")

  const isTemperature = categoryId === "temperature"

  useEffect(() => {
    if (!fromUnit || !toUnit || !value || isNaN(parseFloat(value))) {
      setResult("")
      return
    }

    if (fromUnit === toUnit) {
      setResult(value)
      return
    }

    const fromUnitData = units[fromUnit]
    const toUnitData = units[toUnit]

    if (!fromUnitData || !toUnitData) {
      setResult("")
      return
    }

    let convertedValue: number

    // Handle conversion based on the type (simple number or function)
    if (isTemperature) {
      // For temperature, convert to Celsius first (as base unit), then to target
      const valueNum = parseFloat(value)
      let valueInCelsius: number
      
      if (typeof fromUnitData.conversion === "function") {
        valueInCelsius = (fromUnitData.conversion as Function)(valueNum)
      } else {
        valueInCelsius = valueNum * (fromUnitData.conversion as number)
      }
      
      if (typeof toUnitData.reverseConversion === "function") {
        convertedValue = (toUnitData.reverseConversion as Function)(valueInCelsius)
      } else {
        convertedValue = valueInCelsius * (toUnitData.reverseConversion as number)
      }
    } else {
      // For other units, convert to base unit then to target
      const valueNum = parseFloat(value)
      const valueInBaseUnit = valueNum * (fromUnitData.conversion as number)
      convertedValue = valueInBaseUnit * (toUnitData.reverseConversion as number)
    }

    setResult(formatNumber(convertedValue))
  }, [fromUnit, toUnit, value, units, isTemperature])

  const swapUnits = () => {
    setFromUnit(toUnit)
    setToUnit(fromUnit)
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          {fromUnit && toUnit && units[fromUnit] && units[toUnit] ? 
            `${units[fromUnit].name}转${units[toUnit].name}` : 
            "单位换算器"}
        </CardTitle>
        <CardDescription>
          输入数值并选择需要转换的单位
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <div className="grid gap-3">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 space-y-2">
                <label htmlFor="from-value" className="text-sm font-medium">
                  数值
                </label>
                <Input
                  id="from-value"
                  type="number"
                  placeholder="输入数值"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  className="text-lg"
                />
              </div>
              <div className="flex-1 space-y-2">
                <label htmlFor="from-unit" className="text-sm font-medium">
                  从
                </label>
                <Select value={fromUnit} onValueChange={setFromUnit}>
                  <SelectTrigger id="from-unit">
                    <SelectValue placeholder="选择单位" />
                  </SelectTrigger>
                  <SelectContent>
                    {unitList.map((unit) => (
                      <SelectItem key={`from-${unit.id}`} value={unit.id}>
                        {unit.name} ({unit.symbol})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end justify-center">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={swapUnits}
                  className="mb-2"
                >
                  <Repeat className="h-4 w-4" />
                  <span className="sr-only">交换单位</span>
                </Button>
              </div>
              <div className="flex-1 space-y-2">
                <label htmlFor="to-unit" className="text-sm font-medium">
                  到
                </label>
                <Select value={toUnit} onValueChange={setToUnit}>
                  <SelectTrigger id="to-unit">
                    <SelectValue placeholder="选择单位" />
                  </SelectTrigger>
                  <SelectContent>
                    {unitList.map((unit) => (
                      <SelectItem key={`to-${unit.id}`} value={unit.id}>
                        {unit.name} ({unit.symbol})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col items-center space-y-2 rounded-md border p-4 bg-muted/50">
            <div className="flex items-center gap-2">
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm font-medium text-muted-foreground">换算结果</p>
            </div>
            <div className="text-center">
              {result && fromUnit && toUnit && units[fromUnit] && units[toUnit] ? (
                <div className="space-y-1">
                  <p className="text-3xl font-bold">{result} {units[toUnit].symbol}</p>
                  <p className="text-sm text-muted-foreground">
                    {value} {units[fromUnit].symbol} = {result} {units[toUnit].symbol}
                  </p>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">请输入有效的数值和单位进行换算</p>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 