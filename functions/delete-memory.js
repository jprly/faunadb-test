const faunadb = require('faunadb')
const faunaClient = new faunadb.Client({ secret: process.env.FAUNADB_SERVER_SECRET })
const q = faunadb.query

const handler = async (event) => {
  if (event.httpMethod !== 'GET'){
    return { statusCode: 500, body: 'GET OUTTA HERE!' }
  }

  try {
    const memory = JSON.parse(event.body)
const memId = memory.ref['@ref'].id
const req = await faunaClient.query(q.Delete(q.Ref(`classes/memories/${memId}`)))
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message}) }
  }
}

module.exports = { handler }
