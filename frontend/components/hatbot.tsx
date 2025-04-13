import { useEffect } from "react";

const Hatbot = () => {
  useEffect(() => {
    // Check if script already exists
    const existingScript = document.querySelector('script[src="https://elevenlabs.io/convai-widget/index.js"]');
    
    if (!existingScript) {
      // Only add script if it doesn't exist
      const script = document.createElement("script");
      script.src = "https://elevenlabs.io/convai-widget/index.js";
      script.async = true;
      script.type = "text/javascript";
      script.id = "elevenlabs-convai-script";
      document.body.appendChild(script);
    }
    
    // Create widget container
    const widgetDiv = document.createElement("div");
    widgetDiv.id = "elevenlabs-convai-container";
    widgetDiv.innerHTML = `
      <elevenlabs-convai agent-id="5Gf64KtviNNBYzBe7ghd"></elevenlabs-convai>
    `;
    document.body.appendChild(widgetDiv);
    
    // Add custom styles
    const style = document.createElement("style");
    style.id = "elevenlabs-convai-styles";
    style.innerHTML = `
      ._canvas_me40k_114, ._poweredBy_me40k_322, ._avatar_me40k_76, 
      ._compact_me40k_70 ._poweredBy_me40k_322,
      ._full_me40k_347 ._poweredBy_me40k_322,
      ._wrapper_me40k_16 ._compact_me40k_70 ._open_me40k_55 ._hasLanguageSelect_me40k_127 {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
        height: 0 !important;
        width: 0 !important;
        overflow: hidden !important;
      }
      ._wrapper_me40k_16 {
        gap: 2px;
      }
    `;
    document.head.appendChild(style);
    
    // Clean up function to properly remove added elements
    return () => {
      // Remove script only if we added it
      const scriptToRemove = document.getElementById("elevenlabs-convai-script");
      if (scriptToRemove) {
        document.body.removeChild(scriptToRemove);
      }
      
      // Remove widget container
      const widgetToRemove = document.getElementById("elevenlabs-convai-container");
      if (widgetToRemove) {
        document.body.removeChild(widgetToRemove);
      }
      
      // Remove styles
      const stylesToRemove = document.getElementById("elevenlabs-convai-styles");
      if (stylesToRemove) {
        document.head.removeChild(stylesToRemove);
      }
    };
  }, []);

  return null;
};

export default Hatbot;