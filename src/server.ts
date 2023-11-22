const express = require('express')
const mongoose = require('mongoose');


mongoose.connect('mongodb+srv://isabellemayse:PihAMiVJsNEtbnPN@api-client.pztoikt.mongodb.net/?retryWrites=true&w=majority');

const Film = mongoose.model('Film', { 
    title: String,
    description: String,
    Image_url: String,
    trailer_url: String,
});

const cors = require('cors')
const port = 3333

const app = express()

app.use(cors())
app.use(express.json())



app.put('/:id', async (req, res) => {
    const film = await Film.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        description: req.body.description,
        Image_url: req.body.Image_url,
        trailer_url: req.body.trailer_url,
    }, { new: true });

    res.send(film)
})

app.get('/', async (req, res) => {
    const film = await Film.find();
    res.send(film)
})

app.delete('/:id', async (req, res) => {
    const film = await Film.findByIdAndDelete(req.params.id);
    res.send(film)
})

app.post('/',  async (req, res) => {
    const film = new Film({
        title: req.body.title,
        description: req.body.description,
        Image_url: req.body.Image_url,
        trailer_url: req.body.trailer_url,
    });

    await film.save();
    res.send('Filme salvo com sucesso')

})



app.listen(3333, () => console.log('Server is running!'))