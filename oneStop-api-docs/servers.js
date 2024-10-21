
// localPort
const localPort = process.env.PORT || 3000;
const nodeEnv = process.env.NODE_ENV || 'development'

let servers =[
  {
    "url": "https://swc.iitg.ac.in/test/onestop/api/v3/",
    "description": "Test Server"
  },
  {
    "url": "https://swc.iitg.ac.in/onestop/api/v3/",
    "description": "Production Server"
  }
]
if (nodeEnv === 'development') {
  servers.push({
    "url": "http://localhost:" + localPort + "/test/onestop/api/v3/",
    "description": "Local Development Server"
  })
}

module.exports = servers;
  