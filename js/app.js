class Medicines {
  constructor(productName, productID, manufacturer, expirationDate, quantity) {
    this.productName = productName;
    this.productID = productID;
    this.manufacturer = manufacturer;
    this.expirationDate = expirationDate;
    this.quantity = quantity;
  }
}

class UI {
  addMedicineToList(medicines) {
    const list = document.querySelector("#medicines-list");
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${medicines.productName}</td>
      <td>${medicines.productID}</td>
      <td>${medicines.manufacturer}</td>
      <td>${medicines.expirationDate}</td>
      <td>${medicines.quantity}</td>
      <td><a href="#" class="delete">Delete</a></td>
    `;
    list.appendChild(row);
  }

  deleteMedicine(target) {
    if (target.className === "delete") {
      target.parentElement.parentElement.remove();

      const medicines = JSON.parse(localStorage.getItem("medicines"));
      const index = medicines.findIndex(medicine => medicine.productID === target.parentElement.parentElement.cells[1].textContent);
      if (index!== -1) {
        medicines.splice(index, 1);
        localStorage.setItem("medicines", JSON.stringify(medicines));
      }
    }
  }

  clearFields() {
    document.querySelector("#productname").value = "";
    document.querySelector("#productID").value = "";
    document.querySelector("#manufacturer").value = "";
    document.querySelector("#expirationdate").value = "";
    document.querySelector("#quantity").value = "";
  }

  displayMedicines() {
    const medicines = JSON.parse(localStorage.getItem("medicines")) || [];
    medicines.forEach(medicine => {
      this.addMedicineToList(medicine);
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const ui = new UI();
  ui.displayMedicines();
});

document.querySelector("#medicines-form").addEventListener("submit", function (e) {
  const productName = document.querySelector("#productname").value;
  const productID = document.querySelector("#productID").value;
  const manufacturer = document.querySelector("#manufacturer").value;
  const expirationDate = document.querySelector("#expirationdate").value;
  const quantity = document.querySelector("#quantity").value;

  const medicines = new Medicines(productName, productID, manufacturer, expirationDate, quantity);

  const ui = new UI();

  if (productName === "" || productID === "" || manufacturer === "" || expirationDate === "" || quantity === "") {
 
  } else {
    ui.addMedicineToList(medicines);
    ui.clearFields();


    const storedMedicines = JSON.parse(localStorage.getItem("medicines")) || [];
    storedMedicines.push({
      productName: medicines.productName,
      productID: medicines.productID,
      manufacturer: medicines.manufacturer,
      expirationDate: medicines.expirationDate,
      quantity: medicines.quantity
    });
    localStorage.setItem("medicines", JSON.stringify(storedMedicines));
  }
  e.preventDefault();
});

document.querySelector("#medicines-list").addEventListener("click", function (e) {
  if (e.target.className === "delete") {
    const ui = new UI();
    ui.deleteMedicine(e.target);
  }
  e.preventDefault();
});
