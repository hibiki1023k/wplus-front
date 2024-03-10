import { Inter } from "next/font/google";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react"; // useStateフックをインポート

const inter = Inter({ subsets: ["latin"] });

async function sendWorkEntry(employee_id, workplace_id, date, hours) {
  const data = {
    "employee_id": employee_id,
    "workplace_id": workplace_id,
    "date": date,
    "hours": hours,
  };
  console.log(data)

  try {
    const response = await fetch('http://localhost:8080/work_entries', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    console.log('Status Code:', response.status); // Print out the status code

    const responseData = await response.json();
    console.log('Response Data:', JSON.stringify(responseData, null, 2)); // Print out the formatted JSON response
  } catch (error) {
    console.error('Error:', error);
  }
}

function clearText() {
  document.getElementById("employee_id").value = "";
  document.getElementById("workplace_id").value = "";
  document.getElementById("hours").value = "";
}

export default function Home() {
  // 状態変数を定義
  const [employeeId, setEmployeeId] = useState("");
  const [workspaceId, setWorkspaceId] = useState("");
  const [hours, setHours] = useState("");

  // 送信ボタンが押されたときに実行される関数
  const sendInfo = () => {
    // 日付の 'T' 以前の部分だけを取得して使用する
    const formattedDate = new Date().toISOString().split('T')[0];

    // hours の値を整数に変換する
    const intHours = parseInt(hours, 10); // 10は基数を示し、10進数の変換を意味します
    const intEmployeeId = parseInt(employeeId, 10);
    const intWorkspaceId = parseInt(workspaceId, 10);

    // 整形した日付と整数に変換された hours で sendWorkEntry を呼び出す
    sendWorkEntry(intEmployeeId, intWorkspaceId, formattedDate, intHours);
    clearText(); // テキストフィールドをクリア
  };



  return (
    <main className="bg-background">
      <div>
        <div className="flex items-center justify-center">
          <Input
            type="text"
            id="employee_id"
            placeholder="従業員番号"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-center">
          <Input
            type="text"
            id="workplace_id"
            placeholder="事業所番号"
            value={workspaceId}
            onChange={(e) => setWorkspaceId(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-center">
          <Input
            type="text"
            id="hours"
            placeholder="就労時間"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
          />
        </div>
      </div>
      <div className="flex justify-center mt-5">
        <Button onClick={sendInfo}>送信</Button>{" "}
        {/* 送信ボタンのイベントハンドラを設定 */}
      </div>
    </main>
  );
}
