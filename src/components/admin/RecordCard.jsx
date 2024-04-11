// components/RecordCard.js
import React from 'react';
import { Button } from "@/components/ui/button";
import { FaTrash } from 'react-icons/fa6';

function formatMicrosecondsToTime(microseconds) {
    // マイクロ秒をミリ秒に変換
    const milliseconds = microseconds / 1000;
    // ミリ秒から日付オブジェクトを作成
    const date = new Date(milliseconds);
    // console.log(date);
    // 時間と分を取得
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    // console.log(hours, minutes);
    // ゼロ埋めしてフォーマット
    const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}`;
    // console.log(formattedTime);
    return formattedTime;
}


const RecordCard = ({ record, onAction }) => {
    return (
        <div className="border border-gray-300 rounded-lg p-5 max-w-sm m-2 shadow-md">
            <div className='mb-3'>
                <Button onClick={onAction}>
                    <FaTrash /> 削除
                </Button>
            </div>

            <div className="mb-3">
                <strong className="font-semibold">従業員名:</strong> {record.employee_name}
            </div>
            <div className="mb-3">
                <strong className="font-semibold">職場名:</strong> {record.workplace_name}
            </div>
            <div className="mb-3">
                <strong className="font-semibold">日付:</strong> {record.date}
            </div>

            <div className='grid grid-cols-2'>

                <div className="mb-3 mr-1">
                    <strong className="font-semibold">開始時刻:</strong> {formatMicrosecondsToTime(record.start_time.Microseconds)}
                </div>
                <div className="mb-3 ml-1">
                    <strong className="font-semibold">終了時刻:</strong> {formatMicrosecondsToTime(record.end_time.Microseconds)}
                </div>
            </div>

            {/* <div>
                <strong className="font-semibold">備考:</strong> {record.comment}
            </div> */}

        </div>
    );
};

export default RecordCard;
