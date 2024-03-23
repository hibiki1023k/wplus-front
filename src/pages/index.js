import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/router";
import { login } from "./api/login";

export default function EmployeeEntry() {
    const [officeId, setOfficeId] = useState("");
    const [userId, setUserId] = useState("");
    const [pass, setPass] = useState("");
    const router = useRouter(); // ページ遷移用
    
    const handleSubmit = async() => {
        const loginData = {
            office_id: officeId,
            user_id: userId,
            password: pass
        };
        const token = await login(loginData);
        console.log(token);

        router.push(`/workHours/${officeId}/${userId}`);
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
