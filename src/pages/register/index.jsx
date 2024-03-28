import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function register() {
  const router = useRouter();
  const { data: dataString } = router.query;
  // const dataString = {
  //   office_id: 1,
  //   employee_id: 1,
  //   name: "test_user",
  // };
  const usr = dataString ? JSON.parse(decodeURIComponent(dataString)) : null; // JSON文字列をオブジェクトに変換する（dataが存在する場合）

    return (
        <div>
            {usr.name ? (
                <div>
                    {`${usr.name}さん、今日は何時間働きましたか？`}
                </div>
            ) : (
                <div>Loading...</div>
            )}
            {/* 労働時間を入力するための UI 要素をここに追加 */}
        </div>
    );
}
