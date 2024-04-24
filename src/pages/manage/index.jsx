import LoadingProgress from "./../../components/Progress";
import RecordCard from "@/components/admin/RecordCard";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";

export default function Register() {
    const router = useRouter();
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        setLoading(true);
        handleGetWorkEntries();
        setLoading(false);
    }, []);


    const handleGetWorkEntries = async () => {
        let user;
        try {
            const response = await fetch("/api/getUser", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            console.log(response);
            user = await response.json();
        } catch (error) {
            console.error("Error fetching data", error);
        }
        try {
            let url = "/api/work_entries";
            console.log(user);
            console.log(user.role);
            switch (user.role) {
            case "admin":
                url += "/office";
                break;
            case "manager":
                url += `/workplace/${user.workplace_id}`;
                break;
            case "employee":
                url += `/employee/${user.employee_id}`;
                break;
            default:
                throw new Error("Invalid user role");
            }

            const token_response = await fetch("/api/getCookie", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!token_response.ok) {
                throw new Error("Token Fetch Failed:", token_response.status);
            }
            const usr_token = await token_response.json();

            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${usr_token}`,
                },
            });

            const data = await response.json();
            if(!data){
                console.log("No data found");
                return;
            }
            console.log(data);
            setRecords(data);
        } catch (error) {
            console.error("Error fetching data", error);
        }
    };

    const deleteRow = async (id) => {
        try {
            setLoading(true);

            // 内部でToken取得
            const response = await fetch(`/api/work_entries/delete/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-type": "application/json",
                },
            });

            if (response.status === 204) {
                alert("データを削除しました。");
                setRecords(records.filter((record) => record.id !== id));
            } else {
                alert("削除に失敗しました。");
                console.log("Delete Failed:", response.status);
            }
        } catch (error) {
            console.log("Error fetching data", error);
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

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
            <div className="flex-grow overflow-y-auto w-[325px]">
                <h1 className="text-2xl font-bold m-4">勤怠管理画面</h1>
                {records.map((record) => (
                    <RecordCard key={record.id} record={record} onAction={() => deleteRow(record.id)}  />
                ))}
            </div>
            <footer className='flex justify-center m-2'>
                <Button onClick={() => router.push(`../attendChoice`)}>
                        戻る
                </Button>
            </footer>
        </div>
    );
}