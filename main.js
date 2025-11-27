let text = document.getElementById('text');
let moon = document.getElementById('moon');
let dragonS = document.getElementById('dragon-s');
let dragonL = document.getElementById('dragon-l');
let cloud1 = document.getElementById('cloud1')
let cloud2 = document.getElementById('cloud2')
let cloud3 = document.getElementById('cloud3')
let cloud4 = document.getElementById('cloud4')

const initialDragonLOffset = 1000;

window.addEventListener('scroll', () => {
    let value = window.scrollY;

    text.style.marginTop = value * .8 + 'px';
    moon.style.marginTop = value * 1.5 + 'px';
    dragonS.style.top = value * -2.5 + 'px';
    dragonL.style.top = initialDragonLOffset + value * -2.5 + 'px';
    cloud1.style.marginLeft = value * 1 + 'px';
    cloud2.style.marginLeft = value * 1 + 'px';
    cloud3.style.marginLeft = value * -1 + 'px';
    cloud4.style.marginLeft = value * -1 + 'px';
})

let slides;
let totalSlides;
let currentIndex = 0;

// Get audio elements
const selectSound = document.getElementById('dragon-select-sound'); 
const bgm = document.getElementById('background-music'); // Reference for BGM
let bgmStarted = false; // Flag to prevent multiple BGM starts

// Function to handle slide sound playback
function playSelectSound() {
    if (selectSound) {
        selectSound.currentTime = 0;
        selectSound.play().catch(e => console.warn("Audio play prevented:", e)); 
    }
}

// Function to handle background music start (Autoplay fallback)
function startBGM() {
    if (bgm && !bgmStarted) {
        bgm.play().then(() => {
            // Success: music started
            bgmStarted = true;
            console.log("Background music started.");
            // Remove the click listener once successfully started
            document.body.removeEventListener('click', startBGM); 
        }).catch(e => {
            // Failure: Autoplay was prevented
            console.warn("BGM Autoplay blocked. Waiting for user interaction...");
        });
    }
}

function moveSlider(direction) {
    currentIndex = (currentIndex + direction + totalSlides) % totalSlides;
    
    playSelectSound();
    
    updateSliderClasses();
}

// Function to update dragon info using data from my_stats.js
function updateDragonInfo(dragonName) {
    const d = dragonsData.find(dragon => dragon.name === dragonName);
    
    if (d) {
        dragonDesc.textContent = d.desc;
        renderStats(d);
        animateStats();
    } else {
        dragonDesc.textContent = "Data not found for this dragon. Please check 'my_stats.js'.";
        statsWrap.innerHTML = "";
    }
}

function updateSliderClasses() {
    slides.forEach((slide, index) => {
        slide.classList.remove('active', 'prev', 'next');

        const position = (index - currentIndex + totalSlides) % totalSlides;

        if (position === 0) slide.classList.add('active');
        else if (position === 1) slide.classList.add('next');
        else if (position === totalSlides - 1) slide.classList.add('prev');
    });

    const activeSlide = document.querySelector('.slide-item.active');
    const rawDragonName = activeSlide.dataset.name;
    const lookupDragonName = rawDragonName.toUpperCase();
    
    document.getElementById('dragon-specie').textContent = rawDragonName;
    
    updateDragonInfo(lookupDragonName); 
}

document.addEventListener('DOMContentLoaded', () => {
    slides = Array.from(document.querySelectorAll('.slide-item'));
    totalSlides = slides.length;
    updateSliderClasses();

    document.querySelector('.click-left').onclick = () => moveSlider(-1);
    document.querySelector('.click-right').onclick = () => moveSlider(1);
    
    // 1. Attempt to start BGM immediately on load
    startBGM();

    // 2. Add a fallback listener to start BGM on the very first interaction (any click)
    document.body.addEventListener('click', startBGM);
}); 

// ABOUT SECTION
    document.addEventListener('DOMContentLoaded', () => {
        const aboutSection = document.querySelector('.sec-about');
        
        // Configuration for the observer
        const observerOptions = {
            root: null, // relative to the viewport
            rootMargin: '0px',
            threshold: 0.1 // 10% of the target element must be visible
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Element is now visible, add class to start animation
                    entry.target.classList.add('is-visible');
                } else {
                    // Element is no longer visible, remove class to reset animation
                    entry.target.classList.remove('is-visible');
                }
            });
        }, observerOptions);

        if (aboutSection) {
            observer.observe(aboutSection);
        }
    });

    





// STATS SECTION

