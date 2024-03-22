// fetch APIを使用する
import fetch from 'node-fetch';

const base_url = 'http://'+process.env.DOMAIN+':8080';
const headers = { 'Content-Type': 'application/json' };

const loginData = {
    office_id: 1,
    user_id: 1,
    password: 'pass'
};

async function login(loginData) {
    try {
        // ログインリクエストを送信
        const loginResponse = await fetch(base_url + '/login', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(loginData)
        });
        const loginResult = await loginResponse.json();
        console.log(loginResult); // レスポンスのJSONを表示
        
        // Cookieからトークンを取得
        const token = loginResponse.headers.get('set-cookie').split(';')[0].split('=')[1];
        console.log(token);
        
        return token;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

export { login };
