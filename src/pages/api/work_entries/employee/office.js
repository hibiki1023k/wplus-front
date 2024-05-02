import cookie from "cookie";
import fetch from "node-fetch";

const base_url = process.env.BASE_URL;

export default async function getWorkEntries(req, res) {
  try {
    const cookies = req.headers.cookie ? cookie.parse(req.headers.cookie) : {};
    const token = cookies.token;

    const employee_id = req.query.employee_id;

    if (!token) {
      res.status(401).json({ error: "Unauthorized: No token provided" });
      return;
    }

    if (!employee_id) {
      res.status(400).json({ error: "Bad Request: No employee_id provided" });
      return;
    }

    const response = await fetch(
      `${base_url}/work_entries/employee/${employee_id}/`,
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