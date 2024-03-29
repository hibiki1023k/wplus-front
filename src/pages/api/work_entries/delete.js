// pages/api/work_entries/delete.js

import { connectToDatabase } from "@/lib/db"; // データベース接続関数を適切にインポート

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    // リクエストからエントリIDを取得
    const { entryId } = req.body;

    if (!entryId) {
        return res.status(400).json({ message: 'Entry ID is required' });
    }

    try {
        const db = await connectToDatabase();
        const collection = db.collection('work_entries');

        // isVisibleフィールドをfalseに更新
        const result = await collection.updateOne(
            { id: entryId },
            { $set: { isVisible: false } }
        );

        if (result.modifiedCount === 0) {
            return res.status(404).json({ message: 'Entry not found' });
        }

        return res.status(200).json({ message: 'Entry updated successfully' });
    } catch (error) {
        console.error('Error updating entry:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}
