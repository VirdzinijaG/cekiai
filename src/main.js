import { default as express } from "express";
import exphbs from "express-handlebars";



const app = express(); // paleidziama funkcija is node_modules
const hbs = exphbs({
    helpers: {
        dateFormat(d) {
            if (d instanceof Date) {
                return d.toISOString().substring(0, 10);
            } else {
                return d;
            }
        }
    }
})
app.engine("handlebars", hbs);
app.set("view engine", "handlebars");

const port = 3000;

app.use(express.static("web")); // tikrina ar web direktorijoje yra failai, pats automatiskai perskaito
app.use(express.json()); // ateina duomenys json 
app.use(express.urlencoded({ // analizuoja gaunamas uzklausas // kai ateina postas (save) uzpildys req.body
    extended: true
}));







app.listen(port, () => { // narsykles port
    console.log(`Example app listening at http://localhost:${port}`);
});