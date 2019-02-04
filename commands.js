const fs = require('fs');
const axios = require('axios');
let data = JSON.parse(fs.readFileSync('./data.json'));


function showListAll() {
    console.log('All things to do:')
    for (let i = 0; i < data.length; i++) {
        if (data[i].status == 'active' || data[i].status == 'completed') {
            console.log(`${data[i].id}. ${data[i].message} (${data[i].status}).`)
        }
    }
};

function showListActive() {
    console.log('Active things to do:')
    for (let i = 0; i < data.length; i++) {
        if (data[i].status == 'active') {
            console.log(`${data[i].id}. ${data[i].message} (${data[i].status}).`)
        }
    }
};

function showListCompleted() {
    console.log('Done things:')
    for (let i = 0; i < data.length; i++) {
        if (data[i].status == 'completed') {
            console.log(`${data[i].id}. ${data[i].message} (${data[i].status}).`)
        }
    }
};

function showListByGroup(group) {
    if (group == undefined) {
        console.log('You must type a name of group you are looking for.')
    } else {
        console.log(`Things filtered by "${group}" group:`)
        for (let i = 0; i < data.length; i++) {
            if (data[i].group == group) {
                console.log(`${data[i].id}. ${data[i].message} (${data[i].status}).`)
            }
        }
    } 
};

function addTodo(message, group) {
    let id = data.length + 1;
    let newRecord = {
        id,
        message,
        status: 'active',
        group
    }
    data.push(newRecord);
    let dataStringified = JSON.stringify(data);
    fs.writeFileSync('./data.json', dataStringified);
    console.log('A list has been updated!');
};

function deleteTodo(id) {
    data[id-1] = {
        id: id,
        message: 'this record has been erased',
        status: 'deleted',
        group: 'deleted'
    }
    console.log(`ID ${id} record has been erased.`);
    let dataStringified = JSON.stringify(data);
    fs.writeFileSync('./data.json', dataStringified);
};

function changeStatus(id) {
    if (data[id-1].status == 'active') {
        data[id-1].status = 'completed';
    } else if (data[id-1].status == 'completed') {
        data[id-1].status = 'active';
    }
    let dataStringified = JSON.stringify(data);
    fs.writeFileSync('./data.json', dataStringified);
    console.log('Status of a record has been changed!');
};

//---------------------------------------------------------------------------

async function sendData() {
    try {
        const newData = JSON.stringify(data);
        const result = await axios.post('http://api.quuu.linuxpl.eu/todo/ldefvfpl', newData);
        console.log('Data uploaded. Status code:', result.status)
    } catch (error) {
        error => console.log(error);
    }
};
 

async function getData() {
    try {
        const result = await axios.get('http://api.quuu.linuxpl.eu/todo/ldefvfpl')
        console.log('Download has been completed.');
        const resultToSave = JSON.stringify(result.data)
        fs.writeFileSync('./data.json', resultToSave);
        console.log('data.json file has been updated.')
    } catch (error) {
        error => console.log(error);
    }
};

module.exports = {
    showListAll,
    showListActive,
    showListCompleted,
    showListByGroup,
    addTodo,
    deleteTodo,
    changeStatus,
    sendData,
    getData
};