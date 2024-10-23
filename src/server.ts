import express, { Express } from "express";
// import { format } from "date-fns";
import { Order } from "./types/order.types";
import { format } from "date-fns";

const app: Express = express();
const PORT = 6000;

const dataAtual = new Date();
const stoppedOrders10 = new Date(dataAtual.getTime() - 10 * 60000);
const stoppedOrders15 = new Date(dataAtual.getTime() - 15 * 60000);

const ordersList: Order[] = [
  { id: 1, date: dataAtual, status: "AB", status_delivery: 1 },
  { id: 2, date: dataAtual, status: "AB", status_delivery: 0 },
  {
    id: 3,
    date: stoppedOrders10,
    status: "AB",
    status_delivery: 0,
  },
  {
    id: 4,
    date: stoppedOrders10,
    status: "AB",
    status_delivery: 1,
  },
  {
    id: 5,
    date: dataAtual,
    status: "AB",
    status_delivery: 0,
  },
  {
    id: 6,
    date: stoppedOrders15,
    status: "AB",
    status_delivery: 0,
  },
];

var filtered: Order[] = [];

// orders.map((order) => {
//     order.status_delivery = 1;
//   });
//   return filtered;

const changeBranch = (orders: Order[]) => {
  return orders.map((order) => {
    const listOrders = ordersList.find(
      (orderlist) => orderlist.id === order.id
    );

    return {
      ...listOrders,
      date: format(listOrders?.date!, "dd/MM/yyyy HH:mm:ss"),
      status_delivery: 1,
    };
  });
};

const stoppedOrders = () => {
  ordersList.forEach((order) => {
    if (
      order.status === "AB" &&
      order.status_delivery === 0 &&
      order.date.getTime() <= stoppedOrders10.getTime()
    ) {
      filtered.push({
        ...order,
      });
    }
  });
  return filtered;
};

async function loop() {
  setInterval(() => {
    console.log("Orders:", ordersList);
    console.log(`Order com 10min ou mais de espera...`);
    console.log(stoppedOrders());
    console.log("Changed Branch:", changeBranch(filtered));
  }, 3000);
}

loop();

// //Endpoint para visualizar resultado de todos os pedidos até os que estão com status_delivery = 1
// app.get("/orders-teste", (req, res) => {
//   const orderList = ordersList.map((order) => {
//     return {
//       id: order.id,
//       status: order.status,
//       status_delivery: order.status_delivery,
//       date: format(order.date, "dd/MM/yyyy HH:mm:ss"),
//     };
//   });

//   res.json(orderList);
// });

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta: ${PORT}`);
});
