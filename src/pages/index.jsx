import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/router";

export default function EmployeeEntry() {
    const [officeId, setOfficeId] = useState("");
    const [userId, setUserId] = useState("");
    const [pass, setPass] = useState("");
    const router = useRouter(); // ページ遷移用

    const handleSubmit = async () => {
        const loginData = {
        office_id: parseInt(officeId, 10),
        user_id: parseInt(userId, 10),
        password: pass,
        };

        try {
            const response = await fetch("/api/login", {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(loginData),
            });
            console.log(loginData);
            if (response.ok) {
                const { data, token } = await response.json();
                console.log(data);
                console.log(token);

                // dataオブジェクトをjson文字列にエンコード
                const dataString = encodeURIComponent(JSON.stringify(data));
                console.log(dataString);

                router.push(`/attendChoice?dataSended=${dataString}`);
            } else {
                alert('ログインに失敗しました。');
                console.error("Login Failed:", response.status);
            }
        } catch (error) {
        console.log("Error fetching data", error);
        }
    };

return (
    <div className="">
    <Input
        type="text"
        value={officeId}
        onChange={(e) => setOfficeId(e.target.value)}
        placeholder="事業所番号"
    />
    <Input
        type="text"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        placeholder="ユーザ番号"
    />
    <Input
        type="password"
        value={pass}
        onChange={(e) => setPass(e.target.value)}
        placeholder="パスワード"
    />
    <Button onClick={handleSubmit}>ログイン</Button>
    </div>
);
}
