# Vite 8 + Vue 3 + TypeScript 6 Template

<p align="center">
  <img src="https://img.shields.io/badge/Vite-8.0.9-646CFF?logo=vite&logoColor=white" alt="Vite">
  <img src="https://img.shields.io/badge/Vue-3.5.32-4FC08D?logo=vuedotjs&logoColor=white" alt="Vue">
  <img src="https://img.shields.io/badge/TypeScript-6.0.3-3178C6?logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/UnoCSS-0.66.8-grey?logo=unocss&logoColor=white" alt="UnoCSS">
  <img src="https://img.shields.io/badge/ESLint-10.2.1-4B32C3?logo=eslint&logoColor=white" alt="ESLint">
  <img src="https://img.shields.io/badge/pnpm-10.30.3-F69220?logo=pnpm&logoColor=white" alt="pnpm">
</p>

## 特性 (Features)

*   🚀 **Vite 8 (Rolldown Engine)**: 采用自研 Rust 驱动的 Rolldown 统一构建引擎，开发与构建速度提升 10-30x。
*   🔷 **TypeScript 6**: 深度集成 TS 6.0，提供更精准的类型推断与更快的编译体验。
*   🎨 **UnoCSS**: 极致的原子化 CSS 引擎，即时编译，几乎零运行时开销。
*   📦 **Vant 4 UI**: 针对移动端优化的 UI 组件库，支持按需加载。
*   🛠 **Auto Import**: 自动导入 Vue Composition API、Vue-Router、Pinia 及常用组件。
*   🧹 **ESLint 10**: 使用 Anthony Fu 的偏好配置 v7+，完美平衡严格性与开发体验。
*   📱 **Viewport Adaptation**: 自动将 px 转换为 vw，适配各种移动端屏幕。

## 技术栈 (Tech Stack)

*   **框架**: [Vue 3.5+](https://vuejs.org/) (Composition API / `<script setup>`)
*   **构建**: [Vite 8](https://vite.dev/) + [Rolldown](https://rolldown.rs/)
*   **类型**: [TypeScript 6](https://www.typescriptlang.org/)
*   **样式**: [UnoCSS](https://unocss.dev/), [Sass](https://sass-lang.com/), [PostCSS](https://postcss.org/)
*   **路由**: [Vue Router 4](https://router.vuejs.org/)
*   **状态**: [Pinia 3](https://pinia.vuejs.org/)
*   **组件**: [Vant 4](https://vant-ui.github.io/vant/)
*   **工具**: [VueUse](https://vueuse.org/), [Axios](https://axios-http.com/), [Dayjs](https://day.js.org/)

## 快速开始 (Usage)

### 环境要求 (Prerequisites)
*   [Node.js](https://nodejs.org/) v22+
*   [pnpm](https://pnpm.io/) v10+

### 安装与启动 (Install & Dev)

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev
```

### 指令集 (Scripts)

| 指令 | 描述 |
| :--- | :--- |
| `pnpm dev` | 启动开发服务器 (Mode: development) |
| `pnpm prod` | 启动开发服务器 (Mode: production) |
| `pnpm build` | 执行全量构建 (Type check + Build) |
| `pnpm lint` | 静态检查代码 |
| `pnpm lint:fix` | 自动修复 Lint 问题 |
| `pnpm preview` | 构建结果本地预览 |

## 📁 项目结构 (Project Structure)

```text
.
├── src/
│   ├── api/          # 接口请求
│   ├── assets/       # 静态资源
│   ├── components/   # 全局公共组件
│   ├── hooks/        # 组合式函数 (Composables)
│   ├── pages/        # 页面视图
│   ├── router/       # 路由配置
│   ├── store/        # 状态管理 (Pinia)
│   ├── styles/       # 全局样式
│   ├── utils/        # 工具函数
│   ├── App.vue       # 根组件
│   └── main.ts       # 入口文件
├── .env.*            # 环境变量
├── index.html        # HTML 模板
├── vite.config.ts    # Vite 配置
├── tsconfig.json     # TypeScript 配置
└── unocss.config.ts  # UnoCSS 配置
```

## 开源协议
[MIT License](LICENSE) © 2026
