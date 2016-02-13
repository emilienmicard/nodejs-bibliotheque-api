// =================================================================
// get the packages we need ========================================
// =================================================================
var express 	= require('express');
var app         = express();
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var mongoose    = require('mongoose');
var mkdirp = require('mkdirp');
var path = require('path');
var mime = require('mime');


var fs = require('fs');
var busboy = require('connect-busboy');

var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('./config'); // get our config file
var User   = require('./app/models/user'); // get our mongoose model
var Book   = require('./app/models/book'); // get our mongoose model


// =================================================================
// configuration ===================================================
// =================================================================
var port = process.env.PORT || 8080; // used to create, sign, and verify tokens
mongoose.connect(config.database); // connect to database
app.set('superSecret', config.secret); // secret variable
app.set('imagesdirectory', config.imagesdirectory); // images path

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(busboy({
  limits: {
    fileSize: 5 * 1024 * 1024
  }
}));



// use morgan to log requests to the console
app.use(morgan('dev'));

// =================================================================
// routes ==========================================================
// =================================================================
app.get('/setup', function(req, res) {

    User.remove({}, function (err) {
        if (err) { throw err; }
            console.log('Users clean');
                 
            // create a sample user
            var stdUser = new User({
                name: 'John.Doe',
                password: 'password',
                admin: false
            });
            stdUser.save(function(err) {
                if (err)
                {
                    console.log(err);
                    throw err;
                }
                console.log('User std saved successfully');
                //res.json({ success: true });
            });
                 
                 
             // create a sample user
            var adminUser = new User({
                name: 'Maitre.Yoda',
                password: 'hardpassword',
                admin: true
            });
            adminUser.save(function(err) {
                if (err)
                {
                    console.log(err);
                    throw err;
                }
                console.log('User std saved successfully');
                //res.json({ success: true });
            });
    });
        
        
    Book.remove({}, function (err) {
        if (err) { throw err; }
        console.log('Books clean');

        
            //create books
            var book1 = new Book({id : "1" , name : "La rencontre: l'histoire véridique..." , author : "Allan W. Eckert" , description : "(Texte long Original Rencontre)"});
            var book2 = new Book({id : "2" ,name : "Moi, un lemming" , author : "Arkin Alan" , description : "(Texte long Philo)"});
            var book3 = new Book({id : "3" ,name : "Mama délire, sorcière d'Afrique" , author : "Arthur Claire" , description : "(Sorcière Humour)"});
            var book4 = new Book({id : "4" ,name : "Sales petits voleurs Ludo n° 4" , author : "Bailly, Mathy,Lapière" , description : "(BD. Mélange fiction et réalité)"});
            var book5 = new Book({id : "5" ,name : "Pas touche à mon copain" , author : "Barbeau Philippe" , description : "(Racket)"});
            var book6 = new Book({id : "6" ,name : "Rouge Matou" , author : "Battut Eric" , description : "(Amitié  Album Personnification animaux)"});
            var book7 = new Book({id : "7" ,name : "C'est quoi ta collec'" , author : "Ben Kemoun Hubert" , description : "(Amitié)"});
            var book8 = new Book({id : "8" ,name : "La citrouille olympique" , author : "Ben Kemoun Hubert" , description : "(Moquerie/ enfant obèse)"});
            var book9 = new Book({id : "9" ,name : "Terriblement vert" , author : "Ben Kemoun Hubert" , description : "(Récits parallèles)"});
            var book10 = new Book({id : "10" ,name : "Le serpent à fenêtre" , author : "Bobe Françoise" , description : "(Album Structure Référence contes)"});
            var book11 = new Book({id : "11" ,name : "Le fil à retordre" , author : "Bourgeyx Claude" , description : "(Détournement de mots et de concepts Nouvelles)"});
            var book12 = new Book({id : "12" ,name : "Avril et la poison" , author : "Branford Henrietta" , description : "(Vrai roman d'aventure)"});
            var book13 = new Book({id : "13" ,name : "2 graines de cacao" , author : "Brisou Pellen Evelyne" , description : "(Texte long Aventure )"});
            var book14 = new Book({id : "14" ,name : "Mon extra-terrestre préféré" , author : "Brisou-Pellen Evelyne" , description : "(Science Fiction Extra-terrestres)"});
            var book15 = new Book({id : "15" ,name : "La montagne noire" , author : "Brouillet Christine" , description : "(Récit d'aventure dans la forêt québécoise)"});
            var book16 = new Book({id : "16" ,name : "Les collégiens mènent l'enquête" , author : "Brouillet Christine" , description : "(Policier  Langue)"});
            var book17 = new Book({id : "17" ,name : "Le tunnel" , author : "Browne Anthony" , description : "(Album Affection)"});
            var book18 = new Book({id : "18" ,name : "Une histoire à 4 voix" , author : "Browne Anthony" , description : "(Points de vue)"});
            var book19 = new Book({id : "19" ,name : "Champions, les rollers" , author : "Cahour Chantal" , description : "(Récits courts de petites aventures)"});
            var book20 = new Book({id : "20" ,name : "Oh! les z'amoureux" , author : "Cantin Amélie et Marc" , description : "(Points de vue)"});
            var book21 = new Book({id : "21" ,name : "Rouge Braise" , author : "Causse Rolande" , description : "(Texte long Historique)"});
            var book22 = new Book({id : "22" ,name : "Ba" , author : "Chabas J. François" , description : "(Rencontre Aventure Texte long)"});
            var book23 = new Book({id : "23" ,name : "Trèfle d'or" , author : "Chabat J. François" , description : "(Racisme )"});
            var book24 = new Book({id : "24" ,name : "Le chiffre de nos jours" , author : "Chamson André" , description : "(Journal)"});
            var book25 = new Book({id : "25" ,name : "Les machines de M. Albert" , author : "Choux Nathalie" , description : "(Affection Original Inventions Album)"});
            var book26 = new Book({id : "26" ,name : "Little Lou" , author : "Claverie Jean" , description : "(Musique USA)"});
            var book27 = new Book({id : "27" ,name : "Ma meilleure copine" , author : "Clément Claire" , description : "(Amitié Journal)"});
            var book28 = new Book({id : "28" ,name : "Le temps des cerises" , author : "Clément J. Baptiste" , description : "(La Commune Historique Album)"});
            var book29 = new Book({id : "29" ,name : "Meurtre au pays des peluches" , author : "Cohen-Scali Sarah" , description : "(Enquête)"});
            var book30 = new Book({id : "30" ,name : "Un bisou sorcière" , author : "Cohen-Scali Sarah" , description : "(Sorcière Affection Album)"});
                
            book1.save(function(err) { if (err) { console.log(err);throw err;}console.log('Book 1 saved successfully');});
            book1.save(function(err) {if  (err) { console.log(err);throw err;}console.log('Book 1 saved successfully');});
            book2.save(function(err) { if (err) { console.log(err);throw err;}console.log('Book 2 saved successfully');});
            book3.save(function(err) { if (err) { console.log(err);throw err;}console.log('Book 3 saved successfully');});
            book4.save(function(err) { if (err) { console.log(err);throw err;}console.log('Book 4 saved successfully');});
            book5.save(function(err) { if (err) { console.log(err);throw err;}console.log('Book 5 saved successfully');});
            book6.save(function(err) { if (err) { console.log(err);throw err;}console.log('Book 6 saved successfully');});
            book7.save(function(err) { if (err) { console.log(err);throw err;}console.log('Book 7 saved successfully');});
            book8.save(function(err) { if (err) { console.log(err);throw err;}console.log('Book 8 saved successfully');});
            book9.save(function(err) { if (err) { console.log(err);throw err;}console.log('Book 9 saved successfully');});
            book10.save(function(err) { if (err) { console.log(err);throw err;}console.log('Book 10 saved successfully');});
            book11.save(function(err) { if (err) { console.log(err);throw err;}console.log('Book 11 saved successfully');});
            book12.save(function(err) { if (err) { console.log(err);throw err;}console.log('Book 12 saved successfully');});
            book13.save(function(err) { if (err) { console.log(err);throw err;}console.log('Book 13 saved successfully');});
            book14.save(function(err) { if (err) { console.log(err);throw err;}console.log('Book 14 saved successfully');});
            book15.save(function(err) { if (err) { console.log(err);throw err;}console.log('Book 15 saved successfully');});
            book16.save(function(err) { if (err) { console.log(err);throw err;}console.log('Book 16 saved successfully');});
            book17.save(function(err) { if (err) { console.log(err);throw err;}console.log('Book 17 saved successfully');});
            book18.save(function(err) { if (err) { console.log(err);throw err;}console.log('Book 18 saved successfully');});
            book19.save(function(err) { if (err) { console.log(err);throw err;}console.log('Book 19 saved successfully');});
            book20.save(function(err) { if (err) { console.log(err);throw err;}console.log('Book 20 saved successfully');});
            book21.save(function(err) { if (err) { console.log(err);throw err;}console.log('Book 21 saved successfully');});
            book22.save(function(err) { if (err) { console.log(err);throw err;}console.log('Book 22 saved successfully');});
            book23.save(function(err) { if (err) { console.log(err);throw err;}console.log('Book 23 saved successfully');});
            book24.save(function(err) { if (err) { console.log(err);throw err;}console.log('Book 24 saved successfully');});
            book25.save(function(err) { if (err) { console.log(err);throw err;}console.log('Book 25 saved successfully');});
            book26.save(function(err) { if (err) { console.log(err);throw err;}console.log('Book 26 saved successfully');});
            book27.save(function(err) { if (err) { console.log(err);throw err;}console.log('Book 27 saved successfully');});
            book28.save(function(err) { if (err) { console.log(err);throw err;}console.log('Book 28 saved successfully');});
            book29.save(function(err) { if (err) { console.log(err);throw err;}console.log('Book 29 saved successfully');});
            book30.save(function(err) { if (err) { console.log(err);throw err;}console.log('Book 30 saved successfully');});
                
    });
        
    res.json({ success: true });
    
});

