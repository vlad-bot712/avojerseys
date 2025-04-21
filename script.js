let products = [
    { id: 1, name: 'Tricou Real Madrid Home', price: '150 RON', image: 'images/rma.png', sizes: ['XL'], description: 'Tricou oficial Real Madrid Home KIT sezon 24/25 1:1 ', specifications: 'Material: 100% poliester, Culoare: alb, 15UCL Patch, HP Patch' },
    { id: 2, name: 'Tricou FC Barcelona Home', price: '140 RON', image: 'images/barca.png', sizes: ['XL'], description: 'Tricou oficial FC Barcelona Home KIT sezon 24/25 1:1', specifications: 'Material: 100% poliester, Culoare: albastru-rosu, 5UCL Patch, Lamine Yamal 19 ' },
    { id: 3, name: 'Tricou Real Madrid Away', price: '150 RON', image: 'images/rma2.png', sizes: [ 'XL'], description: 'Tricou oficial Real Madrid Away KIT sezon 24/25 1:1', specifications: 'Material: 100% poliester, Culoare: portocaliu, 15UCL Patch, HP Patch' },
    { id: 4, name: 'Tricou FC Barcelona Away', price: '140 RON', image: 'images/barca2.png', sizes: [ 'XL'], description: 'Tricou oficial FC Barcelona Away KIT sezon 24/25 1:1', specifications: 'Material: 100% poliester, Culoare: negru, 5UCL Patch, Lamine Yamal 19' },
    { id: 5, name: 'Tricou Chelsea', price: '150 RON', image: 'images/chelsea.png', sizes: [ 'XL'], description: 'Tricou oficial Chelsea KIT sezon 24/25 1:1', specifications: 'Material: 100% poliester, Culoare: albastru, Cole Palmer 20' },
    { id: 6, name: 'Tricou Portugalia', price: '170 RON', image: 'images/portugalia.png', sizes: ['XL'], description: 'Tricou oficial Portugalia KIT sezon 24/25 1:1', specifications: 'Material: 100% poliester, Culoare: rosu, Cristiano Ronaldo 7' },
    { id: 7, name: 'Tricou Inter Miami', price: '170 RON', image: 'images/messi.png', sizes: ['XL'], description: 'Tricou oficial Inter Miami KIT sezon 24/25 1:1', specifications: 'Material: 100% poliester, Culoare: roz, Lionel Messi 10' },
  ];
  
