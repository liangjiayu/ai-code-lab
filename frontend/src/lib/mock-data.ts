import type { Conversation, ConversationGroup, Message } from "@/types/chat";

function daysAgo(days: number): Date {
  const date = new Date();
  date.setDate(date.getDate() - days);
  date.setHours(10, 0, 0, 0);
  return date;
}

export const mockConversations: Conversation[] = [
  {
    id: "1",
    title: "如何使用 React Router v7 搭建 SPA",
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: "2",
    title: "帮我写一个 Node.js 文件上传接口",
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: "3",
    title: "Tailwind CSS v4 有哪些新特性",
    createdAt: daysAgo(1),
    updatedAt: daysAgo(1),
  },
  {
    id: "4",
    title: "解释 Zustand 和 Redux 的区别",
    createdAt: daysAgo(1),
    updatedAt: daysAgo(1),
  },
  {
    id: "5",
    title: "TypeScript 泛型使用技巧",
    createdAt: daysAgo(3),
    updatedAt: daysAgo(3),
  },
  {
    id: "6",
    title: "Docker Compose 多服务编排实践",
    createdAt: daysAgo(4),
    updatedAt: daysAgo(4),
  },
  {
    id: "7",
    title: "PostgreSQL 查询优化建议",
    createdAt: daysAgo(5),
    updatedAt: daysAgo(5),
  },
  {
    id: "8",
    title: "Git rebase 和 merge 的使用场景",
    createdAt: daysAgo(10),
    updatedAt: daysAgo(10),
  },
  {
    id: "9",
    title: "使用 Vite 构建 monorepo 项目",
    createdAt: daysAgo(15),
    updatedAt: daysAgo(15),
  },
  {
    id: "10",
    title: "React Server Components 工作原理",
    createdAt: daysAgo(20),
    updatedAt: daysAgo(20),
  },
];

export const mockMessages: Message[] = [
  {
    id: "m1",
    conversationId: "1",
    role: "user",
    content: "如何使用 React Router v7 搭建一个 SPA 应用？",
    createdAt: daysAgo(0),
  },
  {
    id: "m2",
    conversationId: "1",
    role: "assistant",
    content:
      "使用 React Router v7 搭建 SPA 非常简单。首先安装依赖：\n\n```bash\nnpm install react-router\n```\n\n然后在 `routes.ts` 中配置路由：\n\n```ts\nimport { type RouteConfig, index, route } from '@react-router/dev/routes';\n\nexport default [\n  index('routes/home.tsx'),\n  route('about', 'routes/about.tsx'),\n] satisfies RouteConfig;\n```\n\n React Router v7 支持文件路由和配置路由两种方式，推荐使用配置路由以获得更好的灵活性。",
    createdAt: daysAgo(0),
  },
  {
    id: "m3",
    conversationId: "2",
    role: "user",
    content: "帮我写一个 Node.js 文件上传接口，使用 Express 和 multer。",
    createdAt: daysAgo(0),
  },
  {
    id: "m4",
    conversationId: "2",
    role: "assistant",
    content:
      "好的，以下是一个使用 Express + Multer 的文件上传接口：\n\n```js\nconst express = require('express');\nconst multer = require('multer');\n\nconst upload = multer({ dest: 'uploads/' });\nconst app = express();\n\napp.post('/upload', upload.single('file'), (req, res) => {\n  res.json({ message: '上传成功', file: req.file });\n});\n\napp.listen(3000);\n```\n\n这个接口接受单个文件上传，文件会保存在 `uploads/` 目录中。你也可以配置 `storage` 来自定义文件名和存储路径。",
    createdAt: daysAgo(0),
  },
  {
    id: "m5",
    conversationId: "3",
    role: "user",
    content: "Tailwind CSS v4 有哪些新特性？",
    createdAt: daysAgo(1),
  },
  {
    id: "m6",
    conversationId: "3",
    role: "assistant",
    content:
      "Tailwind CSS v4 带来了很多重大改进：\n\n1. **全新引擎** — 使用 Rust 编写的 Oxide 引擎，构建速度提升 10 倍\n2. **CSS-first 配置** — 不再需要 `tailwind.config.js`，直接在 CSS 中使用 `@theme` 配置\n3. **自动内容检测** — 不再需要配置 `content` 路径\n4. **原生 CSS 嵌套** — 支持 CSS 嵌套语法\n5. **容器查询支持** — 内置 `@container` 支持\n\n整体来说，v4 更加简洁、快速，开发体验有了质的提升。",
    createdAt: daysAgo(1),
  },
];

export function getMessagesByConversationId(conversationId: string): Message[] {
  return mockMessages.filter((m) => m.conversationId === conversationId);
}

function isToday(date: Date): boolean {
  const now = new Date();
  return date.toDateString() === now.toDateString();
}

function isYesterday(date: Date): boolean {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return date.toDateString() === yesterday.toDateString();
}

function isWithinDays(date: Date, days: number): boolean {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  return diff < days * 24 * 60 * 60 * 1000;
}

export function groupConversationsByDate(
  conversations: Conversation[],
): ConversationGroup[] {
  const groups: Record<string, Conversation[]> = {};
  const order = ["今天", "昨天", "过去 7 天", "过去 30 天", "更早"];

  for (const conv of conversations) {
    let label: string;
    if (isToday(conv.updatedAt)) {
      label = "今天";
    } else if (isYesterday(conv.updatedAt)) {
      label = "昨天";
    } else if (isWithinDays(conv.updatedAt, 7)) {
      label = "过去 7 天";
    } else if (isWithinDays(conv.updatedAt, 30)) {
      label = "过去 30 天";
    } else {
      label = "更早";
    }

    if (!groups[label]) {
      groups[label] = [];
    }
    groups[label].push(conv);
  }

  return order
    .filter((label) => groups[label])
    .map((label) => ({
      label,
      conversations: groups[label],
    }));
}
