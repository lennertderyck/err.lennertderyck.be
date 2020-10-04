const {AIRTABLE_BASE, AIRTABLE_KEY} = process.env;

const Airtable = require('airtable');
Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: AIRTABLE_KEY
});
const base = Airtable.base(AIRTABLE_BASE);

export default async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )
  
  const {title, message, url, error} = req.query;
  base('Errors').create([
    {
      "fields": {
        "title": title,
        "message": message,
        "url": url,
        "error": error,
        "status": "Todo"
      }
    }
  ], (err, recs) => {
    res.json({
      query: req.query,
      cookies: req.cookies,
      error: err,
    })
  })  
  
  
}
// http://localhost:3000/api/new?title=This is a test&message=something went wrong when adding record&url=root&error=official error message