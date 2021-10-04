const yaml = require("js-yaml");
const md5 = require("md5");
const fetch = require("node-fetch");
const fs = require("fs");
const path = require("path");

const dotenv = require("dotenv-flow");
dotenv.config();

const AVAILABLE_GRADIENT_VARIANTS = 13;

async function fetchAllQuotesYaml() {
  const quotes_path = path.join(__dirname, "../quotes");
  const quotes_file_paths = fs
    .readdirSync(quotes_path)
    .filter((file) => file.endsWith(".yaml") || file.endsWith(".yml"));

  const quotes_files = await Promise.all([
    ...quotes_file_paths.map((file) => parseYamlFile(quotes_path, file)),
  ]);

  return quotes_files.filter((quote) => !!quote);
}

async function parseYamlFile(quotes_path, file) {
  const contains = await fs.promises.readFile(
    path.join(quotes_path, file),
    "utf8"
  );

  try {
    const parsed = yaml.load(contains);
    return parsed;
  } catch (err) {
    return null;
  }
}

async function generateQuotesFile(quotes) {
  const quotes_valid = [];

  for (const user of quotes) {
    if (user.quotes.length === 0) continue;

    const github = await getGithubProfileByUsername(user.username);

    for (const quote of user.quotes) {
      quotes_valid.push({
        id: md5(`${user.username}:${quote.text}`),
        username: user.username,
        github,
        gradient_id: randomGradientIndex(),
        ...quote,
      });
    }
  }

  return quotes_valid;
}

async function getGithubProfileByUsername(username) {
  const res = await fetch(`https://api.github.com/users/${username}`);

  if (res.status === 404)
    return {
      available: false,
    };

  const data = await res.json();

  return {
    available: true,
    name: data.name || username,
    avatar_url: data.avatar_url,
    followers: data.followers,
  };
}

function shuffleQuotes(quotes) {
  for (let i = quotes.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [quotes[i], quotes[j]] = [quotes[j], quotes[i]];
  }

  return quotes;
}

function randomGradientIndex() {
  return Math.floor(Math.random() * (AVAILABLE_GRADIENT_VARIANTS - 0) + 0);
}

(async function () {
  if (process.env.GITHUB_TOKEN) {
    console.info(`[GENERATOR]: Github Token Loaded`);
  }

  const quotes_raw = await fetchAllQuotesYaml();
  const quotes = await generateQuotesFile(quotes_raw);

  console.info(`[GENERATOR]: ${quotes.length} quotes has been generated.`);

  const file_contents = JSON.stringify(shuffleQuotes(quotes));

  fs.writeFileSync(
    path.join(__dirname, `../src/assets/quotes.json`),
    file_contents
  );
})();
