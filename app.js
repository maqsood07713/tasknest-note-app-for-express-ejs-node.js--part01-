const express = require('express'); 
const app = express();
const Path = require('path');
const fs = require('fs');
const { log } = require('console');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');  
app.use(express.static(Path.join(__dirname,"public")));


app.get('/', (req, res) => {
    fs.readdir('./files', (err, files) => {
        if (err) {
            console.error(err);
            return;
        }
        res.render('index', { files: files });
    });
});

app.post('/create', (req, res) => {
    fs.writeFile(`./files/${req.body.title.split(' ').join('_')}.txt`, req.body.details, (err) => {
        if (err) {
            console.error(err);
            return;
        }
        res.redirect('/');
    });
});

app.get('/file/:filename', (req, res) => {
    const filename = req.params.filename;
    fs.readFile(`./files/${filename}`, 'utf8', (err, data ) => {
        if (err) {
            console.error(err);
            return;
        }
        res.render('show', { filename: filename, data: data });
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});