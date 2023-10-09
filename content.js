const TAGS = [
  '[LOCAL]',
  '[ALPHA]',
  '[BETA]',
  '[PROD]',
  '[PREPROD]',
  '[TRY]',
  '[DEMO]',
  '[DEV',
  '[TEST',
];
const TEST_URL_REGEX = /https:\/\/test[0-9]*.kuika.com/;
const DEV_URL_REGEX = /https:\/\/dev[0-9]*.kuika.com/;

const handleTitleChange = () => {
  if (location.origin === 'https://alpha.kuika.com') {
    document.title = `[ALPHA] ${document.title}`;
  } else if (location.origin === 'https://beta.kuika.com') {
    document.title = `[BETA] ${document.title}`;
  } else if (location.origin === 'https://platform.kuika.com') {
    document.title = `[PROD] ${document.title}`;
  } else if (location.origin === 'https://preprod.kuika.com') {
    document.title = `[PREPROD] ${document.title}`;
  } else if (location.origin === 'https://try.kuika.com') {
    document.title = `[TRY] ${document.title}`;
  } else if (location.origin === 'https://demo.kuika.com') {
    document.title = `[DEMO] ${document.title}`;
  } else if (TEST_URL_REGEX.test(location.origin)) {
    const TEST_TAG = location.origin
      .replace('https://', '')
      .replace('.kuika.com', '');
    document.title = `[${TEST_TAG.toUpperCase()}] ${document.title}`;
  } else if (DEV_URL_REGEX.test(location.origin)) {
    const DEV_TAG = location.origin
      .replace('https://', '')
      .replace('.kuika.com', '');
    document.title = `[${DEV_TAG.toUpperCase()}] ${document.title}`;
  } else if (
    location.origin === 'http://localhost:3000' &&
    document.title.toLowerCase().includes('kuika')
  ) {
    document.title = `[LOCAL] ${document.title}`;
  }
};

handleTitleChange();

const target = document.querySelector('title');
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (!TAGS.some((tag) => mutation.target.innerText.startsWith(tag))) {
      handleTitleChange();
    }
  });
});
const config = {
  childList: true,
};
observer.observe(target, config);
