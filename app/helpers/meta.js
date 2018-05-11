var data = {
    url: 'https://storeco.in',
    type: 'website',
    title: 'Storecoin',
    desc: 'Storecoin is a zero-fee, high throughput, and decentralized cryptocurrency with a Governance inspired by the U.S. Constitution.',
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
