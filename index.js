const express = require('express'),
  app = express(),
  port = process.env.PORT || 5000

app.get('/', (req, res) => {
  res.send({bye: `buddy`})
})

app.listen(port, () => {
  console.log(`Server listening on port:${port}`)
})
