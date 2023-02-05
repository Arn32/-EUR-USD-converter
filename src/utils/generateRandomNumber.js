const generateRandomNumber = (min = -0.05, max = 0.05) =>
  Math.random() * (max - min) + min;

export default generateRandomNumber;
