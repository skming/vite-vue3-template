# Vite 8 + Vue 3 + TypeScript 6 Template

<p align="center">
  <img src="https://img.shields.io/badge/Vite-8.3.5-646CFF?logo=vite&logoColor=white" alt="Vite">
  <img src="https://img.shields.io/badge/Vue-3.5.44-4FC08D?logo=vuedotjs&logoColor=white" alt="Vue">
  <img src="https://img.shields.io/badge/TypeScript-6.0.3-3178C6?logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/UnoCSS-66.11.0-grey?logo=unocss&logoColor=white" alt="UnoCSS">
  <img src="https://img.shields.io/badge/ESLint-10.13.0-4B32C3?logo=eslint&logoColor=white" alt="ESLint">
  <img src="https://img.shields.io/badge/pnpm-12.15.0-F69220?logo=pnpm&logoColor=white" alt="pnpm">
</p>

## 特性 (Features)

*   🚀 **Vite 8 (Rolldown Engine)**: 使用 Rolldown 构建，并在 production 模式下使用 Oxc 压缩。
*   🔷 **TypeScript 6**: 使用 `vue-tsc` 检查 Vue 与 TypeScript 类型，构建前执行类型检查。
*   🎨 **UnoCSS**: 极致的原子化 CSS 引擎，即时编译，几乎零运行时开销。
*   📦 **Vant 4 UI**: 针对移动端优化的 UI 组件库，支持按需加载。
*   🛠 **Auto Import**: 自动导入 Vue Composition API、Vue Router、Pinia、VueUse API，并按需导入 Vant 组件。
*   🧹 **ESLint 10**: 使用 `@antfu/eslint-config` v9，启用 UnoCSS 规则，并通过提交钩子检查暂存的 JS、TS 和 Vue 文件。
*   📱 **Viewport Adaptation**: 自动将 px 转换为 vw，适配各种移动端屏幕。

## 技术栈 (Tech Stack)

*   **框架**: [Vue 3.5+](https://vuejs.org/) (Composition API / `<script setup>`)
*   **构建**: [Vite 8](https://vite.dev/) + [Rolldown](https://rolldown.rs/)
*   **类型**: [TypeScript 6](https://www.typescriptlang.org/)
*   **样式**: [UnoCSS](https://unocss.dev/), [Sass](https://sass-lang.com/), [PostCSS](https://postcss.org/)
*   **路由**: [Vue Router 5](https://router.vuejs.org/)
*   **状态**: [Pinia 4](https://pinia.vuejs.org/)
*   **组件**: [Vant 4](https://vant-ui.github.io/vant/)
*   **工具**: [VueUse](https://vueuse.org/), [Axios](https://axios-http.com/), [Dayjs](https://day.js.org/)

## 快速开始 (Usage)

### 推荐环境 (Recommended Environment)

*   [Node.js](https://nodejs.org/) v24.x
*   [pnpm](https://pnpm.io/) v12.x

pnpm 配置位于 `pnpm-workspace.yaml`。

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

### AI 技能维护 (Agent Skills)

项目技能保存在 `.agents/skills/`，由 Skills CLI 管理的技能来源和内容哈希记录在 `skills-lock.json` 中。
安装项目依赖不会自动下载或更新远程技能；需要时在项目根目录手动执行：

```bash
# 检查已安装技能是否有更新
pnpm dlx skills@latest check

# 仅更新当前项目中已安装并由 Skills CLI 跟踪的技能
pnpm dlx skills@latest update -p

# 检查更新产生的文件变更
git diff -- .agents/skills skills-lock.json
```

详见 [Skills CLI 文档](https://github.com/vercel-labs/skills/blob/main/docs/commands.md)。

## 📁 项目结构 (Project Structure)

```text
.
├── .agents/skills/   # AI 编程技能
├── src/
│   ├── api/          # 接口请求
│   ├── assets/       # 静态资源
│   ├── components/   # 全局公共组件
│   ├── config/       # 全局配置
│   ├── pages/        # 页面视图
│   ├── router/       # 路由配置
│   ├── store/        # 状态管理 (Pinia)
│   ├── styles/       # 全局样式
│   ├── typings/      # 全局类型声明 / 模块增强
│   ├── utils/        # 工具函数
│   ├── App.vue       # 根组件
│   └── main.ts       # 入口文件
├── .env.*            # 环境变量
├── index.html        # HTML 模板
├── package.json      # 项目依赖与脚本
├── pnpm-lock.yaml    # 依赖版本锁定
├── pnpm-workspace.yaml # pnpm 配置
├── skills-lock.json  # Skills CLI 技能来源与内容哈希
├── vite.config.ts    # Vite 配置
├── tsconfig.json     # TypeScript 配置
└── unocss.config.ts  # UnoCSS 配置
```

## 开源协议
[MIT License](LICENSE) © 2026
