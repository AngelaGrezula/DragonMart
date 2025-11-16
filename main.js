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