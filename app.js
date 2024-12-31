//* Import Socket.IO library from the internet
import { io } from "https://cdn.socket.io/4.8.1/socket.io.esm.min.js";

//* Create connection to our server running on localhost port 3000
const socket = io("http://localhost:3000");

//* When successfully connected to the server, show a message in console
socket.on("connect", () => {
    console.log("Connectd to the server");
});

//* Get HTML elements we need to work with
const form = document.querySelector("#form");
const input = document.querySelector("#input");
const ul = document.querySelector("ul");

//* Create empty array to store all messages
const arr = [];

//* When user submits the form (sends a message)
form.addEventListener("submit", (event) => {
    event.preventDefault();  //* Stop form from refreshing page
    socket.emit("Message", input.value);  //* Send message to server
    input.value = ""; //* Clear the input field
    console.log("Message send");
});

//* When we receive a message from the server
socket.on("Message", (msg) => {
    arr.push(msg);  //* Add new message to our array
    console.log("Message from server", msg);  //* Show message in console
    ul.innerHTML = "";  //* Clear the current message list

    //* Go through all messages and display them as list items
    arr.forEach((item) => {
        ul.innerHTML += `<li >${item}</li>`
    });
});
