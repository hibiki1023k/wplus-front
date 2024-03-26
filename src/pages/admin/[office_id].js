import { useRouter } from 'next/router';
import { useState, userEffect } from 'react';

export default function manage() {
    const router = useRouter();
    const { data: dataString } = router.query;

    const dataObject = dataString ? JSON.parse(decodeURIComponent(dataString)) : null;

    return (
        <div>
            {dataObject.office_id ? (
                <div>
                    {`${dataObject.office_id}の管理画面`}
                </div>
            ) : (
                <div>Loading...</div>
            )}
            {/* 勤怠管理メニュー */}
        </div>
    )
}