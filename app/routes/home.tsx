import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "AI Review App" },
    { name: "description", content: "Review your code/text/posts!" },
  ];
}

export default function Home() {
  return <Welcome />;
}