
export const requestEvent = async(req, res, next) => {
     const headers = {
            'Content-Type': 'text/event-stream',
            'Connection': 'keep-alive',
            'Cache-Control': 'no-cache'
     }
     res.writeHead(200, headers);

     const data = `data: ${JSON.stringify({ msg: 'My name is SSE'})}\n\n`

     res.write(data);

}