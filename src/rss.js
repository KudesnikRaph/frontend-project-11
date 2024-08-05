export default (data) => {
  const parser = new DOMParser();
  const dom = parser.parseFromString(data, 'text/xml');

  const isParseError = dom.querySelector('parsererror');
  if (isParseError) {
    const isError = new Error(isParseError.textContent);
    isError.isParsingError = true;
    isError.data = data;
    throw isError;
  }

  const titleElement = dom.querySelector('channel > title');
  const channelTitle = titleElement.textContent;
  const descriptionElement = dom.querySelector('channel > description');
  const channelDescription = descriptionElement.textContent;

  const itemElements = dom.querySelectorAll('item');
  const items = [...itemElements].map((el) => {
    const itemTitleElement = el.querySelector('title');
    const isTitle = itemTitleElement.textContent;
    const itemLinkElement = el.querySelector('link');
    const isLink = itemLinkElement.textContent;
    const itemDescriptionElement = el.querySelector('description');
    const isDescription = itemDescriptionElement.textContent;
    return { title: isTitle, link: isLink, description: isDescription };
  });
  return { title: channelTitle, description: channelDescription, items };
};
