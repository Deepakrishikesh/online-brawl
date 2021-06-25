export const getPosition = (width, height) => {
  const x_temp = Math.floor(Math.random() * width);
  const y_temp = Math.floor(Math.random() * height);
  return { x: x_temp, y: y_temp };
};

export const getAngle = () => {
  return Math.floor(Math.random() * 360);
};
