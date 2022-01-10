/* eslint no-console: ["warn",{ allow: [ "info", "time", "timeEnd" ] }] */

const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')
const md5 = require('md5')
const fetch = require('node-fetch')
const sitemap = require('sitemap')

const dotenv = require('dotenv-flow')
dotenv.config()

const BASE_URL = 'https://quotes.nyandev.id'
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
      const slug = (`${slugify(quote.text, 45)}-${slugify(quote.author)}`)
        .replace(/--/gm, '-')

      quotes_valid.push({
        id: md5(`${user.username}:${quote.text}`),
        username: user.username,
        github,
        gradient_id: randomGradientIndex(),
        slug,
        ...quote,
        lastmod: parseDate(quote.created_at),
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

  if (!user) return { available: null }
  if (!user[1]) return { available: null }

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
      available: null,
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

function parseDate(date) {
  let months = ['januari', 'februari', 'maret', 'april', 'mei', 'juni', 'juli', 'agustus', 'september', 'oktober', 'november', 'desember']

  months = months.map((month, index) => {
    const monthName = new Date(2021, index, 1).toLocaleString('default', { month: 'long' })
    return [monthName.toLowerCase(), month]
  })

  date = date.toLowerCase()

  for (const [m_en, m_id] of months)
    date = date.replace(m_id, m_en)

  return new Date(`${date} 12:00`)
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

function slugify(title, max = 80) {
  const excludedWords = ['is', 'am', 'are', 'a', 'an', 'the', 'and', 'or', 'but', 'in', 'as']

  if (title.length > 100) {
    for (const word of excludedWords.sort().reverse()) {
      const regex = RegExp(`(^|\\p{P}| )${word}($|\\p{P}| )`, 'gi')

      title = title.replace(regex, ' ')
    }
  }

  title = title
    .normalize('NFD') // split an accented letter in the base letter and the acent
    .replace(/[\u0300-\u036F]/g, '') // remove all previously split accents
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9 ]/g, '') // remove all chars not letters, numbers and spaces (to be replaced)
    .replace(/\s+/g, '-') // separator

  if (title.length > max) return title.slice(0, max)
  if (title.endsWith('-')) return title.slice(0, -1)

  return title
}

function generateSitemap(quotes) {
  const quoteSitemapLists = quotes.map((quote) => {
    return {
      url: `/quote/${quote.slug}`,
      lastmod: quote.lastmod,
      changefreq: 'daily',
      priority: 0.3,
    }
  })

  sitemap.simpleSitemapAndIndex({
    hostname: BASE_URL,
    destinationDir: path.join(__dirname, '../public/'),
    gzip: false,
    sourceData: [
      {
        url: '/',
        lastmod: new Date().toISOString().slice(0, 10),
        changefreq: 'hourly',
        priority: 0.8,
      },
      ...quoteSitemapLists,
    ],
  })
}

(async function() {
  console.time('[GENERATOR]: Time Execution')

  if (process.env.GITHUB_TOKEN)
    console.info('[GENERATOR]: Github Token Loaded')

  const quotes_raw = await fetchAllQuotesYaml()
  const quotes = await generateQuotesFile(quotes_raw)

  console.info(`[GENERATOR]: ${quotes.length} quotes has been generated.`)

  generateSitemap(quotes)

  const file_contents = JSON.stringify(shuffleQuotes(quotes), null, 2)

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
