import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/router";

export default function PunchOut() {
    const router = useRouter();
    const {dataSended: dataString} = router.query;
    // const work_entries = dataString ? JSON.parse(decodeURIComponent(dataString)) : null;

    const work_entries = {
        id: 1, // user_id
        employee_id: 1,
        workplace_id: 1,
        date: new Date(),
        start_time: "09:00",
        end_time: "18:00",
        comment: "test"
    }

    return (
        <div>
            {work_entries.id ? (
                <div>
                    {`${work_entries.id}さん、本日は${work_entries.start_time}~${work_entries.end_time}まで働きました。`}
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
}