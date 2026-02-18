import { WelcomeArea } from "@/components/chat/WelcomeArea";

export function meta() {
  return [
    { title: "AI Code Lab" },
    { name: "description", content: "AI Code Lab Frontend" },
  ];
}

export default function Home() {
  return <WelcomeArea />;
}
