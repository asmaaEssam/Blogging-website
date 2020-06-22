const express = require('express');
const app = require('./connection');
const cors = require('cors')

app.use(cors())
const userRouter = require('./router/users')
// const todoRouter = require('./router/toDo')
app.use(express.json());
app.use(["/user","/users"], userRouter);
// app.use(["/todo"], todoRouter);