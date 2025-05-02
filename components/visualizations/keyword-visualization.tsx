"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface KeywordVisualizationProps {
  constructionType?: string
}

export default function KeywordVisualization({ constructionType = "철근콘크리트공사" }: KeywordVisualizationProps) {
  const [isClient, setIsClient] = useState(false)
  const wordCloudRef = useRef<HTMLDivElement>(null)
  const trendChartRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsClient(true)
    // 실제 데이터와 시각화 라이브러리를 사용하여 구현해야 합니다.
  }, [])

  if (!isClient) {
    return <div className="h-[400px] flex items-center justify-center">로딩 중...</div>
  }

  return (
    <Tabs defaultValue="word-cloud">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="word-cloud">키워드 클라우드</TabsTrigger>
        <TabsTrigger value="trend">키워드 트렌드</TabsTrigger>
      </TabsList>

      <TabsContent value="word-cloud" className="mt-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
              <div>
                <h3 className="text-lg font-medium">{constructionType} 주요 키워드 분석</h3>
                <p className="text-sm text-muted-foreground">건설 현장 사고 보고서에서 추출한 주요 키워드입니다.</p>
              </div>
              <div className="mt-2 md:mt-0">
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="카테고리 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">전체 키워드</SelectItem>
                    <SelectItem value="cause">사고 원인</SelectItem>
                    <SelectItem value="equipment">장비 관련</SelectItem>
                    <SelectItem value="location">위치 관련</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div ref={wordCloudRef} className="h-[400px] bg-muted/30 rounded-lg flex items-center justify-center">
              <p className="text-muted-foreground">여기에 {constructionType}의 키워드 클라우드가 표시됩니다.</p>
            </div>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium mb-2">상위 키워드</h4>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span>안전벨트</span>
                    <span className="font-medium">87회</span>
                  </li>
                  <li className="flex justify-between">
                    <span>작업발판</span>
                    <span className="font-medium">64회</span>
                  </li>
                  <li className="flex justify-between">
                    <span>중장비</span>
                    <span className="font-medium">52회</span>
                  </li>
                  <li className="flex justify-between">
                    <span>안전교육</span>
                    <span className="font-medium">43회</span>
                  </li>
                  <li className="flex justify-between">
                    <span>작업절차</span>
                    <span className="font-medium">38회</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">분석 인사이트</h4>
                <p className="text-sm text-muted-foreground">
                  {constructionType}에서는 '안전벨트'와 '작업발판'이 가장 빈번하게 언급되는 키워드로, 추락 사고와 관련된
                  안전 장비의 중요성을 시사합니다. '안전교육'과 '작업절차'의 빈도는 사고 예방을 위한 교육과 절차 준수의
                  중요성을 나타냅니다.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="trend" className="mt-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center mb-4">
              <h3 className="text-lg font-medium">{constructionType} 키워드 트렌드 분석</h3>
              <p className="text-sm text-muted-foreground">시간에 따른 주요 키워드의 언급 빈도 변화를 보여줍니다.</p>
            </div>
            <div ref={trendChartRef} className="h-[400px] bg-muted/30 rounded-lg flex items-center justify-center">
              <p className="text-muted-foreground">여기에 {constructionType}의 키워드 트렌드 차트가 표시됩니다.</p>
            </div>
            <div className="mt-4">
              <h4 className="font-medium mb-2">키워드 선택</h4>
              <div className="flex flex-wrap gap-2">
                <button className="px-3 py-1 bg-primary text-primary-foreground rounded-full text-sm">안전벨트</button>
                <button className="px-3 py-1 bg-primary text-primary-foreground rounded-full text-sm">작업발판</button>
                <button className="px-3 py-1 bg-muted rounded-full text-sm">중장비</button>
                <button className="px-3 py-1 bg-muted rounded-full text-sm">안전교육</button>
                <button className="px-3 py-1 bg-muted rounded-full text-sm">작업절차</button>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
