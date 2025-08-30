const express = require('express');
const app = express();
waitingClients = [];

let data="initial data";

app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/index.htm');
});

app.get('/getData', (req, res)=>{
    if(data !== req.query.lastData){
        res.json({data});
    }
    else{
        waitingClients.push(res);
    }
});

app.get('/updateData',(req, res)=>{
    data = req.query.data;
    while(waitingClients.length>0){
        const client = waitingClients.pop();
        client.json({data});
    }
    res.send("Data updated");
});

const PORT =5001;
app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));
