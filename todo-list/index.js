const express = require('express');
const ejs = require('ejs');
const path = require('path')
const app = express();
const port = 3000;

/**Mettre en place le templating ejs */
app.set('view engine', 'ejs')

/**Parser avec express.json() */
app
  .use(express.json())
  .use(express.urlencoded({extended: true}))

/**Data tasks */
const tasks = [
    {title: 'Apprendre à programmer', done: true},
    {title: 'Faire les courses', done: false},
    {title: 'Ranger courses', done: false}
]

/**Endpoints */
app.get('/task/:id/done', (req, res) => {
    if(tasks[req.params.id]) {
        tasks[req.params.id].done = true
    }
    res.redirect('/')
})
app.get('/task/:id/delet', (req, res) => {
    if(tasks[req.params.id]) {
    tasks.splice(req.params.id, 1)
    }
    res.redirect('/')
})

app.get('/', (req, res) => {
    res.render(path.join(__dirname, 'views/pages/todolist'), { tasks })
})
app.post('/task', (req, res) => {

    if(req.body.task) {
        tasks.push({title:req.body.task, done: false})
    }
    console.log(tasks);
    res.redirect('/')
})


/**Endpoint ERROR 404 */
app.use( (req,res) => {
    res.status(404).render(path.join(__dirname, 'views/pages/page404'))
})

app.listen(port, () => {
    console.log(`listening on server http://localhost:${port}`);
})




