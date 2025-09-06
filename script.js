// Menü toggle (mobil için)
const toggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');
toggle.addEventListener('click', () => {
  menu.classList.toggle('active');
});

// Flamingoköy yazısına tıklandığında anasayfaya yönlendirme
const logo = document.querySelector('.logo');
logo.addEventListener('click', () => {
  window.location.href = 'index.html';
});

// Saat kontrolü
const topbar = document.querySelector('.topbar');
function checkTime() {
  const now = new Date();
  const hours = now.getHours();
  if (hours >= 21 || hours < 8) {
    topbar.textContent = 'Kapalı: 08:00 – 21:00';
  } else {
    topbar.textContent = 'Açık: 08:00 – 21:00';
  }
}
checkTime();
setInterval(checkTime, 60000); // Her dakika kontrol et

// Instagram feed için örnek fotoğraf ekleme
const instagramPhotos = document.querySelector('.instagram-photos');
const photoUrls = [
  'images/hero1.jpg',
  'images/hero2.jpg',
  'images/hero1.jpg',
  'images/hero2.jpg'
];

photoUrls.forEach(url => {
  const photoDiv = document.createElement('div');
  photoDiv.className = 'photo';
  photoDiv.style.backgroundImage = `url(${url})`;
  instagramPhotos.appendChild(photoDiv);
});

// Yukarı Çık Butonu
const scrollTopBtn = document.getElementById('scrollTopBtn');
scrollTopBtn.style.display = 'flex';
scrollTopBtn.addEventListener('click', function() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
