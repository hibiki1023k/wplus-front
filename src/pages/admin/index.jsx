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

export default function register() {
    const router = useRouter();

    const [selectValue, setSelectValue] = useState("");
    const [records, setRecords] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("/api/work_entries/retrieve");
            if(!response.ok){
                console.error("Error fetching data");
                return;
            }
            const data = await response.json();
            const formatted = data.map(item => ({
                id: Number(item.id),
                employee_id: Number(item.employee_id),
                workplace_id: Number(item.workplace_id),
                date: new Date(item.date).toLocaleDateString("ja-JP", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit"
                }).replaceAll('/', '-'),
                start_time: item.start_time,
                end_time: item.end_time,
                comment: item.comment,
            }));
            setRecords(formatted);
            console.log("break");
        };

        fetchData();
    }, []);

    const deleteRow = async (id) => {
        try {
            const response = await fetch("/api/work_entries/delete", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(id),
            });
            console.log(id);
            if(response.ok){
                alert("データを削除しました。");
            } else {
                alert("削除に失敗しました。");
                console.log("Delete Failed:", response.status);
            }
        } catch(error) {
            console.log("Error fetching data", error);
        }
    };

    return (
        <div>
            <div>
                <Button>
                    従業員登録
                </Button>
            </div>
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
                    <TableCaption>hogehoge</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>職場番号</TableHead>
                            <TableHead>従業員番号</TableHead>
                            <TableHead>日付</TableHead>
                            <TableHead>開始時刻</TableHead>
                            <TableHead>終了時刻</TableHead>
                            <TableHead>備考</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {/* TODO:mapメソッドでwork_entriesの数だけ追加する */}
                        {records
                            .filter(record => record.workplace_id === Number(selectValue) || selectValue === "")
                            .map((record) => (
                                <TableRow key={record.id}>
                                    <TableCell>{record.workplace_id}</TableCell>
                                    <TableCell>{record.employee_id}</TableCell>
                                    <TableCell>{record.date}</TableCell>
                                    <TableCell>{record.start_time}</TableCell>
                                    <TableCell>{record.end_time}</TableCell>
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
            </div>
        </div>
    );
}
