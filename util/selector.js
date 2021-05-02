export const selector = (element) => {
  const el = document.querySelector(element);
  if (el) {
    return el;
  } else {
    throw new Error(`there is no such element ${element}`);
  }
};
