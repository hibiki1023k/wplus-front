// fetch APIを使用する
import fetch from "node-fetch";

const base_url = "http://" + process.env.DOMAIN + ":8080";
const headers = { "Content-Type": "application/json" };

const loginData = {
    office_id: 1,
    user_id: 1,
    password: "pass",
};

export default async function login(req, res) {
    try {
        const loginData = req.body;
        console.log(loginData);
        // ログインリクエストを送信
        const loginResponse = await fetch(base_url + "/login", {
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
        console.log(token);

        res.status(200).json({ data: loginResult, token: token });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

login(loginData);

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
