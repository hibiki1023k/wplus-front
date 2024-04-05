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
    const { value } = useContext(UserContext);
    const usr = value;

    useEffect(() => {
        const fetchData = async () => {
            try {
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
                const officeId = usr.office_id;
                const result = await Request(`retrieve/${officeId}`, "GET");

                if (!result || result.error) {
                    throw new Error("Error fetching Data");
                }
                setRecords(result.record);
                console.log("records:", records);
            } catch (error) {
                console.log("Error fetching data", error);
            }
        };

        fetchData();
    }, [usr?.office_id]);

    const deleteRow = async (id) => {
        try {
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
                alert("削除に失敗しました。");
                console.log("Delete Failed:", response.status);
            }
        } catch (error) {
            console.log("Error fetching data", error);
        }
    };

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
            {/*<div>*/}
            {/*    <Button>*/}
            {/*        従業員登録*/}
            {/*    </Button>*/}
            {/*</div>*/}
            <div className="flex flex-col items-center justify-center">
                {/* CSVダウンロード用のUI */}
                {/*<div className="">*/}
                {/*    <a href="/../public/gopher.png" download>*/}
                {/*        <IoDownload />*/}
                {/*    </a>*/}
                {/*</div>*/}
            </div>
            <div className="min-w-screen">
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
                        {!records || records.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7}>
                                    No records found
                                </TableCell>
                            </TableRow>
                        ) : (
                            records.map((record) => (
                                <TableRow key={record.id}>
                                    <TableCell>
                                        {record.workplace_name}
                                    </TableCell>
                                    <TableCell>
                                        {record.employee_name}
                                    </TableCell>
                                    <TableCell>{record.date}</TableCell>
                                    <TableCell>
                                        {formatMicrosecondsToTime(
                                            record.start_time.Microseconds
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {formatMicrosecondsToTime(
                                            record.end_time.Microseconds
                                        )}
                                    </TableCell>
                                    <TableCell>{record.comment}</TableCell>
                                    <TableCell>
                                        <Button
                                            onClick={() => deleteRow(record.id)}
                                        >
                                            削除
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
                <footer className="flex justify-center m-2">
                    <Button onClick={() => router.push(`../attendChoice`)}>
                        戻る
                    </Button>
                </footer>
            </div>
        </div>
    );
}
