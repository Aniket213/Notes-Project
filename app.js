const express = require('express');
const mongoose = require('mongoose');
const blogs = require('./model/data');
// changed
const ani = 10;
const app = express();

//----------------------------------------- connecting to the database ------------------------------------------------------
const url = "mongodb+srv://NotesProject:NotesProject@firstone.2ev89vc.mongodb.net/notes-project?retryWrites=true&w=majority";
mongoose.connect(url, {useNewUrlParser : true, useUnifiedTopology : true})
    .then((res)=>{
        console.log('Connected to the database');
    })
    .catch((err)=>{
        // console.log(err);
        console.log("not connected");
    })


app.listen(3000);
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended : true}));


// ------------------------------------------- routing different ejs files -----------------------------------------------------

app.get('/', (req, res)=>{

    blogs.find().sort({ createdAt : -1 })
        .then((result)=>{
            res.render('index', { title : 'Notes', blogs : result});
        })
        .catch((err)=> console.log(err));
})

app.get('/create', (req, res)=>{
    res.render('create', { title : 'Create new note'});
})

app.get('/about', (req, res)=>{
    res.render('about', { title : 'About'});
})

// sending data to the database 
app.post('/', (req, res)=>{
    const newitem = new blogs(req.body);
    newitem.save()
        .then((result)=>{
            res.redirect('/');
        })
        .catch((err)=> console.log(err));
})

app.get('/:id', (req, res)=>{
    const id = req.params.id;
    blogs.findById(id)
        .then((result)=>{
            res.render('details', {title : "Details", blog : result})
        })
        .catch((err)=> console.log(err));
})

app.delete('/:id', (req, res)=>{
    const id = req.params.id;
    blogs.findByIdAndDelete(id)
        .then((result)=>{
            res.json({ redirect : '/' });
        })
        .catch((err) => console.log(err))
})

app.use((req, res)=>{
    res.render('error', { title : 'Error'});
})


