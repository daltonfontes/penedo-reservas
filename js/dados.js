/* ===== Para adicionar uma hospedagem nova, copie um bloco de HOSPEDAGENS e troque os dados =====
   - cat: "pousadas" | "casas" | "sitios" | "apartamentos"
   - capa e galeria: caminhos das fotos (.jpg) dentro de /fotos/<id>/
   - cada foto precisa de uma miniatura em /fotos/<id>/thumbs/<nome>.webp (144×108) */

export const WHATSAPP = "5524992132158";

const serie = (pasta, prefixo, total) =>
  Array.from({ length: total }, (_, i) => `fotos/${pasta}/${prefixo}${String(i + 1).padStart(2, "0")}.jpg`);

export const HOSPEDAGENS = [
  {
    id: "viking", nome: "Pousada Viking", tipo: "Pousada", cat: "pousadas",
    local: "Perto da Casa do Chocolate, a poucos minutos do centrinho de Penedo",
    desc: "Conforto, lazer e tranquilidade para aproveitar Penedo, com piscina ao ar livre e café da manhã.",
    comodidades: ["Piscina ao ar livre", "Café da manhã", "Estacionamento grátis", "Wi-Fi grátis", "Cama box queen", "Ar-condicionado split", "TV LED", "Frigobar", "Banheiro privativo"],
    capa: "fotos/viking/fachada.jpg",
    galeria: ["fachada", "jardim", "v4", "v8", "v2", "v1", "v5", "v3", "v7"].map(n => `fotos/viking/${n}.jpg`)
  },
  {
    id: "alto", nome: "Pousada no Alto Penedo", tipo: "Pousada", cat: "pousadas",
    local: "Estrada da Fazendinha, bem pertinho da Cachoeira de Deus",
    desc: "A pousada no sossego que você espera de Penedo, bem pertinho da Cachoeira de Deus. Todas as acomodações com café da manhã.",
    comodidades: ["Café da manhã incluso", "Piscina com vista pra mata", "Suítes com lareira", "Varanda com vista", "Chalés com hidromassagem", "Frigobar e TV", "Perto da cachoeira"],
    capa: "fotos/alto/a01.jpg",
    galeria: serie("alto", "a", 27)
  },
  {
    id: "aurora", nome: "Pousada Aurora da Mantiqueira", tipo: "Pousada", cat: "pousadas",
    local: "A menos de 2 km do centro de Penedo",
    desc: "Conforto, natureza e hospitalidade, com vista pra serra, café da manhã caseiro e muita área verde.",
    comodidades: ["Piscina", "Café da manhã caseiro", "Suítes com varanda", "Área verde", "Campinho", "Estacionamento seguro", "Ar-condicionado", "Frigobar", "TV"],
    capa: "fotos/aurora/r01.jpg",
    galeria: serie("aurora", "r", 30)
  },
  {
    id: "casa16", nome: "Super Casa na Natureza", tipo: "Casa · até 16 pessoas", cat: "casas",
    local: "Penedo-RJ, um refúgio cercado de verde",
    desc: "Perfeita para quem busca conforto, paz e contato com a natureza. Ideal para famílias e grupos grandes.",
    comodidades: ["6 quartos", "Até 16 pessoas", "Piscina", "Espaço para fogueira", "Sala de jogos com sinuca e totó", "Churrasqueira", "Fogão a lenha", "Varandas"],
    capa: "fotos/casa16/c01.jpg",
    galeria: serie("casa16", "c", 32)
  }
];

export const CATEGORIAS = [
  { id: "pousadas", nome: "Pousadas", icone: '<path d="M3 21h18M5 21V9l7-5 7 5v12M9 21v-6h6v6M9 11h.01M15 11h.01"/>' },
  { id: "casas", nome: "Casas", icone: '<path d="M3 11l9-7 9 7M5 9.5V21h14V9.5M10 21v-5h4v5"/>' },
  { id: "sitios", nome: "Sítios", icone: '<path d="M2 21h20M7 21V11l-4 2M7 11l5-4 5 4v10M17 13l4 2M12 3v4M10 16h4v5h-4z"/>' },
  { id: "apartamentos", nome: "Apartamentos", icone: '<path d="M5 21V3h14v18M3 21h18M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2M11 21v-3h2v3"/>' }
];
