import { translate } from './src/index';

const testTranslation = async () => {
  try {
    const result = await translate({
      text: 'Hello, world!',
      from: 'en',
      to: 'ru',
    });
    console.log(result);
  } catch (error) {
    console.error(error);
  }
};
export default testTranslation;