const dragonsData = [
    {
        name: "NIGHT FURY",
        species: "Strike",
        class: "Strike",
        img: "toothless.png",
        desc: `The Night Fury is the rarest and most intelligent species of dragon, known for its jet-black color, nocturnal habits, and deadly plasma blast. Toothless is the only known Night Fury.`,
        stats: { "Attack":90,"Speed":100,"Armor":70,"Firepower":80,"Shot Limit":60,"Venom":0,"Jaw Strength":80,"Stealth":98 },
        palette:["fill--pink","fill--teal","fill--magenta","fill--orange","fill--peach","fill--green","fill--cyan","fill--blue"]
    },
    {
        name: "LIGHT FURY",
        species: "Light Fury",
        class: "Strike",
        img: "lightfury.png",
        desc: `The Light Fury is a white, agile dragon known for its ability to cloak itself by blasting plasma and flying through the explosion. They are extremely fast and possess high stealth.`,
        stats: { "Attack":85,"Speed":100,"Armor":60,"Firepower":75,"Shot Limit":60,"Venom":0,"Jaw Strength":70,"Stealth":95 },
        palette:["fill--pink","fill--teal","fill--magenta","fill--orange","fill--peach","fill--green","fill--cyan","fill--blue"]
    },
    {
        name: "STORMFLY",
        species: "Deadly Nadder",
        class: "Tracker",
        img: "stormfly.png",
        desc: `Stormfly is a beautiful, vain, but fierce Deadly Nadder. Nadders are known for their hot magnesium-fueled fire and the deadly spikes on their tail, making them very dangerous.`,
        stats: { "Attack":75,"Speed":80,"Armor":70,"Firepower":60,"Shot Limit":40,"Venom":50,"Jaw Strength":50,"Stealth":20 },
        palette:["fill--pink","fill--teal","fill--magenta","fill--orange","fill--peach","fill--green","fill--cyan","fill--blue"]
    },
    
    {
        name: "ARMORWING",
        species: "Armorwing",
        class: "Sharp",
        img: "armorwing.png",
        desc: `***PLACEHOLDER: FILL IN DESCRIPTION HERE***`,
        stats: { "Attack":80,"Speed":50,"Armor":90,"Firepower":40,"Shot Limit":10,"Venom":0,"Jaw Strength":50,"Stealth":15 },
        palette:["fill--pink","fill--teal","fill--magenta","fill--orange","fill--peach","fill--green","fill--cyan","fill--blue"]
    },
    {
        name: "BABY GRONCKLE",
        species: "Gronckle",
        class: "Boulder",
        img: "baby_gronckle.png",
        desc: `***PLACEHOLDER: FILL IN DESCRIPTION HERE***`,
        stats: { "Attack":30,"Speed":10,"Armor":40,"Firepower":25,"Shot Limit":2,"Venom":0,"Jaw Strength":35,"Stealth":5 },
        palette:["fill--pink","fill--teal","fill--magenta","fill--orange","fill--peach","fill--green","fill--cyan","fill--blue"]
    },
    {
        name: "BABY NADDER",
        species: "Deadly Nadder",
        class: "Tracker",
        img: "baby_nadder.png",
        desc: `***PLACEHOLDER: FILL IN DESCRIPTION HERE***`,
        stats: { "Attack":35,"Speed":40,"Armor":35,"Firepower":20,"Shot Limit":15,"Venom":20,"Jaw Strength":20,"Stealth":10 },
        palette:["fill--pink","fill--teal","fill--magenta","fill--orange","fill--peach","fill--green","fill--cyan","fill--blue"]
    },
    {
        name: "BABY NIGHTMARE",
        species: "Monsterous Nightmare",
        class: "Stoker",
        img: "baby_nightmare.png",
        desc: `***PLACEHOLDER: FILL IN DESCRIPTION HERE***`,
        stats: { "Attack":40,"Speed":30,"Armor":35,"Firepower":35,"Shot Limit":5,"Venom":0,"Jaw Strength":25,"Stealth":5 },
        palette:["fill--pink","fill--teal","fill--magenta","fill--orange","fill--peach","fill--green","fill--cyan","fill--blue"]
    },
    {
        name: "BABY ZIPPLEBACK",
        species: "Hideous Zippleback",
        class: "Fear",
        img: "baby_zippleback.png",
        desc: `***PLACEHOLDER: FILL IN DESCRIPTION HERE***`,
        stats: { "Attack":25,"Speed":30,"Armor":30,"Firepower":40,"Shot Limit":6,"Venom":10,"Jaw Strength":10,"Stealth":40 },
        palette:["fill--pink","fill--teal","fill--magenta","fill--orange","fill--peach","fill--green","fill--cyan","fill--blue"]
    },
    {
        name: "BARF & BELCH",
        species: "Hideous Zippleback",
        class: "Fear",
        img: "barf&belch.png",
        desc: `***PLACEHOLDER: FILL IN DESCRIPTION HERE***`,
        stats: { "Attack":50,"Speed":75,"Armor":40,"Firepower":65,"Shot Limit":12,"Venom":15,"Jaw Strength":20,"Stealth":60 },
        palette:["fill--pink","fill--teal","fill--magenta","fill--orange","fill--peach","fill--green","fill--cyan","fill--blue"]
    },
    {
        name: "CLOUDJUMPER",
        species: "Stormcutter",
        class: "Sharp",
        img: "cloudjumper.png",
        desc: `***PLACEHOLDER: FILL IN DESCRIPTION HERE***`,
        stats: { "Attack":65,"Speed":70,"Armor":80,"Firepower":70,"Shot Limit":10,"Venom":0,"Jaw Strength":50,"Stealth":30 },
        palette:["fill--pink","fill--teal","fill--magenta","fill--orange","fill--peach","fill--green","fill--cyan","fill--blue"]
    },
    {
        name: "DEATH SONG",
        species: "Death Song",
        class: "Mystery",
        img: "death_song.png",
        desc: `***PLACEHOLDER: FILL IN DESCRIPTION HERE***`,
        stats: { "Attack":85,"Speed":80,"Armor":40,"Firepower":90,"Shot Limit":8,"Venom":0,"Jaw Strength":40,"Stealth":70 },
        palette:["fill--pink","fill--teal","fill--magenta","fill--orange","fill--peach","fill--green","fill--cyan","fill--blue"]
    },
    {
        name: "DRAGOS BEWILDERBEAST",
        species: "Bewilderbeast",
        class: "Alpha",
        img: "dragos_bewilderbeast.png",
        desc: `***PLACEHOLDER: FILL IN DESCRIPTION HERE***`,
        stats: { "Attack":90,"Speed":10,"Armor":100,"Firepower":100,"Shot Limit":6,"Venom":0,"Jaw Strength":100,"Stealth":5 },
        palette:["fill--pink","fill--teal","fill--magenta","fill--orange","fill--peach","fill--green","fill--cyan","fill--blue"]
    },
    {
        name: "DRAMILLION",
        species: "Dramillion",
        class: "Sharp",
        img: "dramillion.png",
        desc: `***PLACEHOLDER: FILL IN DESCRIPTION HERE***`,
        stats: { "Attack":80,"Speed":70,"Armor":70,"Firepower":70,"Shot Limit":8,"Venom":0,"Jaw Strength":50,"Stealth":80 },
        palette:["fill--pink","fill--teal","fill--magenta","fill--orange","fill--peach","fill--green","fill--cyan","fill--blue"]
    },
    {
        name: "ERUPTODON",
        species: "Eruptodon",
        class: "Boulder",
        img: "eruptodon.png",
        desc: `***PLACEHOLDER: FILL IN DESCRIPTION HERE***`,
        stats: { "Attack":75,"Speed":50,"Armor":90,"Firepower":80,"Shot Limit":8,"Venom":0,"Jaw Strength":70,"Stealth":10 },
        palette:["fill--pink","fill--teal","fill--magenta","fill--orange","fill--peach","fill--green","fill--cyan","fill--blue"]
    },
    {
        name: "GRUMP",
        species: "Gronckle",
        class: "Boulder",
        img: "grump.png",
        desc: `***PLACEHOLDER: FILL IN DESCRIPTION HERE***`,
        stats: { "Attack":50,"Speed":40,"Armor":80,"Firepower":50,"Shot Limit":6,"Venom":0,"Jaw Strength":60,"Stealth":5 },
        palette:["fill--pink","fill--teal","fill--magenta","fill--orange","fill--peach","fill--green","fill--cyan","fill--blue"]
    },
    {
        name: "HOOKFANG",
        species: "Monsterous Nightmare",
        class: "Stoker",
        img: "hookfang.png",
        desc: `***PLACEHOLDER: FILL IN DESCRIPTION HERE***`,
        stats: { "Attack":95,"Speed":65,"Armor":75,"Firepower":85,"Shot Limit":10,"Venom":0,"Jaw Strength":60,"Stealth":10 },
        palette:["fill--pink","fill--teal","fill--magenta","fill--orange","fill--peach","fill--green","fill--cyan","fill--blue"]
    },
    {
        name: "MEATLUG",
        species: "Gronckle",
        class: "Boulder",
        img: "meatlug.png",
        desc: `***PLACEHOLDER: FILL IN DESCRIPTION HERE***`,
        stats: { "Attack":50,"Speed":40,"Armor":80,"Firepower":50,"Shot Limit":6,"Venom":0,"Jaw Strength":60,"Stealth":5 },
        palette:["fill--pink","fill--teal","fill--magenta","fill--orange","fill--peach","fill--green","fill--cyan","fill--blue"]
    },
    {
        name: "NIGHT TERROR",
        species: "Night Terror",
        class: "Stoker",
        img: "night_terror.png",
        desc: `***PLACEHOLDER: FILL IN DESCRIPTION HERE***`,
        stats: { "Attack":40,"Speed":80,"Armor":20,"Firepower":30,"Shot Limit":4,"Venom":0,"Jaw Strength":20,"Stealth":85 },
        palette:["fill--pink","fill--teal","fill--magenta","fill--orange","fill--peach","fill--green","fill--cyan","fill--blue"]
    },
    {
        name: "PLATFORM",
        species: "Platform",
        class: "Tidal",
        img: "platform.png",
        desc: `***PLACEHOLDER: FILL IN DESCRIPTION HERE***`,
        stats: { "Attack":60,"Speed":30,"Armor":95,"Firepower":20,"Shot Limit":5,"Venom":0,"Jaw Strength":80,"Stealth":5 },
        palette:["fill--pink","fill--teal","fill--magenta","fill--orange","fill--peach","fill--green","fill--cyan","fill--blue"]
    },
    {
        name: "SEASHOCKER",
        species: "Seashocker",
        class: "Tidal",
        img: "seashocker.png",
        desc: `***PLACEHOLDER: FILL IN DESCRIPTION HERE***`,
        stats: { "Attack":60,"Speed":70,"Armor":40,"Firepower":30,"Shot Limit":4,"Venom":0,"Jaw Strength":20,"Stealth":70 },
        palette:["fill--pink","fill--teal","fill--magenta","fill--orange","fill--peach","fill--green","fill--cyan","fill--blue"]
    },
    {
        name: "SKRILL",
        species: "Skrill",
        class: "Strike",
        img: "skrill.png",
        desc: `***PLACEHOLDER: FILL IN DESCRIPTION HERE***`,
        stats: { "Attack":88,"Speed":90,"Armor":70,"Firepower":80,"Shot Limit":4,"Venom":0,"Jaw Strength":50,"Stealth":60 },
        palette:["fill--pink","fill--teal","fill--magenta","fill--orange","fill--peach","fill--green","fill--cyan","fill--blue"]
    },
    {
        name: "SKULLCRUSHER",
        species: "Rumblehorn",
        class: "Tracker",
        img: "skullcrusher.png",
        desc: `***PLACEHOLDER: FILL IN DESCRIPTION HERE***`,
        stats: { "Attack":80,"Speed":60,"Armor":90,"Firepower":30,"Shot Limit":6,"Venom":0,"Jaw Strength":75,"Stealth":20 },
        palette:["fill--pink","fill--teal","fill--magenta","fill--orange","fill--peach","fill--green","fill--cyan","fill--blue"]
    },
    {
        name: "SNAPTRAPPER",
        species: "Snaptrapper",
        class: "Fear",
        img: "snaptrapper.png",
        desc: `***PLACEHOLDER: FILL IN DESCRIPTION HERE***`,
        stats: { "Attack":50,"Speed":50,"Armor":40,"Firepower":60,"Shot Limit":10,"Venom":0,"Jaw Strength":70,"Stealth":50 },
        palette:["fill--pink","fill--teal","fill--magenta","fill--orange","fill--peach","fill--green","fill--cyan","fill--blue"]
    },
    {
        name: "TERRIBLE TERROR",
        species: "Terrible Terror",
        class: "Stoker",
        img: "terrible_terror.png",
        desc: `***PLACEHOLDER: FILL IN DESCRIPTION HERE***`,
        stats: { "Attack":10,"Speed":40,"Armor":10,"Firepower":15,"Shot Limit":2,"Venom":10,"Jaw Strength":5,"Stealth":50 },
        palette:["fill--pink","fill--teal","fill--magenta","fill--orange","fill--peach","fill--green","fill--cyan","fill--blue"]
    },
    {
        name: "THUNDERDRUM",
        species: "Thunderdrum",
        class: "Tidal",
        img: "thunderdrum.png",
        desc: `***PLACEHOLDER: FILL IN DESCRIPTION HERE***`,
        stats: { "Attack":70,"Speed":70,"Armor":70,"Firepower":50,"Shot Limit":6,"Venom":0,"Jaw Strength":50,"Stealth":30 },
        palette:["fill--pink","fill--teal","fill--magenta","fill--orange","fill--peach","fill--green","fill--cyan","fill--blue"]
    },
    {
        name: "TIMBERJACK",
        species: "Timberjack",
        class: "Sharp",
        img: "timberjack.png",
        desc: `***PLACEHOLDER: FILL IN DESCRIPTION HERE***`,
        stats: { "Attack":60,"Speed":80,"Armor":20,"Firepower":50,"Shot Limit":5,"Venom":0,"Jaw Strength":70,"Stealth":60 },
        palette:["fill--pink","fill--teal","fill--magenta","fill--orange","fill--peach","fill--green","fill--cyan","fill--blue"]
    },
    {
        name: "VALKAS BEWILDERBEAST",
        species: "Bewilderbeast",
        class: "Alpha",
        img: "valkas_bewilderbeast.png",
        desc: `***PLACEHOLDER: FILL IN DESCRIPTION HERE***`,
        stats: { "Attack":90,"Speed":10,"Armor":100,"Firepower":100,"Shot Limit":6,"Venom":0,"Jaw Strength":100,"Stealth":5 },
        palette:["fill--pink","fill--teal","fill--magenta","fill--orange","fill--peach","fill--green","fill--cyan","fill--blue"]
    },
    {
        name: "WHISPERING DEATH",
        species: "Whispering Death",
        class: "Boulder",
        img: "whispering_death.png",
        desc: `***PLACEHOLDER: FILL IN DESCRIPTION HERE***`,
        stats: { "Attack":70,"Speed":50,"Armor":50,"Firepower":40,"Shot Limit":8,"Venom":0,"Jaw Strength":80,"Stealth":70 },
        palette:["fill--pink","fill--teal","fill--magenta","fill--orange","fill--peach","fill--green","fill--cyan","fill--blue"]
    }
];

