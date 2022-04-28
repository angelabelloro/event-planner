import * as SQLite from 'expo-sqlite'

const db = SQLite.openDatabase('address.db')

export const init = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS address (
          id INTEGER PRIMARY KEY NOT NULL,
          title TEXT NOT NULL,
          address TEXT NOT NULL,
          lat REAL,
          lng REAL
        )`,
        [],
        () => { resolve() },
        (_, err) => { reject(err) },
      )
    });
  })

  return promise;
}

export const insertAddress = (title, address, lat, lng) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `INSERT INTO address (title, address, lat, lng)
          VALUES (?, ?, ?, ?)`,
        [title, address, lat, lng],
        (_, result) => { resolve(result) },
        (_, err) => { reject(err)},
      )
    })
  })

  return promise;
}

export const loadAddress = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM address',
        [],
        (_, result) => { resolve(result) },
        (_, err) => { reject(err) },
      )
    })
  })

  return promise;
}