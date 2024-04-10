import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';
import UserContext from './../../context/userContext';

export default function AttendChoice() {
    const router = useRouter();
    const { value } = useContext(UserContext);
    const usr = value;
    console.log(usr);

    const handleRegister = () => {
        if(usr.role !== 'admin'){
            router.push(
                `/register/`
            );
        } else {
            alert("管理者は勤怠登録ができません。");
        }
    };

    const handleManage = () => {
        if(usr.role !== 'employee'){
            router.push(
                `/admin/`
            );
        } else {
            alert("従業員は勤怠管理ができません。");
        }
    };
    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
            <h1 className="text-2xl font-bold mb-4">ようこそ、{usr.name}さん！</h1>
            <Button className="mb-4 w-1/3" onClick={handleRegister}>
                勤怠登録
            </Button>
            <Button className="mt-2 w-1/3" onClick={handleManage}>
                勤怠管理
            </Button>
        </div>  
    );
}
