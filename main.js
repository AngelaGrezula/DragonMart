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

const selectSound = document.getElementById('dragon-select-sound'); 
const bgm = document.getElementById('background-music');
let bgmStarted = false; 

function playSelectSound() {
    if (selectSound) {
        selectSound.currentTime = 0;
        selectSound.play().catch(e => console.warn("Audio play prevented:", e)); 
    }
}

function startBGM() {
    if (bgm && !bgmStarted) {
        bgm.play().then(() => {
            bgmStarted = true;
            console.log("Background music started.");
            document.body.removeEventListener('click', startBGM); 
        }).catch(e => {
            console.warn("BGM Autoplay blocked. Waiting for user interaction...");
        });
    }
}

function moveSlider(direction) {
    currentIndex = (currentIndex + direction + totalSlides) % totalSlides;
    
    playSelectSound();
    
    updateSliderClasses();
}

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
    
    startBGM();

    document.body.addEventListener('click', startBGM);
}); 

    document.addEventListener('DOMContentLoaded', () => {
        const aboutSection = document.querySelector('.sec-about');
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                } else {
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
        desc: `The fastest and rarest of all dragons, instantly recognizable by its sleek, jet-black appearance and piercing green eyes. Toothless fires concentrated, powerful plasma blasts that explode upon impact. He is highly intelligent, playful, and incredibly loyal, forming an unbreakable bond with his rider, Hiccup. His retractable teeth give his species its name.`,
        stats: { "Attack":90,"Speed":100,"Armor":70,"Firepower":80,"Shot Limit":60,"Venom":20},
        palette:["fill--pink","fill--teal","fill--magenta","fill--orange","fill--peach","fill--green"]
    },
    {
        name: "LIGHT FURY",
        species: "Light Fury",
        class: "Strike",
        img: "lightfury.png",
        desc: `The female counterpart to the Night Fury, distinguished by her pure white, slightly shimmering scales. The Light Fury possesses a unique ability to briefly superheat her plasma blast, allowing her to turn temporarily invisible as she flies through the explosion, making her nearly impossible to track. She is fiercely independent and highly protective of her mate, Toothless.`,
        stats: { "Attack":85,"Speed":100,"Armor":60,"Firepower":75,"Shot Limit":60,"Venom":35},
        palette:["fill--pink","fill--teal","fill--magenta","fill--orange","fill--peach","fill--green"]
    },
    {
        name: "STORMFLY",
        species: "Deadly Nadder",
        class: "Tracker",
        img: "stormfly.png",
        desc: `A vibrant and vain dragon known for its intense beauty and equally intense aggression. Stormfly's signature move is launching hundreds of razor-sharp, poisonous magnesium spines from her tail. She is incredibly fast and agile, but has a major blind spot directly in front of her nose, a trait Astrid learned to exploit.`,
        stats: { "Attack":75,"Speed":80,"Armor":70,"Firepower":60,"Shot Limit":40,"Venom":60},
        palette:["fill--pink","fill--teal","fill--magenta","fill--orange","fill--peach","fill--green"]
    },
    {
        name: "ARMORWING",
        species: "Armorwing",
        class: "Sharp",
        img: "armorwing.png",
        desc: `An opportunistic and highly durable dragon that uses fire to melt and fuse found metal and discarded Viking scrap onto its body, creating an ever-changing, protective suit of thermal armor. It is a formidable fighter, using its fiery breath and metallic hide as weapons.`,
        stats: { "Attack":80,"Speed":50,"Armor":90,"Firepower":40,"Shot Limit":10,"Venom":40},
        palette:["fill--pink","fill--teal","fill--magenta","fill--orange","fill--peach","fill--green"]
    },
    {
        name: "BARF & BELCH",
        species: "Hideous Zippleback",
        class: "Fear",
        img: "barf&belch.png",
        desc: `This bizarre, two-headed dragon is essentially a flying fire hazard. One head, Barf, exhales a green, highly flammable, odorless gas composed of acetylene and hydrogen. The other head, Belch, provides the spark, igniting the gas with pure friction to create a massive explosion. They are often uncoordinated, perfectly matching their riders, Ruffnut and Tuffnut.`,
        stats: { "Attack":50,"Speed":75,"Armor":40,"Firepower":65,"Shot Limit":12,"Venom":15},
        palette:["fill--pink","fill--teal","fill--magenta","fill--orange","fill--peach","fill--green"]
    },
    {
        name: "DEATH SONG",
        species: "Death Song",
        class: "Mystery",
        img: "death_song.png",
        desc: `This dangerous predator has evolved a highly effective, deceptive hunting method. It emits a beautiful, mesmerizing song that paralyzes and lures other dragons to its location. Once caught, the victim is encased in the Death Song's signature attack: a quick-hardening, sticky amber-like resin.`,
        stats: { "Attack":85,"Speed":80,"Armor":40,"Firepower":90,"Shot Limit":8,"Venom":30},
        palette:["fill--pink","fill--teal","fill--magenta","fill--orange","fill--peach","fill--green"]
    },
    {
        name: "DRAGOS BEWILDERBEAST",
        species: "Bewilderbeast",
        class: "Alpha",
        img: "dragos_bewilderbeast.png",
        desc: `An imposing, male Alpha dragon that was enslaved and cruelly controlled by Drago Bludvist. This gigantic beast ruled through fear and aggression, asserting its Alpha status by firing devastating, glacier-forming ice blasts that can destroy ships and mountainsides.`,
        stats: { "Attack":90,"Speed":10,"Armor":100,"Firepower":100,"Shot Limit":6,"Venom":40},
        palette:["fill--pink","fill--teal","fill--magenta","fill--orange","fill--peach","fill--green"]
    },
    {
        name: "DRAMILLION",
        species: "Dramillion",
        class: "Sharp",
        img: "dramillion.png",
        desc: `A rare and highly intelligent dragon that has the unique biological ability to perfectly mimic the fire breath of any dragon species it encounters. This makes it an invaluable asset, as it can defend itself with the best offensive attack observed from a rival. They are fiercely loyal and protective of their kind.`,
        stats: { "Attack":80,"Speed":70,"Armor":70,"Firepower":70,"Shot Limit":8,"Venom":30},
        palette:["fill--pink","fill--teal","fill--magenta","fill--orange","fill--peach","fill--green"]
    },
    {
        name: "NIGHT TERROR",
        species: "Night Terror",
        class: "Stoker",
        img: "night_terror.png",
        desc: `A species of small, social, nocturnal dragons. They are individually weak, but possess the remarkable ability to fly and form intricate, coordinated flocks that mimic the shape and size of much larger dragons to scare away predators. They are led by a dominant white Night Terror, the 'Alpha'.`,
        stats: { "Attack":40,"Speed":80,"Armor":20,"Firepower":30,"Shot Limit":4,"Venom":30},
        palette:["fill--pink","fill--teal","fill--magenta","fill--orange","fill--peach","fill--green"]
    },
    {
        name: "SKRILL",
        species: "Skrill",
        class: "Strike",
        img: "skrill.png",
        desc: `One of the most feared and powerful dragons, capable of absorbing and channeling the power of lightning. The Skrill can ride a lightning bolt and fire intensely focused blasts of electrical energy. It is an extremely aggressive and difficult dragon to train, making it a highly prized weapon.`,
        stats: { "Attack":88,"Speed":90,"Armor":70,"Firepower":80,"Shot Limit":4,"Venom":20},
        palette:["fill--pink","fill--teal","fill--magenta","fill--orange","fill--peach","fill--green"]
    },
    {
        name: "SKULLCRUSHER",
        species: "Rumblehorn",
        class: "Tracker",
        img: "skullcrusher.png",
        desc: `A powerful, terrestrial dragon with a thick, bony plating and a huge rhinoceros-like horn. The Rumblehorn has the best sense of smell in the dragon world, allowing it to track a target's scent over vast distances and through harsh weather. Stoick trained him after the death of his previous dragon.`,
        stats: { "Attack":80,"Speed":60,"Armor":90,"Firepower":30,"Shot Limit":6,"Venom":35},
        palette:["fill--pink","fill--teal","fill--magenta","fill--orange","fill--peach","fill--green"]
    },
    {
        name: "SNAPTRAPPER",
        species: "Snaptrapper",
        class: "Fear",
        img: "snaptrapper.png",
        desc: `A large, four-headed dragon resembling a terrestrial plant, often camouflaged in swamps. Each of its four heads is equipped with razor-sharp teeth. Its unique hunting strategy is to emit a powerful scent of pure chocolate to lure in unsuspecting victims before its heads snap shut.`,
        stats: { "Attack":50,"Speed":50,"Armor":40,"Firepower":60,"Shot Limit":10,"Venom":50},
        palette:["fill--pink","fill--teal","fill--magenta","fill--orange","fill--peach","fill--green"]
    },
    {
        name: "TERRIBLE TERROR",
        species: "Terrible Terror",
        class: "Stoker",
        img: "terrible_terror.png",
        desc: `The smallest of all known dragons, roughly the size of a housecat. Despite their size, they are fearless and aggressive, capable of flying at high speeds and firing an incredibly precise, yet small, stream of kerosene-based fire at their target. They are social and easily distracted.`,
        stats: { "Attack":10,"Speed":40,"Armor":10,"Firepower":15,"Shot Limit":2,"Venom":10},
        palette:["fill--pink","fill--teal","fill--magenta","fill--orange","fill--peach","fill--green"]
    },
    {
        name: "THUNDERDRUM",
        species: "Thunderdrum",
        class: "Tidal",
        img: "thunderdrum.png",
        desc: `A formidable and aquatic dragon that attacks by inhaling huge amounts of air and water, then exhaling it in an explosive, deafening sonic blast that can shatter wood and temporarily deafen all living creatures nearby. They are often found near sea caves and open water.`,
        stats: { "Attack":70,"Speed":70,"Armor":70,"Firepower":50,"Shot Limit":6,"Venom":0},
        palette:["fill--pink","fill--teal","fill--magenta","fill--orange","fill--peach","fill--green"]
    },
    {
        name: "WHISPERING DEATH",
        species: "Whispering Death",
        class: "Boulder",
        img: "whispering_death.png",
        desc: `A frightening, serpentine dragon that lives entirely underground. It has rows of continuously spinning, razor-sharp teeth that allow it to drill rapidly through solid rock, creating complex networks of tunnels. Its fire is unique: concentrated rings of fiery projectiles that can be shot from a distance.`,
        stats: { "Attack":70,"Speed":50,"Armor":50,"Firepower":40,"Shot Limit":8,"Venom":0},
        palette:["fill--pink","fill--teal","fill--magenta","fill--orange","fill--peach","fill--green"]
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

let cart = {
    count: 0,
    total: 0,
    items: []
};

const cartIcon = document.querySelector('.bx-cart');
const cartDetailsWindow = document.getElementById('cart-details-window');
const cartCountElement = document.getElementById('cart-count');
const cartTotalElement = document.getElementById('cart-total-price');
const cartItemsListElement = document.getElementById('cart-items-list');
const summaryCountElement = document.getElementById('summary-count');
const summaryTotalElement = document.getElementById('summary-total');

function setupCartFunctionality() {

    if (!cartIcon || !cartDetailsWindow) {
        console.warn("Cart elements missing — check HTML.");
        return;
    }

    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', event => {
            event.preventDefault();
            addItemToCart(button);
        });
    });

    const cartInfoContainer = cartIcon.closest('.cart-info');
    if (cartInfoContainer) {
        cartInfoContainer.addEventListener('click', toggleCartDetails);
    }

    updateCartDisplay();
    renderCartItems();
}

