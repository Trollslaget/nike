import { initializeApp } from "firebase/app";
import { get, getDatabase, ref } from "firebase/database";

const firebaseConfig = {
	apiKey: "AIzaSyA4Hs1Sui1k-QA2LLkzMTGeMD03kUhrixw",
	authDomain: "nike-parser.firebaseapp.com",
	databaseURL:
		"https://nike-parser-default-rtdb.europe-west1.firebasedatabase.app",
	projectId: "nike-parser",
	storageBucket: "nike-parser.appspot.com",
	messagingSenderId: "265110176866",
	appId: "1:265110176866:web:937fac1ad9aa3287827d3b",
};


const app = initializeApp(firebaseConfig);
const db = getDatabase();
const dbRef = ref(db, "items");
export const getFirebaseData = (id) => {
    // число либо ничего
	return new Promise((resolve, reject) => {
		get(dbRef)
			.then((snapshot) => {
				if (snapshot.exists()) {
					const data = snapshot.val();

					const filteredArr = data.items.filter(
						(item, index, self) =>
							typeof item === "object" &&
							!Array.isArray(item) &&
							self.findIndex((obj) => obj?.itemText === item?.itemText) ===
								index
					);

					// if (typeof id === "number") {
					if (id) {
						const object = filteredArr.find((obj) => obj.itemId === id);
						console.log(filteredArr);
						console.log(object);
						resolve(object);
					} else {
						resolve(filteredArr);
					}
				} else {
					console.log("Данные не найдены.");
					reject();
				}
			})
			.catch((error) => {
				console.error(error);
				reject();
			});
	});
};
