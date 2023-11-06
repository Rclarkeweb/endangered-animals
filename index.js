import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

const API_URL = "https://api.api-ninjas.com/v1/animals?name=";

// You need to obtain an API key from API Ninjas
// Enter your API Key below
const APIKEY = "ENTER YOUR API KEY HERE";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", async (req, res) => {
    try {
        const api = await axios.get(API_URL + "Red Panda", {
            headers: { 'X-Api-Key': APIKEY }
        });
        const result = JSON.stringify(api.data[0]);
        const data_results = JSON.parse(result);

        res.render("index.ejs", {
            name: data_results["name"],
            taxonomy: data_results["taxonomy"]["scientific_name"],
            locations: data_results["locations"],
            group_behavior: data_results["characteristics"]["group_behavior"],
            population: data_results["characteristics"]["estimated_population_size"],
            threat: data_results["characteristics"]["biggest_threat"],
            habitat: data_results["characteristics"]["habitat"],
            diet: data_results["characteristics"]["diet"],
            slogan: data_results["characteristics"]["slogan"],
            group: data_results["characteristics"]["group"],
            lifespan: data_results["characteristics"]["lifespan"],
        });
    } catch (error) {
        res.status(404).send(error.message);
    }
});


app.post("/findanimal", async (req, res) => {
    const animal_value = req.body.animal;
    try {
        const api = await axios.get(API_URL + animal_value, {
            headers: { 'X-Api-Key': APIKEY }
        });
        const result = JSON.stringify(api.data[0]);
        const data_results = JSON.parse(result);

        res.render("index.ejs", {
            name: data_results["name"],
            taxonomy: data_results["taxonomy"]["scientific_name"],
            locations: data_results["locations"],
            group_behavior: data_results["characteristics"]["group_behavior"],
            population: data_results["characteristics"]["estimated_population_size"],
            threat: data_results["characteristics"]["biggest_threat"],
            habitat: data_results["characteristics"]["habitat"],
            diet: data_results["characteristics"]["diet"],
            slogan: data_results["characteristics"]["slogan"],
            group: data_results["characteristics"]["group"],
            lifespan: data_results["characteristics"]["lifespan"],
        });
    } catch (error) {
        res.status(404).send(error.message);
    }
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});