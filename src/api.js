function stubSuccess() {
  return new Promise(resolve => {
    setTimeout(() => resolve(), 1000);
  });
}

export default {
  delete: () => stubSuccess(),
  update: () => stubSuccess()
}
