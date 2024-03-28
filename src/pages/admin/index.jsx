import { useRouter } from 'next/router';
import { useState, userEffect } from 'react';

export default function manage() {
    const router = useRouter();
    const { data: dataString } = router.query;

    const usr = dataString ? JSON.parse(decodeURIComponent(dataString)) : null;

    return (
        <div>
            {usr.office_id ? (
                <div>
                    {`${usr.office_id}の管理画面`}
                </div>
            ) : (
                <div>Loading...</div>
            )}
            {/* 勤怠管理メニュー */}
        </div>
    )
}