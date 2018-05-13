var tokenSales = {
  tokensale3 : {
    basis_point_img : '/images/basis-point-v4.png',
    network_value: '$99 MM',
    hard_cap: '$2,997,000',
    treasury_percent: '3%',
    pre_sale_ends: 'Once Hard Cap is reached or July 30th, 2018',
    min_invest: '$10,000',
    max_invest: '$990,000 (equals 1% of Treasury)',
    name: 'Third'
  },
  tokensale69 : {
    basis_point_img : '/images/basis-point-69.png',
    network_value: '$69 MM',
    hard_cap: '$349,500',
    treasury_percent: '0.5% (5 Million tokens)',
    pre_sale_ends: 'Once the Hard Cap is reached',
    min_invest: '$25,000',
    max_invest: '$200,000',
    name: '69th'
  },
  tokensale99 : {
    basis_point_img : '/images/basis-point-99.png',
    network_value: '$99 MM',
    hard_cap: '$999,000',
    treasury_percent: '1%',
    pre_sale_ends: 'Once the Hard Cap is reached',
    min_invest: '$25,000',
    max_invest: '$333,000',
    name: '99th'
  },
  tokensale129 : {
    basis_point_img : '/images/basis-point-129.png',
    network_value: '$129MM',
    hard_cap: '$999,000',
    treasury_percent: '1%',
    pre_sale_ends: 'Once the Hard Cap is reached',
    min_invest: '$25,000',
    max_invest: '$333,000',
    name: '129th'
  },
  tokensale149 : {
    basis_point_img : '/images/basis-point-149.png',
    network_value: '$149MM',
    hard_cap: '$7,450,000',
    treasury_percent: '5%',
    pre_sale_ends: 'Once the Hard Cap is reached',
    min_invest: '$25,000',
    max_invest: '$1,490,000 (equals 1% of Treasury)',
    name: '149th'
  },
  tokensale199 : {
    basis_point_img : '/images/basis-point-199.png',
    network_value: '$199MM',
    hard_cap: '$9,950,000',
    treasury_percent: '5%',
    pre_sale_ends: 'Once the Hard Cap is reached',
    min_invest: '$25,000',
    max_invest: '$1,990,000 (equals 1% of Treasury)',
    name: '199th'
  },
  tokensale249 : {
    basis_point_img : '/images/basis-point-249.png',
    network_value: '$249MM',
    hard_cap: '$12,450,000',
    treasury_percent: '5%',
    pre_sale_ends: 'Once the Hard Cap is reached',
    min_invest: '$25,000',
    max_invest: '$2,490,000 (equals 1% of Treasury)',
    name: '249th'
  }
};

function getTokenSale(slug) {
  return tokenSales[slug];
}

module.exports = getTokenSale;
