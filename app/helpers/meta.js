var data = {
    url: 'http://storeco.in',
    type: 'website',
    title: 'Storecoin',
    desc: 'Storecoin is a new public blockchain powering free transactions using Dynamic Proof of Stake (DyPoS). On top, there will be crypto-powered apps -- or cApps.',
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