const dragonDesc = document.getElementById("dragon-desc");
const statsWrap = document.getElementById("stats");

function renderStats(d){
    statsWrap.innerHTML = "";
    Object.keys(d.stats).forEach((key,i)=>{
        const row = document.createElement("div"); 
        row.className = "stat";
        
        const label = document.createElement("label"); 
        label.textContent = key;
        
        const bar = document.createElement("div"); 
        bar.className = "bar";
        
        const fill = document.createElement("div"); 
        fill.className = `fill ${d.palette[i % d.palette.length]}`; 
        fill.style.width = "0%";
        fill.setAttribute("data-value", d.stats[key]);
        
        bar.appendChild(fill); 
        row.appendChild(label); 
        row.appendChild(bar);
        statsWrap.appendChild(row);
    });
}

function animateStats(duration = 900){
    statsWrap.querySelectorAll(".fill").forEach((f,i)=>{
        setTimeout(()=>{
            f.style.transition = `width ${duration}ms cubic-bezier(.2,.9,.2,1)`;
            f.style.width = `${f.getAttribute("data-value")}%`;
        }, i * 80);
    });
}

// SHOP SECTION

// SHOP SECTION START (Globals)

// let cart = {
//     items: [], // Array of product objects: [{ name, price, quantity, imageSrc }, ...]
//     count: 0,
//     total: 0.00
// };