function addItemToCart(buttonElement) {
    const productBox = buttonElement.closest('.box');
    if (!productBox) return;

    const name = productBox.querySelector('h3').textContent.trim();
    const price = parseFloat(productBox.querySelector('.price').textContent.replace('$', ''));
    const imageSrc = productBox.querySelector('.dragon-img')?.getAttribute('src') || '';

    cart.count += 1;
    cart.total += price;
s
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

    if (cartDetailsWindow && !cartDetailsWindow.classList.contains('visible')) {
        toggleCartDetails();
    }
}

function updateCartDisplay() {
    if (cartCountElement) cartCountElement.textContent = cart.count;
    if (cartTotalElement) cartTotalElement.textContent = `$${cart.total.toFixed(2)}`;
}

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

    summaryCountElement.textContent = cart.count;
    summaryTotalElement.textContent = `$${cart.total.toFixed(2)}`;
}

function attachCartControlListeners() {
    document.querySelectorAll('.qty-plus').forEach(btn =>
        btn.addEventListener('click', handleQuantityChange)
    );

    document.querySelectorAll('.qty-minus').forEach(btn =>
        btn.addEventListener('click', handleQuantityChange)
    );
}

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
            cart.count -= 1;
            cart.total -= item.price;
            cart.items.splice(index, 1);
        }
    }

    updateCartDisplay();
    renderCartItems();
}

function toggleCartDetails() {
    cartDetailsWindow.classList.toggle('visible');
}



document.addEventListener('DOMContentLoaded', () => {
    setupCartFunctionality();
    startBGM();
    document.body.addEventListener('click', startBGM);
});