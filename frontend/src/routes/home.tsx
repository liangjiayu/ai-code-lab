import { WelcomeArea } from "@/components/layout/WelcomeArea";

export function meta() {
  return [
    { title: "AI Code Lab" },
    { name: "description", content: "AI Code Lab Frontend" },
  ];
}

export default function Home() {
  return <WelcomeArea />;
}
