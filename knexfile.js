module.exports = {
    development: {
      client: 'postgresql',
      connection: 'postgress://postgres:Francia10@localhost:5432/arxapp'
    },
    production: {
      client: 'postgresql',
      connection: process.env.DATABASE_URL + '?ssl=true'
    }
  };