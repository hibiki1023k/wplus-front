// package main

// import (
//     "encoding/json"
//     "fmt"
//     "io/ioutil"
//     "log"
//     "net/http"
// )

// type WorkEntry struct {
//     EmployeeID  string `json:"employee_id"`
//     WorkspaceID string `json:"workspace_id"`
//     Date        string `json:"date"`
//     Hours       string `json:"hours"`
// }

// func workEntryHandler(w http.ResponseWriter, r *http.Request) {
//     if r.Method == "POST" {
//         var workEntry WorkEntry

//         // リクエストボディからJSONデータを読み込む
//         body, err := ioutil.ReadAll(r.Body)
//         if err != nil {
//             http.Error(w, "Error reading request body",
//                 http.StatusInternalServerError)
//             return
//         }
//         defer r.Body.Close()

//         // JSONデータをWorkEntry型にデコード
//         err = json.Unmarshal(body, &workEntry)
//         if err != nil {
//             http.Error(w, "Error decoding JSON body",
//                 http.StatusBadRequest)
//             return
//         }

//         // 受け取ったデータを出力
//         fmt.Printf("Received work entry: %+v\n", workEntry)

//         // 応答を送信
//         w.WriteHeader(http.StatusOK)
//         w.Header().Set("Content-Type", "application/json")
//         response := map[string]string{"status": "success"}
//         jsonResponse, err := json.Marshal(response)
//         if err != nil {
//             http.Error(w, "Error creating JSON response",
//                 http.StatusInternalServerError)
//             return
//         }
//         w.Write(jsonResponse)
//     } else {
//         // POST以外のメソッドの場合は405 Method Not Allowedを返す
//         http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
//     }
// }

package main

import (
	"fmt"
	"net/http"
)

func main() {
	// ハンドラーを設定
	http.HandleFunc("/work_entries", func(w http.ResponseWriter, r *http.Request) {
		// クライアントにレスポンスを送信
		fmt.Fprintf(w, "これは /work_entries のレスポンスです！")
	})

	// サーバーを開始
	fmt.Println("サーバーが http://localhost:8080 で起動しました")
	if err := http.ListenAndServe(":8080", nil); err != nil {
		fmt.Printf("サーバー起動中にエラーが発生しました: %v\n", err)
	}
}

