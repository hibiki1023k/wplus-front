// hooks/useAttendChoice.js
import { useContext } from 'react';
import { useRouter } from 'next/router';
import UserContext from './../../context/userContext';

function useAttendChoice() {
    const router = useRouter();
    const { value } = useContext(UserContext);
    const usr = value;

    const handleRegister = () => {
        if (usr.role !== 'admin') {
            router.push(`/register/`);
        } else {
            alert("管理者は勤怠登録ができません。");
        }
    };

    const handleManage = () => {
        if (usr.role !== 'employee') {
            router.push(`/admin/`);
        } else {
            alert("従業員は勤怠管理ができません。");
        }
    };

    return { handleRegister, handleManage };
}

export default useAttendChoice;