// basic route (http://localhost:8080)
app.get('/', function(req, res) {
	res.send('Hello! The API is at http://localhost:' + port + '/api');
});

// ---------------------------------------------------------
// get an instance of the router for api routes
// ---------------------------------------------------------
var apiRoutes = express.Router();

// ---------------------------------------------------------
// authentication (no middleware necessary since this isnt authenticated)
// ---------------------------------------------------------
// http://localhost:8080/api/authenticate
apiRoutes.post('/authenticate', function(req, res) {

	// find the user
	User.findOne({
		name: req.body.name
	}, function(err, user) {

		if (err) throw err;

		if (!user) {
			res.json({ success: false, message: 'Authentication failed. User not found.' });
		} else if (user) {

			// check if password matches
			if (user.password != req.body.password) {
				res.json({ success: false, message: 'Authentication failed. Wrong password.' });
			} else {

				// if user is found and password is right
				// create a token
				var token = jwt.sign(user, app.get('superSecret'), {
					expiresInMinutes: 1440 // expires in 24 hours
				});

				res.json({
					success: true,
					message: 'Enjoy your token!',
					token: token
				});
			}

		}

	});
});

// ---------------------------------------------------------
// route middleware to authenticate and check token
// ---------------------------------------------------------
apiRoutes.use(function(req, res, next) {

	// check header or url parameters or post parameters for token
	var token = req.body.token || req.param('token') || req.headers['x-access-token'];

	// decode token
	if (token) {

		// verifies secret and checks exp
		jwt.verify(token, app.get('superSecret'), function(err, decoded) {
			if (err) {
				return res.json({ success: false, message: 'Failed to authenticate token.' });
			} else {
				// if everything is good, save to request for use in other routes
				req.decoded = decoded;
				next();
			}
		});

	} else {

		// if there is no token
		// return an error
		return res.status(403).send({
			success: false,
			message: 'No token provided.'
		});
		
	}
	
});

