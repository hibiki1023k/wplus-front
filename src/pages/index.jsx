import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/router";
import { useState } from "react";

export default function EmployeeEntry() {
    const [officeId, setOfficeId] = useState("");
    const [userId, setUserId] = useState("");
    const [pass, setPass] = useState("");
    const router = useRouter(); // ページ遷移用

    const handleSubmit = async () => {
        const loginData = {
            office_id: Number(officeId),
            user_id: Number(userId),
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
                const { data: data, token: token } = await response.json();
                console.log(data, token);

                // dataオブジェクトをjson文字列にエンコード
                const dataString = encodeURIComponent(JSON.stringify(data));
                console.log(dataString);

                router.push(`/attendChoice?dataSended=${dataString}`);
            } else {
                alert("ログインに失敗しました。");
                console.error("Login Failed:", response.status);
            }
        } catch (error) {
            console.log("Error fetching data", error);
        }
    };

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
            <div className="flex flex-col items-center justify-center w-4/5">
                <div className="m-1 p-1 w-2/3">
                    <Input
                        type="text"
                        value={officeId}
                        onChange={(e) => setOfficeId(e.target.value)}
                        placeholder="事業所番号"
                    />
                </div>
                <div className="m-1 p-1 w-2/3">
                    <Input
                        type="text"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        placeholder="ユーザ番号"
                    />
                </div>
                <div className="m-1 p-1 w-2/3">
                    <Input
                        type="password"
                        value={pass}
                        onChange={(e) => setPass(e.target.value)}
                        placeholder="パスワード"
                    />
                </div>
                <div className="m-2 p-2">
                    <Button onClick={handleSubmit}>ログイン</Button>
                </div>
            </div>
        </div>
    );
}
