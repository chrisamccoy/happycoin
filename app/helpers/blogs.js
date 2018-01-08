var blogs = [
  {
      slug: 'load-testing-storecoins-dynamic-proof-of-stake-consensus-algorithm-test-1-of-7',
      title: 'Load Testing Storecoin’s Dynamic Proof-of-Stake Consensus Algorithm: Test 1 of 7',
      desc: 'Testing the impact of varying numbers and sizes of transactions processed on a 4-node network running the Storecoin Dynamic Proof-of-Stake Consensus Algorithm (DyPoS).',
      img: 'http://storeco.in/images/blog-load-testing.png',
      template: 'blog-load-testing'
  }
];

function getblog(slug) {
  console.log(slug);
  for (var i = 0; i < blogs.length; i++) {
    if (blogs[i]['slug'] === slug) {
      return blogs[i];
    }
  }

  return {}
}

module.exports = getblog;
