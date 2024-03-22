import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

function WorkHoursPage() {
    const router = useRouter();
    const { office_id, user_id } = router.query;
    const [name, setName] = useState('');
    
    useEffect(() => {
        // 実際のアプリケーションでは、ここでAPIを呼び出してデータを取得
        async function fetchData() {
            const response = await fetch(`/api/data?office_id=${office_id}&user_id=${user_id}`);
            const data = await response.json();
            setName(data.name);
        }
        
        if (office_id && user_id) {
            fetchData();
        }
    }, [office_id, user_id]);
    
    return (
        <div>
            {name ? <div>{`${employee_id}さん、今日は何時間働きましたか？`}</div> : <div>Loading...</div>}
            {/* 労働時間を入力するための UI 要素をここに追加 */}
        </div>
    );
}

export default WorkHoursPage;
