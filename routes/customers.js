
/*
 * GET users listing.
 */
var pg = require("pg");
var connectionString = "postgres://postgres:root@localhost:5432/database";

function insertByID(cols, table) {
    // Setup static beginning of query
    var query = ['INSERT INTO'];

    // Create another array storing each set command
    // and assigning a number value for parameterized query
    var col = [];
    var seq = [];
    Object.keys(cols).forEach(function (key, i) {
        col.push(key);
        seq.push('$' + (i + 1));
    });

    // Setup table name
    query.push(table + '(' + col.join(', ') + ')');
    query.push('VALUES(' + seq.join(', ') + ')');

    // Add the WHERE statement to look up by id
    query.push('RETURNING *');

    // Return a complete query string
    return query.join(' ');
}

function updateByID(id, cols, table) {
    // Setup static beginning of query
    var query = ['UPDATE'];
    // Setup table name
    query.push(table);
    query.push('SET');

    // Create another array storing each set command
    // and assigning a number value for parameterized query
    var col = [];
    Object.keys(cols).forEach(function (key, i) {
        col.push(key + ' = ($' + (i + 1) + ')');
    });

    query.push(col.join(', '));

    // Add the WHERE statement to look up by id
    query.push('WHERE id = ' + id);

    // Return a complete query string
    return query.join(' ');
}


exports.list = function (req, res) {

    //  req.getConnection(function (err, connection) {
    pg.connect(connectionString, function (err, client, done) {
        if (err) {
            console.log("not able to get connection " + err);
            res.status(400).send(err);
        }
        client.query('SELECT * FROM customer', function (err, result) {
            done(); // closing the connection;
            if (err) {
                console.log(err);
                res.status(400).send(err);
            }
            //res.status(200).send(result.rows);
            res.render('customers', { page_title: "Customers - Node.js", data: result.rows });
        });
        //console.log(query.sql);
    });
    //  });
};

exports.add = function (req, res) {
    res.render('add_customer', { page_title: "Add Customers - Node.js" });
};

exports.edit = function (req, res) {

    var id = req.params.id;

    pg.connect(connectionString, function (err, client, done) {
        if (err) {
            console.log("not able to get connection " + err);
            res.status(400).send(err);
        }
        client.query('SELECT * FROM customer WHERE id = $1', [id], function (err, result) {
            done(); // closing the connection;
            if (err) {
                console.log(err);
                res.status(400).send(err);
            }
            //res.status(200).send(result.rows);
            res.render('edit_customer', { page_title: "Edit Customers - Node.js", data: result.rows });


        });

        //console.log(query.sql);
    });

};

/*Save the customer*/
exports.save = function (req, res) {

  //  var input = JSON.parse(JSON.stringify(req.body));
    var data = JSON.parse(JSON.stringify(req.body));

  //  var data = [input.name, input.address, input.email, input.phone];

    pg.connect(connectionString, function (err, client, done) {
        if (err) {
            console.log("not able to get connection " + err);
            res.status(400).send(err);
        }


        var query = insertByID(data, 'customer');

        // Turn req.body into an array of values       
        var colValues = Object.keys(data).map(function (key) {
            return req.body[key];
        });

        if (err) {
            console.log("not able to get connection " + err);
            res.status(400).send(err);
        }
        client.query(query, colValues, function (err, result) {
            if (err)
                console.log("Error Updating : %s ", err);
            res.redirect('/customers');
        });


        //client.query("INSERT INTO customer(name, address, email, phone) VALUES($1, $2, $3, $4) RETURNING *", data, function (err, rows) {
        //    done(); // closing the connection;
        //    if (err) {
        //        console.log(err);
        //        res.status(400).send(err);
        //    }
        //    res.redirect('/customers');

        //});

    });

};

exports.update = function (req, res) {

    var data = JSON.parse(JSON.stringify(req.body));
    var id = req.params.id;

    pg.connect(connectionString, function (err, client, done) {

        var query = updateByID(id, data, 'customer');

        // Turn req.body into an array of values       
        var colValues = Object.keys(data).map(function (key) {
            return req.body[key];
        });

        if (err) {
            console.log("not able to get connection " + err);
            res.status(400).send(err);
        }
        client.query(query, colValues, function (err, result) {
            if (err)
                console.log("Error Updating : %s ", err);
            res.redirect('/customers');
        });

    });

};


exports.delete = function (req, res) {

    var id = req.params.id;

    //  req.getConnection(function (err, connection) {
    pg.connect(connectionString, function (err, client, done) {
        if (err) {
            console.log("not able to get connection " + err);
            res.status(400).send(err);
        }
        client.query("DELETE FROM customer  WHERE id = ? ", [id], function (err, rows) {

            if (err)
                console.log("Error deleting : %s ", err);

            res.redirect('/customers');

        });
    });
    //   });
};


