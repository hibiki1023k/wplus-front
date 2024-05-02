import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { ja } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
    CardDescription
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"



const EmployeeRegister = ({ user, onAction }) => {
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const [date, setDate] = useState(null);
    const [employees, setEmployees] = useState([]); // 従業員一覧
    const [value, setValue] = useState(""); // 選択した従業員を保持
    const router = useRouter();

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                let url = "/api/employees";
                console.log(user.role);
                switch (user.role) {
                    case "admin":
                        url += "/office";
                        break;
                    case "manager":
                        url += "/workplace";
                        break;
                    default:
                        throw new Error("Invalid user role");
                }

                const token_response = await fetch("/api/getCookie", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                if (!token_response.ok) {
                    throw new Error("Token Fetch Failed:", token_response.status);
                }
                const usr_token = await token_response.json();

                const response = await fetch(url, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${usr_token}`,
                    },
                });

                const result = await response.json();
                if(!result){
                    console.log("No employees found");
                    return;
                }
                console.log("Fetched employees", result);
                setEmployees(result);
            } catch (error) {
                console.error("Error fetching employees", error);
            }
        };
        fetchEmployee();
    }, []);

    const handleDateChange = (date) => {
        setDate(date);
    };

    const toUtcTime = (timeString) => {
        const [hours, minutes] = timeString.split(":").map(Number);
        const time = new Date(Date.UTC(1970, 0, 1, hours, minutes));
        return time.toISOString();
    };

    const handleRegister = () => {
        const work_entries = {
            employee_id: value.id,
            workplace_id: value.workplace_id,
            date: new Date(date).toISOString(),
            start_time: toUtcTime(start),
            end_time: toUtcTime(end),
        };
        console.log(work_entries);
        onAction(work_entries);
    };

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
            <Card className="w-[320px] bg-white p-4 rounded-lg shadow-md">
                <CardHeader className="pb-2">
                    <CardTitle className="justify-center">
                        {user?.name}
                    </CardTitle>
                    <CardDescription>
                        従業員名、開始時刻、終了時刻を指定してください
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Label htmlFor="employee">従業員名</Label>
                    <Select onValueChange={setValue}>
                        <SelectTrigger>
                            <SelectValue placeholder="従業員名を選択してください" />
                        </SelectTrigger>
                        <SelectContent>
                            {employees.map((employee) => (
                                <SelectItem value={employee} key={employee.id}>{employee.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="date">日付</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="outline" className={cn("justify-start text-left font-normal", !date && "text-muted-foreground")}>
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {date ? format(date, "PPP(E)", { locale:ja }) : "日付を選択して下さい"}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[300px] p-0">
                                <Calendar
                                className="rounded-md border"
                                mode="single"
                                selected={date}
                                onSelect={handleDateChange}
                                initialFocus
                            />
                            </PopoverContent>
                        </Popover>
                    </div>
                    <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="start">開始時刻</Label>
                        <Input
                            type="time"
                            value={start}
                            onChange={(e) => setStart(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="end">終了時刻</Label>
                        <Input
                            type="time"
                            value={end}
                            onChange={(e) => setEnd(e.target.value)}
                        />
                    </div>
                    {/* TODO: toastを使った登録完了通知、punchOut使用しない */}
                    <CardFooter className="justify-center pt-4 pb-2">
                        <Button className="mr-4 pr-4" onClick={handleRegister}>登録</Button>
                        <Button className="ml-4 pl-4"
                            onClick={() => router.push('/attendChoice')}
                        >
                            戻る
                        </Button>
                    </CardFooter>
                </CardContent>
            </Card>
        </div>
    );
};

export default EmployeeRegister;