var blogs = [
  {
      slug: 'load-testing-storecoins-dynamic-proof-of-stake-consensus-algorithm-test-1-of-7',
      title: 'Load Testing Storecoin’s Dynamic Proof-of-Stake Consensus Algorithm: Test 1 of 7',
      desc: 'Testing the impact of varying numbers and sizes of transactions processed on a 4-node network running the Storecoin Dynamic Proof-of-Stake Consensus Algorithm (DyPoS).',
      img: 'https://storeco.in/images/blog-load-testing.png',
      template: 'blog-load-testing'
  },
  {
      slug: 'introducing-storecoin',
      title: 'Introducing Storecoin',
      desc: 'Hello world, it’s August 2017 — the first month of a third, new phase in the blockchain industry — and we’re ready to bring blockchain technologies to franchise and chain store businesses.',
      img: 'https://storeco.in/images/storecoin-screen.png',
      template: 'blog-intro-storecoin'
  },
  {
      slug: 'storecoin-update-august-2017',
      title: 'Storecoin Update — August 2017',
      desc: 'Summary: This Storecoin August 2017 research update touches on our research and development for the Storecoin Green Paper, our Dynamic Proof of Work consensus algorithm, other Proof of Stake algorithms such as EOS and Ethereum’s upcoming Casper, historical ETH/BTC correlations regarding transactions per second vs. price, the general economics of blockchains, our First Token Sale and the next steps for Storecoin.',
      img: 'https://storeco.in/images/blog-thumbnail-aug-30.jpg',
      template: 'blog-august-update'
  },
  {
      slug: 'why-storecoin-is-inventing-dynamic-proof-of-stake-dypos',
      title: 'Why Storecoin is Inventing Dynamic Proof of Stake (DyPoS)',
      desc: 'A key goal of Storecoin is to gain meaningful adoption inside franchise and chain stores. But to accomplish this, its transactions must be free.',
      img: 'https://storeco.in/images/blog-thumbnail-sep-24.png',
      template: 'blog-invent-dypos'
  },
  {
      slug: 'storecoin-hires-rajiv-patel-of-fenwick-west-to-file-blockchain-patents',
      title: 'Storecoin hires Rajiv Patel of Fenwick & West to file blockchain patents',
      desc: 'Storecoin, a new public blockchain with a governance similar to the checks and balances of the U.S. Constitution and dynamic economics similar to ride-sharing companies like Uber, has hired one of the nation’s leading intellectual property and patent lawyers to guide the company in the next step of its blockchain development.',
      img: 'https://storeco.in/images/fenwick-west-logo.png',
      template: 'blog-hires-rajiv'
  },
  {
      slug: 'digital-innovator-mark-ramberg-to-advise-storecoin-on-platforms-and-api',
      title: 'Digital Innovator Mark Ramberg to Advise Storecoin on Platforms and API',
      desc: 'SAN FRANCISCO — For more than a decade, Mark Ramberg has been ahead of the technological curve. In leadership roles previously at Microsoft and Amazon Web Services and now at Akamai Technologies, Ramberg has developed an unparalleled depth of knowledge of media content, delivery and security.',
      img: 'https://storeco.in/images/akamai-logo.png',
      template: 'blog-hires-ramberg'
  },
  {
      slug: 'virtual-currency-leader-ari-paul-joins-storecoin-as-a-strategic-advisor',
      title: 'Virtual Currency Leader Ari Paul Joins Storecoin as a Strategic Advisor',
      desc: 'Early in his career, Ari Paul recognized the need for cryptocurrencies to occupy a place in consumers’ (virtual) wallets and investors’ holdings. As co-founder and chief investment officer for BlockTower Capital, Paul specializes in professional trading and portfolio management of cryptocurrencies.',
      img: 'https://storeco.in/images/blocktower-logo.png',
      template: 'blog-hires-ari'
  },
  {
      slug: 'nate-lubin-president-obamas-director-of-digital-strategy-joins-storecoin-as-communications',
      title: 'Nate Lubin, President Obama’s Director of Digital Strategy, Joins Storecoin as Communications Advisor',
      desc: 'He transformed the way American presidents communicate with their citizens. Now, Storecoin is turning to Nathaniel Lubin to do the same for its fee-free public blockchain.',
      img: 'https://storeco.in/images/blog/blog-hires-lubin-1.png',
      template: 'blog-hires-lubin'
  },
  {
      slug: 'storecoin-creator-chris-mccoy-to-speak-at-words-1st-crypto-finance-conference',
      title: 'Storecoin Creator Chris McCoy to Speak at Word’s 1st Crypto Finance Conference',
      desc: 'SAN FRANCISCO — Organizers have invited Storecoin creator Chris McCoy to speak at the first international conference designed specifically for online currency and blockchain investors. The three-day Crypto Finance Conference takes place in St. Moritz, Switzerland, Jan. 17–19.',
      img: 'https://storeco.in/images/logo.png',
      template: 'blog-crypto-conference'
  },
  {
      slug: 'storecoin-creator-scheduled-to-speak-at-la-crypto-funding-summit',
      title: 'Storecoin Creator Scheduled to Speak At LA Crypto Funding Summit',
      desc: 'The creator of Storecoin, a new public blockchain with a governance similar to the checks and balances of the U.S. Constitution and dynamic economics similar to ride-sharing companies like Uber, is among the presenters at the Crypto Funding Summit at the Los Angeles Convention Center.',
      img: 'https://storeco.in/images/blog/blog-crypto-summit.png',
      template: 'blog-crypto-summit'
  }
];

function getblog(slug) {
  for (var i = 0; i < blogs.length; i++) {
    if (blogs[i]['slug'] === slug) {
      return blogs[i];
    }
  }

  return null
}

module.exports = getblog;
