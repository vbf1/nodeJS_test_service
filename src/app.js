import express from "express";

export const orders = [
  { id: 1, date: new Date(Date.now() - 10 * 60 * 1000), status: "ABERTO" }, // 10 min antes
  { id: 2, date: new Date(Date.now() - 10 * 60 * 1000), status: "ABERTO" }, // 10 min antes
  { id: 3, date: new Date(Date.now() - 5 * 60 * 1000), status: "ABERTO" }, // 5 min antes
  { id: 4, date: new Date(Date.now() - 15 * 60 * 1000), status: "ABERTO" }, // 15 min antes
  { id: 5, date: new Date(Date.now()), status: "ABERTO" }, // Hora atual
  { id: 6, date: new Date(Date.now()), status: "ABERTO" }, // Hora atual
];

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/orders", (req, res) => {
  const now = new Date();
  const orderStopped = new Date(now.getTime() - 10 * 60 * 1000);

  const filteredOrders = orders.filter((order) => {
    return order.date.getTime() <= orderStopped.getTime();
  });

  res.json(filteredOrders);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta: ${PORT}`);
});
