import type { Route } from "./+types/home";
import { ReviewApp } from "../reviewapp/reviewapp";


export function meta({}: Route.MetaArgs) {
  return [
    { title: "AI Review App" },
    { name: "description", content: "Review your code/text/posts!" },
  ];
}

export default function App() {
  return <ReviewApp />;
}