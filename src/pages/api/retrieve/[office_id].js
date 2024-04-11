import fetch from "node-fetch";
import cookie from "cookie";

const base_url = process.env.BASE_URL;

export default async function retrieve(req, res) {
  try {
    const cookies = req.headers.cookie ? cookie.parse(req.headers.cookie) : {};
    const token = cookies.token;

    const office_id = req.query.office_id;

    if (!token) {
      res.status(401).json({ error: "Unauthorized: No token provided" });
      return;
    }
    if (!office_id) {
      res.status(400), json({ error: "office_id is not undefined" });
    }

    const response = await fetch(
      `${base_url}/work_entries/office/${office_id}/`,
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

    res.status(200).json({ record: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
