// import Image from "next/image";
// import { Inter } from "next/font/google";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";

// const inter = Inter({ subsets: ["latin"] });

// export default function Home() {
//     return (
//         <main class="container mx-auto">
//             <div>
//                 <div className="flex items-center justify-center">
//                     <Input
//                         type="text"
//                         id="employee_id"
//                         placeholder="従業員番号"
//                     />
//                 </div>
//                 <div className="flex items-center justify-center">
//                     <Input
//                         type="text"
//                         id="workplace_id"
//                         placeholder="事業所番号"
//                     />
//                 </div>
//                 <div className="flex items-center justify-center">
//                     <Input type="text" id="hours" placeholder="就労時間" />
//                 </div>
//             </div>
//             <div className="flex justify-center mt-5">
//                 <Button>送信</Button> 
// 				{/* TODO: ボタンを押したときにsendInfoが働くようにする */}
//             </div>
// 			<script src="sendInfo.js"></script>
//         </main>
//     );
// }
import Image from "next/image";
import { Inter } from "next/font/google";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios"; // axiosをインポート
import { useState } from "react"; // useStateフックをインポート

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    // 状態変数を定義
    const [employeeId, setEmployeeId] = useState("");
    const [workspaceId, setWorkspaceId] = useState("");
    const [hours, setHours] = useState("");

    function clearText(){
        document.getElementById("employee_id").value = "";
        document.getElementById("workspace_id").value = "";
        document.getElementById("hours").value = "";
    }

    // データを送信する関数
    const sendInfo = () => {
        const apiUrl = "http://localhost:8080/work_entries/";
        const inputData = {
            employee_id: employeeId,
            workspace_id: workspaceId,
            date: new Date().toISOString(), // 現在の日付を使用
            hours: hours,
        };
        
        axios.post(apiUrl, inputData, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            console.log(response.data);
            // フォームをクリア
            clearText();
        })
        .catch(error => {
            console.error(error);
        });
    };

    return (
        <main className="container mx-auto">
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
                <Button onClick={sendInfo}>送信</Button> {/* 送信ボタンのイベントハンドラを設定 */}
            </div>
        </main>
    );
}
