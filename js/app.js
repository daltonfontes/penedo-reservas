import { WHATSAPP, HOSPEDAGENS, CATEGORIAS } from "./dados.js";

const $ = id => document.getElementById(id);
const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const wa = msg => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;
const waHospedagem = nome => wa(`Olá, Jussara! Vi o site do Penedo Reservas e tenho interesse na ${nome}.\nPode me passar valores e disponibilidade?`);
const waCategoria = nome => wa(`Olá, Jussara! Vi o site do Penedo Reservas e quero ver as opções de ${nome} em Penedo. Pode me mandar?`);
const thumb = u => u.replace(/\/([^/]+)\.jpg$/, "/thumbs/$1.webp");
const plural = n => `${n} ${n > 1 ? "opções" : "opção"}`;

const ICONE_WA = '<svg aria-hidden="true" focusable="false"><use href="#i-wa"/></svg>';
const NOVA_ABA = '<span class="sr-only"> (abre em nova aba)</span>';

let cat = "pousadas";

/* ---------- categorias ---------- */
function desenharCategorias() {
  $("cats").innerHTML = CATEGORIAS.map(c => {
    const n = HOSPEDAGENS.filter(p => p.cat === c.id).length;
    return `<button class="cat" type="button" data-c="${c.id}" aria-pressed="${c.id === cat}">
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">${c.icone}</svg>
      <b>${esc(c.nome)}</b><small>${n ? plural(n) : "Fale comigo"}</small>
    </button>`;
  }).join("");
}

/* ---------- lista ---------- */
function card(p, i) {
  const total = p.galeria.length;
  return `<li><article class="card" aria-labelledby="h-${p.id}">
    <figure class="cover">
      <img class="ph" src="${esc(p.capa)}" alt="Foto de capa: ${esc(p.nome)}" ${i ? 'loading="lazy"' : 'fetchpriority="high"'} decoding="async">
      <img class="logo mark" src="img/logo.webp" alt="" width="58" height="58" loading="lazy" decoding="async">
      <span class="tag">${esc(p.tipo)}</span>
      <button class="gal" type="button" data-g="${p.id}" data-i="0" aria-haspopup="dialog"><svg aria-hidden="true" focusable="false"><use href="#i-cam"/></svg>Ver as ${total} fotos<span class="sr-only"> de ${esc(p.nome)}</span></button>
    </figure>
    <div class="body">
      <h4 class="card-title" id="h-${p.id}">${esc(p.nome)}</h4>
      <p class="loc"><svg aria-hidden="true" focusable="false"><use href="#i-pin"/></svg><span><span class="sr-only">Localização: </span>${esc(p.local)}</span></p>
      <p class="desc">${esc(p.desc)}</p>
      <ul class="thumbs" aria-label="Fotos de ${esc(p.nome)}">${p.galeria.map((u, k) =>
        `<li><button type="button" data-g="${p.id}" data-i="${k}" aria-haspopup="dialog" aria-label="Ampliar foto ${k + 1} de ${total}"><img src="${esc(thumb(u))}" alt="" width="72" height="54" loading="lazy" decoding="async"></button></li>`).join("")}</ul>
      <ul class="amen" aria-label="Comodidades">${p.comodidades.map(c => `<li>${esc(c)}</li>`).join("")}</ul>
      <a class="btn btn-wa" href="${esc(waHospedagem(p.nome))}" target="_blank" rel="noopener noreferrer">${ICONE_WA}Consultar valores e disponibilidade<span class="sr-only"> de ${esc(p.nome)}</span>${NOVA_ABA}</a>
    </div>
  </article></li>`;
}

function render(anunciar) {
  const c = CATEGORIAS.find(x => x.id === cat);
  const itens = HOSPEDAGENS.filter(p => p.cat === cat);
  const nome = c.nome.toLowerCase();
  $("cat-title").textContent = `${c.nome} em Penedo`;
  document.querySelectorAll(".cat").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.c === cat)));
  $("resultado").innerHTML = itens.length
    ? `<ul class="list">${itens.map(card).join("")}</ul>`
    : `<div class="empty-cat">
        <p class="t">Em breve, ${esc(nome)} aqui no site.</p>
        <p>Já tenho opções de ${esc(nome)} em Penedo. Me chama no WhatsApp que eu te mando as fotos e os valores.</p>
        <a class="btn btn-wa" href="${esc(waCategoria(nome))}" target="_blank" rel="noopener noreferrer">${ICONE_WA}Quero ver ${esc(nome)}${NOVA_ABA}</a>
      </div>`;
  if (anunciar) $("status").textContent = itens.length
    ? `${c.nome}: ${plural(itens.length)} na lista.`
    : `${c.nome}: ainda sem opções no site. Fale comigo no WhatsApp.`;
}

$("cats").addEventListener("click", e => {
  const b = e.target.closest(".cat");
  if (!b || b.dataset.c === cat) return;
  cat = b.dataset.c;
  try { history.replaceState(null, "", "#" + cat); } catch { /* sem histórico disponível */ }
  render(true);
});

/* ---------- galeria (lightbox) ---------- */
const lb = $("lb"), lbImg = $("lb-img");
let fotos = [], atual = 0, nomeAtual = "";

function mostrar() {
  lbImg.src = fotos[atual];
  lbImg.alt = `${nomeAtual}, foto ${atual + 1} de ${fotos.length}`;
  $("lb-ct").textContent = `${atual + 1} de ${fotos.length}`;
  new Image().src = fotos[(atual + 1) % fotos.length]; // pré-carrega a próxima
}
const passo = d => { atual = (atual + d + fotos.length) % fotos.length; mostrar(); };

document.addEventListener("click", e => {
  const b = e.target.closest("[data-g]");
  if (!b) return;
  const p = HOSPEDAGENS.find(x => x.id === b.dataset.g);
  fotos = p.galeria; atual = Number(b.dataset.i); nomeAtual = p.nome;
  $("lb-titulo").textContent = `Fotos de ${p.nome}`;
  mostrar();
  lb.showModal(); // o <dialog> nativo prende o foco, fecha com Esc e devolve o foco ao botão de origem
});
lb.addEventListener("click", e => {
  if (e.target.closest(".x") || e.target === lb || e.target.classList.contains("in")) lb.close();
  else if (e.target.closest(".pv")) passo(-1);
  else if (e.target.closest(".nx")) passo(1);
});
lb.addEventListener("keydown", e => {
  if (e.key === "ArrowLeft") { e.preventDefault(); passo(-1); }
  if (e.key === "ArrowRight") { e.preventDefault(); passo(1); }
});
let tx = null;
lb.addEventListener("touchstart", e => { tx = e.touches[0].clientX; }, { passive: true });
lb.addEventListener("touchend", e => {
  if (tx === null) return;
  const dx = e.changedTouches[0].clientX - tx; tx = null;
  if (Math.abs(dx) > 40) passo(dx < 0 ? 1 : -1);
});

/* ---------- início ---------- */
const h = location.hash.slice(1);
if (CATEGORIAS.some(c => c.id === h)) cat = h;
desenharCategorias();
render(false);
