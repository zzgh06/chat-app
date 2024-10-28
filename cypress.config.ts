import { defineConfig } from "cypress"

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    setupNodeEvents(on, config) {
      on("task", {
        // DB 시드 및 정리를 위한 태스크 설정
        "db:seed": () => {
          // 테스트 데이터 생성 로직
          return null
        },
        "db:cleanup": () => {
          // 테스트 데이터 정리 로직
          return null
        },
      })
    },
  },
  
  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
})