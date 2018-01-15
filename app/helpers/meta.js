var data = {
    url: 'http://storeco.in',
    type: 'website',
    title: 'Storecoin',
    desc: 'Storecoin will be a public blockchain powering free transactions for users and app developers using its Dynamic Proof of Stake Consensus (DyPoS).',
    image: 'http://storeco.in/images/logo-fb.png',
    image_tw: 'http://storeco.in/images/logo-tw.jpg'
}

function meta(params) {
  var newp = params;
  if (!params) {
    newp = {}
  }

  return Object.assign({}, data, newp);
}

module.exports = meta;
