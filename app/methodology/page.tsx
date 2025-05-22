"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect } from "react"

export default function MethodologyPage() {
  // 앵커 링크 클릭 시 상단바 높이만큼 오프셋 적용
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.tagName === "A" && target.getAttribute("href")?.startsWith("#")) {
        e.preventDefault()
        const id = target.getAttribute("href")?.substring(1)
        const element = document.getElementById(id || "")

        if (element) {
          // 상단바 높이(64px) + 추가 여백(16px)만큼 오프셋 적용
          const yOffset = -80
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
          window.scrollTo({ top: y, behavior: "smooth" })
        }
      }
    }

    document.addEventListener("click", handleAnchorClick)

    // URL에 해시가 있는 경우 페이지 로드 시 스크롤 조정
    if (window.location.hash) {
      const id = window.location.hash.substring(1)
      const element = document.getElementById(id)

      if (element) {
        setTimeout(() => {
          const yOffset = -80
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
          window.scrollTo({ top: y, behavior: "smooth" })
        }, 100)
      }
    }

    return () => {
      document.removeEventListener("click", handleAnchorClick)
    }
  }, [])

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="space-y-4 text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">연구 방법론</h1>
        <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
          BERTopic을 활용한 건설 현장 사고 텍스트 마이닝 분석 방법론에 대한 설명입니다.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>목차</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="font-medium">
                  <a href="#data-collection" className="hover:underline">
                    1. 데이터 수집
                  </a>
                </li>
                <li className="font-medium">
                  <a href="#preprocessing" className="hover:underline">
                    2. 데이터 전처리
                  </a>
                </li>
                <li className="font-medium">
                  <a href="#bertopic" className="hover:underline">
                    3. BERTopic 모델링
                  </a>
                </li>
                <li className="font-medium">
                  <a href="#visualization" className="hover:underline">
                    4. 시각화 방법
                  </a>
                </li>
                <li className="font-medium">
                  <a href="#analysis" className="hover:underline">
                    5. 분석 방법
                  </a>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-8">
          <Card id="data-collection" className="scroll-mt-24">
            <CardHeader>
              <CardTitle>1. 데이터 수집</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 dark:text-gray-300">
                2020년부터 2024년까지 건설공사 안전관리 종합정보망(CSI)의 사고 신고 데이터를 기반으로 하고 있으며, 총 21,686건의 사고 사례를 기반으로 분석을 진행.
              </p>
            </CardContent>
          </Card>

          <Card id="preprocessing" className="scroll-mt-24">
            <CardHeader>
              <CardTitle>2. 데이터 전처리</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 dark:text-gray-300">
                수집된 텍스트 데이터는 다음과 같은 전처리 과정을 거쳤습니다:
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2 text-gray-700 dark:text-gray-300">
                <li>텍스트 정규화 (대소문자 통일, 특수문자 제거)</li>
                <li>불용어(Stopwords) 제거</li>
                <li>형태소 분석 및 토큰화</li>
                <li>중복 문서 제거</li>
              </ul>
            </CardContent>
          </Card>

          <Card id="bertopic" className="scroll-mt-24">
            <CardHeader>
              <CardTitle>3. BERTopic 모델링</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 dark:text-gray-300">
                BERTopic은 BERT 임베딩을 활용한 토픽 모델링 기법으로, 다음과 같은 과정으로 적용했습니다:
              </p>
              <ol className="list-decimal pl-6 mt-4 space-y-2 text-gray-700 dark:text-gray-300">
                <li>BERT 모델을 사용하여 문서 임베딩 생성</li>
                <li>UMAP을 통한 차원 축소</li>
                <li>HDBSCAN 클러스터링을 통한 토픽 추출</li>
                <li>c-TF-IDF를 활용한 토픽별 키워드 추출</li>
              </ol>
            </CardContent>
          </Card>

          <Card id="visualization" className="scroll-mt-24">
            <CardHeader>
              <CardTitle>4. 시각화 방법</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 dark:text-gray-300">
                분석 결과는 다음과 같은 시각화 방법을 통해 표현했습니다:
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2 text-gray-700 dark:text-gray-300">
                <li>막대그래프 : 토픽에서 중요도가 높은 키워드를 막대그래프로 시각화</li>
                <li>히트맵 : 토픽 간 유사도를 색상으로 표현</li>
                <li>주제분포도 : 토픽 또는 문서 간의 상대적인 거리 구조를 평면에 배치</li>
                <li>주체계층도 : 클래스 기반의 TF-IDF 유사도를 바탕으로 토픽 간 관계를 트리 구조로 시각화</li>
                <li>워드클라우드 : 토픽 내 키워드를 워드클라우드 형태로 시각화</li>
                <li>Gephi 네트워크 : 토픽 간 관계를 네트워크 형태로 시각화</li>
              </ul>
            </CardContent>
          </Card>

          <Card id="analysis" className="scroll-mt-24">
            <CardHeader>
              <CardTitle>5. 분석 방법</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 dark:text-gray-300">
                추출된 토픽과 키워드를 바탕으로 다음과 같은 분석을 수행했습니다:
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2 text-gray-700 dark:text-gray-300">
                <li>주요 사고 유형 및 원인 분석</li>
                <li>사고 유형 간 연관성 분석</li>
                <li>사고 발생 패턴 분석</li>
                <li>안전 관리 개선점 도출</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
