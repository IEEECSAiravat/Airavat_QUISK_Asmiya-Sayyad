import { redirect } from "next/navigation"
import ChatbotWidget from "@/components/chatbotWidget"
export default function Home() {
  redirect("/login")
  return (
    <>
      <ChatbotWidget />
    </>
  )
}
