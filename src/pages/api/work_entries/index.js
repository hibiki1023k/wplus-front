import { NextApiRequest, NextApiResponse } from 'next';
// import { connectToDatabase } from '@/lib/database'; // 仮のデータベース接続関数

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const db = await connectToDatabase(); // データベースに接続
            const workEntries = await db.collection('work_entries').find({}).toArray(); // データを取得

            res.status(200).json(workEntries);
        } catch (error) {
            console.error('Error fetching work entries:', error);
            res.status(500).json({ message: 'Error fetching work entries' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
