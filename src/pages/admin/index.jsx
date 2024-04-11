import UserContext from "./../../../context/userContext";
import Request from "./../commonRequest";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/router";
import React, { useState, useEffect, useContext } from "react";
import { IoDownload } from "react-icons/io5";

import RecordCard from "@/components/admin/RecordCard";
import UserContext from "./../../../context/userContext";
import LoadingProgress from "./../../components/Progress";


function formatMicrosecondsToTime(microseconds) {
    // マイクロ秒をミリ秒に変換
    const milliseconds = microseconds / 1000;
    // ミリ秒から日付オブジェクトを作成
    const date = new Date(milliseconds);
    // console.log(date);
    // 時間と分を取得
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    // console.log(hours, minutes);
    // ゼロ埋めしてフォーマット
    const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}`;
    // console.log(formattedTime);
    return formattedTime;
}

export default function Register() {
    const router = useRouter();
    const [selectValue, setSelectValue] = useState("");
    const [records, setRecords] = useState([]);

    const [loading, setLoading] = useState(false);
    const { value } = useContext(UserContext);
    const usr = value;
    console.log(usr);


    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            if (!usr?.office_id) {
                throw new Error("Invalid user data");
            }
            // const result = await fetch(`/api/retrieve/${usr.office_id}`, {
            //     method: "GET",
            //     headers: {
            //         "Content-Type": "application/json",
            //         Authorization: `Bearer ${usr_token}`,
            //     },
            // });
            // if (!response.ok) {
            //     console.error("Error fetching data");
            //     return;
            // }
            Request(`retrieve/${usr.office_id}`, "GET")
            .then(response => {
                if(!response.ok){
                    throw new Error("Network response was not ok");
                }

                const data = await response.json();
                // console.log(data);

                setLoading(false);

                setRecords(data.record);
            })
            .catch(error => {
                console.error("There was a problem with your fetch operation:", error);
            })
        };

        fetchData();
    }, [usr?.office_id]);

    const deleteRow = async (id) => {

        try {
            setLoading(true);
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
            console.log("Token Received", usr_token);

            const response = await fetch(`/api/work_entries/delete/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${usr_token}`,
                },
            });
            // console.log(id);
            if (response.status === 204) {
                alert("データを削除しました。");

                setRecords(records.filter((record) => record.id !== id));
            } else {
                alert('データの削除に失敗しました。');
                console.log('Delete Failed:', response.status);
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
