import express from "express"
import { sse } from "../sse/sse_init.js"

const sse_router = express.Router();

sse_router.get('/stream', sse.init)

export default sse_router