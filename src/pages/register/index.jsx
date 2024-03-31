import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Register() {
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    // const [comment, setComment] = useState("")
    const router = useRouter();
    const {data: dataString} = router.query;
    const usr = dataString ? JSON.parse(decodeURIComponent(dataString)) : null;
    
    const toUtcTime = (timeString) => {
        const [hours, minutes] = timeString.split(':').map(Number);
        const time = new Date(Date.UTC(1970, 0, 1, hours, minutes));
        return time.toISOString();
    };

    const handleSubmitTime = async () => {
        const work_entries = {
            employee_id: usr.employee_id,
            workplace_id: usr.workplace_id,
            date: new Date().toISOString(),
            start_time: toUtcTime(start),
            end_time: toUtcTime(end)
        };
        try{
            const token_response = await fetch("/api/getCookie", {
                method: "GET",
                headers: {
                "Content-Type": "application/json",
            },
        });
            if(!token_response.ok){
                throw new Error("Token Fetch Failed:", token_response.status);
            }
            const usr_token = await token_response.json();
            console.log("Token Received", usr_token);
            
            const response = await fetch("/api/work_entries/postTime", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${usr_token}`
                },
                body: JSON.stringify(work_entries)
            });
            
            console.log(work_entries);
            
            if(response.ok){
                const data = await response.json();
                const dataString = encodeURIComponent(JSON.stringify(data));
                const tmp = dataString ? JSON.parse(decodeURIComponent(dataString)) : null;
                console.log(tmp);

                alert("登録が完了しました。");
                // dataを送信する
                router.push(`/../attendChoice?dataSended=${dataString}`);
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
                {usr?.name ? (
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
                {/*<Input*/}
                {/*    type="text"*/}
                {/*    value={comment}*/}
                {/*    onChange={(e) => setComment(e.target.value)}*/}
                {/*    placeholder="備考"*/}
                {/*/>*/}
                <Button onClick={() => handleSubmitTime()}>登録</Button>
            </div>
            <div>
                <Button onClick={() => router.push(`../attendChoice?dataSended=${dataString}`)}>戻る</Button>
            </div>
        </div>
    );
}
