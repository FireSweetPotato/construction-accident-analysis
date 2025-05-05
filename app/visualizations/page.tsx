"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, Network, PieChart, TreesIcon as TreeStructure, Cloud, Grid3X3, Maximize2, Minimize2 } from "lucide-react"
import { useState, useEffect } from "react"

function ZoomableImage({ src }: { src: string }) {
  return (
    <div className="relative w-full h-[600px] overflow-hidden">
      <img
        src={src}
        alt="시각화 결과"
        className="w-full h-full object-contain"
      />
    </div>
  );
}

function GephiVisualization({ src }: { src: string }) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const toggleFullscreen = () => {
    const element = document.getElementById('gephi-iframe');
    if (!element) return;

    if (!document.fullscreenElement) {
      element.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <div className="relative w-full h-[600px]">
      <iframe
        id="gephi-iframe"
        src={src}
        className="w-full h-full border-0"
        allowFullScreen
      />
      <button
        onClick={toggleFullscreen}
        className="absolute top-4 right-4 p-2 bg-white/80 rounded-full shadow-md hover:bg-white transition-colors"
        title={isFullscreen ? "전체화면 종료" : "전체화면"}
      >
        {isFullscreen ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
      </button>
    </div>
  );
}

export default function VisualizationsPage() {
  const constructionTypes = ["철근콘크리트공사", "가설공사", "기계설비공사", "해체 및 철거공사", "토공사", "철골공사"] as const;
  type ConstructionType = typeof constructionTypes[number];
  
  const [selectedConstruction, setSelectedConstruction] = useState<ConstructionType>("철근콘크리트공사")

  // 이미지 경로 생성 함수
  const getImagePath = (type: string) => {
    const fileName = {
      bar: `${selectedConstruction}_barchart.png`,
      heatmap: `${selectedConstruction}_heatmap.png`,
      topic: `${selectedConstruction}_topics.png`,
      hierarchy: `${selectedConstruction}_hierarchy.png`,
      wordcloud: `${selectedConstruction}_wordcloud.png`,
      gephi: `${selectedConstruction}.html`
    }[type];
    return `/최종 분석 결과/${selectedConstruction}/${fileName}`
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

        <TabsContent value="bar-graph">
          <Card>
            <CardHeader>
              <CardTitle>주제별 빈도 분석 - {selectedConstruction}</CardTitle>
              <CardDescription>각 주제의 빈도를 막대 그래프로 시각화</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative w-full h-[700px]">
                <iframe
                  src={`/gephi/visualize_barchart.html?construction=${selectedConstruction}`}
                  className="w-full h-full border-0"
                  allowFullScreen
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="heatmap">
          <Card>
            <CardHeader>
              <CardTitle>주제 간 유사도 분석 - {selectedConstruction}</CardTitle>
              <CardDescription>주제 간의 유사도를 히트맵으로 시각화</CardDescription>
            </CardHeader>
            <CardContent>
              <ZoomableImage src={getImagePath("heatmap")} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="topic-distribution">
          <Card>
            <CardHeader>
              <CardTitle>주제 분포 분석 - {selectedConstruction}</CardTitle>
              <CardDescription>주제의 분포를 산점도로 시각화</CardDescription>
            </CardHeader>
            <CardContent>
              <ZoomableImage src={getImagePath("topic")} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="topic-hierarchy">
          <Card>
            <CardHeader>
              <CardTitle>주제 계층 구조 분석 - {selectedConstruction}</CardTitle>
              <CardDescription>주제의 계층 구조를 트리맵으로 시각화</CardDescription>
            </CardHeader>
            <CardContent>
              <ZoomableImage src={getImagePath("hierarchy")} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="word-cloud">
          <Card>
            <CardHeader>
              <CardTitle>주제별 키워드 분석 - {selectedConstruction}</CardTitle>
              <CardDescription>주제별 키워드를 워드클라우드로 시각화</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative w-full h-[700px]">
                <iframe
                  src={`/gephi/visualize_wordcloud.html?construction=${selectedConstruction}`}
                  className="w-full h-full border-0"
                  allowFullScreen
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="gephi">
          <Card>
            <CardHeader>
              <CardTitle>Gephi 네트워크 시각화 - {selectedConstruction}</CardTitle>
              <CardDescription>키워드 네트워크를 Gephi로 시각화</CardDescription>
            </CardHeader>
            <CardContent>
              <GephiVisualization src={`/gephi/${selectedConstruction}.html`} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
