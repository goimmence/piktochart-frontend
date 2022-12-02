interface evtInterface extends Event {
  dataTransfer: DataTransfer;
}
export const startDrag = (evt: evtInterface, data: object) => {
  evt.dataTransfer.setData("data", JSON.stringify(data));
};
