import React, { useState, useContext } from "react";
import { useRouter } from "next/router";
import Request from "./commonRequest";
import UserContext from "./../../context/userContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label";

export default function EmployeeEntry() {
    const [officeId, setOfficeId] = useState("");
    const [userId, setUserId] = useState("");
    const [pass, setPass] = useState("");
    const router = useRouter(); // ページ遷移用
    const { setValue } = useContext(UserContext);

    const handleSubmit = async () => {
        event.preventDefault();

        const loginData = {
            office_id: Number(officeId),
            user_id: Number(userId),
            password: pass,
        };
        Request("login", "POST", loginData)
        .then(response => {
            if(!response.ok){
                alert("ログインに失敗しました。");
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            setValue(data.data);
            router.push('/attendChoice');
        })
        .catch(error => {
            console.error("There was a problem with your fetch operation:", error);
            alert("ログインに失敗しました。");
        })
    };

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
            <Card className="w-[320px] bg-white p-4 rounded-lg ">
                <CardHeader>
                    <CardTitle>W-PLUS にログイン</CardTitle>
                </CardHeader>
                <CardContent className="p-1">
                    <form className="flex flex-col justify-center items-center">
                        <div className="grid w-4/5 items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="officeID">事業所番号</Label>
                                <Input
                                    type="text"
                                    value={officeId}
                                    onChange={(e) => setOfficeId(e.target.value)}
                                    placeholder="事業所番号"
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">ユーザ番号</Label>
                                <Input
                                    type="text"
                                    value={userId}
                                    onChange={(e) => setUserId(e.target.value)}
                                    placeholder="ユーザ番号"
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">パスワード</Label>
                                <Input
                                    type="password"
                                    value={pass}
                                    onChange={(e) => setPass(e.target.value)}
                                    placeholder="パスワード"
                                />
                            </div>
                            <CardFooter className="justify-center">
                                <Button onClick={handleSubmit}>ログイン</Button>
                            </CardFooter>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
