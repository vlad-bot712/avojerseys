let products = [
    { id: 1, name: 'Tricou Real Madrid', price: '150 RON', image: 'images/rma.png', sizes: ['M', 'L', 'XL'] },
    { id: 2, name: 'Tricou FC Barcelona', price: '140 RON', image: 'images/barca.png', sizes: ['M', 'L', 'XL'] },
    { id: 3, name: 'Tricou PSG', price: '145 RON', image: 'images/psg.png', sizes: ['M', 'L', 'XL'] },
    { id: 4, name: 'Tricou Man. City', price: '135 RON', image: 'images/city.png', sizes: ['M', 'L', 'XL'] },
    { id: 5, name: 'Tricou Juventus', price: '130 RON', image: 'images/juve.png', sizes: [ 'L', 'XL'] },
    { id: 6, name: 'Tricou AC Milan', price: '160 RON', image: 'images/milan.png', sizes: [ 'L', 'XL'] },
    { id: 7, name: 'Tricou Portugalia', price: '150 RON', image: 'images/portugalia.png', sizes: [ 'M', 'L', 'XL'] },
    { id: 8, name: 'Tricou Argentina', price: '150 RON', image: 'images/argentina.png', sizes: [ 'L', 'XL'] },
    { id: 9, name: 'Tricou Inter Miami', price: '170 RON', image: 'images/messi.png', sizes: [ 'L', 'XL'] },
    { id: 10, name: 'Tricou AL Nassr', price: '165 RON', image: 'images/ronaldo.png', sizes: [ 'L', 'XL'] },
    { id: 11, name: 'Tricou Romania 1st Kit', price: '160 RON', image: 'images/romania1.png', sizes: [ 'L', 'XL'] },
    { id: 12, name: 'Tricou Romania 2nd Kit', price: '160 RON', image: 'images/romania2.png', sizes: [ 'L', 'XL'] },
  ];
  
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
          <p style="color: green; font-weight: bold;">✔️ În stoc suficient</p>
          <label for="size">Alege mărimea:</label>
          <select id="size">
            ${product.sizes.map(size => `<option value="${size}">${size}</option>`).join('')}
          </select>
          <button onclick="addToCart(${product.id})">Adaugă în coș</button>
        </div>
  
        <!-- Secțiunea "Clienți au mai comandat" -->
        <div class="recommended-products" style="flex: 1; display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px;">
          <h3>Clienți au mai comandat</h3>
          ${recommendedProducts.map(p => `
            <div class="recommended-product" style="text-align: center;">
              <img src="${p.image}" alt="${p.name}" style="width: 100%; border-radius: 5px;">
              <p style="font-size: 14px;">${p.name}</p>
              <p style="font-size: 14px; font-weight: bold;">${p.price}</p>
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
    let html = '<h2>Coș de cumpărături</h2>';
    cart.forEach((item, index) => {
      html += `
        <div class="cart-item" style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px;">
          <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px; border-radius: 5px;">
          <p>${item.name} - ${item.size} - ${item.price}</p>
          <button onclick="removeFromCart(${index})" style="background: none; border: none; color: red; font-size: 20px; cursor: pointer;">X</button>
        </div>
      `;
    });
    html += `<button onclick="openCheckoutOverlay()" style="margin-top: 20px;">Checkout</button>`;
    content.innerHTML = html;
  }
  
  
  
  function submitOrder() {
    console.log('Funcția submitOrder a fost apelată!', JSON.stringify(order));
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
      id: orderNumber++, // ID-ul comenzii
      email,
      address,
      phone,
      county,
      street,
      city,
      deliveryMethod,
      totalCost,
      items: [...cart] // Produsele din coș
    };
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
          <p>Email: ${order.email}</p>
          <p>Adresa: ${order.address}</p>
          <p>Telefon: ${order.phone}</p>
          <p>Județ: ${order.county}</p>
          <p>Strada: ${order.street}</p>
          <p>Oraș/Sat: ${order.city}</p>
          <p>Metoda de livrare: ${order.deliveryMethod}</p>
          <p>Total: ${order.totalCost} RON</p>
          <ul>
            ${order.items.map(item => `<li>${item.name} - ${item.size} - ${item.price}</li>`).join('')}
          </ul>
        </div>
      `;
    });
    content.innerHTML = html;
  }
  function showOrders() {
    const email = "aztenea093@gmail.com"; // Email-ul autorizat
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
  
  function viewProduct(id) {
    const product = products.find(p => p.id === id);
    const content = document.getElementById('content');
    content.innerHTML = `
      <div class="product-details">
        <img src="${product.image}" alt="${product.name}" style="max-width: 100%; border-radius: 10px;">
        <h2>${product.name}</h2>
        <p>${product.price}</p>
        <p>${product.description}</p>
        <p>${product.specifications}</p>
        <label for="size">Alege marimea:</label>
        <select id="size">
          ${product.sizes.map(size => `<option value="${size}">${size}</option>`).join('')}
        </select>
        <button onclick="addToCart(${product.id})">Adaugă în coș</button>
      </div>
    `;
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
  
  function showOrders() {
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
  
  // Initialize homepage
  navigateTo('homepage');

  function openCart() {
    const content = document.getElementById('content');
    if (cart.length === 0) {
      content.innerHTML = '<h2>Coșul este gol!</h2>';
      return;
    }
    let html = '<h2>Coș de cumpărături</h2>';
    cart.forEach((item, index) => {
      html += `
        <div class="cart-item">
          <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px; border-radius: 5px;">
          <p>${item.name} - ${item.size} - ${item.price}</p>
          <button onclick="removeFromCart(${index})">Șterge</button>
        </div>
      `;
    });
    html += `<button onclick="openCheckoutOverlay()">Checkout</button>`;
    content.innerHTML = html;
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
  
  function submitOrder() {
    const address = document.getElementById('address').value;
    const phone = document.getElementById('phone').value;
    const county = document.getElementById('county').value;
    const street = document.getElementById('street').value;
    const city = document.getElementById('city').value;
    const deliveryMethod = document.getElementById('delivery-method').value;
  
    if (!address || !phone || !county || !street || !city) {
      alert('Te rugăm să completezi toate câmpurile!');
      return;
    }
  
    const deliveryCost = deliveryMethod === 'fan' ? 20 : 10;
    const totalCost = cart.reduce((total, item) => total + parseFloat(item.price.replace(' RON', '')), 0) + deliveryCost;
  
    orders.push({
      id: orderNumber++,
      items: [...cart],
      address,
      phone,
      county,
      street,
      city,
      deliveryMethod,
      totalCost,
    });
  
    cart = [];
    closeOverlay();
    alert('Comanda a fost plasată cu succes!');
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
  
  function openCart() {
    const content = document.getElementById('content');
    if (cart.length === 0) {
      content.innerHTML = '<h2>Coșul este gol!</h2>';
      return;
    }
    let html = '<h2>Coș de cumpărături</h2>';
    cart.forEach((item, index) => {
      html += `
        <div class="cart-item" style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px;">
          <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px; border-radius: 5px;">
          <div>
            <p>${item.name} - ${item.size}</p>
            <p>X${item.quantity}</p>
          </div>
          <button onclick="removeFromCart(${index})" style="background: none; border: none; color: red; font-size: 20px; cursor: pointer;">X</button>
        </div>
      `;
    });
    html += `<button onclick="openCheckoutOverlay()" style="margin-top: 20px;">Checkout</button>`;
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
          <p style="color: green; font-weight: bold;">✔️ În stoc suficient</p>
          <label for="size">Alege mărimea:</label>
          <select id="size">
            ${product.sizes.map(size => `<option value="${size}">${size}</option>`).join('')}
          </select>
          <button onclick="addToCart(${product.id})">Adaugă în coș</button>
        </div>
  
        <!-- Secțiunea "Clienți au mai comandat" -->
        <div class="recommended-products" style="flex: 1;">
          <h3>Clienți au mai comandat</h3>
          ${recommendedProducts.map(p => `
            <div class="recommended-product" style="margin-bottom: 15px;">
              <img src="${p.image}" alt="${p.name}" style="width: 100%; border-radius: 5px;">
              <p>${p.name}</p>
              <p>${p.price}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;
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
    const totalCost = cart.reduce((total, item) => total + parseFloat(item.price.replace(' RON', '')), 0) + deliveryCost;
  
    orders.push({
      id: orderNumber++,
      email,
      address,
      phone,
      county,
      street,
      city,
      deliveryMethod,
      totalCost,
      items: [...cart],
    });
  
    cart = [];
    closeOverlay();
    alert('Comanda a fost plasată cu succes!');
  }
  
  function closeOverlay() {
    const overlay = document.getElementById('order-overlay');
    overlay.style.display = 'none';
  }
  
  function viewProduct(id) {
    const product = products.find(p => p.id === id);
    const recommendedProducts = products.filter(p => p.id !== id); // Produse recomandate
  
    const content = document.getElementById('content');
    content.innerHTML = `
      <div style="display: flex; gap: 20px;">
        <!-- Secțiunea produsului -->
        <div class="product-details" style="flex: 2;">
          <img src="${product.image}" alt="${product.name}" style="max-width: 100%; border-radius: 10px;">
          <h2>${product.name}</h2>
          <p>${product.price}</p>
          <p style="color: green; font-weight: bold;">✔️ În stoc suficient</p>
          <label for="size">Alege mărimea:</label>
          <select id="size">
            ${product.sizes.map(size => `<option value="${size}">${size}</option>`).join('')}
          </select>
          <button onclick="addToCart(${product.id})">Adaugă în coș</button>
        </div>
  
        <!-- Secțiunea "Clienți au mai comandat" -->
        <div class="recommended-products" style="flex: 1; overflow-y: hidden; overflow-x: auto; white-space: nowrap;">
          <h3>Clienți au mai comandat</h3>
          ${recommendedProducts.map(p => `
            <div class="recommended-product" style="display: inline-block; margin-right: 10px; width: 100px;">
              <img src="${p.image}" alt="${p.name}" style="width: 100%; border-radius: 5px;">
              <p style="font-size: 12px; text-align: center;">${p.name}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;
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

  // Salvează comanda în array-ul `orders`
  orders.push({
    id: orderNumber++,
    email,
    address,
    phone,
    county,
    street,
    city,
    deliveryMethod,
    totalCost,
    items: [...cart], // Copiază produsele din coș
  });

  // Resetează coșul
  cart = [];
  closeOverlay();
  alert('Comanda a fost plasată cu succes!');
}