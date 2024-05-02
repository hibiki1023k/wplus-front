import fetch from "node-fetch";
import cookie from "cookie";

const base_url = process.env.BASE_URL;

function parseJwt (token) {
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
}

export default async function handler(req, res) {
    if(req.method !== "GET"){
        res.setHeader("Allow", ["GET"]);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    try{
        const cookies = req.headers.cookie ? cookie.parse(req.headers.cookie) : {};
        const token = cookies.token;

        const user = parseJwt(token);
        const workplace_id = user.workplace_id;

        const response = await fetch(base_url + `/employees/workplace/${workplace_id}/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        const employees = await response.json();
        console.log(employees);

        res.status(200).json(employees);
    } catch(error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}