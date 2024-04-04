// hooks/useRegister.js
import { useContext } from 'react';
import { useRouter } from 'next/router';
import UserContext from './../../context/userContext';

export function useRegister() {
    const router = useRouter();
    const { value } = useContext(UserContext);
    const usr = value;

    const toUtcTime = (timeString) => {
        const [hours, minutes] = timeString.split(":").map(Number);
        const time = new Date(Date.UTC(1970, 0, 1, hours, minutes));
        return time.toISOString();
    };

    const handleSubmitTime = async (start, end) => {
        // 関数のロジック
    };

    return { handleSubmitTime };
}
