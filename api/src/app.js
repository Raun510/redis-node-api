import express from "express";
import { createClient } from "redis";



const app = express();
const PORT = process.env.PORT || 5000;
const REDIS_URL = process.env.REDIS_URL;



const client = createClient({ url: REDIS_URL });
client.connect().catch(err => console.error(err));



app.get("/api", async (req, res) => {
const cached = await client.get("message");
if (cached) {
return res.json({ source: "redis-cache", message: cached });
}



const msg = "API responding with Redis caching";
await client.setEx("message", 60, msg);
return res.json({ source: "fresh", message: msg });
});



app.listen(PORT, () => console.log(`API running on port ${PORT}`));
