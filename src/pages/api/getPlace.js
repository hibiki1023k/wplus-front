// workplace/${office_id}でoffice_id内にあるすべてのworkplace_idを取得する
export default async function getPlace(req, res) {
    if (req.method !== "GET") {
        res.setHeader("Allow", ["GET"]);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
    try {
        const { office_id } = req.query;
        const response = await fetch(`${base_url}/workplace/${office_id}`, {
            method: "GET",
            headers: {
                "Content-Type"
            },
        });
        if (response.ok) {
            const result = await response.json();
            console.log(result);
            res.status(200).json({ workplaces: result });
        } else {
            console.error("Error fetching data", response.status);
            res.status(response.status).json({ error: "Error fetching data" });
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}
