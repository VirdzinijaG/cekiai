import mysql from "mysql";

const connect = {
    host: "localhost",
    user: "nodejs",
    password: "nodejs123456",
    database: "cekiai",
    multipleStatements: true,
};

function dbConnect() {
    const conn = mysql.createConnection(connect);
    return new Promise((resolve, reject) => {
        conn.connect((err) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(conn);
        });
    });
}

function dbDisconnect(conn) {
    if (conn) {
        return new Promise((resolve, reject) => {
            conn.end((err) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve();
            });
        });
    } else {
        return Promise.resolve();
    }
}

function dbQuery(conn, ...args) {
    return new Promise((resolve, reject) => {
        conn.query(...args, (err, results, fields) => {
            if (err) {
                reject(err);
                return;
            }
            resolve({
                results,
                fields,
            });
        });
    });
}

async function getCekiai() {
    let conn;
    try {
        conn = await dbConnect();
        let r = await dbQuery(conn, "select id, data, pardavejai_id, apmokejimo_tipai_id from cekiai"); // duomenu paemimas is duomenu bazes
        // console.log(r.results);
        return r.results;
    } finally {
        try {
            await dbDisconnect(conn);
        } catch (err) {
        }
    }
}


export { getCekiai }