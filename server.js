const app = require("./app");

require("dotenv/config")

require("./src/databaseConnect")

app.listen(process.env.PORT, () => {
    console.log(`Server is working on http://localhost:${process.env.PORT}`)
})