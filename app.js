const yargs = require('yargs');

const {
    showListAll,
    showListActive,
    showListCompleted,
    showListByGroup,
    addTodo,
    deleteTodo,
    changeStatus,
    sendData,
    getData
} = require('./commands');


const showListAllCommand = {
    command: 'all',
    describe: 'Shows a list of all TODO records.',
    handler: async () => {
        try {
            await showListAll();
        } catch (error) {
            console.log(error.message);
        }
    }
};

const showListActiveCommand = {
    command: 'active',
    describe: 'Shows a list of active TODO records.',
    handler: async () => {
        try {
            await showListActive();
        } catch (error) {
            console.log(error.message);
        }
    }
};

const showListCompletedCommand = {
    command: 'completed',
    describe: 'Shows a list of completed records.',
    handler: async () => {
        try {
            await showListCompleted();
        } catch (error) {
            console.log(error.message);
        }
    }
};

const showListByGroupCommand = {
    command: 'group',
    describe: 'Shows a list of TODO records filtered by their group.',
    handler: async () => {
        try {
            await showListByGroup(process.argv[3]);
        } catch (error) {
            console.log(error.message);
        }
    }
};

const addTodoCommand = {
    command: 'add',
    describe: 'Adds a new record to the list: message, group.',
    handler: async () => {
        try {
            await addTodo(process.argv[3], process.argv[4]);
        } catch (error) {
            console.log(error.message);
        }
    }
};

const deleteTodoCommand = {
    command: 'delete',
    describe: 'Erases a record with selected ID from the list.',
    handler: async () => {
        try {
            await deleteTodo(process.argv[3]);
        } catch (error) {
            console.log(error.message);
        }
    }
};

const changeStatusCommand = {
    command: 'change',
    describe: 'Changes status of a record.',
    handler: async () => {
        try {
            await changeStatus(process.argv[3]);
        } catch (error) {
            console.log(error.message);
        }
    }
};

const sendDataCommand = {
    command: 'upload',
    describe: 'Uploads data to the server.',
    handler: async () => {
        try {
            await sendData();
        } catch (error) {
            console.log(error.message);
        }
    }
};

const getDataCommand = {
    command: 'download',
    describe: 'Downloads data from the server.',
    handler: async () => {
        try {
            await getData();
        } catch (error) {
            console.log(error.message);
        }
    }
};


yargs
.command(showListAllCommand)
.command(showListActiveCommand)
.command(showListCompletedCommand)
.command(showListByGroupCommand)
.command(addTodoCommand)
.command(deleteTodoCommand)
.command(changeStatusCommand)
.command(sendDataCommand)
.command(getDataCommand)
.argv


