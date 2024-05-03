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

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.error('putDb not implemented');

// Create a connection to the database database and version we want to use.
const todosDb = await openDB('jate', 1);

// Create a new transaction and specify the database and data privileges.
const tx = todosDb.transaction('jate', 'readwrite');

// Open up the desired object store.
const store = tx.objectStore('jate');
const timeStamp = Date.now();
await store.put({content: timeStamp});
await tx.done;
console.log('content added');
// // Use the .add() method on the store and pass in the content.
// const request = store.add({ todo: content });

// // Get confirmation of the request.
// const result = await request;
// console.log('Data saved to the database', result);
  
}

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.error('getDb not implemented');

 // Create a connection to the database database and version we want to use.
 const todosDb = await openDB('jate', 1);

 // Create a new transaction and specify the database and data privileges.
 const tx = todosDb.transaction('jate', 'readonly');

 // Open up the desired object store.
 const store = tx.objectStore('jate');

 // Use the .getAll() method to get all data in the database.
 const request = store.getAll();

  // Get confirmation of the request.
 const result = await request;
 console.log('result.value', result);

 if (result.length === 0) {
  return null;
 }

 return result[0].content;
};



initdb();
