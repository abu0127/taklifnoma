const weddingDate = new Date('October 19, 2024 19:00').getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = weddingDate - now;
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    //const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').innerHTML = days + " <span>kun</span>";
    document.getElementById('hours').innerHTML = hours + " <span>soat</span>";
    document.getElementById('minutes').innerHTML = minutes + " <span>daqiqa</span>";
    //document.getElementById('seconds').innerHTML = seconds + " <span>soniyalar</span>";

    if (distance < 0) {
        clearInterval(interval);
        document.querySelector('.countdown').innerHTML = "To'y boshlandi!";
    }
}

const interval = setInterval(updateCountdown, 1000);


//   check calinar date

const date = new Date();
const fullDay = date.getDate() 
const colindaDays = document.querySelectorAll('.day') 
const btn = document.querySelector('.btn')
const btnText = document.querySelector('.btn-text')
const box = document.querySelector('header')
const icon = document.querySelector('#icon')
const containerMap  = document.querySelector('.container-map ')
const profil = document.querySelector('.profil')
const blur1 = document.querySelector('.blur1')
const body = document.querySelector('body')

const headerHour = document.querySelector('.hour')
function timecontrol(){
  function addZero(i) {
    if (i < 10) {i = "0" + i}
    return i;
  }

  let date = new Date();  // Eksik olan tarih objesini ekledik
  let h = addZero(date.getHours());
  let m = addZero(date.getMinutes());
  let s = addZero(date.getSeconds());
  let time = h + ":" + m + ":" + s;
  return time;
}

setInterval(() => {
  headerHour.innerHTML =  timecontrol();
}, 1000);


// blur1.addEventListener('click',()=> {
//     blur1.classList.add("hide")
//     blur1.classList.remove("onblur")

// })
// profil.addEventListener('click',()=>{
//     blur1.classList.remove("hide")
//     blur1.classList.add("onblur")

// })

btn.addEventListener('click', () => {
    if (icon.classList.contains('idow')) {
        icon.classList.remove('idow');
        icon.classList.add('itop');
        box.style.height='0'
        setTimeout(()=> box.classList.add('hide'),500)
       
        btnText.classList.add('hide')
        containerMap.classList.remove('hide')
        containerMap.style.height ='560px' 
    } 
    else if (icon.classList.contains('itop')) {
        icon.classList.remove('itop');
        icon.classList.add('idow');
        containerMap.style.height ='240px' 
        btnText.classList.remove('hide')
        containerMap.style.height='0'
        setTimeout(()=>  containerMap.classList.add('hide'),500)
        box.classList.remove('hide')
        box.style.height='0'
        setTimeout(()=> box.style.height='240px',100)
    }
});

setInterval(()=>{setTimeout(()=> icon.classList.add('slowDown'),1000 )
    setTimeout(()=> icon.classList.remove('slowDown'),3000 ) },10000)



colindaDays.forEach((day) => {

    if (day.id == fullDay) {

        day.classList.add('activ')
    } else {
        day.classList.remove('activ')
    }
});

//animation profil

const array = ["Kechkaqomen", "Estan chiqmasin😊", "Kemasez qaren lekin 😒" , "Man bir matta uylanaman"];
let message = ""; // Global message değişkeni
let index = 0;
const typingSpeed = 50; // Her harfin ekranda görünme süresi (ms)
const displayDuration = 2000; // Mesajın ekranda gösterilme süresi (ms)
const deletionSpeed = 30; // Her harfin silinme süresi (ms)
const delayBetweenMessages = 4000; // Mesajlar arasında bekleme süresi (ms)

// Mesajı rastgele seç
function randomArrayElement() {
    const randomIndex = Math.floor(Math.random() * array.length);
    message = array[randomIndex];
}

// Harf harf yazma fonksiyonu
function typeLetterByLetter() {
    if (index < message.length) {
        document.getElementById("text").innerHTML += message.charAt(index);
        index++;
        setTimeout(typeLetterByLetter, typingSpeed);
    } else {
        // Mesaj tamamen yazıldıktan sonra biraz bekle, sonra silme işlemini başlat
        setTimeout(deleteText, displayDuration);
    }
}

// Mesajı silme fonksiyonu
function deleteText() {
    if (index >= 0) {
        const text = message.slice(0, index); // Mesajı birer harf eksilterek göster
        document.getElementById("text").innerHTML = text;
        index--;
        setTimeout(deleteText, deletionSpeed);
    } else {
        // Silme tamamlandıktan sonra yeni bir mesajı başlat
        setTimeout(() => {
            randomArrayElement();
            index = 0;
            typeLetterByLetter();
        }, delayBetweenMessages);
    }
}

