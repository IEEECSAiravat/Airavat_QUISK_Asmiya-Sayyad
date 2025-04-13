import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

const VRRoomRedirector = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("student");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const formRef = useRef<HTMLDivElement>(null);

  interface VRRoomResponse {
    frameUrl: string;
  }

  const handleJoin = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.get<VRRoomResponse>("http://localhost:4000/api/metaverse/vr-room", {
        params: { user: username, role },
      });

      const { frameUrl } = response.data;

      if (frameUrl) {
        // Redirect user to FrameVR link
        window.location.href = frameUrl;
      } else {
        setError("Couldn't retrieve FrameVR link.");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to connect to server.");
    } finally {
      setLoading(false);
    }
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
    if (!isExpanded) {
      setError("");
    }
  };

  // Close form when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isExpanded && formRef.current && !formRef.current.contains(event.target as Node)) {
        setIsExpanded(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isExpanded]);

  return (
    <div className="inline-block relative">
      <button
        onClick={toggleExpand}
        className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 transition flex items-center space-x-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
        <span>Join VR</span>
      </button>

      {isExpanded && (
        <div 
          ref={formRef}
          className="absolute mt-2 right-0 w-80 bg-white rounded-lg shadow-lg p-4 border z-10"
        >
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-bold">Join VR Space</h2>
            <button 
              onClick={toggleExpand}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <form onSubmit={handleJoin} className="space-y-3">
            <div>
              <label className="block text-sm font-medium mb-1">Your Name</label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your name"
                className="w-full border rounded p-2 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full border rounded p-2 text-sm"
              >
                <option value="student">Student</option>
                <option value="mentor">Mentor</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-700 transition"
            >
              {loading ? "Joining..." : "Join VR Space"}
            </button>
          </form>

          {error && <p className="text-red-600 text-sm text-center mt-2">{error}</p>}
        </div>
      )}
    </div>
  );
};

export default VRRoomRedirector;