const htmlToImage = window.htmlToImage;

const titleInput = document.querySelector('#title-input');
const subtitleInput = document.querySelector('#subtitle-input');
const hashtagInput = document.querySelector('#hashtag-input');
const titleParagraphs = document.querySelectorAll('.title');
const subtitleParagraphs = document.querySelectorAll('.subtitle');
const hashtagParagraphs = document.querySelectorAll('.hashtag');
const saveToJpegButtons = document.querySelectorAll('.to-jpeg');
const saveToPngButtons = document.querySelectorAll('.to-png');

function onChange(input, paragraphs) {
  paragraphs.forEach((paragraph) => {
    paragraph.innerText = input.value;
  });
};

function downloadFile(dataUrl, name, extension) {
  let link = document.createElement('a');
  link.download = `${name}.${extension}`;
  link
    .setAttribute('href', dataUrl);
  link.click();
};

function toSlug(text) {
  return text
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');
};

const getFileName = (printArea) => {
  const title = printArea.querySelector('.title').innerText;
  const type = printArea.parentElement.id;
  return `${toSlug(title || 'image')}-${type}`;
};

function saveToJpeg(element, name) {
  htmlToImage.toJpeg(element, { quality: 1 })
    .then((dataUrl) => downloadFile(dataUrl, name, 'jpeg'));
};

function saveToPng(element, name) {
  htmlToImage.toPng(element, { quality: 1 })
    .then((dataUrl) => downloadFile(dataUrl, name, 'png'));
};

titleInput.addEventListener('input', () => {
  onChange(titleInput, titleParagraphs)
  titleInput.removeEventListener('input', onChange);
});
subtitleInput.addEventListener('input', () => {
  onChange(subtitleInput, subtitleParagraphs)
  subtitleInput.removeEventListener('input', onChange);
});
hashtagInput.addEventListener('input', () => {
  onChange(hashtagInput, hashtagParagraphs)
  hashtagInput.removeEventListener('input', onChange);
});

saveToJpegButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const printArea = button.parentElement.nextElementSibling;
    saveToJpeg(printArea, getFileName(printArea));
    button.removeEventListener('click', saveToJpeg);
  });
});

saveToPngButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const printArea = button.parentElement.nextElementSibling;
    saveToPng(printArea, getFileName(printArea));
    button.removeEventListener('click', saveToPng);
  });
});
