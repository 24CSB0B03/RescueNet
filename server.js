// server.js (Node.js backend with Express)
const express = require("express");
const axios = require("axios");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const WEATHER_API = "https://api.openweathermap.org/data/2.5/weather";
const EARTHQUAKE_API = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.geojson";
const API_KEY = "YOUR_OPENWEATHERMAP_API_KEY";

app.get("/weather", async (req, res) => {
    try {
        const { city } = req.query;
        const response = await axios.get(`${WEATHER_API}?q=${city}&appid=${API_KEY}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Error fetching weather data" });
    }
});

app.get("/earthquakes", async (req, res) => {
    try {
        const response = await axios.get(EARTHQUAKE_API);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Error fetching earthquake data" });
    }
});

io.on("connection", (socket) => {
    console.log("New client connected");
    socket.on("disconnect", () => console.log("Client disconnected"));
});

server.listen(5000, () => console.log("Server running on port 5000"));
