import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";

export default function AttendChoice() {
    const router = useRouter();
    const [user, setUser] = useState(null);

    useEffect(() => {
        handleGetUser();
    }, []);

    const handleGetUser = async () => {
        try {
            const response = await fetch('/api/getUser', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const user = await response.json();
            setUser(user);
        } catch (error) {
            console.error("Error fetching data", error);
        }
    };

    const handleRegister = () => {
        if (user && user.role !== "admin") {
            router.push('/register');
        } else {
            alert("管理者は勤怠登録ができません。");
        }
    };

    const handleManage = () => {
        router.push('/manage');
    };

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
            <Button className="mb-4 w-1/3" onClick={handleRegister}>
                勤怠登録
            </Button>
            <Button className="mt-2 w-1/3" onClick={handleManage}>
                勤怠管理
            </Button>
        </div>
    );
}
