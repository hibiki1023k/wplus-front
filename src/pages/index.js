import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// EmployeeEntry.js
import { useState } from "react";
import { useRouter } from "next/router";
export default function EmployeeEntry() {
  const [workplaceId, setWorkplaceId] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const router = useRouter(); // ページ遷移用

  const handleSubmit = async () => {
    // ここでAPIを呼び出して従業員の名前を取得することもできます
    // 今回は、名前を直接次のページに渡す代わりに、IDを使用します
    router.push(`/workHours/${workplaceId}/${employeeId}`);
  };

  return (
    <div className="">
      <input
        type="text"
        value={workplaceId}
        onChange={(e) => setWorkplaceId(e.target.value)}
        placeholder="事業所ID"
      />
      <input
        type="text"
        value={employeeId}
        onChange={(e) => setEmployeeId(e.target.value)}
        placeholder="従業員ID"
      />
      <button onClick={handleSubmit}>送信</button>
    </div>
  );
}
