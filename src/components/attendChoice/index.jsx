// components/AttendChoice.js
import React from 'react';
import { Button } from '@/components/ui/button';
import useAttendChoice from '../hooks/useAttendChoice';  // カスタムフックのパスを適切に設定

export default function AttendChoice() {
    const { handleRegister, handleManage } = useAttendChoice();

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
            <Button className="mb-4 w-1/3" onClick={handleRegister}>
                勤怠登録
            </Button>
            <Button className="mt-2 w-1/3" onClick={handleManage}>
                勤怠管理
            </Button>
        </div>
    );
}