// Încarcă coșul și comenzile din localStorage la încărcarea paginii
window.onload = function () {
  const savedCart = localStorage.getItem('cart');
  if (savedCart) {
    cart = JSON.parse(savedCart);
    updateCartSummary(); // Actualizează sumarul coșului
  }

  const savedOrders = localStorage.getItem('orders');
  if (savedOrders) {
    orders = JSON.parse(savedOrders);
  }
};

  let cart = [];
  let reviews = [];
  let orders = [];
  let orderNumber = 1;
  
  function navigateTo(section) {
    const content = document.getElementById('content');
    const footer = document.getElementById('footer');
  
    if (section === 'homepage') {
      footer.style.display = 'block';
      content.innerHTML = `
        <div class="homepage" style="background: url('images/avo.jpg') no-repeat center center; background-size: cover; color: blue; padding: 50px;">
          <h1>Bine ai venit la Magazinul de Tricouri Fotbal</h1>
          <p>Descoperă cele mai bune tricouri pentru echipa ta preferată!</p>
        </div>
      `;
    } else if (section === 'tricouri') {
      footer.style.display = 'none';
      showProducts();
    } else if (section === 'faq') {
      footer.style.display = 'none';
      showFAQ();
    } else if (section === 'reviews') {
      footer.style.display = 'none';
      showReviews();
    } else if (section === 'orders') {
      footer.style.display = 'none';
      showOrders();
    }
  }
  
  function showProducts() {
    const content = document.getElementById('content');
    let html = '<div class="products">';
    products.forEach(product => {
      html += `
        <div class="product" onclick="viewProduct(${product.id})">
          <img src="${product.image}" alt="${product.name}">
          <h3>${product.name}</h3>
          <p>${product.price}</p>
        </div>
      `;
    });
    html += '</div>';
    content.innerHTML = html;
  }
  
  function viewProduct(id) {
    const product = products.find(p => p.id === id);
    const recommendedProducts = products.filter(p => p.id !== id); // Produse recomandate (toate, mai puțin cel curent)
  
    const content = document.getElementById('content');
    content.innerHTML = `
      <div style="display: flex; gap: 20px;">
        <!-- Secțiunea produsului -->
        <div class="product-details" style="flex: 2;">
          <img src="${product.image}" alt="${product.name}" style="max-width: 100%; border-radius: 10px;">
          <h2>${product.name}</h2>
          <p>${product.price}</p>
          <h2>Descriere</h2>
          <p>${product.description}</p> <!-- Afișează descrierea produsului -->
          <h3>Specificații:</h3>
          <ul>
            ${product.specifications
              .split(', ') // Împarte specificațiile după virgulă
              .map(spec => `<li>${spec}</li>`) // Creează o listă ordonată
              .join('')}
          </ul>
          <label for="size">Alege mărimea:</label>
          <select id="size">
            ${product.sizes.map(size => `<option value="${size}">${size}</option>`).join('')}
          </select>
          <button onclick="addToCart(${product.id})">Adaugă în coș</button>
        </div>
  
        <!-- Secțiunea "Clienți au mai comandat" -->
        <div class="recommended-products" style="flex: 1; display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 20px;">
          <h3 style="text-align: center;">Clienți au mai comandat</h3>
          ${recommendedProducts.map(p => `
            <div class="recommended-product" style="text-align: center; border: 1px solid #ddd; border-radius: 10px; padding: 10px; background-color: #fff;">
              <img src="${p.image}" alt="${p.name}" style="width: 100%; height: auto; border-radius: 5px; margin-bottom: 10px;">
              <p style="font-size: 14px; font-weight: bold; margin: 5px 0;">${p.name}</p>
              <p style="font-size: 14px; color: #555;">${p.price}</p>
              <button onclick="viewProduct(${p.id})" style="padding: 5px 10px; background-color: #007bff; color: white; border: none; border-radius: 5px; cursor: pointer;">Vezi detalii</button>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }
  
  function addToCart(id) {
    const product = products.find(p => p.id === id);
    const size = document.getElementById('size').value;
    cart.push({ ...product, size });
    const button = document.querySelector(`button[onclick="addToCart(${id})"]`);
    button.innerText = '✔️ Adăugat în coș';
    button.style.backgroundColor = 'green';
    button.style.color = 'white';
    button.disabled = true;
  }
  
  function openCart() {
    const content = document.getElementById('content');
  
    if (cart.length === 0) {
      content.innerHTML = '<h2>Coșul este gol!</h2>';
      return;
    }
  
    let totalItems = 0;
    let totalCost = 0;
  
    // Calculează numărul total de produse și costul total
    cart.forEach(item => {
      totalItems += item.quantity;
      totalCost += parseFloat(item.price.replace(' RON', '')) * item.quantity;
    });
  
    let html = `
      <h2>Coș de cumpărături</h2>
      <p><strong>Număr total de produse:</strong> ${totalItems}</p>
      <p><strong>Cost total:</strong> ${totalCost.toFixed(2)} RON</p>
      <div class="cart-items">
    `;
  
    // Afișează fiecare produs din coș
    cart.forEach((item, index) => {
      html += `
        <div class="cart-item" style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px;">
          <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px; border-radius: 5px;">
          <p>${item.name} - ${item.size} - ${item.price} x ${item.quantity}</p>
          <button onclick="removeFromCart(${index})" style="background: none; border: none; color: red; font-size: 20px; cursor: pointer;">X</button>
        </div>
      `;
    });
  
    html += `
      </div>
      <button onclick="openCheckoutOverlay()" style="margin-top: 20px; padding: 10px 20px; background-color: #007bff; color: white; border: none; border-radius: 5px; cursor: pointer;">Checkout</button>
    `;
  
    content.innerHTML = html;
  }
  
  
  
  function submitOrder() {
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;
    const phone = document.getElementById('phone').value;
    const county = document.getElementById('county').value;
    const street = document.getElementById('street').value;
    const city = document.getElementById('city').value;
    const deliveryMethod = document.getElementById('delivery-method').value;
  
    if (!email || !address || !phone || !county || !street || !city) {
      alert('Te rugăm să completezi toate câmpurile!');
      return;
    }
  
    const deliveryCost = deliveryMethod === 'fan' ? 20 : 10;
    const totalCost = cart.reduce((total, item) => total + parseFloat(item.price.replace(' RON', '')) * item.quantity, 0) + deliveryCost;
  
    const order = {
      email,
      address,
      phone,
      county,
      street,
      city,
      deliveryMethod,
      totalCost,
      items: JSON.stringify(cart.map(item => ({
        name: item.name,
        size: item.size,
        quantity: item.quantity,
        price: item.price
      })))
    };
  
    console.log(new URLSearchParams(order).toString()); // Debugging: verifică datele trimise
  
    fetch('http://avojerseys.kesug.com/save_order.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(order)
    })
      .then(response => response.text())
      .then(data => {
        console.log(data); // Debugging: verifică răspunsul serverului
        alert(data); // Afișează mesajul de succes sau eroare
        cart = []; // Golește coșul
        localStorage.removeItem('cart'); // Șterge coșul din localStorage
        updateCartSummary();
        closeOverlay();
      })
      .catch(error => {
        console.error('Eroare la trimiterea comenzii:', error);
        alert('Comanda trimisa cu succes!'); // Afișează mesaj de eroare
      });
  }

  
  function removeFromCart(index) {
    cart.splice(index, 1);
    openCart();
  }
  
  function placeOrder() {
    if (cart.length === 0) return;
    orders.push({ id: orderNumber++, items: [...cart] });
    cart = [];
    alert('Comanda a fost plasată cu succes!');
    openCart();
  }
  
  function showFAQ() {
    const content = document.getElementById('content');
    content.innerHTML = `
      <div class="faq">
        <div class="faq-item">
          <button onclick="toggleFAQ(this)">Ce este magazinul nostru? <span>+</span></button>
          <div class="answer">Magazinul nostru oferă tricouri de fotbal de calitate.</div>
        </div>
        <div class="faq-item">
          <button onclick="toggleFAQ(this)">Cât durează livrarea? <span>+</span></button>
          <div class="answer">Livrarea durează între 2 și 5 zile lucrătoare.</div>
        </div>
      </div>
    `;
  }
  
  function toggleFAQ(button) {
    const faqItem = button.parentElement;
    faqItem.classList.toggle('active');
  }
  
  function showReviews() {
    const content = document.getElementById('content');
    content.innerHTML = `
      <div class="review-form">
        <textarea id="review-text" placeholder="Scrie o recenzie..." rows="4"></textarea>
        <div class="stars">
          ${[1, 2, 3, 4, 5].map(star => `<span class="star" onclick="setRating(${star})">&#9733;</span>`).join('')}
        </div>
        <button onclick="submitReview()">Trimite recenzia</button>
      </div>
      <div class="review-list">
        ${reviews.map(review => `
          <div class="review-item">
            <p>${review.text}</p>
            <div class="stars">
              ${[1, 2, 3, 4, 5].map(star => `<span class="star ${star <= review.rating ? 'checked' : ''}">&#9733;</span>`).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }
  
  function setRating(rating) {
    document.querySelectorAll('.star').forEach((star, index) => {
      star.classList.toggle('checked', index < rating);
    });
    document.getElementById('review-text').dataset.rating = rating;
  }
  
  function submitReview() {
    const text = document.getElementById('review-text').value;
    const rating = document.getElementById('review-text').dataset.rating || 0;
    if (text.trim()) {
      reviews.push({ text, rating });
      showReviews();
    } else {
      alert('Te rugăm să scrii o recenzie.');
    }
  }
  

  



  
  function openCheckoutOverlay() {
    const overlay = document.getElementById('order-overlay');
    const summary = document.getElementById('order-summary');
    const deliveryMethod = document.getElementById('delivery-method');
    const deliveryCost = deliveryMethod && deliveryMethod.value === 'fan' ? 20 : 10; // 20 lei pentru Fan Courier, 10 lei pentru EasyBox
  
    const totalCost = cart.reduce((total, item) => total + parseFloat(item.price.replace(' RON', '')), 0) + deliveryCost;
  
    summary.innerHTML = `
      <h3>Sumar comandă:</h3>
      <ul>
        ${cart.map(item => `<li>${item.name} - ${item.size} - ${item.price}</li>`).join('')}
      </ul>
      <p>Cost livrare: ${deliveryCost} RON</p>
      <p><strong>Total: ${totalCost} RON</strong></p>
    `;
    overlay.style.display = 'flex';
  }
  

  
  function toggleFAQ(button) {
    const faqItem = button.parentElement;
    faqItem.classList.toggle('active');
  }

  function searchProduct(query) {
    const content = document.getElementById('content');
    const filteredProducts = products.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
  
    if (filteredProducts.length === 0) {
      content.innerHTML = '<h2>Nu s-au găsit produse!</h2>';
      return;
    }
  
    let html = '<h2>Rezultatele căutării:</h2><div class="products">';
    filteredProducts.forEach(product => {
      html += `
        <div class="product">
          <img src="${product.image}" alt="${product.name}">
          <h3>${product.name}</h3>
          <p>${product.price}</p>
          <button onclick="viewProduct(${product.id})">Vezi detalii</button>
        </div>
      `;
    });
    html += '</div>';
    content.innerHTML = html;
  }
  
  function showReviews() {
    const content = document.getElementById('content');
    content.innerHTML = `
      <div class="review-section">
        <h2>Lasă o recenzie</h2>
        <textarea id="review-text" placeholder="Scrie o recenzie..." rows="6"></textarea>
        <div class="stars">
          ${[1, 2, 3, 4, 5].map(star => `<span class="star" onclick="setRating(${star})">&#9733;</span>`).join('')}
        </div>
        <button onclick="submitReview()">Trimite recenzia</button>
        <h2>Recenzii acordate</h2>
        <div class="review-list" id="review-list">
          ${reviews.map(review => `
            <div class="review-item">
              <p><strong>${review.username}</strong>: ${review.text}</p>
              <div class="stars">
                ${[1, 2, 3, 4, 5].map(star => `<span class="star ${star <= review.rating ? 'checked' : ''}">&#9733;</span>`).join('')}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }
  
  function toggleFAQ(button) {
    const faqItem = button.parentElement;
    faqItem.classList.toggle('active');
  }
  
  function showFAQ() {
    const content = document.getElementById('content');
    content.innerHTML = `
      <div class="faq-section">
        <h2>Întrebări frecvente</h2>
        <div class="faq-item">
          <button onclick="toggleFAQ(this)">Ce este magazinul nostru? <span>+</span></button>
          <div class="answer">Magazinul nostru oferă tricouri de fotbal de calitate.</div>
        </div>
        <div class="faq-item">
          <button onclick="toggleFAQ(this)">Cât durează livrarea? <span>+</span></button>
          <div class="answer">Livrarea durează între 2 și 5 zile lucrătoare.</div>
        </div>
        <div class="faq-item">
          <button onclick="toggleFAQ(this)">Cum pot returna un produs? <span>+</span></button>
          <div class="answer">Produsele pot fi returnate în termen de 14 zile de la primire.</div>
        </div>
      </div>
    `;
  }
  
  function showOrders() {
    const email = prompt("Introduceți emailul pentru acces:");
    if (email !== "aztenea093@gmail.com") {
      alert("Nu aveți acces la această secțiune.");
      return;
    }
  
    const content = document.getElementById('content');
    let html = '<h2>Comenzi plasate</h2>';
    orders.forEach(order => {
      html += `
       <div class="order-item">
        <h3>Comanda #${order.id}</h3>
        <p><strong>Email:</strong> ${order.email}</p>
        <p><strong>Adresă:</strong> ${order.address}, ${order.street}, ${order.city}, ${order.county}</p>
        <p><strong>Telefon:</strong> ${order.phone}</p>
        <p><strong>Metoda de livrare:</strong> ${order.deliveryMethod}</p>
        <p><strong>Total:</strong> ${order.totalCost} RON</p>
        <h4>Produse:</h4>
        <ul>
          ${order.items.map(item => `
            <li>
              <strong>${item.name}</strong> - ${item.size} - ${item.price} - Cantitate: ${item.quantity}
            </li>
          `).join('')}
        </ul>
      </div>
      `;
    });
    content.innerHTML = html;
  }

  function addToCart(id) {
    const product = products.find(p => p.id === id);
    const size = document.getElementById('size').value;
  
    // Verifică dacă produsul există deja în coș
    const existingProduct = cart.find(item => item.id === id && item.size === size);
    if (existingProduct) {
      existingProduct.quantity += 1; // Crește cantitatea
    } else {
      cart.push({ ...product, size, quantity: 1 }); // Adaugă produsul cu cantitatea 1
    }
  
    const button = document.querySelector(`button[onclick="addToCart(${id})"]`);
    button.innerText = '✔️ Adăugat în coș';
    button.style.backgroundColor = 'green';
    button.style.color = 'white';
    button.disabled = true;
  }
  
  
  
  function closeOverlay() {
    const overlay = document.getElementById('order-overlay');
    overlay.style.display = 'none';
  }
  

  function showMessage() {
    const messageElement = document.getElementById('message');
    messageElement.style.display = 'block';

  }





  let discountApplied = false; // Variabilă pentru a verifica dacă reducerea a fost aplicată

  function applyDiscount() {
    const discountCodeInput = document.getElementById('discount-code').value.trim().toUpperCase();
    const deliveryMethod = document.getElementById('delivery-method');
    const deliveryCost = deliveryMethod && deliveryMethod.value === 'fan' ? 20 : 10; // 20 lei pentru Fan Courier, 10 lei pentru EasyBox
  
    let productTotal = 0; // Totalul produselor
    let discountAmount = 0;
  
    // Calculează totalul produselor
    cart.forEach(item => {
      productTotal += parseFloat(item.price.replace(' RON', '')) * item.quantity;
    });
  
    if (discountCodeInput === 'AVO10' && !discountApplied) {
      discountAmount = productTotal * 0.10; // Reducere de 10% doar pentru produse
      productTotal -= discountAmount;
      discountApplied = true;
  
      alert(`Reducerea de ${discountAmount.toFixed(2)} RON a fost aplicată!`);
    } else if (discountApplied) {
      alert('Reducerea a fost deja aplicată!');
    } else {
      alert('Codul de reducere este invalid!');
    }
  
    // Calculează costul total (produse + transport)
    const totalCost = productTotal + deliveryCost;
  
    // Actualizează sumarul comenzii
    updateOrderSummary(totalCost, discountAmount, deliveryCost);
  }

function updateOrderSummary(totalCost, discountAmount) {
  const summary = document.getElementById('order-summary');
  let html = '<h3>Sumar comandă:</h3>';
  cart.forEach(item => {
    html += `
      <div>
        <p>${item.name} - ${item.quantity} x ${item.price}</p>
      </div>
    `;
  });

  html += `
    <p>Cost livrare: ${discountAmount > 0 ? totalCost + discountAmount - totalCost : totalCost} RON</p>
    <p>Reducere aplicată: ${discountAmount.toFixed(2)} RON</p>
    <p><strong>Total: ${totalCost.toFixed(2)} RON</strong></p>
  `;

  summary.innerHTML = html;
}



function deleteOrder(orderId) {
  const email = prompt('Introduceți emailul pentru a confirma ștergerea comenzii:');
  if (email === 'aztenea093@gmail.com') {
    orders = orders.filter(order => order.id !== orderId);
    localStorage.setItem('orders', JSON.stringify(orders));
    alert('Comanda a fost ștearsă cu succes!');
    showOrders();
  } else {
    alert('Nu aveți permisiunea de a șterge această comandă.');
  }
}