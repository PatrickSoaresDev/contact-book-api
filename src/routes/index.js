module.exports = (app) => {
  app.use(require('./contacts'))
  app.use(require('./events'))
  app.use('*', (req, res) => {
    res.send('Not Found Page')
  })
}
