export default async function Request(path, method, bodyInfo = null) {
    const headers = { "Content-Type": "application/json" };
    const body = bodyInfo ? JSON.stringify(bodyInfo) : undefined;

	// プライベートエンドポイントにリクエストを送る前に、トークンを取得する
    if (path !== "login" && path !== "getCookie") {
        try {
            const token = await getToken();
            if (token) {
                headers["Authorization"] = `Bearer ${token}`;
            }
        } catch (error) {
            console.error("Error fetching token:", error);
            // トークン取得エラーはここで処理するか、またはエラーを再スローして呼び出し側で処理します。
            throw error;  // エラーを再スローする場合
        }
    }

    const response = await fetch(`/api/${path}`, {
        method: method,
        headers: headers,
        body: (method === "POST" || method === "PUT") ? body : undefined
    });

    return response;
}

async function getToken() {
	fetch("/api/getCookie", {
		method: "GET",
		headers: {
		"Content-Type": "application/json",
		},
	})
	.then(response => {
		if(!response.ok){
			throw new Error("Network response was not ok");
		}
		return response.json();
	})
	.catch(error => {
		console.error("There was a problem with your fetch operation:", error);
	})
}
