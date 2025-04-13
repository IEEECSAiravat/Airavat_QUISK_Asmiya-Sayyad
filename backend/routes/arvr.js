import express from "express";
const router = express.Router();

const roomMap = {
    student: "http://framevr.io/contentwriting",
    mentor: "http://framevr.io/frontenddevelopers",
    guest: "https://framevr.io/general-space"
  };

router.get("/vr-room", (req, res) => {   
    const username = req.query.user || "Guest";
    const role = (req.query.role || "guest").toLowerCase();
  
    const baseRoom = roomMap[role] || roomMap["guest"];
  
    const frameUrl = `${baseRoom}?name=${encodeURIComponent(username)}`;
  
    // Log (optional)
    console.log(`[VR Access] ${username} (${role}) → ${frameUrl}`);
  
    res.json({ frameUrl });
});

export default router;