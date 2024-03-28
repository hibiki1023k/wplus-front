import fetch from "node-fetch";

const base_url = "http://" + process.env.DOMAIN + ":8080";
const headers = { "Content-Type": "application/json" };

const data = {
    user_id: 1,
    employee_id: 1,
    workplace_id: 1,
    date: new Date(),
    start_time: "09:00",
    end_time: "18:00",
    comment: "test"
};

export default async function PunchOut(req, res){
    try {
        const work_entries = req.body;
        // 勤怠登録リクエストを送信
        const punchOutResponse = await fetch(base_url + "/work_entries", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(work_entries),
        });
        const punchOutResult = await punchOutResponse.json();
        console.log(punchOutResult); // レスポンスのJSONを表示

        res.status(200).json({data: punchOutResult});
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}
