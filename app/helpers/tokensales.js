var tokenSales = {
  tokensale3 : {
    basis_point_img : '/images/basis-point-v4.png',
    network_value: '$99 MM',
    price_per_token: '$0.0999',
    hard_cap: '$2,997,000',
    treasury_percent: '3%',
    pre_sale_ends: 'Once Hard Cap is reached or July 30th, 2018',
    min_invest: '$10,000',
    max_invest: '$990,000 (equals 1% of Treasury)',
    name: 'Third',
    embed: true
  },
  tokensale69 : {
    basis_point_img : '/images/basis-point-69.png',
    network_value: '$69 Million',
    hard_cap: '$349,500',
    price_per_token : '$0.069',
    treasury_percent: '0.5% (5 Million tokens)',
    pre_sale_ends: 'Once the Hard Cap is reached',
    min_invest: '$10,000',
    max_invest: '$200,000',
    name: 'Third',
    embed: false
  },
  tokensale99 : {
    basis_point_img : '/images/basis-point-99.png',
    network_value: '$99 Million',
    price_per_token : '$0.099',
    hard_cap: '$999,000',
    treasury_percent: '1%',
    pre_sale_ends: 'Once the Hard Cap is reached',
    min_invest: '$10,000',
    max_invest: '$333,000',
    name: 'Third',
    embed: false
  },
  tokensale129 : {
    basis_point_img : '/images/basis-point-129.png',
    network_value: '$99 Million',
    price_per_token: '$0.129',
    hard_cap: '$999,000',
    treasury_percent: '1%',
    pre_sale_ends: 'Once the Hard Cap is reached',
    min_invest: '$10,000',
    max_invest: '$1,290,000 (1% of Treasury)',
    name: 'Third',
    embed: false
  },
  tokensale149 : {
    basis_point_img : '/images/basis-point-149.png',
    network_value: '$149 Million',
    price_per_token: '$0.149',
    hard_cap: '$7,450,000',
    treasury_percent: '5%',
    pre_sale_ends: 'Once the Hard Cap is reached',
    min_invest: '$10,000',
    max_invest: '$1,490,000 (1% of Treasury)',
    name: 'Third',
    embed: false
  },
  tokensale199 : {
    basis_point_img : '/images/basis-point-199.png',
    network_value: '$199 Million',
    price_per_token: '$0.199',
    hard_cap: '$9,950,000',
    treasury_percent: '5%',
    pre_sale_ends: 'Once the Hard Cap is reached',
    min_invest: '$10,000',
    max_invest: '$1,990,000 (1% of Treasury)',
    name: 'Third',
    embed: false
  },
  tokensale249 : {
    basis_point_img : '/images/basis-point-249.png',
    network_value: '$249MM',
    hard_cap: '$12,450,000',
    treasury_percent: '5%',
    pre_sale_ends: 'Once the Hard Cap is reached',
    min_invest: '$25,000',
    max_invest: '$2,490,000 (equals 1% of Treasury)',
    name: 'Third',
    embed: false
  }
};

function getTokenSale(slug) {
  return tokenSales[slug];
}

module.exports = getTokenSale;
