# 简历优化工具

一个强大的简历优化工具，提供专业简历模板和AI优化功能。

## 功能特点

- 多种专业简历模板
- AI驱动的简历内容优化
- 用户友好的编辑界面
- 支持导出PDF格式

## 技术栈

- Next.js
- React
- TypeScript
- Tailwind CSS
- OpenAI API

## 快速开始

### 前提条件

- Node.js 18+
- OpenAI API密钥（用于AI优化功能）

### 安装

1. 克隆仓库

```bash
git clone https://github.com/yourusername/resume-tool.git
cd resume-tool
```

2. 安装依赖

```bash
npm install
```

3. 配置环境变量

复制`.env.local.example`文件为`.env.local`并填入你的OpenAI API密钥：

```bash
cp .env.local.example .env.local
```

然后编辑`.env.local`文件，将`your_openai_api_key_here`替换为您的实际API密钥。

4. 启动开发服务器

```bash
npm run dev
```

5. 打开浏览器访问 http://localhost:3000

## 使用指南

1. 在首页选择"浏览模板"或"AI优化"
2. 如选择模板，浏览可用的简历模板并选择一个
3. 在编辑器中填写您的个人信息、教育经历、工作经验和技能
4. 预览和导出您的简历

## 许可证

MIT 

## OpenJobs AI

[openjobs-ai.com](https://www.openjobs-ai.com/)