// ---------------------------------------------------------
// authenticated routes
// ---------------------------------------------------------
apiRoutes.get('/', function(req, res) {
	res.json({ message: 'Welcome to the coolest API on earth!' });
});

apiRoutes.get('/books', function(req, res) {
    Book.find({}, function(err, books) {
        books.forEach(function(book){
            if(book.imagefilename){
                book.imagesubpath= "/books/"+book.id+"/image";
            }
        });
        res.json(books);
    });
});

apiRoutes.get('/books/:id', function(req, res) {
    var id = req.params.id;
    Book.findOne({ 'id': id }, function(err, book) {
        if(book.imagefilename){
            book.imagesubpath= "/books/"+id+"/image";
        }
        res.json(book);
    });
});


// create a new book
apiRoutes.post('/books', function(req, res) {
               
    Book.count({ 'id': req.body.id }, function(err, count) {
        if (count>0)
        {
            return res.status(409).send({
                success: false,
                message: 'Another book with the same id already exists'
            });
        }else{
            var book = new Book();
            book.id = req.body.id;
            book.name = req.body.name;
            book.author = req.body.author;

            book.description = req.body.description;
               
            book.save(function(err) {
                if (err){
                    return res.send(err);
                }
                res.json({ message: 'Book '+book.id+' created!' });
                         
            });
        }
    });
});

