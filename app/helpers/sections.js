var sections = {
  'our-vision': {
    'url': '#our-vision',
    'title': 'Our Vision'
  },
  'our-mission': {
    'hash': '#our-mission',
    'title': 'Our Mission'
  }
}

function getSection(key) {
  return sections[key] || null;
}

module.exports = getSection;
