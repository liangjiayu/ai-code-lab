import type { Conversation, ConversationGroup } from "~/types/chat";

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
