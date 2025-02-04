import type { Route } from "./+types/home";
import { TestPage } from "../testpage/testpage";


export function meta({}: Route.MetaArgs) {
  return [
    { title: "AI Review App" },
    { name: "description", content: "Review your code/text/posts!" },
  ];
}

export default function Test() {
  return <TestPage />;
}