// --- DOM Element References (Declared here, assigned in setupCartFunctionality) ---
// ----------------------------------------------
// GLOBAL CART STATE
// ----------------------------------------------
let cart = {
    count: 0,
    total: 0,
    items: []
};

// ----------------------------------------------
// GLOBAL DOM REFERENCES (Accessible by all functions)
// ----------------------------------------------
const cartIcon = document.querySelector('.bx-cart');
const cartDetailsWindow = document.getElementById('cart-details-window');
const cartCountElement = document.getElementById('cart-count');
const cartTotalElement = document.getElementById('cart-total-price');
const cartItemsListElement = document.getElementById('cart-items-list');
const summaryCountElement = document.getElementById('summary-count');
const summaryTotalElement = document.getElementById('summary-total');

// ----------------------------------------------
// INITIALIZE CART FUNCTIONALITY
// ----------------------------------------------
function setupCartFunctionality() {

    if (!cartIcon || !cartDetailsWindow) {
        console.warn("Cart elements missing — check HTML.");
        return;
    }

    // Add to Cart buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', event => {
            event.preventDefault();
            addItemToCart(button);
        });
    });

    // Toggle cart panel on icon click
    const cartInfoContainer = cartIcon.closest('.cart-info');
    if (cartInfoContainer) {
        cartInfoContainer.addEventListener('click', toggleCartDetails);
    }

    updateCartDisplay();
    renderCartItems();
}

