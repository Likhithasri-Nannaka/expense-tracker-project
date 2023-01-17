document.getElementById("expForm").addEventListener("submit", AddExpense);
async function AddExpense(e) {
  e.preventDefault();
  let type = document.getElementById("type").value;
  let name = document.getElementById("name").value;
  let amount = document.getElementById("amount").value;
  if (type != "ChooseOne" && name.length > 0 && amount > 0) {
    const expense = {
      type,
      name,
      amount,
    };
    await axios.post(
      "https://crudcrud.com/api/7552f6900f0b4eb48b7b1e5f30193971/expenseData",
      expense
    );
  }
  document.getElementById("expForm").reset();
  showExpenses();
}
async function showExpenses() {
  const expenseTable = document.getElementById("expenseTable");
  expenseTable.innerHTML = "";
  const response = await axios.get(
    "https://crudcrud.com/api/7552f6900f0b4eb48b7b1e5f30193971/expenseData"
  );
  for (let i = 0; i < response.data.length; i++) {
    expenseTable.innerHTML += `
            <tr>
                <td>${response.data[i].type}</td>
                <td>${response.data[i].name}</td>
                <td>₹ ${response.data[i].amount}</td>
                <td><button class="btn btn-info" onclick="editExpense('${response.data[i]._id}','${response.data[i].type}','${response.data[i].name}','${response.data[i].amount}')">Edit</button> <button class="btn btn-danger" onclick="deleteExpense('${response.data[i]._id}')">
                  Delete</button></td>
            </tr>
        `;
  }
}
async function editExpense(_id, type, name, amount) {
  await axios.put(
    `https://crudcrud.com/api/7552f6900f0b4eb48b7b1e5f30193971/expenseData/${_id}`,
    (document.getElementById("type").value = type),
    (document.getElementById("name").value = name),
    (document.getElementById("amount").value = amount),
    deleteExpense(_id)
  );
}
async function deleteExpense(_id) {
  await axios.delete(
    `https://crudcrud.com/api/7552f6900f0b4eb48b7b1e5f30193971/expenseData/${_id}`
  );
  showExpenses();
}
showExpenses();