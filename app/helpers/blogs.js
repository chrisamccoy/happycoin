var blogs = [
  {
      slug: 'bitcoin.com-and-investopedia-storecoin-governance-could-be-the-solution-to-blockchain-consensus',
      title: 'Bitcoin.com and Investopedia: Storecoin Governance Could Be the Solution to Blockchain Consensus',
      desc: 'Cryptocurrency news sites Bitcoin.com and Investopedia have called out  Storecoin ’s unique governance model, crediting creator Chris McCoy with devising a strategy that engages members of four separate branches in achieving consensus in a democratic process.',
      img: 'https://storeco.in/images/bitcoin-cover.jpg',
      template: 'blog-bitcoin-investopedia',
      readTime : '3 min read',
      date : 'July 25, 2018'
  },
  {
      slug: 'what-is-storecoin',
      title: 'What is Storecoin?',
      desc: 'A zero-fee, high throughput, and decentralized cryptocurrency with a Governance inspired by the U.S. Constitution. The Storecoin blockchain is secured by DyPoS.',
      img: 'https://storeco.in/images/logo-fb.png',
      template: 'blog-what-is-storecoin',
      readTime : '4 min read',
      date : 'June 4, 2018'
  },
  {
      slug: 'storecoin-begins-testing-on-blockFins-feed-follow-design',
      title: 'Storecoin Begins Testing on BlockFin’s ‘Feed & Follow’ Design',
      desc: 'Goal is to overcome latency, up-time issues in global network',
      img: 'https://storeco.in/images/blog/blog-storecoin-begins-testing.png',
      template: 'blog-storecoin-begins-testing',
      readTime : '4 min read',
      date : 'May 27, 2018'
  },
  {
      slug: 'open-source-proposal-has-potential-to-raise-tendermints-consensus-throughput',
      title: 'Open-Source Proposal has Potential to Raise Tendermint’s Consensus Throughput',
      desc: 'Storecoin’s idea would improve software’s ability to run consensus with constant time, even when many validators participate in the process',
      img: 'https://storeco.in/images/blog/blog-open-source-protocol.png',
      template: 'blog-open-source-protocol',
      readTime : '4 min read',
      date : 'April 21, 2018'
  },
  {
      slug: 'storecoin-software-development-protocol-inpired-by-impenetrable-fort-knox',
      title: 'Storecoin Software Development Protocol Inspired by Impenetrable Fort Knox',
      desc: 'Project Fort Knox: Storecoin takes major steps to secure its code base with the help of the Amazon Blockchain Strategy Group',
      img: 'https://storeco.in/images/blog/fort-knox.jpeg',
      template: 'blog-software-development-protocol',
      readTime : '5 min read',
      date : 'April 17, 2018'
  },
  {
      slug: 'storecoin-achieves-10,000-transactions-per-second-with-burst-traffic-and-21-validator-modes',
      title: 'Storecoin Achieves +10,000 Transactions-Per-Second with Burst Traffic and 21 Validator Nodes',
      desc: 'Storecoin’s mission is to become zero-fee payment infrastructure for the global internet. The Dynamic Proof of Stake (DyPoS) consensus engine powering the Storecoin infrastructure is designed to process thousands of transactions per second. When transactions arrive continuously but at lower rates, the consensus engine is capable of handling the incoming transactions, but how does it behave when transactions come in bursts? When Storecoin is used as the payment platform by merchants and app developers, the transactions are likely to come in bursts from multiple sources. So, we need to characterize the behavior of the consensus engine under such circumstances.',
      img: 'https://storeco.in/images/blog/blog-load-testing-5-to-7.png',
      template: 'blog-load-testing-burst-traffic',
      readTime : '10 min read',
      date : 'March 19, 2018'
  },
  {
      slug: 'load-testing-storecoins-dynamic-proof-of-stake-consensus-algorithm-with-21-validators-test-5-of-7',
      title: 'Load Testing Storecoin’s Dynamic Proof-of-Stake Consensus Algorithm With 21 Validators: Test 5 of 7',
      desc: 'Testing DyPoS by sending bursts of transactions from 2 clients to 21 validators',
      img: 'https://storeco.in/images/blog/blog-load-testing-5-to-7.png',
      template: 'blog-load-testing-5-to-7',
      readTime : '10 min read',
      date : 'March 17, 2018',
      hidden : true
  },
  {
      slug: 'load-testing-storecoins-dynamic-proof-of-stake-consensus-algorithm-test-4-of-7',
      title: 'Load Testing Storecoin’s Dynamic Proof-of-Stake Consensus Algorithm: Test 4 of 7',
      desc: 'Testing the impact of varying numbers and sizes of transactions processed on a 8-node network running the Storecoin Dynamic Proof-of-Stake Consensus Algorithm (DyPoS). Test #4 in a series of 7 tests.',
      img: 'https://storeco.in/images/blog/blog-load-testing-4-to-7.png',
      template: 'blog-load-testing-4-to-7',
      readTime : '10 min read',
      date : 'March 17, 2018',
      hidden : true
  },
  {
      slug: 'software-engineer-accepts-role-of-technology-advisor-for-storecoin',
      title: 'Software Engineer Accepts Role of Technology Advisor for Storecoin',
      twtitle : 'Software Engineer (@devilscompiler) Accepts Role of Technology Advisor for Storecoin',
      desc: 'A software engineer who has built a career studying online privacy and cryptocurrency architectures has joined @StorecoinTeam as technology advisor.',
      img: 'https://storeco.in/images/noah-ruderman.png',
      template: 'blog-hires-noah',
      readTime : '2 min read',
      date : 'January 29, 2018',
      maxwidth : '280px;'
  },
  {
      slug: 'finance-professor-stephen-mckeon-joins-storecoin-as-economics-advisor',
      title: 'Finance Professor Stephen McKeon Joins Storecoin as Economics Advisor',
      desc: 'One of the nation’s leading thinkers on the economics of blockchain and cryptocurrencies, Stephen McKeon, has joined Storecoin’s team of advisors.',
      img: 'https://storeco.in/images/blog/blog-hires-mckeon.png',
      template: 'blog-hires-mckeon',
      readTime : '2 min read',
      date : 'January 24, 2018',
      maxwidth : '280px;'
  },
  {
      slug: 'how-storecoins-blockchain-design-is-different-from-directed-acyclic-graph',
      title: 'How Storecoin’s Blockchain Design is Different from Directed Acyclic Graph',
      desc: 'How Storecoin’s Blockchain Design is Different from Directed Acyclic Graph',
      img: 'https://storeco.in/images/blog/blog-blockchain-design.png',
      template: 'blog-blockchain-design',
      readTime : '1 min read',
      date : 'January 19, 2018'
  },
  {
      slug: 'storecoin-creator-scheduled-to-speak-at-la-crypto-funding-summit',
      title: 'Storecoin Creator Scheduled to Speak at LA Crypto Funding Summit',
      twtitle : 'Storecoin Creator (@chrisamccoy) Scheduled to Speak at LA Crypto Funding Summit',
      desc: 'The creator of Storecoin, a new public blockchain with a governance similar to the checks and balances of the U.S. Constitution and dynamic economics similar to ride-sharing companies like Uber, is among the presenters at the Crypto Funding Summit at the Los Angeles Convention Center.',
      img: 'https://storeco.in/images/blog/blog-crypto-summit.png',
      template: 'blog-crypto-summit',
      readTime : '1 min read',
      date : 'January 11, 2018',
  },
  {
      slug: 'load-testing-storecoins-dynamic-proof-of-stake-consensus-algorithm-test-1-of-7',
      title: 'Load Testing Storecoin’s Dynamic Proof-of-Stake Consensus Algorithm: Test 1 of 7',
      desc: 'Testing the impact of varying numbers and sizes of transactions processed on a 4-node network running the Storecoin Dynamic Proof-of-Stake Consensus Algorithm (DyPoS).',
      img: 'https://storeco.in/images/blog/blog-load-testing.png',
      template: 'blog-load-testing',
      readTime : '10 min read',
      date : 'December 13, 2017'
  },
  {
      slug: 'chris-mccoy-introduces-storecoin-at-worlds-1st-crypto-finance-conf',
      title: 'Creator Chris McCoy Introduces Storecoin at World’s 1st Crypto Finance Conference',
      twtitle : 'Creator Chris McCoy (@chrisamccoy) Introduces Storecoin at World’s 1st Crypto Finance Conference',
      desc: 'St. MORITZ, Switzerland — Storecoin creator Chris McCoy introduced the Storecoin blockchain to an international audience at the Crypto Finance Conference 2018 in St. Moritz.',
      img: 'https://storeco.in/images/blog/chris_cfc18_preso.png',
      template: 'blog-crypto-conference',
      readTime : '2 min read',
      date : 'November 28, 2017'
  },
  {
      slug: 'virtual-currency-leader-ari-paul-joins-storecoin-as-strategic-advisor',
      title: 'Virtual Currency Leader Ari Paul Joins Storecoin as Strategic Advisor',
      desc: 'Early in his career, Ari Paul recognized the need for cryptocurrencies to occupy a place in consumers’ (virtual) wallets and investors’ holdings. As co-founder and chief investment officer for BlockTower Capital, Paul specializes in professional trading and portfolio management of cryptocurrencies.',
      img: 'https://storeco.in/images/blog/blog-hires-ari-1.png',
      template: 'blog-hires-ari',
      readTime : '2 min read',
      date : 'November 28, 2017'
  },
  {
      slug: 'nate-lubin-president-obamas-director-of-digital-strategy-joins-storecoin-as-communications',
      title: 'Obama’s Digital Strategist Nate Lubin Advises Storecoin on Communications',
      desc: 'He transformed the way American presidents communicate with their citizens. Now, Storecoin is turning to Nathaniel Lubin to do the same for its fee-free public blockchain.',
      img: 'https://storeco.in/images/blog/blog-hires-lubin-1.png',
      template: 'blog-hires-lubin',
      readTime : '2 min read',
      date : 'November 15, 2017'
  },
  {
      slug: 'digital-innovator-mark-ramberg-to-advise-storecoin-on-platforms-and-api',
      title: 'Digital Innovator Mark Ramberg to Advise Storecoin on Platforms and API',
      desc: 'SAN FRANCISCO — For more than a decade, Mark Ramberg has been ahead of the technological curve. In leadership roles previously at Microsoft and Amazon Web Services and now at Akamai Technologies, Ramberg has developed an unparalleled depth of knowledge of media content, delivery and security.',
      img: 'https://storeco.in/images/blog/blog-hires-ramberg-1.png',
      template: 'blog-hires-ramberg',
      readTime : '2 min read',
      date : 'November 15, 2017'
  },
  {
      slug: 'storecoin-hires-rajiv-patel-of-fenwick-west-to-file-blockchain-patents',
      title: 'Storecoin Hires Rajiv Patel of Fenwick & West to File Blockchain Patents',
      desc: 'Storecoin, a new public blockchain with a governance similar to the checks and balances of the U.S. Constitution and dynamic economics similar to ride-sharing companies like Uber, has hired one of the nation’s leading intellectual property and patent lawyers to guide the company in the next step of its blockchain development.',
      img: 'https://storeco.in/images/blog/blog-hires-rajiv-1.png',
      template: 'blog-hires-rajiv',
      readTime : '2 min read',
      date : 'October 4, 2017'
  },
  {
      slug: 'why-storecoin-is-inventing-dynamic-proof-of-stake-dypos',
      title: 'Why Storecoin is Inventing Dynamic Proof of Stake (DyPoS)',
      desc: 'A key goal of Storecoin is to gain meaningful adoption inside franchise and chain stores. But to accomplish this, its transactions must be free.',
      img: 'https://storeco.in/images/blog-thumbnail-sep-24.png',
      template: 'blog-invent-dypos',
      readTime : 'Sep 24, 2017 . 3 min read',
      date : 'September 24, 2017'
  },
  {
      slug: 'storecoin-update-august-2017',
      title: 'Storecoin Update — August 2017',
      desc: 'Summary: This Storecoin August 2017 research update touches on our research and development for the Storecoin Green Paper, our Dynamic Proof of Work consensus algorithm, other Proof of Stake algorithms such as EOS and Ethereum’s upcoming Casper, historical ETH/BTC correlations regarding transactions per second vs. price, the general economics of blockchains, our First Token Sale and the next steps for Storecoin.',
      img: 'https://storeco.in/images/blog-thumbnail-aug-30.jpg',
      template: 'blog-august-update',
      readTime : '6 min read',
      date : 'August 31, 2017'
  },
  {
      slug: 'https://techcrunch.com/2017/08/20/yesterdays-plastics-are-todays-crypto-tokens/',
      title: 'Yesterday’s “Plastics” are Today’s Crypto Tokens',
      desc: false,
      img: 'https://storeco.in/images/the-graduate.png',
      template: false,
      readTime : false,
      date : 'August 21, 2017',
      logo : '/images/tc-logo.svg'
  },
  {
      slug: 'introducing-storecoin',
      title: 'Introducing Storecoin',
      desc: 'Hello world, it’s August 2017 — the first month of a third, new phase in the blockchain industry — and we’re ready to bring blockchain technologies to franchise and chain store businesses.',
      img: 'https://storeco.in/images/storecoin-screen.png',
      template: 'blog-intro-storecoin',
      readTime : '9 min read',
      date : 'August 2, 2017'
  }
];

function getblog(slug) {
  if (slug === undefined) {
    return blogs;
  } else {
    for (var i = 0; i < blogs.length; i++) {
      if (blogs[i]['slug'] === slug) {
        return blogs[i];
      }
    }
  }

  return null;
}

module.exports = getblog;
