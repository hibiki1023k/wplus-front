import fetch from "node-fetch";
import cookie from "cookie";

const base_url = process.env.BASE_URL;

export default async function handler(req, res) {
    if(req.method !== "GET"){
        res.setHeader("Allow", ["GET"]);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    try{
        const cookies = req.headers.cookie ? cookie.parse(req.headers.cookie) : {};
        const token = cookies.token;

        const response = await fetch(base_url + "/employees/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        const employees = await response.json();
        console.log(employees);

        res.status(200).json(employees.filter(emp => emp !== null));
    } catch(error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}