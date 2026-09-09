import type { ReactNode } from 'react';

export const codedSlideTitles = [
  'Capa da metodologia NAVE', 'Carta Estratégica', 'Sumário do Documento',
  'Sumário Executivo', 'Contexto, escopo e qualidade', 'Leitura Estratégica da Marca',
  'Causas Estruturais', 'Rotas estratégicas avaliadas', 'Equação de valor da marca',
  'Variáveis da Equação', 'Ponte de valor', 'Exemplos aplicados',
  'Arquitetura recomendada', 'Mapa de Sinais da Marca', 'Narrativa-Mãe',
  'Jornada de primeira compra', 'Produtos por etapa da jornada', 'Comunidade e Relacionamento',
  'Sistema de Conteúdo e Linguagem', 'Sistema Comercial', 'Crescimento e Dados',
  'Primeiros 30 dias: fundação', 'Dias 31 a 60: ativação', 'Dias 61 a 90: validação e decisão',
  'Governança Estratégica', 'Riscos e Cenários', 'Próximos Passos',
  'Síntese Estratégica Final',
] as const;

const gold = 'text-[#9b7625]';
const heading = 'editorial-serif font-normal tracking-[-.035em] leading-[.94]';

function Kicker({ children }: { children: ReactNode }) {
  return <p className={`${gold} text-[10px] md:text-[12px] tracking-[.22em] uppercase font-semibold mb-4`}>{children}</p>;
}
function Title({ children, compact = false }: { children: ReactNode; compact?: boolean }) {
  return <h1 className={`${heading} ${compact ? 'text-[clamp(2.8rem,5vw,5.4rem)]' : 'text-[clamp(3.3rem,6.4vw,7.2rem)]'}`}>{children}</h1>;
}
function Rule() { return <div className="w-16 h-px bg-[#a47d27] my-5" />; }
function Bullets({ items }: { items: readonly string[] }) {
  return <ul className="space-y-2 text-[clamp(.72rem,1vw,1rem)] leading-relaxed">{items.map(item => <li key={item} className="flex gap-3"><span className={gold}>•</span><span>{item}</span></li>)}</ul>;
}
function Numbered({ items }: { items: readonly string[] }) {
  return <ol className="space-y-2 text-[clamp(.7rem,.95vw,.96rem)]">{items.map((item, i) => <li key={item} className="grid grid-cols-[1.5rem_1fr] gap-2"><span className={gold}>{i + 1}.</span><span>{item}</span></li>)}</ol>;
}
function Frame({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <article className={`h-full w-full overflow-auto bg-[#f7f4ed] dark:bg-[#121210] text-[#171716] dark:text-[#f1ede5] px-[clamp(2rem,5.5vw,6.5rem)] pt-[clamp(2.5rem,6vh,5.5rem)] pb-24 ${className}`}>{children}</article>;
}
function MatrixCell({ number, title, items }: { number: string; title: string; items: string[] }) {
  return <div className="p-5 md:p-8 border border-[#9e8b68]/35 min-h-0 flex gap-5"><span className={`${heading} ${gold} text-4xl md:text-6xl`}>{number}</span><div className="border-l border-[#a3823c]/45 pl-5"><h3 className="text-xl md:text-2xl mb-3">{title}</h3><Bullets items={items} /></div></div>;
}
function Column({ title, children }: { title: string; children: ReactNode }) {
  return <section className="border-l border-[#987b43]/35 pl-5 md:pl-8 first:border-l-0 first:pl-0"><h3 className={`${gold} text-xs md:text-sm tracking-[.13em] uppercase font-semibold border-b border-[#987b43]/40 pb-3 mb-5`}>{title}</h3>{children}</section>;
}

export function CodedSlide({ index, onNavigate }: { index: number; onNavigate: (index: number) => void }) {
  switch (index) {
    case 0: return <Cover onNavigate={onNavigate} />;
    case 1: return <Letter />;
    case 2: return <Contents />;
    case 3: return <Executive />;
    case 4: return <Scope />;
    case 5: return <BrandReading />;
    case 6: return <Causes />;
    case 7: return <Routes />;
    case 8: return <Equation />;
    case 9: return <Variables />;
    case 10: return <Bridge />;
    case 11: return <Examples />;
    case 12: return <Architecture />;
    case 13: return <Signals />;
    case 14: return <Narrative />;
    case 15: return <Journey />;
    case 16: return <Staircase />;
    case 17: return <Community />;
    case 18: return <ContentSystem />;
    case 19: return <Commercial />;
    case 20: return <Growth />;
    case 21: return <Roadmap phase="30" />;
    case 22: return <Roadmap phase="60" />;
    case 23: return <Roadmap phase="90" />;
    case 24: return <Governance />;
    case 25: return <Risks />;
    case 26: return <NextSteps />;
    default: return <Synthesis />;
  }
}

function Cover({ onNavigate }: { onNavigate: (index: number) => void }) {
  return <Frame className="!p-0 flex">
    <aside className="hidden lg:flex w-[20%] border-r border-black/20 dark:border-white/15 p-12 flex-col"><Kicker>Metodologia</Kicker><div className="mt-16"><h2 className="text-5xl tracking-[.17em]">NAVE</h2><p className="mt-4">Sistema estratégico</p><Rule /><nav className="space-y-2 mt-10" aria-label="Etapas NAVE">{[['Narrativa',14],['Alinhamento',7],['Visão',8],['Execução',21]].map(([label,target])=><button key={label} onClick={()=>onNavigate(target as number)} className="group w-full flex items-center justify-between py-2 text-left hover:text-[#9b7625] transition-colors"><span>{label}</span><span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">→</span></button>)}</nav></div><button onClick={()=>onNavigate(2)} className="mt-auto text-left hover:text-[#9b7625] transition-colors">Blueprint Estratégico <span className="ml-2">→</span></button></aside>
    <main className="flex-1 flex flex-col justify-center px-[8vw]"><Kicker>Blueprint estratégico da marca</Kicker><Title>Lunna Atelier</Title><div className="flex flex-wrap gap-x-5 gap-y-2 mt-8 text-sm md:text-lg"><span>Moda feminina, bolsas e vestuário</span><span>|</span><span>Brasil</span><span>|</span><span>Digital-first</span><span>|</span><span>Pré-lançamento</span><span>|</span><span>Ticket R$ 300 a R$ 600</span></div></main>
  </Frame>;
}

function Letter() {
  return <Frame><Kicker>02 | Carta Estratégica</Kicker><Title compact>Carta Estratégica</Title><div className="grid lg:grid-cols-[1fr_1.15fr_.75fr] gap-9 lg:gap-14 mt-12 text-[clamp(.95rem,1.25vw,1.28rem)] leading-[1.7]"><p>A Lunna Atelier chega ao mercado com um ponto de partida raro para uma marca iniciante: estética visual cuidada, produtos com potencial de desejo, linguagem sofisticada, uma fundadora com bom gosto e sinais iniciais de demanda.</p><div><p>Mas atração ainda não é posicionamento. Beleza ainda não é preferência. Sofisticação visual ainda não é confiança. E desejo, quando não encontra motivo claro para agir, vira salvamento de post, pergunta no WhatsApp, pedido de cupom ou adiamento da compra.</p><p className="mt-5">O desafio é transformar estética em significado, significado em confiança, confiança em compra e compra em relacionamento.</p></div><blockquote className="border-l border-[#aa8431] pl-8 editorial-serif italic text-3xl"><span className={`${gold} text-6xl leading-none`}>“</span><br/>Beleza ainda não é preferência.</blockquote></div></Frame>;
}

function Contents() {
  const items = ['Capa e identificação','Carta Estratégica','Sumário do Documento','Sumário Executivo','Contexto, Escopo e Qualidade da Análise','Leitura Estratégica da Marca','Causas Estruturais','Tese Central e Rotas Estratégicas','Arquitetura de Valor','Arquitetura de Percepção e Confiança','Narrativa-Mãe e Território de Marca','Arquitetura de Oferta, Produto e Jornada','Arquitetura de Comunidade e Relacionamento','Sistema de Conteúdo e Linguagem','Sistema Comercial e Redução de Objeções','Arquitetura de Crescimento e Dados','Roteiro de Transformação 30/60/90','Governança Estratégica','Riscos, Cenários e Critérios de Revisão','Próximos Passos Recomendados','Síntese Estratégica Final'];
  return <Frame><Kicker>03 | Sumário do documento</Kicker><Title compact>Sumário do Documento</Title><Rule/><div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-3 mt-8">{items.map((item,i)=><div key={item} className="flex gap-5 items-baseline"><span className={`${gold} text-xl`}>{String(i+1).padStart(2,'0')}</span><span className="text-sm md:text-base">{item}</span></div>)}</div></Frame>;
}

function Executive() {
  const priorities = [
    ['01', 'Território', 'Construir a tese da presença feminina possível e substituir frases genéricas por uma narrativa proprietária.'],
    ['02', 'Confiança', 'Provar tecido, caimento, tamanho real, acabamento, troca e segurança de compra.'],
    ['03', 'Jornada', 'Transformar produtos soltos em cápsulas, combinações, kits e motivos claros para voltar.'],
  ];
  return <Frame><Kicker>04 | Sumário executivo</Kicker><Title compact>Da estética ao sistema de valor</Title><p className="mt-6 max-w-5xl text-[clamp(1rem,1.35vw,1.35rem)] leading-relaxed">A Lunna deve parar de disputar o jogo genérico da “marca feminina bonita no Instagram” e construir o jogo da <strong>presença feminina possível</strong>: curadoria, prova de qualidade, jornada de imagem e relacionamento.</p><div className="grid lg:grid-cols-3 gap-5 mt-10">{priorities.map(([n,t,b])=><section key={n} className="group border border-[#9b7625]/35 rounded-[1.5rem] p-7 bg-white/25 dark:bg-white/[.025] hover:-translate-y-1 hover:border-[#9b7625] transition-all"><span className={`${heading} ${gold} text-5xl`}>{n}</span><h3 className="text-2xl mt-5 mb-3">{t}</h3><p className="leading-relaxed">{b}</p></section>)}</div><p className="mt-8 border-l-2 border-[#9b7625] pl-6 max-w-4xl">Crescer não será apenas comprar tráfego. Será reduzir risco percebido, aumentar clareza de valor e criar razões recorrentes para a cliente retornar.</p></Frame>;
}

function Scope() {
  const blocks = [
    ['Pergunta decisória', 'Como transformar atração estética em preferência, compra e relacionamento recorrente?'],
    ['Escopo', 'Marca, oferta, conteúdo, canais, experiência digital, atendimento e crescimento.'],
    ['Base de análise', 'Briefing, reunião estratégica, presença digital, materiais de marca e sinais iniciais de demanda.'],
    ['Limite responsável', 'Hipóteses comerciais precisam ser validadas por dados reais de conversão, margem, troca e recompra.'],
  ];
  return <Frame><Kicker>05 | Contexto, escopo e qualidade</Kicker><Title compact>O que esta análise decide</Title><div className="grid lg:grid-cols-2 gap-px bg-[#9b7625]/30 border border-[#9b7625]/30 mt-10">{blocks.map(([t,b],i)=><section key={t} className="bg-[#f7f4ed] dark:bg-[#121210] p-8 md:p-10"><span className={`${heading} ${gold} text-5xl`}>0{i+1}</span><h3 className="text-xl uppercase tracking-[.12em] mt-5">{t}</h3><p className="mt-4 leading-relaxed max-w-xl">{b}</p></section>)}</div></Frame>;
}

function BrandReading() {
  const rows = [
    ['Forças já existentes', ['Estética cuidada', 'Curadoria da fundadora', 'Produtos com desejo', 'Atendimento próximo']],
    ['Tensões atuais', ['Admiração sem urgência', 'Comparação por preço', 'Risco da compra online', 'Oferta percebida como peças soltas']],
    ['Oportunidade central', ['Traduzir beleza em significado', 'Mostrar uso na vida real', 'Criar prova repetível', 'Transformar compra em identidade']],
  ];
  return <Frame><Kicker>06 | Leitura estratégica da marca</Kicker><Title compact>O sistema Lunna hoje</Title><p className="mt-5 text-lg max-w-4xl">A marca já possui atração. O ponto de virada é organizar essa atração para que cada sinal conduza à próxima decisão.</p><div className="grid lg:grid-cols-3 gap-8 mt-10">{rows.map(([title,items],i)=><section key={title as string} className="relative pt-8 border-t border-[#9b7625]/50"><span className={`${heading} ${gold} absolute right-0 top-2 text-6xl opacity-20`}>0{i+1}</span><h3 className="text-2xl mb-6">{title as string}</h3><Bullets items={items as string[]}/></section>)}</div><div className="mt-10 flex items-center gap-4 text-sm uppercase tracking-[.14em]"><span>Atração</span><span className={gold}>→</span><span>Significado</span><span className={gold}>→</span><span>Confiança</span><span className={gold}>→</span><span>Compra</span><span className={gold}>→</span><span>Relacionamento</span></div></Frame>;
}

function Causes() {
  const causes = [
    ['Estética sem território proprietário', 'A marca é elogiada, mas ainda não é lembrada por uma ideia exclusiva.'],
    ['Desejo sem prova suficiente', 'A cliente gosta do produto, porém ainda precisa imaginar tecido, corpo, tamanho e uso.'],
    ['Produto sem arquitetura de jornada', 'Categorias isoladas não explicam por onde começar nem o que comprar depois.'],
    ['Venda dependente do atendimento', 'O WhatsApp resolve dúvidas que deveriam virar ativos públicos e reutilizáveis.'],
  ];
  return <Frame><Kicker>07 | Causas estruturais</Kicker><Title compact>O que bloqueia a preferência</Title><div className="mt-9 grid lg:grid-cols-2 gap-5">{causes.map(([t,b],i)=><section key={t} className="flex gap-6 rounded-[1.4rem] border border-black/10 dark:border-white/10 p-7 hover:bg-[#9b7625]/[.045] transition-colors"><span className={`${heading} ${gold} text-5xl`}>0{i+1}</span><div><h3 className="text-xl font-semibold">{t}</h3><p className="mt-3 leading-relaxed">{b}</p></div></section>)}</div><div className="mt-8 p-5 border-y border-[#9b7625]/40 text-center editorial-serif text-2xl">Sem território → sem diferenciação → mais comparação → mais objeção → menor conversão</div></Frame>;
}

function Routes() {
  const routes = [{n:'01',t:'Rota 1: Sofisticação acessível',b:'Força: é compreensível e aderente ao briefing. Limite: ainda é genérica.'},{n:'02',t:'Rota 2: Guarda-roupa urbano inteligente',b:'Força: transforma oferta em jornada. Limite: pode ficar funcional demais.'},{n:'03',t:'Rota 3: Presença feminina possível',b:'Força: une desejo, valor simbólico, produto, comunidade, linguagem e confiança.'}];
  return <Frame><Kicker>08 | Tese central e rotas estratégicas</Kicker><Title compact>Rotas estratégicas avaliadas</Title><Rule/><p>Antes de definir a tese central, foram avaliadas três rotas estratégicas possíveis.</p><div className="grid lg:grid-cols-3 gap-5 mt-10">{routes.map((r,i)=><section key={r.n} className={`relative border rounded-xl p-7 md:p-9 ${i===2?'border-[#a27b24] bg-[#a27b24]/[.035]':'border-black/15 dark:border-white/15'}`}>{i===2&&<span className="absolute right-4 top-4 bg-[#9d7828] text-white rounded-md px-3 py-1 text-xs">Recomendada</span>}<div className="flex gap-5"><span className={`${heading} ${gold} text-5xl`}>{r.n}</span><div className="border-l border-[#a78337]/40 pl-5"><h3 className="font-semibold text-xl">{r.t}</h3><Rule/><p className="leading-relaxed">{r.b}</p></div></div></section>)}</div><div className="max-w-5xl mx-auto border border-[#9e8b68]/35 mt-7 p-5 flex gap-6"><span className={`${gold} text-4xl`}>◎</span><p><strong className={gold}>Tese Estratégica Central</strong><br/>A Lunna Atelier deve construir o jogo da presença feminina possível por meio de curadoria de peças, bolsas e combinações com prova concreta de qualidade.</p></div></Frame>;
}

function Equation() {
  const plus = ['Presença desejada','Confiança de caimento','Versatilidade de uso','Identidade','Prova de qualidade','Atendimento consultivo'];
  return <Frame><div className="grid lg:grid-cols-[.65fr_1.35fr] gap-12"><section><Kicker>09 | Arquitetura de valor</Kicker><Title compact>Arquitetura de Valor</Title><Rule/><h3 className="uppercase tracking-[.16em] mt-8 mb-5">Tese de construção</h3><p className="leading-[1.8] text-lg">O valor da Lunna deve ser construído como presença aplicável: a peça precisa elevar a imagem da cliente e, ao mesmo tempo, provar que funciona no corpo, na rotina e no bolso possível dela.</p></section><section><h3 className="uppercase tracking-wider">Equação de valor da marca</h3><Rule/><div className="border border-[#9d8455]/40 p-7 grid grid-cols-3 md:grid-cols-6 gap-5 text-center">{plus.map((x,i)=><div key={x}><div className={`${heading} ${gold} text-4xl mb-3`}>{['◇','🤝','↟','◎','✦','◌'][i]}</div><p className="text-sm">{x}</p></div>)}</div><h3 className="uppercase tracking-wider mt-8">Ponte de valor</h3><div className="grid grid-cols-3 gap-5 mt-5">{['Valor prático','Valor simbólico','Valor intrínseco'].map((x,i)=><div key={x} className="text-center"><span className={`${heading} ${gold} text-5xl border border-[#a58130] rounded-full w-16 h-16 inline-flex items-center justify-center`}>{i+1}</span><h4 className="uppercase mt-4">{x}</h4></div>)}</div></section></div></Frame>;
}

function Variables() {
  const up=['Presença desejada: mostrar como a peça muda a postura visual da cliente.','Confiança de caimento: oferecer medidas, vídeos e corpos reais.','Versatilidade de uso: demonstrar combinações para rotina urbana.','Identidade: associar Lunna à mulher segura e natural.','Prova de qualidade: tecido, costura, acabamento e movimento.','Atendimento consultivo: WhatsApp como apoio de escolha.'];
  const down=['Risco de compra online: troca clara, guia de medidas, avaliações e vídeos.','Comparação por preço: explicar composição de valor, uso e presença.','Medo de parecer forçada: linguagem natural e exemplos de rotina.','Fricção de frete: política progressiva, kits e comunicação antecipada.'];
  return <Frame><Kicker>09 | Arquitetura de valor</Kicker><Title compact>Variáveis da Equação</Title><div className="grid lg:grid-cols-2 gap-12 mt-9"><Column title="Variáveis a aumentar"><Numbered items={up}/></Column><Column title="Variáveis a reduzir"><Numbered items={down}/></Column></div></Frame>;
}

function Bridge() {
  return <Frame><Kicker>09 | Arquitetura de valor</Kicker><Title compact>Ponte de valor prático, simbólico e intrínseco</Title><Rule/><div className="grid lg:grid-cols-3 gap-10 mt-8 text-[clamp(.9rem,1.12vw,1.18rem)] leading-[1.72]"><Column title="Estágios"><p><strong>Estágio atual:</strong> valor prático com estética simbólica inicial.</p><p className="mt-7"><strong>Em 6 meses:</strong> valor simbólico reconhecido e sustentado por prova prática.</p><p className="mt-7"><strong>Em 12 meses:</strong> início de valor intrínseco e pertencimento.</p></Column><Column title="Do atributo ao significado"><p>Camisa de tecido fluido deve virar camisa que dá estrutura sem endurecer sua imagem. Bolsa estruturada deve virar a bolsa que organiza sua presença quando você precisa parecer pronta sem esforço.</p><p className="mt-6">Para entrar no valor simbólico, a marca precisa criar códigos: presença, não ostentação; maturidade visual, não formalidade rígida.</p></Column><Column title="Da compra à identidade"><p>Para chegar ao valor intrínseco, a experiência pós-compra precisa confirmar a identidade: a cliente deve vestir ou usar a peça e sentir “isso sou eu em uma versão mais segura”.</p></Column></div></Frame>;
}

function Examples() {
  const rows=[['Bolsa estruturada preta, elegante e versátil.','Bolsa estruturada para os dias em que sua imagem precisa chegar antes da pressa. Ela sustenta presença no trabalho e organiza o visual quando o look é simples.'],['Camisa feminina de tecido fluido.','Camisa fluida para criar maturidade visual sem rigidez. Funciona fechada com alfaiataria leve, aberta sobre regata e dobrada na manga quando a intenção é elegância menos formal.']];
  return <Frame><Kicker>09 | Arquitetura de valor</Kicker><Title compact>Exemplos aplicados</Title><div className="mt-10 border-y border-[#9d8455]/40"><div className={`${gold} grid grid-cols-2 uppercase tracking-[.17em] text-xs px-8 py-4`}><span>Descrição antiga</span><span>Descrição recomendada</span></div>{rows.map((r,i)=><div key={r[0]} className="grid grid-cols-[3rem_1fr_1.15fr] border-t border-[#9d8455]/35"><span className={`${heading} ${gold} text-4xl p-5`}>0{i+1}</span><p className="p-6 border-l border-[#9d8455]/35">{r[0]}</p><p className="p-6 border-l border-[#9d8455]/35">{r[1]}</p></div>)}</div><div className="border border-[#9d8455]/35 mt-7 p-5 flex gap-6 items-center"><span className={`${gold} text-4xl`}>✦</span><div><Kicker>Mensagem de valor</Kicker><p className="editorial-serif text-2xl">Não é sobre parecer outra pessoa. É sobre vestir sinais que fazem sua presença ficar mais clara.</p></div></div></Frame>;
}

const architectureGroups=[['Sinais a remover',['Frases genéricas sem contexto','Fotos bonitas sem informação','Lançamentos apenas estéticos','Dúvidas tratadas só no atendimento']],['Sinais a corrigir',['Sofisticação acessível → presença possível','Mulheres reais → prova visual','Minimalismo feminino → códigos claros']],['Sinais a criar',['Página de confiança','Guia de medidas e caimento','Vídeos no corpo e em movimento','Conteúdo de comparação honesta']],['Sinais a fortalecer',['Bom gosto visual existente','Atendimento próximo','Curadoria da fundadora','Comentários de sofisticação sem exagero']]] as const;
function Architecture() { return <Frame><Kicker>10 | Percepção e confiança</Kicker><Title compact>Arquitetura recomendada</Title><div className="grid lg:grid-cols-2 mt-7">{architectureGroups.map(([t,x])=><div key={t} className="border border-[#7c7468]/35 p-6"><h3 className="uppercase tracking-[.14em] font-semibold border-b border-black/30 dark:border-white/20 pb-3 mb-4">{t}</h3><Bullets items={[...x]}/></div>)}</div></Frame>; }
function Signals() { return <Frame><Kicker>10 | Percepção e confiança</Kicker><Title compact>Mapa de Sinais da Marca</Title><p className="mt-5 max-w-4xl text-lg">Percepção não muda por afirmação. A marca deve criar sinais repetidos que permitam à cliente concluir qualidade, elegância e confiança sozinha.</p><div className="grid lg:grid-cols-2 mt-7">{architectureGroups.map(([t,x],i)=><MatrixCell key={t} number={`0${i+1}`} title={t.replace('Sinais a ','')} items={[...x]}/>)}</div></Frame>; }

function Narrative() {
  const codes = [['Tensão cultural','A mulher quer elevar sua presença sem vestir uma personagem.'],['Inimigo simbólico','A elegância performática, rígida e distante da vida real.'],['Crença proprietária','Presença não exige excesso; exige intenção, clareza e segurança.']];
  return <Frame><Kicker>11 | Narrativa-mãe e território de marca</Kicker><Title compact>Presença feminina possível</Title><div className="grid lg:grid-cols-[1.2fr_.8fr] gap-12 mt-9"><section><p className="text-[clamp(1.25rem,2vw,2rem)] leading-relaxed editorial-serif">A Lunna existe para reduzir a distância entre a mulher que a cliente é hoje e a presença que ela quer sustentar em ambientes reais.</p><div className="grid gap-4 mt-8">{codes.map(([t,b],i)=><div key={t} className="grid grid-cols-[3.5rem_1fr] gap-5 border-t border-[#9b7625]/35 pt-4"><span className={`${heading} ${gold} text-4xl`}>0{i+1}</span><div><h3 className="uppercase tracking-[.12em] text-sm">{t}</h3><p className="mt-2">{b}</p></div></div>)}</div></section><aside className="rounded-[2rem] border border-white/70 dark:border-white/10 bg-white/40 dark:bg-white/[.025] backdrop-blur-xl p-8 shadow-[0_24px_70px_rgba(45,35,18,.08)]"><Kicker>Frases centrais</Kicker><p className="editorial-serif text-3xl leading-snug">“Vista sinais que fazem sua presença ficar mais clara.”</p><Rule/><Bullets items={['Presença, não ostentação','Naturalidade, não desleixo','Curadoria, não excesso','Vida real, não fantasia editorial']}/></aside></div></Frame>;
}

function Journey() {
 const rows=[['Entrada por conteúdo','A cliente salva um conteúdo sobre presença sem rigidez, vê uma camisa em movimento, confere medidas e abre o WhatsApp para confirmar tamanho.'],['Entrada por produto','A cliente se encanta por uma bolsa. A página mostra tamanho, o que cabe, vídeos no corpo e três combinações.'],['Entrada por lista VIP','A cliente entra por um guia gratuito, recebe prova de qualidade e escolha guiada; no lançamento, recebe prioridade.']];
 return <Frame><Kicker>12 | Oferta, produto e jornada</Kicker><Title compact>Jornada de primeira compra</Title><p className="mt-5 text-lg">Cada jornada deve reduzir esforço mental. Quanto menos a cliente precisar imaginar sozinha, maior a chance de compra.</p><div className="mt-8 space-y-4">{rows.map((r,i)=><div key={r[0]} className="grid lg:grid-cols-[1fr_5rem_1.15fr] items-center gap-7"><h3 className="text-2xl font-semibold border-y border-[#9b7625]/45 py-5">{r[0]}</h3><span className={`${heading} ${gold} text-5xl border border-[#9b7625] rounded-full w-16 h-16 flex items-center justify-center`}>{i+1}</span><p className="leading-relaxed">{r[1]}</p></div>)}</div></Frame>;
}
function Staircase() {
 const stages=[['01','Entrada',['Bolsa estruturada','Bolsa de ombro','Blusa fluida','Camisa de fácil combinação'],'menor risco, alto desejo e boa introdução à marca.'],['02','Construção',['Calça de alfaiataria leve','Camisa premium de entrada','Vestido midi versátil','Conjunto casual elegante'],'ampliar confiança, aumentar ticket e consolidar imagem.'],['03','Expansão',['Cápsulas de ocasião','Linha premium de bolsas','Acessórios pontuais','Kits de mala, trabalho e noite'],'criar recompra, recorrência e pertencimento.']] as const;
  return <Frame><Kicker>12 | Oferta, produto e jornada</Kicker><Title compact>Produtos por etapa da jornada</Title><p className="mt-5">A oferta deve transformar produtos em jornadas de presença, não apenas em categorias soltas.</p><div className="grid lg:grid-cols-3 items-end gap-0 mt-5">{stages.map((s,i)=><section key={s[0]} className="border-t border-l border-[#a27c28] p-7" style={{marginBottom:`${(2-i)*2.6}rem`}}><span className={`${heading} ${gold} text-6xl`}>{s[0]}</span><h3 className="text-2xl font-semibold my-4">{s[1]}</h3><Bullets items={s[2]}/><p className="border-t border-[#9b7625]/40 mt-5 pt-4"><strong>Função:</strong> {s[3]}</p></section>)}</div></Frame>;
}

function Community() {
  const levels=[['Audiência','Observa, salva e aprende códigos de presença.'],['Relacionamento','Responde, pergunta, experimenta e compartilha contexto.'],['Comunidade','Reconhece a crença, pratica rituais e ajuda outras mulheres.']];
  return <Frame><Kicker>13 | Comunidade e relacionamento</Kicker><Title compact>Da audiência ao pertencimento</Title><div className="grid lg:grid-cols-3 gap-6 mt-10">{levels.map(([t,b],i)=><section key={t} className="relative min-h-64 rounded-[2rem] border border-[#9b7625]/35 p-8 overflow-hidden"><span className={`${heading} ${gold} text-[7rem] absolute -right-2 -bottom-5 opacity-10`}>{i+1}</span><span className={`${gold} text-xs tracking-[.2em] uppercase`}>Camada 0{i+1}</span><h3 className="editorial-serif text-4xl mt-5">{t}</h3><p className="mt-6 leading-relaxed max-w-xs">{b}</p></section>)}</div><div className="grid lg:grid-cols-3 gap-8 mt-9 border-t border-[#9b7625]/35 pt-7"><Column title="Mito">Elegância não precisa afastar a mulher da própria vida.</Column><Column title="Rito">Armário com Presença: uma ativação mensal de combinações e escolhas guiadas.</Column><Column title="Doutrina">Comprar menos peças soltas e construir mais intenção de uso.</Column></div></Frame>;
}

function ContentSystem() {
  const pillars=[['Presença aplicada','Looks por contexto: trabalho, encontro, viagem e rotina.'],['Prova de produto','Tecido, acabamento, medidas, movimento e comparações honestas.'],['Escolha guiada','Como combinar, para quem funciona e quando não escolher uma peça.'],['Bastidores com intenção','Curadoria, fornecedores, decisões e evolução da marca.']];
  return <Frame><Kicker>14 | Sistema de conteúdo e linguagem</Kicker><Title compact>Conteúdo que reduz distância</Title><div className="grid lg:grid-cols-4 gap-4 mt-9">{pillars.map(([t,b],i)=><section key={t} className="border-t-2 border-[#9b7625] bg-white/25 dark:bg-white/[.025] p-6"><span className={`${heading} ${gold} text-4xl`}>0{i+1}</span><h3 className="text-lg font-semibold mt-5">{t}</h3><p className="mt-3 text-sm leading-relaxed">{b}</p></section>)}</div><div className="grid lg:grid-cols-2 gap-10 mt-10"><Column title="Linguagem recomendada"><Bullets items={['Clara, elegante e consultiva','Concreta sobre uso e contexto','Segura sem superioridade','Próxima sem informalidade excessiva']}/></Column><Column title="Evitar"><Bullets items={['“Sua melhor versão” sem contexto','Luxo, poder e exclusividade como clichês','Escassez falsa e urgência vazia','Beleza sem informação de produto']}/></Column></div></Frame>;
}

function Commercial() {
 const rows=[['“Tenho medo de não servir”','Medidas reais, vídeo no corpo, orientação consultiva e troca simples.'],['“Está caro”','Composição, acabamento, versatilidade, custo por uso e comparação honesta.'],['“Não sei como usar”','Três combinações prontas, contexto de ocasião e pós-compra guiado.'],['“Vou pensar”','Retomar o contexto da cliente, reduzir dúvida e oferecer segurança — não desconto automático.']];
 return <Frame><Kicker>15 | Sistema comercial e redução de objeções</Kicker><Title compact>Confiança antes do desconto</Title><div className="mt-9 border border-[#9b7625]/35 rounded-[1.5rem] overflow-hidden">{rows.map((r,i)=><div key={r[0]} className="grid lg:grid-cols-[4rem_.7fr_1.3fr] border-t first:border-t-0 border-[#9b7625]/30"><span className={`${heading} ${gold} text-4xl p-5`}>0{i+1}</span><h3 className="p-5 font-semibold border-l border-[#9b7625]/30">{r[0]}</h3><p className="p-5 border-l border-[#9b7625]/30">{r[1]}</p></div>)}</div><p className="mt-8 text-center uppercase tracking-[.13em] text-sm">Instagram desperta → e-commerce prova → WhatsApp orienta → pós-compra confirma</p></Frame>;
}

function Growth() {
 const loop=['Conteúdo com significado','Captação para canal próprio','Escolha guiada','Primeira compra segura','Uso confirmado','Recompra por jornada'];
 return <Frame><Kicker>16 | Arquitetura de crescimento e dados</Kicker><Title compact>O motor de crescimento saudável</Title><div className="flex flex-wrap justify-center gap-3 mt-10">{loop.map((x,i)=><div key={x} className="flex items-center gap-3"><div className="w-36 h-36 rounded-full border border-[#9b7625]/55 flex items-center justify-center text-center p-4 bg-white/30 dark:bg-white/[.025]"><span><strong className={`${gold} block text-xs mb-2`}>0{i+1}</strong>{x}</span></div>{i<loop.length-1&&<span className={`${gold} text-2xl`}>→</span>}</div>)}</div><div className="grid lg:grid-cols-4 gap-8 mt-10"><Column title="Aquisição">Custo por lead, origem e qualidade da audiência.</Column><Column title="Conversão">Produto, canal, objeção e assistência necessária.</Column><Column title="Saúde">Margem após frete, trocas, descontos e mídia.</Column><Column title="Retenção">Recompra, intervalo, jornada e participação em rituais.</Column></div></Frame>;
}

const roadmap = {
 '30':{title:'Primeiros 30 dias: fundação',objective:'preparar a marca para vender com clareza e confiança no lançamento oficial.',deliver:['Aprovar a tese “presença feminina possível”.','Reescrever bio, destaques, página inicial e descrições.','Criar página de confiança.','Produzir vídeos de tecido, caimento e uso real.','Criar guia de medidas e política de troca clara.'],ind:['Página de confiança publicada.','Produtos prioritários com prova mínima.','Destaques reorganizados.','Lista VIP segmentada.'],risk:['Tentar lançar antes de publicar provas.','Produzir conteúdo bonito sem responder objeções.','Exagerar no manifesto e esquecer fichas de produto.'],decision:'A marca está pronta para lançamento oficial se confiança, produto e jornada estiverem estruturados.'},
 '60':{title:'Dias 31 a 60: ativação',objective:'lançar oficialmente e validar tese, oferta e confiança.',deliver:['Lançamento com narrativa de presença possível.','Série “Escolha Guiada” por jornada.','Desafio 5 Dias de Presença Possível.','Ativação de lista VIP.','Primeiras collabs com criadoras alinhadas.'],ind:['Receita de lançamento.','Conversão da lista VIP.','Conversão do WhatsApp.','Pedidos de desconto.','Trocas por tamanho.'],risk:['Usar cupom cedo demais para bater meta.','Escalar influenciadora sem prova de produto.','Ignorar dados qualitativos do atendimento.'],decision:'Manter, ajustar ou pausar produtos conforme conversão, margem, trocas e feedback.'},
 '90':{title:'Dias 61 a 90: validação e decisão',objective:'consolidar o que funcionou, criar recompra e preparar próxima cápsula.',deliver:['Relatório de produtos campeões e problemáticos.','Ajuste de descrições e provas.','Primeira régua de recompra por jornada.','Planejamento da próxima cápsula com tese clara.','Segmentação de clientes por ocasião de uso.'],ind:['Recompra inicial.','Receita recorrente.','Queda de objeções repetidas.','Margem após trocas e frete.','Participação em rituais.'],risk:['Lançar linha premium antes de consolidar confiança.','Ampliar variedade demais e perder curadoria.','Trocar posicionamento por pressão de tendência.'],decision:'Escolher quais jornadas, produtos e mensagens sustentam o próximo ciclo de crescimento.'}
} as const;
function Roadmap({phase}:{phase:keyof typeof roadmap}) { const r=roadmap[phase]; return <Frame><Kicker>17 | Roteiro de transformação</Kicker><Title compact>{r.title}</Title><Rule/><p className="text-lg"><strong className={gold}>Objetivo:</strong> {r.objective}</p><div className="grid lg:grid-cols-4 gap-8 mt-10"><Column title="Entregáveis"><Numbered items={[...r.deliver]}/></Column><Column title="Indicadores"><Bullets items={[...r.ind]}/></Column><Column title="Riscos"><Bullets items={[...r.risk]}/></Column><Column title="Decisão"><p className="leading-relaxed"><strong>Decisão ao fim dos {phase} dias:</strong><br/>{r.decision}</p></Column></div></Frame>; }

function Governance() {
 const cadence=[['Semanal','Operação','Pedidos, dúvidas, conteúdo, estoque e sinais de fricção.'],['Mensal','Aprendizado','Conversão, margem, trocas, objeções, produtos e canais.'],['Trimestral','Direção','Tese, portfólio, jornadas, metas e critérios de escala.']];
 return <Frame><Kicker>18 | Governança estratégica</Kicker><Title compact>Ritmo para decidir sem improviso</Title><div className="mt-10 relative"><div className="absolute left-0 right-0 top-10 h-px bg-[#9b7625]/45"/><div className="grid lg:grid-cols-3 gap-10">{cadence.map(([period,t,b])=><section key={period} className="relative pt-20"><span className="absolute top-7 left-0 w-7 h-7 rounded-full bg-[#f7f4ed] dark:bg-[#121210] border-2 border-[#9b7625] flex items-center justify-center"><span className="w-2 h-2 rounded-full bg-[#9b7625]"/></span><Kicker>{period}</Kicker><h3 className="editorial-serif text-4xl">{t}</h3><p className="mt-4 leading-relaxed">{b}</p></section>)}</div></div><div className="grid lg:grid-cols-3 gap-6 mt-12"><Column title="Fundadora">Tese, curadoria, produto e decisões de marca.</Column><Column title="Marketing e atendimento">Conteúdo, publicação, conversão e registro de objeções.</Column><Column title="Operação">Estoque, prazo, frete, troca, margem e qualidade da entrega.</Column></div></Frame>;
}

function Risks() {
 const risks=[['Escalar antes da confiança','Mais tráfego amplifica dúvidas e desperdício.','Pausar mídia e reforçar ativos de prova.'],['Perder curadoria','Variedade excessiva enfraquece a tese.','Manter apenas jornadas e produtos validados.'],['Desconto virar argumento','A marca ensina a cliente a esperar cupom.','Trabalhar kits, prioridade e valor percebido.'],['Narrativa sem operação','Promessa sofisticada encontra entrega comum.','Revisar prazos, embalagem, troca e pós-compra.']];
 return <Frame><Kicker>19 | Riscos, cenários e critérios de revisão</Kicker><Title compact>O que manter, adaptar ou pausar</Title><div className="grid lg:grid-cols-2 gap-4 mt-9">{risks.map(([t,e,a],i)=><section key={t} className="grid grid-cols-[3.5rem_1fr] gap-5 border border-black/10 dark:border-white/10 rounded-[1.25rem] p-6"><span className={`${heading} ${gold} text-4xl`}>0{i+1}</span><div><h3 className="text-xl font-semibold">{t}</h3><p className="mt-3"><span className={`${gold} uppercase text-[10px] tracking-widest`}>Sinal</span><br/>{e}</p><p className="mt-3"><span className={`${gold} uppercase text-[10px] tracking-widest`}>Resposta</span><br/>{a}</p></div></section>)}</div></Frame>;
}

function NextSteps() {
 const steps=['Aprovar a tese estratégica e as renúncias de posicionamento.','Escolher os produtos prioritários da primeira jornada.','Publicar página de confiança, medidas e política de troca.','Produzir provas visuais de tecido, corpo, movimento e acabamento.','Reescrever bio, destaques, página inicial e descrições.','Estruturar lista VIP e roteiro consultivo de WhatsApp.','Executar o calendário de 30 dias e registrar objeções.','Revisar conversão, margem, trocas e sinais qualitativos antes de escalar.'];
 return <Frame><Kicker>20 | Próximos passos recomendados</Kicker><Title compact>Começar pela fundação</Title><div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-[#9b7625]/30 border border-[#9b7625]/30 mt-10">{steps.map((s,i)=><div key={s} className="bg-[#f7f4ed] dark:bg-[#121210] p-6 min-h-40 group hover:bg-[#9b7625]/[.055] transition-colors"><span className={`${heading} ${gold} text-4xl`}>{String(i+1).padStart(2,'0')}</span><p className="mt-5 leading-relaxed text-sm">{s}</p></div>)}</div><p className="mt-8 editorial-serif text-2xl text-center">A ordem protege a estratégia: primeiro clareza, depois confiança, então ativação e escala.</p></Frame>;
}
function Synthesis() { return <Frame><Kicker>21 | Síntese estratégica final</Kicker><div className="border-t border-[#9b7625]/50 pt-8"><Title compact>Síntese Estratégica Final</Title></div><div className="grid lg:grid-cols-[.8fr_1.15fr_1.15fr] gap-12 mt-12"><blockquote className="editorial-serif italic text-3xl border-y border-[#9b7625]/50 py-7"><span className={`${gold} text-6xl`}>“</span><br/>A Lunna Atelier não precisa se tornar mais bonita para competir. Precisa se tornar mais significativa, mais confiável e menos comparável.</blockquote><div className="text-lg leading-[1.7]"><p>O mercado já entendeu que a marca tem estética. O próximo passo é fazer a cliente entender por que essa estética importa para a vida dela. A resposta deve ser presença.</p><p className="mt-7">Presença é o território que conecta a visão da fundadora, as dores da cliente, os produtos e a ambição de crescimento.</p></div><div className="text-lg leading-[1.7]"><p>Para ocupar esse território, a Lunna deve construir valor em camadas: provar o produto, organizar a oferta como jornada, consolidar a narrativa, criar relacionamento e crescer apenas quando a confiança permitir.</p><p className="mt-7">A mulher da Lunna quer parecer mais segura dentro da própria vida.</p></div></div></Frame>; }
