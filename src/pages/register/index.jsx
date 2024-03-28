import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/router";

export default function register() {
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const [comment, setComment] = useState("")
    const router = useRouter();
    const {data: dataString} = router.query;
    const usr = dataString ? JSON.parse(decodeURIComponent(dataString)) : null;

    // テスト用
    // const usr = {
    //     office_id: 1,
    //     employee_id: 1,
    //     name: 'test_user'
    // }

    const handleSubmitTime = async () => {
        const work_entries = {
            id: usr.user_id,
            employee_id: usr.employee_id,
            workplace_id: usr.workplace_id,
            date: new Date().toLocaleDateString('ja-JP', {year: "numeric", month: "2-digit", day: "2-digit"}).replaceAll("/", "-"),
            start_time: start,
            end_time: end,
            comment: comment
        };

        try{
            const response = await fetch("/api/postTime", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(work_entries),
            });
            console.log(work_entries);
            if(response.ok){
                const data = await response.json();
                const dataString = encodeURIComponent(JSON.stringify(data));

                router.push(`/register/punchOut?dataSended=${dataString}`);
            } else {
                alert('登録に失敗しました。');
                console.log("Register Failed:", response.status);
            }
        } catch (error) {
            console.log("Error fetching data", error);
        }
    }
    return (
        <div>
            <div>
                {usr.name ? (
                    <div>
                        {`${usr.name}の勤怠登録`}
                    </div>
                ) : (
                    <div>
                        Loading...
                    </div>
                )
                }
            </div>
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
                <Input
                    type="text"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="備考"
                />
                <Button onClick={() => handleSubmitTime()}>登録</Button>
            </div>
        </div>
    );
}
