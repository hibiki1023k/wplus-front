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
    // const [workEntries, setWorkEntries] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("/api/work_entries");
            if(!response.ok){
                console.error("Error fetching data");
                return;
            }
            const data = await response.json();
            setWorkEntries(data);
        };

        fetchData();
    }, []);

    const deleteRow = async (id) => {
        await fetch(`/api/work_entries/delete`, { method: 'POST' });
        setWorkEntries(workEntries.filter(entry => entry.id !== id));
    };

    // テスト用
    const workEntries = [{
        id: 1,
        employee_id: 1,
        workplace_id: 1,
        date: new Date().toLocaleDateString('ja-JP', {year: "numeric", month: "2-digit", day: "2-digit"}).replaceAll("/", "-"),
        start_time: "9:00",
        end_time: "18:00",
        comment: "comment",
        isVisible: true
    },
    {
        id: 2,
        employee_id: 2,
        workplace_id: 2,
        date: new Date().toLocaleDateString('ja-JP', {year: "numeric", month: "2-digit", day: "2-digit"}).replaceAll("/", "-"),
        start_time: "9:00",
        end_time: "18:00",
        comment: "comment",
        isVisible: true
    },
    {
        id: 3,
        employee_id: 3,
        workplace_id: 3,
        date: new Date().toLocaleDateString('ja-JP', {year: "numeric", month: "2-digit", day: "2-digit"}).replaceAll("/", "-"),
        start_time: "9:00",
        end_time: "18:00",
        comment: "comment",
        isVisible: true
    },
    {
        id: 4,
        employee_id: 4,
        workplace_id: 2,
        date: new Date().toLocaleDateString('ja-JP', {year: "numeric", month: "2-digit", day: "2-digit"}).replaceAll("/", "-"),
        start_time: "9:00",
        end_time: "18:00",
        comment: "comment",
        isVisible: true
    },
    {
        id: 5,
        employee_id: 5,
        workplace_id: 1,
        date: new Date().toLocaleDateString('ja-JP', {year: "numeric", month: "2-digit", day: "2-digit"}).replaceAll("/", "-"),
        start_time: "9:00",
        end_time: "18:00",
        comment: "comment",
        isVisible: true
    }
    ]

    return (
        <div>
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
                <div className="">
                    <a href="/../public/gopher.png" download>
                        <IoDownload />
                    </a>
                </div>
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
                        {workEntries
                            .filter(entry => (entry.workplace_id === Number(selectValue) || selectValue === "") && entry.isVisible)
                            .map((entry) => (
                                <TableRow key={entry.id}>
                                    <TableCell>{entry.workplace_id}</TableCell>
                                    <TableCell>{entry.employee_id}</TableCell>
                                    <TableCell>{entry.date}</TableCell>
                                    <TableCell>{entry.start_time}</TableCell>
                                    <TableCell>{entry.end_time}</TableCell>
                                    <TableCell>{entry.comment}</TableCell>
                                    <TableCell>
                                        <Button onClick={() => deleteRow(entry.id)}>
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
