var data = {
    url: 'https://storeco.in',
    type: 'website',
    title: 'Storecoin',
    desc: 'Storecoin is zero-fee, high-throughput, and decentralized cryptocurrency with a Governance of checks and balances. #💰',
    image: 'https://storeco.in/images/logo-fb.png',
    image_tw: 'https://storeco.in/images/logo-tw.png'
}

function meta(params) {
  var newp = params;
  if (!params) {
    newp = {}
  }

  return Object.assign({}, data, newp);
}

module.exports = meta;
