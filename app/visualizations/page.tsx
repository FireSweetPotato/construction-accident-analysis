"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, Network, PieChart, TreesIcon as TreeStructure, Cloud, Grid3X3, Plus, Minus } from "lucide-react"
import TopicVisualization from "@/components/visualizations/topic-visualization"
import { useState } from "react"
import Image from "next/image"

function VisualizationFrame({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative w-full h-full">
      <iframe
        src={`/visualization-viewer.html?image=${encodeURIComponent(src)}&alt=${encodeURIComponent(alt)}`}
        className="w-full h-full border-0"
        title={alt}
      />
    </div>
  );
}

function ZoomableImage({ src, alt }: { src: string; alt: string }) {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });

  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + 0.2, 3));
  };

  const handleZoomOut = () => {
    setScale(prev => Math.max(prev - 0.2, 0.5));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale > 1) {
      setIsDragging(true);
      setStartPos({
        x: e.clientX - position.x,
        y: e.clientY - position.y
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && scale > 1) {
      setPosition({
        x: e.clientX - startPos.x,
        y: e.clientY - startPos.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="relative w-full h-full group">
      <div className="absolute top-4 right-4 flex gap-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={handleZoomIn}
          className="bg-white/80 hover:bg-white p-2 rounded-full shadow-md"
          title="확대"
        >
          <Plus className="h-5 w-5" />
        </button>
        <button
          onClick={handleZoomOut}
          className="bg-white/80 hover:bg-white p-2 rounded-full shadow-md"
          title="축소"
        >
          <Minus className="h-5 w-5" />
        </button>
      </div>
      <div 
        className="w-full h-full"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className={`object-contain p-4 transition-transform duration-200 ${scale > 1 ? 'cursor-move' : ''}`}
          style={{ 
            transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
          }}
          draggable="false"
        />
      </div>
    </div>
  );
}

export default function VisualizationsPage() {
  const constructionTypes = ["철근콘크리트공사", "가설공사", "기계설비공사", "해체및철거공사", "토공사", "철골공사"] as const;
  type ConstructionType = typeof constructionTypes[number];
  
  const [selectedConstruction, setSelectedConstruction] = useState<ConstructionType>("철근콘크리트공사")

  const gephiLinks: Record<ConstructionType, string> = {
    "철근콘크리트공사": "https://firesweetpotato.github.io/Text/gongjong_%EC%B2%A0%EA%B7%BC%EC%BD%98%ED%81%AC%EB%A6%AC%ED%8A%B8%EA%B3%B5%EC%82%AC_gephi.html?nodeSize=0.5&hideBackButton=true",
    "가설공사": "https://firesweetpotato.github.io/Text/gongjong_%EA%B0%80%EC%84%A4%EA%B3%B5%EC%82%AC_gephi.html?nodeSize=0.5&hideBackButton=true",
    "기계설비공사": "https://firesweetpotato.github.io/Text/gongjong_%EA%B8%B0%EA%B3%84%EC%84%A4%EB%B9%84%EA%B3%B5%EC%82%AC_gephi.html?nodeSize=0.5&hideBackButton=true",
    "해체및철거공사": "https://firesweetpotato.github.io/Text/gongjong_%ED%95%B4%EC%B2%B4%20%EB%B0%8F%20%EC%B2%A0%EA%B1%B0%EA%B3%B5%EC%82%AC_gephi.html?nodeSize=0.5&hideBackButton=true",
    "토공사": "https://firesweetpotato.github.io/Text/gongjong_%ED%86%A0%EA%B3%B5%EC%82%AC_gephi.html?nodeSize=0.5&hideBackButton=true",
    "철골공사": "https://firesweetpotato.github.io/Text/gongjong_%EC%B2%A0%EA%B3%A8%EA%B3%B5%EC%82%AC_gephi.html?nodeSize=0.5&hideBackButton=true"
  }

  // 이미지 경로 생성 함수
  const getImagePath = (type: string) => {
    const constructionFolder = selectedConstruction === "해체및철거공사" ? "해체 및 철거공사" : selectedConstruction;
    const fileName = {
      bar: selectedConstruction === "해체및철거공사" 
        ? "해체 및 철거공사_barchart.png"
        : `${selectedConstruction}_barchart.png`,
      heatmap: selectedConstruction === "해체및철거공사"
        ? "해체 및 철거공사_heatmap.png"
        : `${selectedConstruction}_heatmap.png`,
      topic: selectedConstruction === "해체및철거공사"
        ? "해체 및 철거공사_topics.png"
        : `${selectedConstruction}_topics.png`,
      hierarchy: selectedConstruction === "해체및철거공사"
        ? "해체 및 철거공사_hierarchy.png"
        : `${selectedConstruction}_hierarchy.png`,
      wordcloud: selectedConstruction === "해체및철거공사"
        ? "해체 및 철거공사_wordcloud.png"
        : `${selectedConstruction}_wordcloud.png`
    }[type];
    return `/visualizations/${constructionFolder}/${fileName}`
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="space-y-4 text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">시각화 결과</h1>
        <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
          BERTopic을 활용한 건설 현장 사고 분석 결과를 다양한 시각화로 확인하세요.
        </p>
      </div>

      <Tabs defaultValue="bar-graph" className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6 h-auto">
          <TabsTrigger
            value="bar-graph"
            className="flex items-center justify-start gap-2 py-3 h-auto data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <BarChart3 className="h-5 w-5" />
            <span>막대그래프</span>
          </TabsTrigger>
          <TabsTrigger
            value="heatmap"
            className="flex items-center justify-start gap-2 py-3 h-auto data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <Grid3X3 className="h-5 w-5" />
            <span>히트맵</span>
          </TabsTrigger>
          <TabsTrigger
            value="topic-distribution"
            className="flex items-center justify-start gap-2 py-3 h-auto data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <PieChart className="h-5 w-5" />
            <span>주제분포도</span>
          </TabsTrigger>
          <TabsTrigger
            value="topic-hierarchy"
            className="flex items-center justify-start gap-2 py-3 h-auto data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <TreeStructure className="h-5 w-5" />
            <span>주제계층도</span>
          </TabsTrigger>
          <TabsTrigger
            value="word-cloud"
            className="flex items-center justify-start gap-2 py-3 h-auto data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <Cloud className="h-5 w-5" />
            <span>워드클라우드</span>
          </TabsTrigger>
          <TabsTrigger
            value="gephi"
            className="flex items-center justify-start gap-2 py-3 h-auto data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <Network className="h-5 w-5" />
            <span>Gephi 네트워크</span>
          </TabsTrigger>
        </TabsList>

        {/* 공종 선택 탭 */}
        <div className="mb-6 overflow-x-auto">
          <div className="flex space-x-2 min-w-max pb-2">
            {constructionTypes.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedConstruction(type)}
                className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
                  selectedConstruction === type ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <TabsContent value="bar-graph" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>막대그래프 - {selectedConstruction}</CardTitle>
              <CardDescription>
                {selectedConstruction}에서 발생한 사고 유형별 발생 빈도를 막대그래프로 시각화한 결과입니다.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[600px] bg-muted/30 rounded-lg border-2 border-border relative">
                <VisualizationFrame
                  src={getImagePath("bar")}
                  alt={`${selectedConstruction} 막대그래프`}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="heatmap" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>히트맵 - {selectedConstruction}</CardTitle>
              <CardDescription>
                {selectedConstruction}에서의 사고 유형 분포를 히트맵으로 시각화한 결과입니다.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[600px] bg-muted/30 rounded-lg border-2 border-border relative">
                <VisualizationFrame
                  src={getImagePath("heatmap")}
                  alt={`${selectedConstruction} 히트맵`}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="topic-distribution" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>주제분포도 - {selectedConstruction}</CardTitle>
              <CardDescription>
                {selectedConstruction}에서 BERTopic으로 추출한 주요 토픽의 분포를 시각화한 결과입니다.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[600px] bg-muted/30 rounded-lg border-2 border-border relative">
                <VisualizationFrame
                  src={getImagePath("topic")}
                  alt={`${selectedConstruction} 주제분포도`}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="topic-hierarchy" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>주제계층도 - {selectedConstruction}</CardTitle>
              <CardDescription>
                {selectedConstruction}에서 토픽 간의 계층적 관계를 트리 구조로 시각화한 결과입니다.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[600px] bg-muted/30 rounded-lg border-2 border-border relative">
                <VisualizationFrame
                  src={getImagePath("hierarchy")}
                  alt={`${selectedConstruction} 주제계층도`}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="word-cloud" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>워드클라우드 - {selectedConstruction}</CardTitle>
              <CardDescription>
                {selectedConstruction}에서 주요 키워드의 빈도를 워드클라우드로 시각화한 결과입니다.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[600px] bg-muted/30 rounded-lg border-2 border-border relative">
                <VisualizationFrame
                  src={getImagePath("wordcloud")}
                  alt={`${selectedConstruction} 워드클라우드`}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="gephi" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Gephi 네트워크 시각화 - {selectedConstruction}</CardTitle>
              <CardDescription>
                {selectedConstruction}의 키워드 네트워크를 Gephi로 시각화한 결과입니다.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[600px] bg-muted/30 rounded-lg border-2 border-border">
                <iframe
                  src={gephiLinks[selectedConstruction]}
                  className="w-full h-full border-0"
                  title={`${selectedConstruction} Gephi 시각화`}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
