import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/router";

export default function PunchOut() {
    const router = useRouter();
    const {dataSended: dataString} = router.query;
    console.log(dataString);
    const work_entries = dataString ? JSON.parse(decodeURIComponent(dataString)) : null;

    return (
        <div>
            {work_entries?.id ? (
                <div>
                <div>
                    {`${work_entries.id}さん、本日は${work_entries.start_time}~${work_entries.end_time}まで働きました。`}
                </div>
                <div>
                    {work_entries.comment}
                </div>
                <div>
                    <Button onClick={() => {router.push(`/../attendChoice`)}}>選択画面に戻る</Button>
                </div>
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
}