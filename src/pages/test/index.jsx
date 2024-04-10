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
import RecordCard from "../../components/admin/RecordCard";

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
    const records = [
        {
            employee_name: "employee1",
            workplace_name: "workplace1",
            date: "2024-04-09",
            start_time: { Microseconds: 10000000 },
            end_time: { Microseconds: 20000000 },
            comment: "comment1",
        },
        {
            employee_name: "employee2",
            workplace_name: "workplace2",
            date: "2024-04-09",
            start_time: { Microseconds: 30000000 },
            end_time: { Microseconds: 40000000 },
            comment: "comment2",
        },
        {
            employee_name: "employee3",
            workplace_name: "workplace3",
            date: "2024-04-09",
            start_time: { Microseconds: 50000000 },
            end_time: { Microseconds: 60000000 },
            comment: "comment3",
        },
        {
            employee_name: "employee4",
            workplace_name: "workplace4",
            date: "2024-04-09",
            start_time: { Microseconds: 70000000 },
            end_time: { Microseconds: 80000000 },
            comment: "comment4",
        }
    ];
    // const router = useRouter();
    // const [selectValue, setSelectValue] = useState("");
    // // const [records, setRecords] = useState([]);
    // const { value } = useContext(UserContext);
    // // const usr = value;
    // const usr = {
    //     office_id: 1,
    //     employee_id: 1,
    //     workplace_id: 1,
    //     role: "admin",
    // }
    // const records = [
    //     {
    //         workplace_name: "workplace1",
    //         employee_name: "employee1",
    //         date: "2024-04-09T16:30:07.959Z",
    //         start_time: { Microseconds: 10000000 },
    //         end_time: { Microseconds: 20000000 },
    //         comment: "comment1",
    //     },
    //     {
    //         workplace_name: "workplace2",
    //         employee_name: "employee2",
    //         date: "2024-04-09T16:30:07.959Z",
    //         start_time: { Microseconds: 30000000 },
    //         end_time: { Microseconds: 40000000 },
    //         comment: "comment2",
    //     }
    // ];

    // useEffect(() => {
    //     const fetchData = async () => {
    //         if (!usr?.office_id) {
    //             throw new Error("Invalid user data");
    //         }
    //         // const result = await fetch(`/api/retrieve/${usr.office_id}`, {
    //         //     method: "GET",
    //         //     headers: {
    //         //         "Content-Type": "application/json",
    //         //         Authorization: `Bearer ${usr_token}`,
    //         //     },
    //         // });
    //         // if (!response.ok) {
    //         //     console.error("Error fetching data");
    //         //     return;
    //         // }
    //         Request(`retrieve/${usr.office_id}`, "GET")
    //         .then(response => {
    //             if(!response.ok){
    //                 throw new Error("Network response was not ok");
    //             }
    //             return response.json();
    //         })
    //         .then(data => {
    //             setRecords(data.record);
    //         })
    //         .catch(error => {
    //             console.error("There was a problem with your fetch operation:", error);
    //         })
    //     };

    //     fetchData();
    // }, [usr?.office_id]);

    // const deleteRow = async (id) => {
    //     Request(`work_entries/delete/${id}`, "DELETE")
    //     .then(response => {
    //         if(response.status === 204){
    //             alert('データを削除しました。');
    //             setRecords(records.filter((record) => record.id !== id));
    //         } else {
    //             alert('データの削除に失敗しました。');
    //             console.log('Delete Failed:', response.status);
    //         }
    //     })
    //     .catch(error => {
    //         console.error('Error fetching data', error);
    //     })
    // };

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
            <div>
                <h1 className="text-2xl font-bold mb-4">勤怠管理画面</h1>
            </div>
            <div className='flex-1 overflow-y-auto' style={{maxheight: '50vh'}}>
                {records.map((record) => (
                    <RecordCard key={record.id} record={record} />
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