// ----------------------------------------------
// ADD ITEM TO CART
// ----------------------------------------------
function addItemToCart(buttonElement) {
    const productBox = buttonElement.closest('.box');
    if (!productBox) return;

    const name = productBox.querySelector('h3').textContent.trim();
    const price = parseFloat(productBox.querySelector('.price').textContent.replace('$', ''));
    const imageSrc = productBox.querySelector('.dragon-img')?.getAttribute('src') || '';

    // Update totals
    cart.count += 1;
    cart.total += price;

    // Check if item already exists
    const existingItem = cart.items.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.items.push({
            name: name,
            price: price,
            quantity: 1,
            imageSrc: imageSrc
        });
    }

    updateCartDisplay();
    renderCartItems();

    // Auto-open cart
    if (cartDetailsWindow && !cartDetailsWindow.classList.contains('visible')) {
        toggleCartDetails();
    }
}

// ----------------------------------------------
// UPDATE HEADER CART DISPLAY
// ----------------------------------------------
function updateCartDisplay() {
    if (cartCountElement) cartCountElement.textContent = cart.count;
    if (cartTotalElement) cartTotalElement.textContent = `$${cart.total.toFixed(2)}`;
}

// ----------------------------------------------
// RENDER CART ITEMS IN CART WINDOW
// ----------------------------------------------
function renderCartItems() {
    if (!cartItemsListElement) return;

    cartItemsListElement.innerHTML = '';

    if (cart.items.length === 0) {
        cartItemsListElement.innerHTML = '<p>Your cart is empty.</p>';
        summaryCountElement.textContent = 0;
        summaryTotalElement.textContent = `$0.00`;
        return;
    }

    cart.items.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.innerHTML = `
            <img src="${item.imageSrc}" alt="${item.name}" class="cart-item-img">
            <div class="item-details">
                <span class="item-name">${item.name}</span>
                <div class="quantity-controls" data-index="${index}">
                    <button class="qty-minus">-</button>
                    <span class="item-quantity">${item.quantity}</span>
                    <button class="qty-plus">+</button>
                </div>
            </div>
            <span class="item-subtotal">$${(item.price * item.quantity).toFixed(2)}</span>
        `;
        cartItemsListElement.appendChild(itemElement);
    });

    attachCartControlListeners();

    // Update summary
    summaryCountElement.textContent = cart.count;
    summaryTotalElement.textContent = `$${cart.total.toFixed(2)}`;
}

