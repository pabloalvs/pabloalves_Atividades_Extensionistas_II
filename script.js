// theme toggle with persistence
const themeToggle = document.getElementById('themeToggle');
const saved = localStorage.getItem('theme');
if (saved === 'dark') document.body.classList.add('dark');
updateThemeBtn();

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
  updateThemeBtn();
});

function updateThemeBtn(){
  themeToggle.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
}

// card tilt effect
document.querySelectorAll('.card').forEach(card => {
  const inner = card.querySelector('.card-inner');

  card.addEventListener('mousemove', e => {
    const rect = inner.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rx = ( (y - rect.height/2) / rect.height ) * -6; // rotateX
    const ry = ( (x - rect.width/2) / rect.width ) * 8; // rotateY
    inner.style.setProperty('--rx', rx.toFixed(2) + 'deg');
    inner.style.setProperty('--ry', ry.toFixed(2) + 'deg');
  });

  card.addEventListener('mouseleave', () => {
    inner.style.setProperty('--rx', '0deg');
    inner.style.setProperty('--ry', '0deg');
  });

  // keyboard focus support: small lift on focus
  card.addEventListener('focus', () => {
    inner.style.transform = 'translateY(-8px) scale(1.02)';
  });
  card.addEventListener('blur', () => {
    inner.style.transform = '';
  });
});

// filter by tag
const filter = document.getElementById('filter');
filter.addEventListener('change', () => applyFilter(filter.value));
const cards = Array.from(document.querySelectorAll('.card'));

function applyFilter(tag){
  if(tag === 'all'){
    cards.forEach(c => c.style.display = '');
    return;
  }
  cards.forEach(c => {
    const t = c.dataset.tag;
    c.style.display = (t === tag) ? '' : 'none';
  });
}

// if you want initial filter from saved query param (optional)
const params = new URLSearchParams(location.search);
const start = params.get('filter');
if(start){
  filter.value = start;
  applyFilter(start);
}
