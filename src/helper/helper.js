export const startDrag = (evt, data) => {
  evt.dataTransfer.setData("data", JSON.stringify(data));
};
