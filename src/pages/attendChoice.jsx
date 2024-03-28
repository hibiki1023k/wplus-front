import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function AttendChoice() {
    const router = useRouter();
    const {dataSended: dataString } = router.query;
    const usr = dataString ? JSON.parse(decodeURIComponent(dataString)) : null;

    const handleRegister = () => {
        if(usr.role !== 'admin'){
            router.push(
                `/register/?data=${dataString}`
            );
        } else {
            alert('管理者は勤怠登録ができません。');
        }
    }

    const handleManage = () => {
        if(usr.role !== 'employee'){
            router.push(
                `/admin/?data=${dataString}`
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