import Jimp from 'jimp';

export const resizeImg = async () => {
  try {
    const originalPath = 'quanghai.jpg';

    const originalImg = await Jimp.read(originalPath);

    const resizedImg = await originalImg.resize(160, 160).writeAsync('./quanghai_resized.jpg');

    console.log(resizeImg);
  } catch (err) {
    console.log(err);
  }
};