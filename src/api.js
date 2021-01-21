const STUB_VEHICLES = [
  {
    id: 101,
    name: "Vitalik",
    type: "TWO",
    coordinates: { x: 45, y: 67 },
    enginePower: 98.432,
    fuelType: "ONE",
    fuelConsumption: 888 
  },
  {
    id: 102,
    name: "Valera",
    type: "ONE",
    coordinates: { x: 12, y: 23 },
    enginePower: 12.345,
    fuelType: "TWO",
    fuelConsumption: 999
  }
];

function stubSuccess(data) {
  return new Promise(resolve => {
    setTimeout(() => resolve({ data }), 1000);
  });
}

export default {
  filter: () => stubSuccess(STUB_VEHICLES),
  create: () => stubSuccess(),
  delete: () => stubSuccess(),
  update: () => stubSuccess()
}
