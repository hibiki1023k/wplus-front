import fetch from "node-fetch";

const base_url = process.env.BASE_URL;
const headers = { "Content-Type": "application/json" };

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const { employee_id } = req.body;
    console.log(employee_id);
    const response = await fetch(base_url + `/employees/${employee_id}/`, {
      method: "GET",
      headers: headers,
    });
    if (response.ok) {
      const result = await response.json();
      console.log(result);
      res.status(200).json({ employees: result });
    } else {
      console.error("Error fetching data", response.status);
      res.status(response.status).json({ error: "Error fetching data" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
