const app = require( "./app" );
const PORT = 5050;

app.listen( PORT, () => {
    console.log(`Server is listening to port: ${PORT}`);
})