import { dialogflow } from 'actions-on-google';
import axios from 'axios';
import chalk from 'chalk';
import sql from 'mssql';

const app = dialogflow({ debug: true });

const config = {
    user: 'sa',
    password: 'Oak1nd1a01',
    server: 'localhost', // You can use 'localhost\\instance' to connect to named instance
    database: 'AISpeaker',

    options: {
        encrypt: false, // Use this if you're on Windows Azure
    },
};
const pool = new sql.ConnectionPool(config);

app.intent('Default Welcome Intent', (conv) => {
    conv.ask('Welcome to castleton home service solution!');
    conv.ask('Please tell us, your identification number!');
});

app.intent('identification', async (conv, params) => {
    // your logic here
    try {
        const response = await axios.get('http://localhost:3333/user', { data: { UserId: params.number } });
        const data = response.data;
        conv.ask(`Hi, ${data.Name}`);
        conv.ask(`How may i help you today?`);
        console.log(data);
    } catch (error) {
        console.log(error);
    }
});

app.intent('userproblem', (conv, params) => {
    conv.ask(`Sorry to hear, that your ${params.house} is not working.`);
    conv.ask('Do you want to raise complaint?');
});

app.intent('raise complaint', async (conv, params) => {
    // let conn: any;
    try {
        // conn = await pool.connect();
        // const request = new sql.Request(conn);
        if (params.complaint === 'yes') {
            //  const result = await request.query(`INSERT INTO [dbo].[UserProblems]([UserId],[Description],[Active]) VALUES ('${params.number}','${JSON.stringify(params)}', 1);`);
            conv.close('Complaint raised, Thank you for choosing castleton home service solution.');
        } else {
            conv.close('Thank you for choosing castleton home service solution.');
        }
    } catch (error) {
        console.log(chalk.bgRed(error));
    } finally {
        // await conn.close();
    }

});
app.catch((conv, error) => {
    console.error(error);
    conv.ask('I encountered a glitch. Can you say that again?');
});

export const dialogflowApp = app;
