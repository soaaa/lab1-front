import { create } from "axios";

import { ASC, DESC, NONE, getOrderValue } from "./orders";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "./defaults";

const axios = create({
  baseURL: "http://localhost:8088",
  timeout: 2000,
  validateStatus: status => status < 500
});

function stubSuccess(data) {
  return new Promise(resolve => {
    setTimeout(() => resolve({ data }), 1000);
  });
}

function repairColumns(srcColumns) {
  const repaired = {
    ...srcColumns,
    creation_date: Date.parse(srcColumns.creation_date)
  };
  if (isNaN(parseInt(repaired.id))) repaired.id = null;
  if (repaired.name.length === 0) repaired.name = null;
  if (isNaN(repaired.creation_date)) repaired.creation_date = null;
  if (repaired.type.length === 0) repaired.type = null;
  if (isNaN(parseInt(repaired.engine_power))) repaired.engine_power = null;
  if (repaired.fuel_type.length === 0) repaired.fuel_type = null;
  if (isNaN(parseInt(repaired.fuel_consumption))) repaired.fuel_consumption = null;
  return repaired;
}

function appendColumnFilters(params, columns) {
  if (!columns) return;
  columns = repairColumns(columns);
  Object.entries(columns).forEach(entry => {
    const [ column, value ] = entry;
    if (value !== null) {
      params.append(column, value);
    }
  });
}

function appendOrders(params, orders) {
  if (!orders) return;
  orders.forEach(it => {
    if (it.order !== NONE) {
      params.append(getOrderValue(it.order), it.column);
    }
  });
}

export default {
  filter: (filters) => {
    const params = new URLSearchParams();
    appendColumnFilters(params, filters.columns);
    appendOrders(params, filters.orders);
    
    var page = parseInt(filters.page);
    if (isNaN(page) || page < 1) {
      page = DEFAULT_PAGE;
    }
    params.append("page", page);

    var pageSize = parseInt(filters.pageSize);
    if (isNaN(pageSize) || pageSize < 1) {
      pageSize = DEFAULT_PAGE_SIZE;
    }
    params.append("page_size", pageSize);

    return axios.request({
      url: "/vehicle",
      method: "get",
      params
    });
  },
  create: vehicle => axios.request({
    url: "/vehicle",
    method: "post",
    data: vehicle
  }),
  delete: id => axios.request({
    url: "/vehicle/" + id,
    method: "delete"
  }),
  update: vehicle => axios.request({
    url: "/vehicle/" + vehicle.id,
    method: "put",
    data: vehicle
  }),
  filterByNameSubsequence: value => axios.request({
    url: "/vehicle/name_like?value=" + value,
    method: "get"
  }),
  findAvgFuelConsumption: () => axios.request({
    url: "/vehicle/average_fuel_consumption",
    method: "get"
  }),
  findEnginePowerToCount: () => axios.request({
    url: "/vehicle/engine_power_to_count",
    method: "get"
  }),
  searchByType: type => axios.request({
    url: "/shop/search/by-type/" + type,
    method: "get"
  }),
  searchByEnginePower: (from, to) => axios.request({
    url: "/shop/search/by-engine-power/" + from + "/" + to,
    method: "get"
  })
}
