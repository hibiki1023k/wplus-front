// pages/api/work_entries/delete.js

import cookie from "cookie";
import fetch from "node-fetch";
import cookieParser from "cookie-parser";


const base_url = process.env.BASE_URL;

export default async function deleteRecord(req, res) {
    try {
        const runMiddleware = (req, res, fn) => {
            return new Promise((resolve, reject) => {
            fn(req, res, (result) => {
                if (result instanceof Error) {
                return reject(result);
                }
                return resolve(result);
            });
            });
        };
        await runMiddleware(req, res, cookieParser());
        const token = req.cookies.token;

        if (!token) {
            res.status(401).json({ error: "Unauthorized: No token provided" });
            return;
        }

        const { id } = req.query;
        const deleteResponse = await fetch(base_url + `/work_entries/${id}/`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        if (deleteResponse.status === 204) {
            console.log("Delete Executed");
            res.status(204).end();
            return;
        }

        if (!deleteResponse.ok) {
            const errorText = await deleteResponse.text();
            throw new Error(`Delete Failed: ${deleteResponse.status}, ${errorText}`);
        }

        const resultText = await deleteResponse.text();
        console.log('unexpected response:', resultText);
        res.status(deleteResponse.status).json({ message: resultText });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error", message: error.message });
    }
}