const base_url = "http://" + process.env.DOMAIN + ":8080";
const headers = { "Content-Type": "application/json" };
const { Pool } = require("pg");
const pool = new Pool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT
});

export default async function retrieve(req, res){
    if(req.method === "GET"){
        try {
            const records = await fetchRecords();
            res.status(200).json(records);
        } catch(error) {
            console.log(error);
            res.status(500).json({ message: "Internal Server Error" })
        }
    } else {
        // GETメソッド以外のリクエストに対して`405`を返す
        res.setHeader("Allow", ["GET"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

async function fetchRecords(){
    const query = 'SELECT * FROM work_entries';
    
    try {
        const { rows } = await pool.query(query);
        return rows;
    } catch(error) {
        console.error(error);
        throw error;
    }
}