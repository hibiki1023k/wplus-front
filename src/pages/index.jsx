import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/router";
import { useState } from "react";

export default function EmployeeEntry() {
    const [officeId, setOfficeId] = useState("");
    const [userId, setUserId] = useState("");
    const [pass, setPass] = useState("");
    const [loading, setLoading] = useState(false); // ローディング状態を追加
    const router = useRouter();

    const handleSubmit = async () => {
        setLoading(true); // ローディング開始
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
            if (response.ok) {
                const data = await response.json();
                const dataString = encodeURIComponent(JSON.stringify(data));
                router.push(`/attendChoice?dataSended=${dataString}`);
            } else {
                alert("ログインに失敗しました。");
            }
        } catch (error) {
            console.error("Error fetching data", error);
        } finally {
            setLoading(false); // ローディング終了
        }
    };

    if (loading) {
        return <div>Loading...</div>; // ローディング画面
    }

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