// İlk mesajı başlatmak için fonksiyonu çağır
randomArrayElement();
typeLetterByLetter();

// roket anomation

const canvas = document.getElementById('fireworksCanvas');
const ctx = canvas.getContext('2d');
const flashEffect = document.getElementById('flashEffect');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Firework {
    constructor(startX, startY, endX, endY) {
        this.x = startX;
        this.y = startY;
        this.targetX = endX;
        this.targetY = endY;
        this.speedX = (endX - startX) / 30;
        this.speedY = (endY - startY) / 30;
        this.isExploded = false;
    }

    update() {
        if (!this.isExploded) {
            this.x += this.speedX;
            this.y += this.speedY;
            if (Math.abs(this.x - this.targetX) < 5 && Math.abs(this.y - this.targetY) < 5) {
                this.explode();
            }
        }
    }

    draw() {
        if (!this.isExploded) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, 5, 0, Math.PI * 2);
            ctx.fillStyle = '#ffffff';
            ctx.fill();
            ctx.closePath();
        }
    }

    explode() {
        this.isExploded = true;
        createFireworkParticles(this.x, this.y);
        triggerFlash(); // Havai fişek patladığında göz kırpma efekti tetiklenir
    }
}

class Particle {
    constructor(x, y, color, speedX, speedY, life) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.speedX = speedX;
        this.speedY = speedY;
        this.life = life;
        this.alpha = 1;
        this.blinkSpeed = Math.random() * 0.1 + 0.05; // Daha yüksek göz kırpma hızı
        this.blinkTimer = Math.random(); // Rastgele bir başlangıç zamanı
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life--;
        this.blinkTimer += this.blinkSpeed;
        if (this.blinkTimer > 1) {
            this.blinkTimer = 0;
        }
        this.alpha = Math.abs(Math.sin(this.blinkTimer * Math.PI * 2)); // Göz kırpma efekti
    }

    draw() {
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
        ctx.globalAlpha = 1;
    }
}

// Göz kırpan yıldızları oluşturmak için class
class Star {
    constructor(x, y, blinkSpeed) {
        this.x = x;
        this.y = y;
        this.blinkSpeed = blinkSpeed;
        this.alpha = Math.random(); // Parlaklığı başta rastgele
        this.blinkDirection = 1; // Parlaklık artıp azalacak
    }

    update() {
        this.alpha += this.blinkSpeed * this.blinkDirection;
        if (this.alpha >= 1) {
            this.blinkDirection = -1;
        } else if (this.alpha <= 0) {
            this.blinkDirection = 1;
        }
    }

    draw() {
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
        ctx.closePath();
        ctx.globalAlpha = 1;
    }
}

let fireworks = [];
let particles = [];
let stars = [];

// Göz kırpan yıldızları başlat (sadece yukarı kısımda olacaklar)
for (let i = 0; i < 100; i++) {
    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.height * 0.3; // Yıldızlar ekranın üst kısmında
    let blinkSpeed = Math.random() * 0.02 + 0.005;
    stars.push(new Star(x, y, blinkSpeed));
}

function createFireworkParticles(x, y) {
    const colors = ['#ff4d4d', '#ffcc00', '#33cc33', '#3399ff', '#ff33cc'];
    for (let i = 0; i < 100; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 5 + 1;
        const speedX = Math.cos(angle) * speed;
        const speedY = Math.sin(angle) * speed;
        const color = colors[Math.floor(Math.random() * colors.length)];
        particles.push(new Particle(x, y, color, speedX, speedY, 100));
    }
}

function randomFirework() {
    const startX = Math.random() * canvas.width;
    const startY = canvas.height;
    const endX = Math.random() * canvas.width;
    const endY = Math.random() * canvas.height / 2;
    fireworks.push(new Firework(startX, startY, endX, endY));
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Göz kırpan yıldızları çiz
    stars.forEach(star => {
        star.update();
        star.draw();
    });

    fireworks.forEach((firework, index) => {
        firework.update();
        firework.draw();
        if (firework.isExploded) {
            fireworks.splice(index, 1);
        }
    });

    particles = particles.filter(particle => particle.life > 0); // Yalnızca hala yaşan parçacıklar
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });

    requestAnimationFrame(animate);
}

// Göz kırpma efekti tetikleyici
function triggerFlash() {
    flashEffect.style.opacity = 1;
    setTimeout(() => {
        flashEffect.style.opacity = 0;
    }, 100); // 100ms süreyle ekran beyaz olacak
}

// Her saniyede bir rastgele havai fişek patlaması yap
setInterval(randomFirework, 1500);
animate();