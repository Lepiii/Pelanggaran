const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "pelanggaran_siswa",
});

db.connect((error) => {
    if (error) {
        console.log(error.message);
    } else {
        console.log("mySQL Connected");
    }
});

app.get("/siswa", (req, res) => {
    let sql = "select * from siswa";

    db.query(sql, (error, result) => {
        let response = null;

        if (error) {
            response = {
                message: error.message,
            };
        } else {
            response = {
                count: result.length,
                siswa: result,
            };
        }
        res.json(response);
    });
});

app.post("/siswa", (req, res) => {
    let hai = {
        nis: req.body.nis,
        nama_siswa: req.body.nama_siswa,
        kelas: req.body.kelas,
        poin: req.body.poin,
    }

    let sql = "insert into siswa set ?";

    db.query(sql, hai, (error, result) => {
        let hai = null;

        if (error) {
            hai = {
                message: error.message,
            };
        } else {
            hai = {
                message: result.affectedRows + "berhasil",
            };
        }
    });
    res.json(hai);
});

app.listen(8000, () => {
    console.log("Run on port 8000");
});