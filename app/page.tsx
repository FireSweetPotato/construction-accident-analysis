'use client';

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, BarChart2 } from "lucide-react"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      <section className="relative py-12 md:py-16 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-blue-200/80 via-[5%] via-blue-200/80 via-[90%] to-white dark:from-background dark:via-blue-700/80 dark:via-[5%] dark:via-blue-700/80 dark:via-[90%] dark:to-background" />
        
        <div className="relative grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          {/* Left column - Text content */}
          <div className="space-y-8 lg:pr-8 z-10">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl text-gray-900 dark:text-gray-100">
              <span className="block mb-2">텍스트 마이닝을</span>
              <span className="block mb-2">활용한 건설현장의</span>
              <span className="block">공종별 재해 특성 분석</span>
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-base md:text-lg/relaxed lg:text-lg/relaxed xl:text-xl/relaxed max-w-2xl">
              BERTopic을 활용한 텍스트 마이닝으로 건설 현장에서 발생하는 사고 패턴과 원인을 분석했습니다. 다양한 시각화
              자료를 통해 건설 현장 안전 개선을 위한 인사이트를 제공합니다.
            </p>
            <div className="flex flex-col gap-3 min-[400px]:flex-row pt-4">
              <Link href="/visualizations">
                <Button size="lg" className="gap-2 bg-blue-600 hover:bg-blue-700 text-white text-base px-7 py-3.5">
                  시각화 결과 보기
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/methodology">
                <Button size="lg" variant="outline" className="border-blue-200 hover:bg-blue-50 dark:border-blue-800 dark:hover:bg-blue-950 text-base px-7 py-3.5">
                  연구 방법론
                </Button>
              </Link>
            </div>
          </div>

          {/* Right column - Illustration */}
          <div className="relative lg:h-[700px] xl:h-[800px] flex items-center justify-center">
            <div className="relative h-[500px] lg:h-full w-full">
              <Image
                src="/hero-illustration.png"
                alt="텍스트 마이닝 분석 일러스트레이션"
                fill
                className="object-contain drop-shadow-xl"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">연구 배경</h2>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                건설 현장 사고 분석 연구를 진행하게 된 배경과 필요성
              </p>
            </div>
          </div>

          <div className="grid gap-6 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="prose dark:prose-invert max-w-none">
                  <h3 className="text-xl font-bold mb-4">건설 산업의 높은 사고 및 사망률</h3>
                  <p>
                    건설 산업은 타 산업에 비해 높은 사고 및 사망률을 보입니다. 고위험 작업이 빈번하게 이루어지며, 이에
                    따라 재해 발생률과 사망률이 높습니다(고용노동부, 2025; 김하영 외 2인, 2022).
                  </p>
                  <p className="mt-4">
                    최근 통계에서도 이와 같은 경향이 확인됩니다. 건설공사안전관리종합정보망(CSI) 사고 신고 시스템에
                    따르면, 2024년 1월부터 12월까지 신고된 건설사고는 총 6,768건(부상 6,532건, 사망 204건 등)으로 전체
                    사망자 수는 207명(내국인 187명, 외국인 20명)으로 분석되었습니다(국토안전관리원, 2024).
                  </p>
                  <p className="mt-4">
                    주요 사고 유형으로는 재해자의 경우 '넘어짐'(21,024건)이 가장 많았고, 사고 사망자의 경우 '떨어짐'이
                    높은 비율을 차지하고 있습니다(고용노동부, 2024; 조규필 외 3인 2024).
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 h-full flex flex-col">
                <h3 className="text-xl font-bold mb-4">건설업 재해 통계</h3>
                <div className="flex-grow flex flex-col md:flex-row items-center justify-center gap-4 bg-muted/30 rounded-lg p-4">
                  <div className="relative w-full md:w-1/2 h-[300px] md:h-[400px]">
                    <Image
                      src="/재해자.jpg"
                      alt="건설업 재해자 통계"
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <div className="relative w-full md:w-1/2 h-[300px] md:h-[400px]">
                    <Image
                      src="/사망자.jpg"
                      alt="건설업 사망자 통계"
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </div>
                <div className="mt-4 text-sm text-muted-foreground">
                  <p>
                    고용노동부의 2024년 산업 재해 현황 보고서에 따르면, 건설업 재해자는 전체 재해자 98,987명 중 25,027명으로 약 25%, 전체 사망자 589명 중 건설업 사망자 수 276명으로 47%를 차지합니다.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:gap-12 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="prose dark:prose-invert max-w-none">
                  <h3 className="text-xl font-bold mb-4">공종별 사고 발생 현황</h3>
                  <p>
                    공종별 사고 및 사망률은 철근 콘크리트, 철골, 조적, 미장, 방수 등 다양한 공종에서 발생합니다. 사고가
                    빈번한 공종은 철근콘크리트공사(45.3%, 1,786건)와 가설 공사(15.0%, 592건)로 분석되었습니다.
                  </p>
                  <p className="mt-4">
                    공사 객체별로는 가시설(35.4%, 1,644건)에서 사고가 가장 많이 발생하며, 작업 유형별로는 설치
                    작업(20.8%, 991건)과 작업을 위한 이동 중(14.9%, 712건) 및 해체 작업(13.2%, 627건)에 사고 발생 빈도가
                    높습니다(국토안전관리원).
                  </p>
                  <p className="mt-4">
                    각 공종별로 특화된 사고 유형과 원인이 존재하며, 사고 발생 원인과 위험 요소가 다르므로, 사고의 패턴을
                    세밀히 분석할 필요성이 있다고 판단됩니다(고용노동부, 2024).
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="prose dark:prose-invert max-w-none">
                  <h3 className="text-xl font-bold mb-4">텍스트 마이닝의 필요성</h3>
                  <p>
                    건설 현장에서 사고 후 작성되는 건설안전 데이터는 대부분 개인에 의해 기록된 비정형 텍스트 형태로
                    제공됩니다. 이로 인해 방대한 양의 데이터에서 의미 있는 정보를 추출하고 분석하는 데 많은 시간과
                    인력이 소모되고 있습니다.
                  </p>
                  <p className="mt-4">
                    따라서 이러한 비정형 데이터를 효율적으로 수집·분석하여 유의미한 결론을 도출할 수 있는 기술적 접근이
                    필요합니다(김하영 외 2인, 2022; 윤영근과 오태근 2022; 조규필 외 3인, 2024).
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardContent className="pt-6">
              <div className="prose dark:prose-invert max-w-none">
                <h3 className="text-xl font-bold mb-4">연구 목표</h3>
                <p>
                  본 연구에서는 건설 현장의 공종별 재해 특성을 분석하기 위해 텍스트 마이닝 기술을 적용합니다. 철근
                  콘크리트, 철골, 조적, 미장, 방수 등 공종별 사고 데이터를 체계적으로 분석하고, 각 공종에서 빈번하게
                  발생하는 사고 유형과 원인을 도출하는 것이 목표입니다.
                </p>
                <p className="mt-4">
                  이를 통해 공종별 특화된 안전 대책을 수립하기 위한 기초자료 제공하고, 사고 관리의 선진화를 도모하며,
                  나아가 실질적인 재해 예방과 건설 안전성 강화에 기여하고자 합니다.
                </p>
                <div className="flex justify-center mt-8">
                  <Link href="/visualizations">
                    <Button size="lg" className="gap-2 text-xl px-8 py-4 h-auto">
                      <BarChart2 className="h-5 w-5" />
                      분석 결과 확인하기
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
