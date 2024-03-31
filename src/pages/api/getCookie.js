import cookieParser from 'cookie-parser';

// Next.js API ルートでは、エクスポートされた関数がミドルウェアをサポートしていません
// そのため、ミドルウェアを実行するためのヘルパー関数を使用します
export default async function getCookie(req, res) {
    // ヘルパー関数を定義
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
    
    // cookie-parser ミドルウェアを実行
    await runMiddleware(req, res, cookieParser());
    
    try {
        const token = req.cookies.token;
        console.log(token);
        
        res.status(200).json({ value: token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
