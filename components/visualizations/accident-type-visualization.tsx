"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface AccidentTypeVisualizationProps {
  constructionType?: string
}

export default function AccidentTypeVisualization({
  constructionType = "철근콘크리트공사",
}: AccidentTypeVisualizationProps) {
  const [isClient, setIsClient] = useState(false)
  const pieChartRef = useRef<HTMLDivElement>(null)
  const barChartRef = useRef<HTMLDivElement>(null)
  const heatmapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsClient(true)
    // 실제 데이터와 시각화 라이브러리를 사용하여 구현해야 합니다.
  }, [])

  if (!isClient) {
    return <div className="h-[400px] flex items-center justify-center">로딩 중...</div>
  }

  return (
    <Tabs defaultValue="pie-chart">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="pie-chart">사고 유형 분포</TabsTrigger>
        <TabsTrigger value="bar-chart">원인별 분석</TabsTrigger>
        <TabsTrigger value="heatmap">시간/위치 분석</TabsTrigger>
      </TabsList>

      <TabsContent value="pie-chart" className="mt-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center mb-4">
              <h3 className="text-lg font-medium">{constructionType} 사고 유형 분포</h3>
              <p className="text-sm text-muted-foreground">건설 현장에서 발생하는 사고 유형의 분포를 보여줍니다.</p>
            </div>
            <div ref={pieChartRef} className="h-[400px] bg-muted/30 rounded-lg flex items-center justify-center">
              <p className="text-muted-foreground">여기에 {constructionType}의 사고 유형 분포 차트가 표시됩니다.</p>
            </div>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium mb-2">주요 사고 유형</h4>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span>추락</span>
                    <span className="font-medium">35%</span>
                  </li>
                  <li className="flex justify-between">
                    <span>협착</span>
                    <span className="font-medium">22%</span>
                  </li>
                  <li className="flex justify-between">
                    <span>전도</span>
                    <span className="font-medium">18%</span>
                  </li>
                  <li className="flex justify-between">
                    <span>충돌</span>
                    <span className="font-medium">12%</span>
                  </li>
                  <li className="flex justify-between">
                    <span>기타</span>
                    <span className="font-medium">13%</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">분석 인사이트</h4>
                <p className="text-sm text-muted-foreground">
                  {constructionType}에서는 추락 사고가 전체의 35%로 가장 높은 비중을 차지하며, 이는 고소 작업 시 안전
                  장비 미착용과 작업발판 불량이 주요 원인으로 분석됩니다. 협착 사고는 주로 중장비 작업 과정에서 발생하는
                  것으로 나타납니다.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="bar-chart" className="mt-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center mb-4">
              <h3 className="text-lg font-medium">{constructionType} 사고 원인별 분석</h3>
              <p className="text-sm text-muted-foreground">사고 유형별 주요 원인을 분석한 결과입니다.</p>
            </div>
            <div ref={barChartRef} className="h-[400px] bg-muted/30 rounded-lg flex items-center justify-center">
              <p className="text-muted-foreground">여기에 {constructionType}의 사고 원인별 분석 차트가 표시됩니다.</p>
            </div>
            <div className="mt-4">
              <h4 className="font-medium mb-2">주요 원인 분석</h4>
              <ul className="space-y-2">
                <li>
                  <span className="font-medium">안전 장비 미착용/불량:</span>
                  <span className="ml-2">추락 사고의 주요 원인으로, 전체 추락 사고의 62%를 차지</span>
                </li>
                <li>
                  <span className="font-medium">작업 절차 미준수:</span>
                  <span className="ml-2">협착 및 충돌 사고의 주요 원인으로, 해당 사고의 47% 차지</span>
                </li>
                <li>
                  <span className="font-medium">안전 교육 부족:</span>
                  <span className="ml-2">모든 유형의 사고에서 공통적으로 나타나는 원인</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="heatmap" className="mt-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center mb-4">
              <h3 className="text-lg font-medium">{constructionType} 시간/위치별 사고 분포</h3>
              <p className="text-sm text-muted-foreground">
                시간대와 작업 위치에 따른 사고 발생 빈도를 히트맵으로 시각화합니다.
              </p>
            </div>
            <div ref={heatmapRef} className="h-[400px] bg-muted/30 rounded-lg flex items-center justify-center">
              <p className="text-muted-foreground">
                여기에 {constructionType}의 시간/위치별 사고 분포 히트맵이 표시됩니다.
              </p>
            </div>
            <div className="mt-4">
              <h4 className="font-medium mb-2">주요 발견점</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <span className="font-medium">오전 10-11시:</span>
                  <span className="ml-2">사고 발생 빈도가 가장 높은 시간대</span>
                </li>
                <li>
                  <span className="font-medium">오후 2-3시:</span>
                  <span className="ml-2">두 번째로 사고 발생 빈도가 높은 시간대</span>
                </li>
                <li>
                  <span className="font-medium">고소 작업 구역:</span>
                  <span className="ml-2">추락 사고 발생 빈도가 가장 높은 위치</span>
                </li>
                <li>
                  <span className="font-medium">중장비 작업 구역:</span>
                  <span className="ml-2">협착 및 충돌 사고 발생 빈도가 높은 위치</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
