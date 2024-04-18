import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/router";
import React, { useState, useContext } from "react";
import {
    Card, CardContent, CardFooter, CardHeader, CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import LoadingProgress from "../components/Progress";

export default function EmployeeEntry() {
    const [officeId, setOfficeId] = useState("");
    const [userId, setUserId] = useState("");
    const [pass, setPass] = useState("");
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);
    const router = useRouter(); // ページ遷移用

    const handleSubmit = async () => {
        event.preventDefault();
        setLoading(true);

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
                alert("ログインに成功しました。");
                router.push('/attendChoice');
            } else {
                alert("ログインに失敗しました。");
                console.error("Login Failed:", response.status);
            }
        } catch (error) {
            console.log("Error fetching data", error);
        } finally {
            setLoading(false);
        }
    };

    if(loading) {
        return (
            <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
                <LoadingProgress />
            </div>
        );
    }

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
