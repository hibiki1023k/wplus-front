import cookie from "cookie";
import fetch from "node-fetch";

const base_url = process.env.BASE_URL;

export default async function getWorkEntriesByWorkplace(req, res) {
  try {
    const cookies = req.headers.cookie ? cookie.parse(req.headers.cookie) : {};
    const token = cookies.token;

    const workplace_id = req.query.workplace_id;

    if (!token) {
      res.status(401).json({ error: "Unauthorized: No token provided" });
      return;
    }

    if (!workplace_id) {
      res.status(400).json({ error: "Missing workplace_id" });
      return;
    }

    console.log(workplace_id);

    const response = await fetch(
      `${base_url}/work_entries/workplace/${workplace_id}/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const result = await response.json();
    console.log(result);

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}