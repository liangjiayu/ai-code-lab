import { WelcomeArea } from "@/components/chat/welcome-area";

export function meta() {
  return [
    { title: "AI Code Lab" },
    { name: "description", content: "AI Code Lab Frontend" },
  ];
}

export default function Home() {
  return <WelcomeArea />;
}
