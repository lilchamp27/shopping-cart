const laptops = [
    {
        productName: "UltraBook Pro 15",
        productPrice: 1299.99,
        productImage: "https://cdn.mos.cms.futurecdn.net/Ajc3ezCTN4FGz2vF4LpQn9-1200-80.jpg",
        quantity: 1,
        description: "A powerful ultrabook with a sleek design, perfect for professionals on the go."
    },
    {
        productName: "Gaming Beast X200",
        productPrice: 1899.99,
        productImage: "https://cdn.mos.cms.futurecdn.net/Ajc3ezCTN4FGz2vF4LpQn9-1200-80.jpg",
        quantity: 1,
        description: "High-performance gaming laptop with top-tier graphics for an immersive experience."
    },
    {
        productName: "Budget Buddy 14",
        productPrice: 499.99,
        productImage: "https://cdn.mos.cms.futurecdn.net/Ajc3ezCTN4FGz2vF4LpQn9-1200-80.jpg",
        quantity: 1,
        description: "Affordable and reliable, ideal for students and everyday use."
    },
    {
        productName: "Creative Studio 17",
        productPrice: 1599.99,
        productImage: "https://cdn.mos.cms.futurecdn.net/Ajc3ezCTN4FGz2vF4LpQn9-1200-80.jpg",
        quantity: 1,
        description: "Designed for creatives, this laptop offers vibrant display and powerful editing capabilities."
    },
    {
        productName: "2-in-1 FlexBook",
        productPrice: 799.99,
        productImage: "https://cdn.mos.cms.futurecdn.net/Ajc3ezCTN4FGz2vF4LpQn9-1200-80.jpg",
        quantity: 1,
        description: "Versatile 2-in-1 laptop that easily transitions from a laptop to a tablet."
    }
];

// Render product to DOM
const CartContainer = document.getElementById("cart-list");

// Get total element from span
const allTotal = document.getElementById("total");

// Handle increment
function incrementQuantity(param) {
    let clickProductName = param.target.id;

    // Find the product in the array
    let product = laptops.find(item => item.productName === clickProductName);

    // Increment the product quantity
    product.quantity++;

    // Find the quantity element and update it
    let quantityElem = document.getElementById(`quantity-${clickProductName}`);
    quantityElem.textContent = product.quantity;

    // Update the total price
    allTotal.textContent = sumProduct();
}

// Handle decrement logic
function decreaseQtn(param) {
    let clickProductName = param.target.id;

    // Find the product in the array
    let product = laptops.find(item => item.productName === clickProductName);

    // Decrement the product quantity only if greater than 1
    if (product.quantity > 1) {
        product.quantity--;
    }

    // Find the quantity element and update it
    let quantityElem = document.getElementById(`quantity-${clickProductName}`);
    quantityElem.textContent = product.quantity;

    // Update the total price
    allTotal.textContent = sumProduct();
}

// Calculate total prices
function sumProduct() {
    let total = 0;
    for (let product of laptops) {
        total += product.productPrice * product.quantity;
    }
    return total;
}

// removing products
function removeProduct(param) {
    let clickProductName = param.target.id;
  
    // find the product in the array
    let product;
    for (let item of laptops) {
      if (item.productName === clickProductName) {
        product = item;
        break;
      }
    }
  
  
    // remove the product from the array
    let index = laptops.indexOf(product);
    laptops.splice(index, 1);
  
    // remove the product card from the cart container
    let productCard = param.target.parentElement.parentElement;
    CartContainer.removeChild(productCard);
  
    totalElem.textContent = sumProducts();
  }


// Render products
function renderProducts() {
    for (let product of laptops) {
        let productCard = document.createElement("div");
        productCard.setAttribute("class", "product-card");

        let productimg = document.createElement("img");
        productimg.src = product.productImage;

        let productName = document.createElement("h3");
        productName.textContent = product.productName;

        let productPrice = document.createElement("p");
        productPrice.textContent = `$${product.productPrice}`;

        let productDescription = document.createElement("p");
        productDescription.textContent = product.description;

        // Increment button
        let incrementBtn = document.createElement("button");
        incrementBtn.textContent = "+";
        incrementBtn.setAttribute("id", product.productName);  // Set id based on productName
        incrementBtn.addEventListener("click", function (eventObj) {
            incrementQuantity(eventObj);
        });

        // Decrement button
        let decrementBtn = document.createElement("button");
        decrementBtn.textContent = "-";
        decrementBtn.setAttribute("id", product.productName);  // Set id based on productName
        decrementBtn.addEventListener("click", function (eventObj) {
            decreaseQtn(eventObj);
        });

        // Quantity display
        let quantity = document.createElement("p");
        quantity.textContent = product.quantity;
        quantity.setAttribute("id", `quantity-${product.productName}`); // Unique id based on productName

        // Remove button
        let deleteEle = document.createElement("button");
        deleteEle.textContent = "Remove";
        deleteEle.setAttribute("id", product.productName);
        deleteEle.addEventListener("click", function (eventObj) {
          removeProduct(eventObj);
        });

        let leftBox = document.createElement("div");
        leftBox.setAttribute("class", "left-box");
        leftBox.appendChild(decrementBtn);
        leftBox.appendChild(quantity);
        leftBox.appendChild(incrementBtn);

        let actionBox = document.createElement("div");
        actionBox.setAttribute("class", "action-box");
        actionBox.appendChild(leftBox);
        actionBox.appendChild(deleteEle);

        // Add elements to product card
        productCard.appendChild(productimg);
        productCard.appendChild(productName);
        productCard.appendChild(productPrice);
        productCard.appendChild(productDescription);
        productCard.appendChild(actionBox);

        CartContainer.appendChild(productCard);
    }
}

renderProducts();
