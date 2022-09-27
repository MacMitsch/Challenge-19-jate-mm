import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Added logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  
  console.log('PUT to the database.');
  // Connects the database
  const jateDb = await openDB('jate',1);
// Creates new store & data transaction
  const tx = jateDb.trasaction('jate','readwrite');
// Opens object store
  const store = tx.objectStore('jate');
// Updates content in database
  const request = store.put({id:1, value:content});
// confirmation
  const result = await request;
  console.log("Saved to the database", result.value);
}

// Added logic for a method that gets all the content from the database
export const getDb = async () => {

  console.error('getDb not implemented');
// connecting to IndexDB database
  const jateDb = await openDB('jate',1);
// creates new store & data transaction
  const tx = jateDb.trasaction('jate','readonly');
// Opens object store
  const store = tx.objectStore('jate');
// Grabs all data
  const request = store.put({id:1, value:content});
// confirmation
  const result = await request;
  console.log(result.value);
  return result.value
}
initdb();
