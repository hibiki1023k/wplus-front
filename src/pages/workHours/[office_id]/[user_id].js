import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

function WorkHoursPage() {
    const router = useRouter();
    const { office_id, user_id } = router.query;
    const [userName, setUserName] = useState('');
    
    useEffect(() => {
        // 実際のアプリケーションでは、ここでAPIを呼び出してデータを取得
        if (office_id && user_id) {
            fetch(`/api/users/${office_id}&/${user_id}`)
                .then(response => response.json())
                .then(data => {
                    setUserName(data.name);
                })
                .catch(error => console.error('Error: fetching data:', error));
        }
    }, [office_id, user_id]);
    
    return (
        <div>
            {userName ? <div>{`${userName}さん、今日は何時間働きましたか？`}</div> : <div>Loading...</div>}
            {/* 労働時間を入力するための UI 要素をここに追加 */}
        </div>
    );
}

export default WorkHoursPage;
