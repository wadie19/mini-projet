const mysql = require('mysql');
const express = require('express');
var app = express();
const bodyparser = require('body-parser');

app.use(bodyparser.json());

var conn = mysql.createConnection({
  database: 'mini',
  host: "localhost",
  user: "root",
  password: ""
});


conn.connect(function(err) {
    if (err) {
        throw err;
    }
    console.log("Connected!");

    app.listen(3000, () => console.log('app runnig at port no : 3000'));
    
    var sql1 = "DROP TABLE IF EXISTS Utilisateur ";

    conn.query(sql1, function(err, results) {
        if (err) throw err;
        console.log("Table Utilisateur dropped");
    });

    var sql2 = "CREATE TABLE Utilisateur " +
        " (Id INT not null AUTO_INCREMENT, " +
        " Nom VARCHAR(20), " +
        " Prenom VARCHAR(25), " +
        " Email VARCHAR(255), " +
        " motdepasse VARCHAR(255), " +
        " PRIMARY KEY (Id) )";

    conn.query(sql2, function(err, results) {
        if (err) throw err;
        console.log("Table Utilisateur created");
    });

    var sql3 = "DROP TABLE IF EXISTS Objet ";

    conn.query(sql3, function(err, results) {
        if (err) throw err;
        console.log("Table Objet dropped");
    });

    var sql4 = "CREATE TABLE Objet " +
        " (Id INT not null AUTO_INCREMENT, " +
        " Nom VARCHAR(20), " +
        " description VARCHAR(255), " +
        " Prix Float, " +
        " couleur VARCHAR(255), " +
        " PRIMARY KEY (Id) )";

    conn.query(sql4, function(err, results) {
        if (err) throw err;
        console.log("Table Objet created");
    });
});
//Get an Objet
app.get('/objet/:couleur', (req, res) => {
    mysqlConnection.query('SELECT * FROM Objet WHERE Couleur = ?', [req.params.couleur], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//Delete an Objet
app.delete('/objet/:id', (req, res) => {
    mysqlConnection.query('DELETE FROM Objet WHERE Id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send('Deleted successfully.');
        else
            console.log(err);
    })
});

//Insert an Objet
app.post('/objet', (req, res) => {
    let emp = req.body;
    var sql = "SET @Id = ?;SET @Nom = ?;SET @description = ?;SET @Prix = ?;SET @couleur = ? ;\
    [Id,Nom,description,Prix, couleur];";
    mysqlConnection.query(sql, [emp.EmpID, emp.Name, emp.EmpCode, emp.Salary], (err, rows, fields) => {
        if (!err)
            rows.forEach(element => {
                if(element.constructor == Array)
                res.send('Inserted objet id : '+element[0].Id);
            });
        else
            console.log(err);
    })
});

//Update an Objet
app.put('/objet', (req, res) => {
    let ob = req.body;
    var sql = "SET @Id = ?;SET @Nom = ?;SET @description = ?;SET @Prix = ?;SET @couleur = ? ;\
    [Id,Nom,description,Prix, couleur];";
    mysqlConnection.query(sql, [ob.Id, ob.Nom,ob.description, ob.Prix, ob.couleur], (err, rows, fields) => {
        if (!err)
            res.send('Updated successfully');
        else
            console.log(err);
    })
});
//post ultilsateur
app.post('/utlisateur', (req, res) => {
    let utlisateur = req.body;
    var sql = "SET @Id = ?;SET @Nom = ?;SET @Prenom = ?;SET @Email = ?;SET @motdepasse = ? ;\
    [Id,Nom,Prenom,Email, motdepasse];";
    mysqlConnection.query(sql, [utlisateur.Id,utlisateur.Nom, utlisateur.Prenom, utlisateur.Email, utlisateur.motdepasse], (err, rows, fields) => {
        if (!err)
            rows.forEach(element => {
                if(element.constructor == Array)
                res.send('Inserted utlisateur d id : '+element[0].Id);
            });
        else
            console.log(err);
    })
});
