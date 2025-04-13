import { redirect } from "next/navigation"
import ChatbotWidget from "@/components/chatbotWidget"
import VapiVoiceAssistant from "@/components/mockInterview"
export default function Home() {
  redirect("/login")
  return (
    <>
      <ChatbotWidget />
     
      {/* <VapiVoiceAssistant assistantId="c46d211a-3505-4266-9df9-814b4fe9e1fa" apiKey="5a3ecadf-9f65-4cf6-86c7-6bbbdbdef45a" /> */}
    </>
  )
}
