"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface TopicVisualizationProps {
  constructionType?: string
}

export default function TopicVisualization({ constructionType = "철근콘크리트공사" }: TopicVisualizationProps) {
  const [isClient, setIsClient] = useState(false)
  const barChartRef = useRef<HTMLDivElement>(null)
  const networkRef = useRef<HTMLDivElement>(null)
  const wordCloudRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsClient(true)
    // 이 부분은 실제 데이터와 시각화 라이브러리를 사용하여 구현해야 합니다.
    // 예시 목적으로 간단한 시각화 컨테이너만 표시합니다.
  }, [])

  if (!isClient) {
    return <div className="h-[400px] flex items-center justify-center">로딩 중...</div>
  }

  return (
    <Tabs defaultValue="bar-chart">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="bar-chart">토픽 분포</TabsTrigger>
        <TabsTrigger value="network">토픽 네트워크</TabsTrigger>
        <TabsTrigger value="word-cloud">워드 클라우드</TabsTrigger>
      </TabsList>

      <TabsContent value="bar-chart" className="mt-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center mb-4">
              <h3 className="text-lg font-medium">{constructionType} 토픽 분포</h3>
              <p className="text-sm text-muted-foreground">BERTopic으로 추출한 주요 토픽의 분포를 보여줍니다.</p>
            </div>
            <div ref={barChartRef} className="h-[400px] bg-muted/30 rounded-lg flex items-center justify-center">
              <p className="text-muted-foreground">여기에 {constructionType}의 토픽 분포 차트가 표시됩니다.</p>
            </div>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium mb-2">주요 토픽</h4>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span>토픽 1: 추락 사고</span>
                    <span className="font-medium">32%</span>
                  </li>
                  <li className="flex justify-between">
                    <span>토픽 2: 협착 사고</span>
                    <span className="font-medium">24%</span>
                  </li>
                  <li className="flex justify-between">
                    <span>토픽 3: 전도 사고</span>
                    <span className="font-medium">18%</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">분석 인사이트</h4>
                <p className="text-sm text-muted-foreground">
                  {constructionType}에서는 추락 사고가 가장 높은 비중을 차지하며, 이는 고소 작업 시 안전 장비 미착용과
                  관련이 있습니다. 협착 사고는 주로 중장비 작업 과정에서 발생하는 것으로 분석됩니다.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="network" className="mt-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center mb-4">
              <h3 className="text-lg font-medium">{constructionType} 토픽 간 관계 네트워크</h3>
              <p className="text-sm text-muted-foreground">토픽 간의 연관성을 네트워크 그래프로 시각화합니다.</p>
            </div>
            <div ref={networkRef} className="h-[500px] bg-muted/30 rounded-lg flex items-center justify-center">
              <p className="text-muted-foreground">여기에 {constructionType}의 토픽 네트워크 그래프가 표시됩니다.</p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="word-cloud" className="mt-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center mb-4">
              <h3 className="text-lg font-medium">{constructionType} 토픽별 주요 키워드</h3>
              <p className="text-sm text-muted-foreground">각 토픽의 주요 키워드를 워드 클라우드로 시각화합니다.</p>
            </div>
            <div ref={wordCloudRef} className="h-[400px] bg-muted/30 rounded-lg flex items-center justify-center">
              <p className="text-muted-foreground">여기에 {constructionType}의 워드 클라우드가 표시됩니다.</p>
            </div>
            <div className="mt-4">
              <h4 className="font-medium mb-2">토픽 선택</h4>
              <div className="flex flex-wrap gap-2">
                <button className="px-3 py-1 bg-primary text-primary-foreground rounded-full text-sm">
                  토픽 1: 추락 사고
                </button>
                <button className="px-3 py-1 bg-muted rounded-full text-sm">토픽 2: 협착 사고</button>
                <button className="px-3 py-1 bg-muted rounded-full text-sm">토픽 3: 전도 사고</button>
                <button className="px-3 py-1 bg-muted rounded-full text-sm">토픽 4: 충돌 사고</button>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
