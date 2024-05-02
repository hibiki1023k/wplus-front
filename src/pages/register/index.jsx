import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import LoadingProgress from "./../../components/Progress";
import EmployeeRegister from "../../components/register/EmployeeRegister";
import ManageRegister from "../../components/register/ManageRegister";

export default function Register() {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState();
    const router = useRouter();
    const [work_entries, setWork_entries] = useState();

    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            try {
                const response = await fetch('/api/getUser', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const fetchedUser = await response.json();
                setUser(fetchedUser);
            } catch (error) {
                console.error("Error fetching employees", error);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    const rendering = (user) => {
        switch(user.role){
            case "employee":
                return <EmployeeRegister user={user} onAction={(work_entries) => handleSubmit(work_entries)} />;
            default:
                return <ManageRegister user={user} onAction={(work_entries) => handleSubmit(work_entries)} />;
        }
    };

    const handleSubmit = async (work_entries) => {
        if(!user){
            alert("ユーザー情報が取得できませんでした。");
            return;
        }
        setLoading(true);
        try {
            console.log(work_entries);
            const response = await fetch("/api/work_entries/postTime", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(work_entries),
            });

            if (response.ok) {
                alert("登録が完了しました。");
                // employeesを送信する
                router.push('/../attendChoice');
            } else {
                alert("登録に失敗しました。");
                console.log("Register Failed:", response.status);
            }
        } catch (error) {
            console.log("Error fetching employees", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
                <LoadingProgress />
            </div>
        );
    }
    if(!user){
        return (
            <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
                <LoadingProgress />
            </div>
        );
    }
    return (
        <div>
            {rendering(user)}
        </div>
    );
}
