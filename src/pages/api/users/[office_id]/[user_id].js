// Next.js APIルートの構文を使用
export default async function handler(req, res) {
    const { office_id, user_id } = req.query;

    // データベースからユーザー名を取得するロジックを実装
    const userName = '取得したユーザー名';  // 仮の値

    res.status(200).json({ name: userName });
}
