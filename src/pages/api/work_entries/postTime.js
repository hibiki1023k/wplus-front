import fetch from "node-fetch";
import cookie from 'cookie';

const base_url = process.env.BASE_URL;

export default async function PunchOut(req, res) {
    try {
        const work_entries = req.body;
        
        // Cookieからトークンを取得
        const cookies = req.headers.cookie ? cookie.parse(req.headers.cookie) : {};
        const token = cookies.token;
        
        if (!token) {
            res.status(401).json({ error: 'Unauthorized: No token provided' });
            return;
        }
        console.log(work_entries);
        
        // 勤怠登録リクエストを送信
        const punchOutResponse = await fetch(`${base_url}/work_entries/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(work_entries),
        });
        
        const punchOutResult = await punchOutResponse.json();
        console.log(punchOutResult); // レスポンスのJSONを表示
        
        res.status(200).json({ data: punchOutResult });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}
