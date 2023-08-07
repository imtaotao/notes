function openDB(name, stores) {
  return new Promise((resolve, reject) => {
    let db;
    const request = window.indexedDB.open(name, 2);
    request.onsuccess = (e) => {
      db = e.target.result;
      resolve(db);
    };
    request.onupgradeneeded = (e) => {
      db = e.target.result;
      for (const storeName in stores) {
        if (!db.objectStoreNames.contains(storeName)) {
          db.createObjectStore(storeName, stores[storeName]);
        }
      }
    };
  });
}

function closeDB(db) {
  db.close();
}

function read(db, storeName, keyPath) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([storeName]);
    const objectStore = transaction.objectStore(storeName);
    const request = objectStore.get(keyPath); // 根据主键获取
    request.onsuccess = () => {
      resolve(request.result);
    };
    request.onerror = (e) => reject(e);
  });
}

// 插入一条数据
function add(db, storeName, value) {
  return new Promise((resolve, reject) => {
    const request = db
      .transaction([storeName], 'readwrite')
      .objectStore(storeName)
      .add(value);
    request.onsuccess = () => resolve();
    request.onerror = (e) => reject(e.target.error);
  });
}

function update(db, storeName, value) {
  return new Promise((resolve, reject) => {
    const request = db
      .transaction([storeName], 'readwrite')
      .objectStore(storeName)
      .put(value);
    request.onsuccess = () => resolve();
    request.onerror = (e) => reject(e.target.error);
  });
}
