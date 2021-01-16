function stubSuccess() {
  return new Promise(resolve => {
    setTimeout(() => resolve(), 1000);
  });
}

export default {
  create: () => stubSuccess(),
  delete: () => stubSuccess(),
  update: () => stubSuccess()
}
