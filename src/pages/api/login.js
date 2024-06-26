// fetch APIを使用する
import fetch from "node-fetch";
import cookie from "cookie";

const base_url = process.env.BASE_URL;
const headers = { "Content-Type": "application/json" };

export default async function login(req, res) {
    try {
        const loginData = req.body;
        console.log(loginData);
        // ログインリクエストを送信
        const loginResponse = await fetch(base_url + "/login/", {
            method: "POST",
            headers: headers,
            body: JSON.stringify(loginData),
        });
        const loginResult = await loginResponse.json();
        console.log(loginResult); // レスポンスのJSONを表示
        // Cookieからトークンを取得
        const token = loginResponse.headers
            .get("set-cookie")
            .split(";")[0]
            .split("=")[1];

        res.setHeader("Set-cookie", cookie.serialize("token", token, { path: "/", httpOnly: true, maxAge: 60 * 60 }));

        res.status(200).json({ success: true });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

// console.log(login(loginData));
// expected output:
// $ node api/login.js
// Promise { <pending> }
// {
//   employee_id: 1,
//   name: 'test_user',
//   office_id: 1,
//   role: 'employee',
//   user_id: 1
// }
// [token]
