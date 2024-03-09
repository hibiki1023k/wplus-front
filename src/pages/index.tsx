import Image from "next/image";
import { Inter } from "next/font/google";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useState, ChangeEvent } from "react";

const inter = Inter({ subsets: ["latin"] });

function clearText(): void {
  (document.getElementById("employee_id") as HTMLInputElement).value = "";
  (document.getElementById("workplace_id") as HTMLInputElement).value = "";
  (document.getElementById("hours") as HTMLInputElement).value = "";
}

const Home: React.FC = () => {
  const [employeeId, setEmployeeId] = useState<number | null>(null);
  const [workspaceId, setWorkspaceId] = useState<number | null>(null);
  const [hours, setHours] = useState<number | null>(null);

  const handleNumberInput = (value: string, setter: (value: number | null) => void) => {
    const number = parseInt(value, 10); // 10進数として解析
    if (!isNaN(number)) {
      setter(number);
    } else {
      setter(null); // NaNの場合はnullを設定
    }
  };

  const handleTextInput = (value: string, setter: (value: string) => void ) => {
    setter(value);
  };

  const sendInfo = (): void => {
    if (employeeId === null || workspaceId === null || hours === null) {
      console.error("Invalid input");
      return;
    }

    const apiUrl: string = "http://localhost:8080/work_entries/";
    const inputData = {
      employee_id: employeeId,
      workspace_id: workspaceId,
      date: new Date().toISOString(),
      hours: hours,
    };

    console.log(inputData);
    clearText();

    axios
        .post(apiUrl, inputData, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
  };

  return (
      <main className="bg-background">
        <div>
          <div className="flex items-center justify-center">
            <Input
                type="text"
                id="employee_id"
                placeholder="従業員番号"
                value={employeeId === null ? '' : employeeId.toString()}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleNumberInput(e.target.value, setEmployeeId)}
            />
          </div>
          <div className="flex items-center justify-center">
            <Input
                type="text"
                id="workplace_id"
                placeholder="事業所番号"
                value={workspaceId === null ? '' : workspaceId.toString()}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleNumberInput(e.target.value, setWorkspaceId)}
            />
          </div>
          <div className="flex items-center justify-center">
            <Input
                type="text"
                id="hours"
                placeholder="就労時間"
                value={hours === null ? '' : hours.toString()}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleNumberInput(e.target.value, setHours)}
            />
          </div>
        </div>
        <div className="flex justify-center mt-5">
          <Button onClick={sendInfo}>送信</Button>
        </div>
      </main>
  );
};

export default Home;