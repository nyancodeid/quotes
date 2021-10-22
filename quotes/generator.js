/* eslint no-console: ["warn",{ allow: [ "info", "time", "timeEnd" ] }] */

const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')
const md5 = require('md5')
const fetch = require('node-fetch')

const dotenv = require('dotenv-flow')
dotenv.config()

const AVAILABLE_GRADIENT_VARIANTS = 14

async function fetchAllQuotesYaml() {
  const quotes_path = path.join(__dirname, '../quotes')
  const quotes_file_paths = fs
    .readdirSync(quotes_path)
    .filter(file => file.endsWith('.yaml') || file.endsWith('.yml'))

  const quotes_files = await Promise.all([
    ...quotes_file_paths.map(file => parseYamlFile(quotes_path, file)),
  ])

  return quotes_files.filter(quote => !!quote)
}

async function parseYamlFile(quotes_path, file) {
  const contains = await fs.promises.readFile(
    path.join(quotes_path, file),
    'utf8',
  )

  try {
    const parsed = yaml.load(contains)
    return parsed
  }
  catch (err) {
    console.info(`[GENERATOR]: Error parsed file [${file}]`)
    return null
  }
}

async function generateQuotesFile(quotes) {
  const quotes_valid = []
  let github_users = []

  if (process.env.GITHUB_TOKEN) {
    const users = quotes.filter((user) => {
      return (user.quotes.length > 0)
    }).map(quote => ({
      id: getHashUsername(quote.username),
      username: quote.username,
    }))

    github_users = await getGithubProfiles(users)
  }

  for (const user of quotes) {
    if (user.quotes.length === 0) continue

    let github = getGithubProfileByHash(github_users, user.username)

    if (!github.available)
      github = await getGithubProfileByUsername(user.username)

    for (const quote of user.quotes) {
      quotes_valid.push({
        id: md5(`${user.username}:${quote.text}`),
        username: user.username,
        github,
        gradient_id: randomGradientIndex(),
        ...quote,
      })
    }
  }

  return quotes_valid
}

function getHashUsername(username) {
  return `u${md5(username).slice(0, 8)}`
}

function getGithubProfileByHash(users, username) {
  const user = users.find(([hash]) => (hash === getHashUsername(username)))

  if (!user) return { available: false }
  if (!user[1]) return { available: false }

  return {
    available: true,
    name: user[1].name || username,
    avatar_url: user[1].avatarUrl,
    followers: user[1].followers.totalCount,
  }
}

async function getGithubProfileByUsername(username) {
  const headers = {}

  if (process.env.GITHUB_TOKEN)
    headers.Authorization = `Basic ${process.env.GITHUB_TOKEN}`

  const res = await fetch(`https://api.github.com/users/${username}`, {
    method: 'GET',
    headers,
  })

  if (res.status === 404) {
    console.info(`[GENERATOR]: user [${username}] is unavailable!`)
    return {
      available: false,
    }
  }

  const data = await res.json()

  return {
    available: true,
    name: data.name || username,
    avatar_url: data.avatar_url,
    followers: data.followers,
  }
}

/**
 * @param {string[]} users
 */
async function getGithubProfiles(users) {
  const query_users = users.map(({ id, username }) => `
      ${id}: user(login: "${username}") {
        ...UserFragment
      }`).join('')

  const query = `query {
    ${query_users}
  }
  
  fragment UserFragment on User {
    login
    name
    avatarUrl
    followers {
      totalCount
    }
  }`

  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      'authorization': `Basic ${process.env.GITHUB_TOKEN}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      query,
    }),
  })

  const data = await res.json()

  return Object.entries(data.data)
}

function shuffleQuotes(quotes) {
  for (let i = quotes.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [quotes[i], quotes[j]] = [quotes[j], quotes[i]]
  }

  return quotes
}

function randomGradientIndex() {
  return Math.floor(Math.random() * (AVAILABLE_GRADIENT_VARIANTS - 0) + 0)
}

(async function() {
  console.time('[GENERATOR]: Time Execution')

  if (process.env.GITHUB_TOKEN)
    console.info('[GENERATOR]: Github Token Loaded')

  const quotes_raw = await fetchAllQuotesYaml()
  const quotes = await generateQuotesFile(quotes_raw)

  console.info(`[GENERATOR]: ${quotes.length} quotes has been generated.`)

  const file_contents = JSON.stringify(shuffleQuotes(quotes))

  fs.writeFileSync(
    path.join(__dirname, '../src/assets/quotes.json'),
    file_contents,
  )
  fs.writeFileSync(
    path.join(__dirname, '../public/quotes.json'),
    file_contents,
  )

  console.timeEnd('[GENERATOR]: Time Execution')
})()
