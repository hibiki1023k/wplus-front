const axios = require("axios");

// Import the necessary modules

// Define the input data
// index.jsから送信するデータを受け取るための関数を定義します
function sendWorkEntry(employeeId, workspaceId, date, hours) {
    const inputData = {
        employee_id: employeeId,
        workspace_id: workspaceId,
        date: date,
        hours: hours,
    };

    // Convert the input data to JSON
    const jsonData = JSON.stringify(inputData);

    // Define the API endpoint URL
    const apiUrl = "http://localhost:8080/work_entries/";  // HTTPSをHTTPに変更しました

    // Make the POST request
    axios.post(apiUrl, jsonData, {
        headers: {
            'Content-Type': 'application/json'  // 正しいContent-Typeヘッダーを設定
        }
        clearText();  // 応答後にテキストフィールドをクリア
    })
    .then(response => {
        // Handle the response here
        console.log(response.data);
        // clear text fields after submit
        clearText();  // 応答後にテキストフィールドをクリア
    })
    .catch(error => {
        // Handle the error here
        console.error(error);
    });
}

// clear text fields after submit
function clearText(){
    document.getElementById("employee_id").value = "";
    document.getElementById("workspace_id").value = "";  // IDが誤っていました
    document.getElementById("date").value = "";          // 日付フィールドをクリアする行を追加
    document.getElementById("hours").value = "";
}
