let inventory = [];


function findProductIndex(productName) {
  const lowerCaseName = productName.toLowerCase();
  return inventory.findIndex(
    (item) => item.name.toLowerCase() === lowerCaseName
  );
}


function addProduct(product) {
  const name = product.name.toLowerCase();
  const quantity = product.quantity;
  const index = findProductIndex(name);

  if (index !== -1) {
    inventory[index].quantity += quantity;
    console.log(`${name} quantity updated`);
  } else {
    inventory.push({ name, quantity });
    console.log(`${name} added to inventory`);
  }
}


function removeProduct(productName, quantity) {
  const name = productName.toLowerCase();
  const index = findProductIndex(name);

  if (index === -1) {
    console.log(`${name} not found`);
    return;
  }

  const currentQuantity = inventory[index].quantity;

  if (quantity > currentQuantity) {
    console.log(`Not enough ${name} available, remaining pieces: ${currentQuantity}`);
  } else if (quantity === currentQuantity) {
    inventory.splice(index, 1);
    console.log(`${name} removed from inventory`);
  } else {
    inventory[index].quantity -= quantity;
    console.log(`Remaining ${name} pieces: ${inventory[index].quantity}`);
  }
}
