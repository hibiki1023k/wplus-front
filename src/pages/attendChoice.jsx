import { Button } from "@/components/ui/button";
import { data } from "autoprefixer";
import { useRouter } from "next/router";

export default function AttendChoice() {
    const router = useRouter();
    const { dataSended } = router.query;
    const usr = dataSended ? JSON.parse(decodeURIComponent(dataSended)) : null;
    // const usr = {
    //     id: 1,
    //     office_id: 1,
    //     name: "test_user",
    // };
    const dataSended = encodeURIComponent(JSON.stringify(usr));

    const handleRegister = () => {
        if (usr.role !== "admin") {
            router.push(`/register/?data=${dataSended}`);
        } else {
            alert("管理者は勤怠登録ができません。");
        }
    };

    const handleManage = () => {
        if (usr.role !== "employee") {
            router.push(`/admin/?data=${dataSended}`);
        } else {
            alert("従業員は勤怠管理ができません。");
        }
    };
    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
            <Button className="mb-4 w-1/3" onClick={handleRegister}>
                勤怠登録
            </Button>
            <Button className="mt-2 w-1/3" onClick={handleManage}>
                勤怠管理
            </Button>
        </div>
    );
}
