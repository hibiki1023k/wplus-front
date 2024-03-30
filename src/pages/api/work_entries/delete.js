// pages/api/work_entries/delete.js
import fetch from 'node-fetch';

const base_url = "http://" + process.env.DOMAIN + ":8080";
const headers = { "Content-Type": "application/json" };
export default async function deleteRecord(req, res){
    try{
        const { delete_id } = req.body;
        console.log(delete_id);
        const deleteResponse = await fetch(base_url+"/delete", {
            method: "POST",
            headers: headers,
            body: JSON.stringify({id: delete_id})
        });
        
        if(!deleteResponse.ok){
            throw new Error("Delete Failed:", deleteResponse.status);
        }
        
        const deleteResult = await deleteResponse.json();
        console.log(deleteResult);
        res.status(200).json("Delete Executed");
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
