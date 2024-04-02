import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { useState } from "react";

export default function Register() {
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    // const [comment, setComment] = useState("")
    const router = useRouter();
    const { data: dataString } = router.query;
    const usr = dataString ? JSON.parse(decodeURIComponent(dataString)) : null;

    const toUtcTime = (timeString) => {
        const [hours, minutes] = timeString.split(":").map(Number);
        const time = new Date(Date.UTC(1970, 0, 1, hours, minutes));
        return time.toISOString();
    };

    const handleSubmitTime = async () => {
        const work_entries = {
            employee_id: usr.employee_id,
            workplace_id: usr.workplace_id,
            date: new Date().toISOString(),
            start_time: toUtcTime(start),
            end_time: toUtcTime(end),
        };
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

            const response = await fetch("/api/work_entries/postTime", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${usr_token}`,
                },
                body: JSON.stringify(work_entries),
            });

            console.log(work_entries);

            if (response.ok) {
                alert("登録が完了しました。");
                // dataを送信する
                router.push(`/../attendChoice?dataSended=${dataString}`);
            } else {
                alert("登録に失敗しました。");
                console.log("Register Failed:", response.status);
            }
        } catch (error) {
            console.log("Error fetching data", error);
        }
    };
    return (
        <div>
            <div>
                <div>
                    <h1 className="text-2xl font-bold text-center p-2 m-2">
                        {usr?.name}
                    </h1>
                </div>
                <div>
                    <div>
                        <Input
                            type="time"
                            value={start}
                            onChange={(e) => setStart(e.target.value)}
                        />
                        <Input
                            type="time"
                            value={end}
                            onChange={(e) => setEnd(e.target.value)}
                        />
                    </div>
                    <div>
                        <Button onClick={() => handleSubmitTime()}>登録</Button>
                    </div>
                </div>
                {/* <div>
                    <Table>
                        <TableCaption>勤怠登録</TableCaption>
                        <TableHead>
                            <TableRow>
                                <TableHeader>出勤時間</TableHeader>
                                <TableHeader>退勤時間</TableHeader>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>{start}</TableCell>
                                <TableCell>{end}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div> */}
            </div>
            <footer className="p-2 m-2">
                <Button
                    onClick={() =>
                        router.push(`../attendChoice?dataSended=${dataString}`)
                    }
                >
                    戻る
                </Button>
            </footer>
        </div>
    );
}
