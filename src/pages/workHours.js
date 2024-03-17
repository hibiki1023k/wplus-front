// WorkHours.js
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

function WorkHours() {
  const router = useRouter();
  const { workplaceId, employeeId } = router.query; // Next.js の useRouter を使用
  const [name, setName] = useState('');

  useEffect(() => {
    if (!workplaceId || !employeeId) return; // 追加: パラメータが未定義の場合はリクエストを送らない
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/workHours/${workplaceId}/${employeeId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setName(data.name);
      } catch (error) {
        console.error('Error fetching data: ', error);
        setName('');
      }
    };

    fetchData();
  }, [workplaceId, employeeId]);

  return (
    <div>
      {name ? <div>{`${name}さん、今日は何時間働きましたか？`}</div> : <div>Loading...</div>}
      {/* 労働時間を入力するための UI 要素をここに追加 */}
    </div>
  );
}

export default WorkHours;
