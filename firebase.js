// Firebase App (必須)
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, query, where, updateDoc, doc, deleteDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// Firebaseの初期化
const firebaseConfig = {
    apiKey: "AIzaSyB5Q-33mnR0OHCIgRfsZQqhp3DtJl_HqSo",
    authDomain: "localstorage-350f8.firebaseapp.com",
    projectId: "localstorage-350f8",
    storageBucket: "localstorage-350f8.appspot.com",
    messagingSenderId: "813792564394",
    appId: "1:813792564394:web:f0647834bbfc23e6c36cd3"
};

// Firebaseの初期化
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);  // dbをエクスポート

document.addEventListener("DOMContentLoaded", () => {
  // フォームの送信処理（保存）
  document.getElementById("property-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const location = document.getElementById("location").value;
    const cost = document.getElementById("cost").value;
    const monthlyCost = document.getElementById("monthlyCost").value;

    try {
      // 既存の物件名があるかチェック
      const propertiesRef = collection(db, "properties");
      const q = query(propertiesRef, where("name", "==", name));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // 物件名がすでに存在する場合、上書きするか確認
        if (confirm("同じ物件名で登録されています。上書きしてもいいですか？")) {
          const docId = querySnapshot.docs[0].id;
          const docRef = doc(db, "properties", docId);
          await updateDoc(docRef, {
            location: location,
            cost: Number(cost),
            monthlyCost: Number(monthlyCost)
          });
          alert("データが上書きされました");
        }
      } else {
        // データ新規登録
        await addDoc(collection(db, "properties"), {
          name: name,
          location: location,
          cost: Number(cost),
          monthlyCost: Number(monthlyCost)
        });
        alert("データが保存されました");
      }

      document.getElementById("property-form").reset();
    } catch (error) {
      console.error("エラーが発生しました: ", error);
      alert("保存中にエラーが発生しました。");
    }
  });

  // フォームの送信処理（検索）
  document.getElementById("search-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const searchQuery = document.getElementById("search").value.toLowerCase();

    try {
      const propertyList = document.getElementById("property-list");
      propertyList.innerHTML = ""; // リストをクリア

      const propertiesRef = collection(db, "properties");
      const querySnapshot = await getDocs(propertiesRef);
      let resultsFound = false;

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.name.toLowerCase().includes(searchQuery)) {
          resultsFound = true;
          const listItem = document.createElement("li");
          listItem.innerHTML = `
            物件名: ${data.name}, 場所: ${data.location}, 初期費用: ${data.cost}円, 月額費用: ${data.monthlyCost}円
            <button onclick="deleteProperty('${doc.id}')">削除</button>
          `;
          propertyList.appendChild(listItem);
        }
      });

      if (!resultsFound) {
        alert("その物件名では登録がありません");
      }
    } catch (error) {
      console.error("検索に失敗しました: ", error);
      alert("検索中にエラーが発生しました。");
    }
  });

  // 全物件を表示するボタンの処理
  document.getElementById("list-all").addEventListener("click", async () => {
    try {
      const propertyList = document.getElementById("property-list");
      propertyList.innerHTML = ""; // リストをクリア

      const propertiesRef = collection(db, "properties");
      const querySnapshot = await getDocs(propertiesRef);

      if (querySnapshot.empty) {
        alert("登録された物件はありません");
      } else {
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const listItem = document.createElement("li");
          listItem.innerHTML = `
            物件名: ${data.name}, 場所: ${data.location}, 初期費用: ${data.cost}円, 月額費用: ${data.monthlyCost}円
            <button onclick="deleteProperty('${doc.id}')">削除</button>
          `;
          propertyList.appendChild(listItem);
        });
      }
    } catch (error) {
      console.error("一覧の取得に失敗しました: ", error);
      alert("一覧の取得中にエラーが発生しました。");
    }
  });

  // 物件を削除する関数
  window.deleteProperty = async function(docId) {
    if (confirm("この物件を削除しますか？")) {
      try {
        await deleteDoc(doc(db, "properties", docId));
        alert("物件が削除されました");
        document.getElementById("list-all").click(); // 削除後に全物件リストを再表示
      } catch (error) {
        console.error("削除に失敗しました: ", error);
        alert("削除中にエラーが発生しました。");
      }
    }
  };
});
