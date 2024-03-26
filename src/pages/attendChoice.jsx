import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function AttendChoice() {
    const router = useRouter();
    const {dataSended: dataString } = router.query;
    const dataObject = dataString ? JSON.parse(decodeURIComponent(dataString)) : null;

    const handleRegister = () => {
        if(dataObject.role !== 'admin'){
            router.push(
                `/register/${dataObject.office_id}/${dataObject.employee_id}?data=${dataString}`
            );
        } else {
            alert('管理者は勤怠登録ができません。');
        }
    }

    const handleManage = () => {
        if(dataObject.role !== 'employee'){
            router.push(
                `/admin/${dataObject.office_id}?data=${dataString}`
            );
        } else {
            alert('従業員は勤怠管理ができません。');
        }
    }
    return (
        <div>
            <Button onClick={handleRegister}>
                勤怠登録
            </Button>
            <Button onClick={handleManage}>
                勤怠管理
            </Button>
        </div>
    );
}