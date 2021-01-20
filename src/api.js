function stubSuccess(data) {
  return new Promise(resolve => {
    setTimeout(() => resolve({ data }), 1000);
  });
}

export default {
  filter: () => stubSuccess([]),
  create: () => stubSuccess(),
  delete: () => stubSuccess(),
  update: () => stubSuccess()
}
