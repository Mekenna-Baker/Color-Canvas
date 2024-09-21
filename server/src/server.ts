const forceDatabaseRefresh = false;

import express from 'express';
import routes from './routes/index.js';
import { sequelize } from './models/index.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static('../client/dist'));

app.use(express.json());
app.use(routes);

sequelize.sync({force: forceDatabaseRefresh}).then(() => {
    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}
            At https://localhost:${PORT}`)
    });
});