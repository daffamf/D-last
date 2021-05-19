var express = require('express');
var router = express.Router();
const path = require('path')
var jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const { query } = require('../config/db');
const { response } = require('express');
const saltRounds = 10;
var firebase = require("firebase");
var admin = require("firebase-admin");
var serviceAccount = require("../rndlast-41f2e-firebase-adminsdk-d2ruo-81904be033.json"); admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

module.exports = function (db) {
    router.post('/firebase/sendNotif', async function (req, res, next) {
        const { token } = req.body;
        admin.messaging().sendMulticast({
            tokens: [
                token
            ],
            notification: {
                title: 'Incoming Order...',
                body: 'Cek halaman pesanan masuk Anda!',
            },
        }).then(function (response) {
            res.send(response)
        }).catch(function (error) {
            console.log("Notification sent failed:", error);
        });
    })

    // Admin Login
    router.post('/users/login', function (req, res, next) {
        const { email, password } = req.body;
        const token = jwt.sign({ email }, 'my_secret_key');
        const sql = `SELECT * FROM users where email = '${email}'`;
        db.query(sql, (err, result) => {
            const token = jwt.sign({ email }, 'my_secret_key');
            const sqlToken = `UPDATE users SET token = '${token}' WHERE email='${email}'`
            if (result.rows.length > 0 && result.rows[0].password == password) {
                db.query(sqlToken, (err, data) => {
                    if (err) return err
                    res.json({
                        data: result.rows,
                        token
                    })
                })
            } else {
                res.json({
                    msg: false
                })
            }
        })
    })

    // Mobile Merchants
    router.post('/merchant/login', function (req, res, next) {
        const { email, password, token_uid } = req.body
        const sql = `SELECT * FROM merchants WHERE email = '${email}' and password = '${password}'`;
        db.query(sql, (err, result) => {
            if (err) { res.send(err) }
            if (result.rowCount == 0) {
                res.status(200).json({
                    msg: 'not exist'
                })
            } else {
                const secret = 'dlast_secret';
                const token = jwt.sign({ email, merchant_id: result.rows[0].merchant_id, nama: result.rows[0].nama, id_merchant: result.rows[0].id }, secret, { expiresIn: "3hr" });
                const sqlUpdate_token = `UPDATE merchants SET token = '${token}', token_uid = '${token_uid}' WHERE email = '${email}'`;
                db.query(sqlUpdate_token, (err) => {
                    if (err) { res.send(err) }
                    res.status(200).json({
                        data: result.rows,
                        token
                    })
                })
            }
        })
    })

    router.put('/merchant/logout', function (req, res, next) {
        const { token } = req.body;
        const sql = `UPDATE merchants SET token = '' WHERE token = '${token}'`;
        db.query(sql, (err) => {
            if (err) { res.send(err) }
            res.status(201).json({
                msg: 'success'
            })
        })
    })

    router.get('/historyInvoice/:id_merchant/:limit', function (req, res, next) {
        const { id_merchant, limit } = req.params
        const sql = `SELECT invoices.*, iklan.nama_makanan, iklan.harga_diskon FROM invoices 
        INNER JOIN iklan ON invoices.id_iklan = iklan.id_iklan 
        WHERE invoices.id_merchant = ${id_merchant} AND invoices.status = true LIMIT ${limit} OFFSET 0`;
        db.query(sql, (err, result) => {
            if (err) { res.send(err) }
            res.json({
                data: result.rows
            })
        })
    })

    router.put('/payment', function (req, res, next) {
        var { kode } = req.body;
        const sql_cek = `SELECT * FROM invoices WHERE id_invoice = '${kode}'`;
        db.query(sql_cek, (error, data) => {
            if (error) { res.send(error) }
            if (data.rows.length > 0) {
                const sql = `UPDATE invoices SET status = true WHERE id_invoice = '${kode}'`;
                db.query(sql, (err, result) => {
                    if (err) { res.send(err) }
                    res.status(201).json({
                        msg: 'Berhasil'
                    })
                })
            } else {
                res.json({
                    msg: 'Data tidak tersedia'
                })
            }
        })
    })


    router.post('/menu', function (req, res, next) {
        const { nama, deskripsi, harga_normal, id_merchant } = req.body
        function makeid(length) {
            var result = '';
            var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            var charactersLength = characters.length;
            for (var i = 0; i < length; i++) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return result;
        }

        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = mm + '_' + yyyy;
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send('No files were uploaded.');
        }
        let foto = req.files.file;
        var filename = today + '_' + makeid(10) + '.jpg';
        foto.mv(path.join(__dirname, '..', 'public', 'images', 'uploads', filename), function (err) {
            if (err) return res.status(500).send(err);
        });
        const id = Date.now()
        const sql = `INSERT INTO menu (id_makanan, nama, harga_asli, status, id_merchant, "createdAt", deskripsi, foto) VALUES ('${id}', '${nama}', ${harga_normal}, 'true', '${id_merchant}', current_timestamp, '${deskripsi}', '${filename}')`;
        db.query(sql, (err) => {
            if (err) { res.send(err) }
            res.status(201).json({
                msg: 'Berhasil memasukkan data'
            })
        })
    })

    router.get('/menu/all/:id_merchant', function (req, res, next) {
        const { id_merchant } = req.params
        let sql = `SELECT * FROM menu WHERE id_merchant = ${id_merchant} AND status = true ORDER BY id DESC`;
        db.query(sql, (err, result) => {
            if (err) { res.send(err) }
            res.json({
                data: result.rows
            })
        })
    })

    router.post('/menu/aktifkan', function (req, res, next) {
        var { id_makanan, nama, deskripsi, harga_asli, startDate, endDate, jlhItems, diskon } = req.body
        const sql_cek = `SELECT id_iklan FROM iklan WHERE id_makanan = '${id_makanan}' AND "endDate" >= now()`;
        db.query(sql_cek, (err, hasil) => {
            if (err) { res.send(err) }
            if (hasil.rows.length > 0) {
                res.status(200).json({
                    msg: 'exist'
                })
            } else {
                const sql = `INSERT INTO iklan (id_makanan, "jlhItems", status, created_at, "startDate", "endDate", harga_normal, harga_diskon, nama_makanan, deskripsi) VALUES ('${id_makanan}', ${jlhItems}, false, current_timestamp, '${startDate}', '${endDate}', ${harga_asli}, ${diskon}, '${nama}', '${deskripsi}')`;
                db.query(sql, (err, result) => {
                    if (err) { res.send(err) }
                    res.status(200).json({
                        msg: 'success'
                    })
                })
            }
        })
    })

    router.get('/menu/:status', function (req, res, next) {
        const { status } = req.params;
        let sql = `SELECT * FROM menu WHERE status = ${status} ORDER BY id DESC`;
        if (status == 'all') {
            sql = `SELECT * FROM menu ORDER BY id DESC`
        }
        db.query(sql, (err, result) => {
            if (err) { res.send(err) }
            res.json({
                data: result.rows
            })
        })
    })

    router.get('/iklan/:id/:search', function (req, res, next) {
        const { search, id } = req.params;
        let sql = `SELECT *, (SELECT SUM(jlh_item) as terjual FROM invoices WHERE id_iklan = i.id_iklan AND date(created_at) = date(now()))
        FROM iklan as i LEFT JOIN menu as m ON i.id_makanan = m.id_makanan
        WHERE now() <= "endDate" AND id_merchant = ${id} ${search !== 'undefined' ? `AND (menu.nama LIKE '%${search}%')` : ''}
        ORDER BY i.id_iklan DESC`;
        db.query(sql, (err, result) => {
            if (err) { res.send(err) }
            res.json({
                data: result.rows
            })
        })
    })

    // Admin Merchants
    router.get('/merchants/:kategori/:page/:search', function (req, res) {
        const { kategori, page, search } = req.params
        var sql = `SELECT * FROM merchants ${search !== 'undefined' ? `WHERE (nama LIKE '%${search}%' OR email LIKE '%${search}%' OR phone LIKE '%${search}%') AND status = true AND kategori = ${kategori}` : `WHERE status = true AND kategori = ${kategori}`}`;
        db.query(sql, (err, result) => {
            var sql_limit = `
                SELECT * FROM merchants ${search !== 'undefined' ? `WHERE (nama LIKE '%${search}%' OR email LIKE '%${search}%' OR phone LIKE '%${search}%') AND status = true` : `WHERE status = true AND kategori = ${kategori}`}
                ORDER BY "createdAt" DESC 
                LIMIT 10 OFFSET ${(Number(page) - 1) * 10}
                `;
            db.query(sql_limit, (err, data) => {
                if (err) {
                    res.send('Gagal memuat data..')
                } else {
                    res.json({
                        data: data.rows,
                        total: result.rows.length,
                        pages: Math.ceil(result.rows.length / 10)
                    })
                }
            })
        })
    });

    router.post('/merchants', function (req, res) {
        const { merchant_id, kategori, nama, email, phone, coordinate, status, alamat } = req.body
        function makeid(length) {
            var result = '';
            var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            var charactersLength = characters.length;
            for (var i = 0; i < length; i++) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return result;
        }
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = mm + '_' + yyyy;
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send('No files were uploaded.');
        }
        let foto = req.files.file;
        var filename = today + '_' + makeid(10) + '.jpg';
        foto.mv(path.join(__dirname, '..', 'public', 'images', 'uploads', filename), function (err) {
            if (err) return res.status(500).send(err);
        });
        var sql = `INSERT INTO merchants (merchant_id, kategori, nama, email, phone, coordinate, "createdAt", status, logo, alamat) VALUES ('${merchant_id}', ${kategori}, '${nama}', '${email}', '${phone}', '${coordinate}', current_timestamp, '${status}', '${filename}', '${alamat}')`;
        db.query(sql, (err, result) => {
            if (err) { res.send(err) }
            res.status(201).json({
                data: result.rows
            })
        })
    });

    router.put('/merchants', function (req, res) {
        const { id, kategori, nama, email, phone, coordinate, status, alamat } = req.body
        var sql = `UPDATE merchants SET kategori=${kategori}, nama='${nama}', email='${email}', phone='${phone}', coordinate='${coordinate}', alamat='${alamat}' WHERE id = ${id};`;
        db.query(sql, (err) => {
            if (err) { res.send(err) }
            res.status(201).json({
                msg: 'Berhasil memperbaharui data!'
            })
        })
    });

    router.put('/menu/delete', function (req, res) {
        const { id_makanan } = req.body
        var sql = `UPDATE menu SET status = false WHERE id_makanan = '${id_makanan}';`;
        db.query(sql, (err) => {
            if (err) { res.send(err) }
            res.status(201).json({
                msg: 'Berhasil memperbaharui data!'
            })
        })
    });

    router.get('/merchants/:id', function (req, res) {
        const { id } = req.params
        var sql = `SELECT * FROM merchants WHERE id = ${id}`
        db.query(sql, (err, data) => {
            if (err) {
                res.send('Gagal memuat data..')
            } else {
                res.json({
                    data: data.rows,
                })
            }
        })
    })

    // Admin Members
    router.get('/members/:page/:search', function (req, res) {
        const { page, search } = req.params
        var sql = `SELECT * FROM members ${search !== 'undefined' ? `WHERE (nama LIKE '%${search}%' OR email LIKE '%${search}%') AND status = true` : 'WHERE status = true'}`;
        db.query(sql, (err, result) => {
            var sql_limit = `
                SELECT * FROM members ${search !== 'undefined' ? `WHERE (nama LIKE '%${search}%' OR email LIKE '%${search}%') AND status = true` : 'WHERE status = true'}
                ORDER BY "createdAt" DESC 
                LIMIT 10 OFFSET ${(Number(page) - 1) * 10}
            `;
            db.query(sql_limit, (err, data) => {
                if (err) {
                    res.send('Gagal memuat data..')
                } else {
                    res.json({
                        data: data.rows,
                        total: result.rows.length,
                        pages: Math.ceil(result.rows.length / 10)
                    })
                }
            })
        })
    });

    router.post('/members', function (req, res) {
        const { nama, email, password, status } = req.body
        function makeid(length) {
            var result = '';
            var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            var charactersLength = characters.length;
            for (var i = 0; i < length; i++) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return result;
        }
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = mm + '_' + yyyy;
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send('No files were uploaded.');
        }
        let foto = req.files.file;
        var filename = today + '_' + makeid(10) + '.jpg';
        foto.mv(path.join(__dirname, '..', 'public', 'images', 'uploads', filename), function (err) {
            if (err) return res.status(500).send(err);
        });
        var sql = `INSERT INTO members (nama, email, password, "createdAt", status) VALUES ('${nama}', '${email}', '${password}',current_timestamp, '${status}', '${filename}')`;
        db.query(sql, (err, result) => {
            if (err) { res.send(err) }
            res.status(201).json({
                data: result.rows
            })
        })
    });

    //Admin Invoices
    router.get('/invoices/:page/:search', function (req, res) {
        const { page, search } = req.params
        var sql = `SELECT * FROM invoices  ${search !== 'undefined' ? `WHERE (id_invoice LIKE '%${search}%' OR deskripsi LIKE '%${search}%') AND status` : 'status'}`;
        db.query(sql, (err, result) => {
            var sql_limit = `
            SELECT * FROM invoices ${search !== 'undefined' ? `WHERE (id_invoice LIKE '%${search}%' OR deskripsi LIKE '%${search}%') AND status ` : 'status'}
            ORDER BY "created_at" DESC 
            LIMIT 10 OFFSET ${(Number(page) - 1) * 10}
            `;
            db.query(sql_limit, (err, data) => {
                if (err) {
                    res.send('Gagal memuat data..')
                } else {
                    res.json({
                        data: data.rows,
                        total: result.rows.length,
                        pages: Math.ceil(result.rows.length / 10)
                    })
                }
            })
        })
    });

    router.post('/invoices', function (req, res) {
        const { id_member, status, deskripsi, id_iklan, jlh_item, id_merchant } = req.body
        function makeid(length) {
            var result = '';
            var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            var charactersLength = characters.length;
            for (var i = 0; i < length; i++) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return result;
        }
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = mm + '_' + yyyy;
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send('No files were uploaded.');
        }
        let foto = req.files.file;
        var filename = today + '_' + makeid(10) + '.jpg';
        foto.mv(path.join(__dirname, '..', 'public', 'images', 'uploads', filename), function (err) {
            if (err) return res.status(500).send(err);
        });
        var sql = `INSERT INTO invoices (id_member, status, deskripsi, id_iklan, jlh_item, id_merchant "created_at") VALUES (${id_member}, '${status}', '${deskripsi}', ${id_iklan}, ${jlh_item}, ${id_merchant},current_timestamp,'${filename}')`;
        db.query(sql, (err, result) => {
            if (err) { res.send(err) }
            res.status(201).json({
                data: result.rows
            })
        })
    });

    router.get('/invoice/:id/:search', function (req, res, next) {
        const { search, id } = req.params;
        const sql = `SELECT invoices.id_merchant, invoices.id_invoice, invoices.deskripsi as deskripsi_invoice, invoices.status, invoices.jlh_item as "jlhItems", iklan.id_makanan, iklan."startDate", iklan."endDate", iklan.harga_normal, iklan.harga_diskon, iklan.nama_makanan, iklan.deskripsi,
        (SELECT nama FROM members WHERE id = invoices.id_member) nama_member
        FROM invoices LEFT JOIN iklan ON invoices.id_iklan = iklan.id_iklan
        WHERE invoices.id_merchant = ${id} AND invoices.status = false AND iklan."endDate" >= now() ${search !== 'undefined' ? `AND ( invoices.id_invoice LIKE '%${search}%' AND nama_member LIKE '%${search}%')` : ''}`;
        db.query(sql, (err, result) => {
            if (err) { res.send(err) }
            res.json({
                data: result.rows
            })
        })
    })

    //Profile
    router.post('/profile', function (req, res) {
        const { username, email, oldpassword, password } = req.body
        function makeid(length) {
            var result = '';
            var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            var charactersLength = characters.length;
            for (var i = 0; i < length; i++) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return result;
        }
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = mm + '_' + yyyy;
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send('No files were uploaded.');
        }
        let foto = req.files.file;
        var filename = today + '_' + makeid(10) + '.jpg';
        foto.mv(path.join(__dirname, '..', 'public', 'images', 'uploads', filename), function (err) {
            if (err) return res.status(500).send(err);
        });
        var sql = `INSERT INTO merchants (username,email,oldpassword, password, "createdAt") VALUES ('${username}', ${email}, '${oldpassword}', '${password}',  current_timestamp,)`;
        db.query(sql, (err, result) => {
            if (err) { res.send(err) }
            res.status(201).json({
                data: result.rows
            })
        })
    });

    router.put('/profile', function (req, res) {
        const { username, email, oldpassword, password } = req.body
        var sql = `UPDATE users SET username=${username}, email='${email}', oldpassword='${oldpassword}', password='${password}' WHERE id = ${id};`;
        db.query(sql, (err) => {
            if (err) { res.send(err) }
            res.status(201).json({
                msg: 'Berhasil memperbaharui data!'
            })
        })
    });

    router.get('/profile/:id', function (req, res) {
        const { id } = req.params
        var sql = `SELECT * FROM users WHERE id = ${id}`
        db.query(sql, (err, data) => {
            if (err) {
                console.log(err)
                res.send('Gagal memuat data..')
            } else {
                res.json({
                    data: data.rows,
                })
            }
        })
    })

   
    router.get('/invoices/:id_invoice', function (req, res) {
        const { id_invoice } = req.params
        var sql = `SELECT * FROM invoices WHERE id_invoice = '${id_invoice}'`
        db.query(sql, (err, data) => {
            if (err) {
                console.log(err)
                res.send('Gagal memuat data..')
            } else {
                res.json({
                    data: data.rows,
                })
            }
        })
    })

    //Mobile Members
    router.put('/member/logout', function (req, res, next) {
        const { token } = req.body;
        const sql = `UPDATE members SET token = 'null' WHERE token = '${token}'`;
        db.query(sql, (err) => {
            if (err) { res.send(err) }
            res.status(201).json({
                msg: 'success'
            })
        })
    })

    router.post('/member/register', function (req, res, next) {
        var { email, password, repassword, username } = req.body;
        let sql;
        sql = `SELECT * FROM members WHERE email = '${email}'`
        db.query(sql, function (err, result) {
            if (err) return handleError(err);
            if (result.rows.length > 0) {
                res.status(200).json({
                    msg: 'Email already exists'
                })
            } else {
                const secret = 'dlast_secret';
                const token = jwt.sign({ email, nama: username, password }, secret, { expiresIn: "3hr" });
                sql = `INSERT INTO members(email,password,nama,token,status,"createdAt") VALUES('${email}','${password}','${username}','${token}',true,current_timestamp)`;
                if (password == repassword) {
                    db.query(sql, function (err, data) {
                        if (err)
                        res.status(201).json({
                            data: [{ email, username, password }],
                            token
                        })
                    })
                } else {
                    res.status(200).json({
                        msg: "Password not match"
                    })
                }
            }
        });
    })

    router.post('/member/login', function (req, res, next) {
        const { email, password } = req.body
        const sql = `SELECT * FROM members WHERE email = '${email}' and password = '${password}'`;
        db.query(sql, (err, result) => {
            if (err) { res.send(err) }
            if (result.rowCount == 0) {
                res.status(200).json({
                    msg: 'not exist'
                })
            } else {
                const secret = 'dlast_secret';
                const token = jwt.sign({ email, id: result.rows[0].id, nama: result.rows[0].nama, id: result.rows[0].id }, secret, { expiresIn: "3hr" });
                const sqlUpdate_token = `UPDATE members SET token = '${token}' WHERE email = '${email}'`;
                db.query(sqlUpdate_token, (err) => {
                    if (err) { res.send(err) }
                    res.status(200).json({
                        data: result.rows,
                        token
                    })
                })
            }
        })
    })

    router.get('/dlast/:limit/:search', function (req, res) {
        const { limit, search } = req.params
        var sql_merchant = `SELECT * FROM merchants ${search !== 'undefined' ?
            `WHERE (nama LIKE '%${search}%' OR email LIKE '%${search}%' OR phone LIKE '%${search}%') ` : `WHERE nama = 'undefined'`}`; db.query(sql_merchant, (err, result) => {
                var sql_menu = `
                SELECT * FROM menu ${search !== 'undefined' ?
                        `WHERE (nama LIKE '%${search}%' OR deskripsi LIKE '%${search}%' OR id_makanan LIKE '%${search}%')` : `WHERE nama = 'undefined`}
                ORDER BY "createdAt" DESC
                LIMIT ${limit} OFFSET 0`;
                db.query(sql_menu, (err, data) => {
                    if (err) {
                        res.send('Gagal memuat data..')
                    } else {
                        res.json({
                            menu: data.rows || [],
                            merchant: result.rows || [],
                        })
                    }
                })
            })
    });

    router.get('/putra/:limit', (req, res) => {
        const { limit } = req.params
        const sql = `SELECT i.*, m.nama as nama_makanan, m.foto ,s.nama as nama_merchant, s.id as id_merchant,s.alamat, s.token_uid, f.status as favorite, f.id as id_favorite, s.logo ,(SELECT SUM(jlh_item) as terjual FROM invoices 
        WHERE id_iklan = i.id_iklan AND date(created_at) = date(now())) FROM iklan as i LEFT JOIN menu as m ON
        i.id_makanan = m.id_makanan LEFT JOIN merchants as s ON s.id = m.id_merchant LEFT JOIN favorite as f ON i.id_iklan = f.id_iklan WHERE i.status=false AND i."endDate" > now() LIMIT ${limit} OFFSET 0`
        db.query(sql, (err, result) => {
            if (err) {
                console.error(err)
            } else {
                res.status(200).json({
                    data: result.rows
                })
            }
        })
    })

    router.post('/putra', (req, res) => {
        const { id_invoices, id_iklan, jlh_item, deskripsi, status, id_member, id_merchant } = req.body.payload
        let sql = `INSERT INTO invoices (id_member ,status, deskripsi, id_invoice, id_iklan, jlh_item, id_merchant ,created_at)
        VALUES( ${id_member}, ${status} ,'${deskripsi}','${id_invoices}',${id_iklan},${jlh_item}, ${id_merchant}, current_timestamp) `
        db.query(sql, (err, result) => {
            if (err) {
                console.error(err)
            } else {
                res.status(201).json({
                    data: result
                })
            }
        })
    })

    router.get('/order/:id', (req, res) => {
        const sql = `SELECT i.*, m.nama_makanan,m.harga_diskon FROM invoices as i LEFT JOIN iklan as m ON i.id_iklan = m.id_iklan WHERE i.id_member = ${req.params.id} ORDER BY created_at DESC`
        db.query(sql, (err, result) => {
            if (err) {
                console.error(err)
            } else {
                res.status(200).json({
                    data: result.rows
                })
            }
        })
    })

    router.post('/favorite', (req, res) => {
        const { id_iklan, id_makanan, id_member, id_merchant } = req.body.payload
        const { id } = req.body
        let sql = `INSERT INTO favorite (id_iklan, id_makanan, id_member, id_merchant, created_at, status, id) VALUES('${id_iklan}',${id_makanan},${id_member},${id_merchant},current_timestamp,true, '${id}') `
        db.query(sql, (err, result) => {
            if (err) {
                console.error(err)
            } else {
                res.status(201).json({
                    data: result
                })
            }
        })
    })

    router.get('/favorite/:id', (req, res) => {
        const { id } = req.params
        const sql = `SELECT i.*, m.nama as nama_makanan, m.foto ,s.nama as nama_merchant, s.id as id_merchant, f.status as favorite, f.id as id_favorite, (SELECT SUM(jlh_item) as terjual FROM invoices WHERE id_iklan = i.id_iklan AND date(created_at) = date(now())) FROM iklan as i LEFT JOIN menu as m ON
        i.id_makanan = m.id_makanan LEFT JOIN merchants as s ON s.id = m.id_merchant LEFT JOIN favorite as f ON i.id_iklan = f.id_iklan WHERE i."endDate" > now() AND f.id_member = ${id}`
        db.query(sql, (err, result) => {
            if (err) {
                console.error(err)
            } else {
                res.status(200).json({
                    data: result.rows
                })
            }
        })
    })

    router.delete('/favorite/:id', (req, res) => {
        const { id } = req.params
        let sql = `DELETE FROM favorite WHERE id='${id}'`;
        db.query(sql, (err, result) => {
            if (err) {
                console.error(err)
            } else {
                res.status(201).json({
                    data: result
                })
            }
        })
    })

    router.get('/merchant/:id', (req, res) => {
        const { id } = req.params
        let sql;
        if (id !== 'undefined') {
            sql = `SELECT * FROM merchants WHERE merchants.id = ${id}`
            db.query(sql, (err, result) => {
                if (err) return err
                sql = `SELECT * FROM menu WHERE menu.id_merchant = ${id}`
                db.query(sql, (err, hasil) => {
                    if (err) return err
                    res.status(200).json({
                        merchant: result.rows,
                        menu: hasil.rows || []
                    })
                })
            })
        } else {
            sql = `SELECT * FROM merchants `
            db.query(sql, (err, result) => {
                if (err) return err
                res.status(200).json({
                    data: result.rows
                })
            })
        }
    })

    /*--------- Verifiy Token ----------*/
    const verifyToken = (req, res, next) => {
        // Get auth header value
        const bearerHeader = req.headers['token'];
        // Check if bearer is undefined
        if (typeof bearerHeader !== 'undefined') {
            // Split at the space
            const bearer = bearerHeader.split(' ');
            // Get token from array
            const bearerToken = bearer[1];
            // Set the token
            req.token = bearerToken;
            // Next middleware
            next();
        } else {
            // Forbidden
            res.sendStatus(403);
        }

    }
    return router;
}