// ----------------------------------------------
// QUANTITY CONTROL BUTTONS
// ----------------------------------------------
function attachCartControlListeners() {
    document.querySelectorAll('.qty-plus').forEach(btn =>
        btn.addEventListener('click', handleQuantityChange)
    );

    document.querySelectorAll('.qty-minus').forEach(btn =>
        btn.addEventListener('click', handleQuantityChange)
    );
}

// ----------------------------------------------
// HANDLE + / − QUANTITY CHANGES
// ----------------------------------------------
function handleQuantityChange(event) {
    const button = event.currentTarget;
    const controlsDiv = button.closest('.quantity-controls');
    const index = parseInt(controlsDiv.dataset.index);
    const item = cart.items[index];

    const isPlus = button.classList.contains('qty-plus');

    if (isPlus) {
        item.quantity += 1;
        cart.count += 1;
        cart.total += item.price;
    } else {
        if (item.quantity > 1) {
            item.quantity -= 1;
            cart.count -= 1;
            cart.total -= item.price;
        } else {
            // Remove item
            cart.count -= 1;
            cart.total -= item.price;
            cart.items.splice(index, 1);
        }
    }

    updateCartDisplay();
    renderCartItems();
}

// ----------------------------------------------
// TOGGLE CART WINDOW
// ----------------------------------------------
function toggleCartDetails() {
    cartDetailsWindow.classList.toggle('visible');
}

document.addEventListener("DOMContentLoaded", () => {
    setupCartFunctionality();
});