// update a book
apiRoutes.put('/books/:id', function(req, res) {
    var id = req.params.id;
    
    Book.findOne({ 'id': id }, function(err, book) {
        if (req.body.name)
        {
            book.name = req.body.name;
        }
        if (req.body.description)
        {
            book.description = req.body.description;
        }
                 
        if (req.body.author)
        {
            book.author = req.body.author;
        }
                 
                 
        Book.update({ 'id': id}, { 'name' : book.name , 'author' : book.author , 'description' : book.description }, { multi : true }, function (err) {
            if (err) { throw err; }
            console.log('Book '+id+' updated !');
            res.json({ message: 'Book '+book.id+' updated!' });

        });
    });

});

// delete the book with this id
apiRoutes.delete('/books/:id', function(req, res) {
        
    var id = req.params.id;
        
    Book.remove({
        'id' : id
    }, function(err, bear) {
        if (err)
            res.send(err);

        res.json({ message: 'Successfully deleted' });
    });
});

/*apiRoutes.get('/users', function(req, res) {
	User.find({}, function(err, users) {
		res.json(users);
	});
});*/

apiRoutes.get('/check', function(req, res) {
    //res.json(req.decoded.admin);
	//res.json(req.decoded);
              
              res.status(200).send({
                                          success: true,
                                          message: 'Welcome '+req.decoded.name
                                          });

});

apiRoutes.post('/books/:id/uploadbookimage', function(req, res) {
    var id = req.params.id;
    var fstream;
    req.pipe(req.busboy);
    req.busboy.on('file', function (fieldname, file, filename) {
    
        //var reldir = 'booksimages/' + id ;
        //var fulldir = __dirname + '/' + reldir;
          
        var fulldir = app.get('imagesdirectory') + '/' + id ;
        //var relpath = reldir + '/' + filename;
        var fullpath = fulldir + '/' + filename;
                      
        mkdirp(fulldir, function(err){
            if(err){
                console.log(err);
                response.send("ERROR! Can't make the directory! \n");    // echo the result back
            }
            
            console.log("Uploading: " + filename);
            fstream = fs.createWriteStream(fullpath);
            file.pipe(fstream);
            fstream.on('close', function () {
                       
                Book.findOne({ 'id': id }, function(err, book) {
                    
                    //delete current book image
                    
                    if ((book.imagefilename)&&(book.imagefilename!=filename))
                    {
                        if (fs.existsSync(fulldir + '/' + book.imagefilename)) {
                            fs.unlinkSync(fulldir + '/' + book.imagefilename);
                        }
                    }
                    
                    Book.update({ 'id': id}, { 'imagefilename' : filename }, { multi : true }, function (err) {
                        if (err) { throw err; }
                        console.log('Book '+id+' updated !');
                        

                    });
                });
                       
                res.json({ message: 'File '+filename+' uploaded and db updated' });
            });
        });
    });

});


apiRoutes.get('/books/:id/image', function(req, res){
    var id = req.params.id;
        
        
    Book.findOne({ 'id': id }, function(err, book) {
        
        if (book=='unddefined')
        {
            return res.status(409).send({
                success: false,
                message: 'Image not defined for this book'
            });
        }
        if (book.imagefilename){
                 
            var filename = book.imagefilename;
            var fulldir = app.get('imagesdirectory') + '/' + id ;
            var fullpath = fulldir + '/' + filename;
                     
            console.log(fullpath);
            
            //var file = fs.readFileSync(fullpath, 'binary');
            //res.download(file); // Set disposition and send it.
            
            var file = fullpath;
            var filename = path.basename(file);
            var mimetype = mime.lookup(file);

            res.setHeader('Content-disposition', 'attachment; filename=' + filename);
            res.setHeader('Content-type', mimetype);

            var filestream = fs.createReadStream(file);
            filestream.pipe(res);
        }else{
            return res.status(409).send({
                success: false,
                message: 'Image not defined for this book'
            });
        }
    });


    
});


app.use('/api', apiRoutes);

// =================================================================
// start the server ================================================
// =================================================================
app.listen(port);
console.log('Magic happens at http://localhost:' + port);
