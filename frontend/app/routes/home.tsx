import type { Route } from "./+types/home";
import { ChatLayout } from "~/components/layout/ChatLayout";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "AI Code Lab" },
    { name: "description", content: "AI Code Lab Frontend" },
  ];
}

export default function Home() {
  return <ChatLayout />;
}
