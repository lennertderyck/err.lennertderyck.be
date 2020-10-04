export default (req, res) => {
  console.log(req.headers.host);
    res.json({
      body: req.body,
      query: req.query,
      cookies: req.cookies,
      res: req.headers['x-forwarded-host']
    })
}