import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { IoDownload } from "react-icons/io5";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

function formatMicrosecondsToTime(microseconds) {
    // マイクロ秒をミリ秒に変換
    const milliseconds = microseconds / 1000;
    // ミリ秒から日付オブジェクトを作成
    const date = new Date(milliseconds);
    console.log(date);
    // 時間と分を取得
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    console.log(hours, minutes);
    // ゼロ埋めしてフォーマット
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    console.log(formattedTime);
    return formattedTime;
}

export default function Register() {
    const router = useRouter();
    const [selectValue, setSelectValue] = useState("");
    const [records, setRecords] = useState([])
    const { data: dataString } = router.query;
    const usr = dataString ? JSON.parse(decodeURIComponent(dataString)) : null;

    useEffect(() => {
        const fetchData = async () => {
            try {
                // cookieからtokenを取得する
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

                const response = await fetch(`/api/retrieve/${usr.office_id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${usr_token}`,
                    },
                });
                if (!response.ok) {
                    console.error("Error fetching data");
                    return;
                }
                const data = await response.json();
                console.log(data);
                setRecords(data.record);
                console.log(records);
            } catch (error) {
                console.log("Error fetching data", error);
            }
        };

        fetchData();
    }, []);

    const deleteRow = async (id) => {
        try {
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
                    "Authorization": `Bearer ${usr_token}`
                }
            });
            // console.log(id);
            if (response.ok) {
                alert("データを削除しました。");
            } else {
                alert("削除に失敗しました。");
                console.log("Delete Failed:", response.status);
            }
        } catch (error) {
            console.log("Error fetching data", error);
        }
    };

    return (
        <div>
            {/*<div>*/}
            {/*    <Button>*/}
            {/*        従業員登録*/}
            {/*    </Button>*/}
            {/*</div>*/}
            <div className="flex items-center justify-center min-h-44 ">
                <div className="w-1/3">
                    <Select onValueChange={setSelectValue} defaultValue="">
                        <SelectTrigger>
                            <SelectValue placeholder="職場を選択してください" />
                        </SelectTrigger>
                        <SelectContent>
                            {/* TODO:mapメソッドでoffice_idの数だけ追加する */}
                            {/*<SelectItem value="">職場を選択してください</SelectItem>*/}
                            <SelectItem value="1">1</SelectItem>
                            <SelectItem value="2">2</SelectItem>
                            <SelectItem value="3">3</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                {/* CSVダウンロード用のUI */}
                {/*<div className="">*/}
                {/*    <a href="/../public/gopher.png" download>*/}
                {/*        <IoDownload />*/}
                {/*    </a>*/}
                {/*</div>*/}
            </div>
            <div>
                <Table>
                    <TableCaption>WPLUS</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>職場名</TableHead>
                            <TableHead>従業員名</TableHead>
                            <TableHead>日付</TableHead>
                            <TableHead>開始時刻</TableHead>
                            <TableHead>終了時刻</TableHead>
                            <TableHead>備考</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {/* TODO:mapメソッドでwork_entriesの数だけ追加する */}
                        {records
                            .map((record) => (
                                <TableRow key={record.id}>
                                    <TableCell>{record.workplace_name}</TableCell>
                                    <TableCell>{record.employee_name}</TableCell>
                                    <TableCell>{record.date}</TableCell>
                                    <TableCell>{formatMicrosecondsToTime(record.start_time.Microseconds)}</TableCell>
                                    <TableCell>{formatMicrosecondsToTime(record.end_time.Microseconds)}</TableCell>
                                    <TableCell>{record.comment}</TableCell>
                                    <TableCell>
                                        <Button onClick={() => deleteRow(record.id)}>
                                            削除
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
                <div>
                    <Button onClick={() => router.push(`../attendChoice?dataSended=${dataString}`)}>
                        戻る
                    </Button>
                </div>
            </div>
        </div>
    );
}
