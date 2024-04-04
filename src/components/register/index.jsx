// components/RegisterForm.js
import React from 'react';
import { Button, Input } from '@/components/ui';
import { useRegister } from './../../hooks/useRegister';

export default function Register() {
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const { handleSubmitTime } = useRegister();

    return (
        <div>
            <Input
                type="time"
                value={start}
                onChange={(e) => setStart(e.target.value)}
            />
            <Input
                type="time"
                value={end}
                onChange={(e) => setEnd(e.target.value)}
            />
            <Button onClick={() => handleSubmitTime(start, end)}>登録</Button>
            {/* その他のUI部分 */}
        </div>
    );
}
