"use client";

import { useState } from "react";

interface ButtonConfig {
  [key: string]: any;
}

interface VapiVoiceAssistantProps {
  buttonConfig?: ButtonConfig;
  buttonText?: string;
  buttonClassName?: string;
}

const VapiVoiceAssistant: React.FC<VapiVoiceAssistantProps> = ({
  buttonConfig = {},
  buttonText = "Talk to Assistant",
  buttonClassName = "bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-full flex items-center shadow-lg",
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // ✅ Hardcoded API Key and Assistant ID
  const apiKey = "YOUR_API_KEY_HERE";
  const assistantId = "YOUR_ASSISTANT_ID_HERE";

  const loadVapiSDK = () => {
    if (isLoaded || isLoading) return;

    setIsLoading(true);

    if (document.getElementById("vapi-sdk-script")) {
      initializeVapi();
      return;
    }

    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/gh/VapiAI/html-script-tag@latest/dist/assets/index.js";
    script.defer = true;
    script.async = true;
    script.id = "vapi-sdk-script";

    script.onload = () => {
      initializeVapi();
    };

    script.onerror = () => {
      setIsLoading(false);
      console.error("Failed to load Vapi SDK");
    };

    document.body.appendChild(script);
  };

  const initializeVapi = () => {
    if ((window as any).vapiSDK) {
      (window as any).vapiSDK.run({
        apiKey,
        assistant: assistantId,
        config: buttonConfig,
      });
      setIsLoaded(true);
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isLoaded && (
        <button
          onClick={loadVapiSDK}
          disabled={isLoading}
          className={buttonClassName}
        >
          {isLoading ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Loading...
            </>
          ) : (
            <>
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                ></path>
              </svg>
              {buttonText}
            </>
          )}
        </button>
      )}
    </div>
  );
};

export default VapiVoiceAssistant;
