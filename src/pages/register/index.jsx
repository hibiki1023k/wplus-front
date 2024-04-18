import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
    CardDescription
} from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import LoadingProgress from "./../../components/Progress";
import ja from 'date-fns/locale/ja';

export default function Register() {
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const [date, setDate] = useState(null);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
        handleGetUser();
    },[])

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
    }

    const handleDateChange = (date) => {
        setDate(date);
        console.log(date);
    }

    const toUtcTime = (timeString) => {
        const [hours, minutes] = timeString.split(":").map(Number);
        const time = new Date(Date.UTC(1970, 0, 1, hours, minutes));
        return time.toISOString();
    };

    const handleSubmit = async () => {
        setLoading(true);
        const work_entries = {
            employee_id: user.employee_id,
            workplace_id: user.workplace_id,
            date: new Date(date).toISOString(),
            start_time: toUtcTime(start),
            end_time: toUtcTime(end),
        };
        try {
            console.log(date);
            const response = await fetch("/api/work_entries/postTime", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(work_entries),
            });

            console.log(work_entries);

            if (response.ok) {
                alert("登録が完了しました。");
                // dataを送信する
                router.push('/../attendChoice');
            } else {
                alert("登録に失敗しました。");
                console.log("Register Failed:", response.status);
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
            <Card className="w-[320px] bg-white p-4 rounded-lg shadow-md">
                <CardHeader className="pb-2">
                    <CardTitle className="justify-center">
                        {user?.name}
                    </CardTitle>
                    <CardDescription>
                        開始時刻、終了時刻を指定してください
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {/* TODO: Calendarから日付を取得する */}
                    <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="date">日付</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="outline" className={cn("w-[280px] justify-start text-left font-normal", !date && "text-muted-foreground")}>
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {date ? format(date, "PPP(E)", { locale:ja }) : "日付を選択して下さい"}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[300px] p-0">
                                <Calendar
                                className="rounded-md border"
                                mode="single"
                                selected={date}
                                onSelect={handleDateChange}
                                initialFocus
                            />
                            </PopoverContent>
                        </Popover>
                    </div>
                    <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="start">開始時刻</Label>
                        <Input
                            type="time"
                            value={start}
                            onChange={(e) => setStart(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="end">終了時刻</Label>
                        <Input
                            type="time"
                            value={end}
                            onChange={(e) => setEnd(e.target.value)}
                        />
                    </div>
                    {/* TODO: toastを使った登録完了通知、punchOut使用しない */}
                    <CardFooter className="justify-center pt-4 pb-2">
                        <Button className="mr-4 pr-4" onClick={handleSubmit}>登録</Button>
                        <Button className="ml-4 pl-4"
                            onClick={() =>
                                router.push('./../attendChoice')
                            }
                        >
                            戻る
                        </Button>
                    </CardFooter>
                </CardContent>
            </Card>
        </div>
    );
}
