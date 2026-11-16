// Gera os SVGs do README em assets/light e assets/dark. Rode: node scripts/build.mjs
// Todo o conteúdo do perfil fica em DATA; edite lá e rode de novo.
import { mkdirSync, writeFileSync } from 'node:fs';

const THEMES = {
  light: { ink: '#16150F', ink2: '#4B4A42', muted: '#807E73', line: '#CFCBBF', accent: '#16150F', ok: '#16150F' },
  dark: { ink: '#E6E6E6', ink2: '#B6B6B2', muted: '#85857F', line: '#30303A', accent: '#E6E6E6', ok: '#E6E6E6' },
};

const DATA = {
  whoami: [
    ['nome', 'Adryan Ryan Silva Guimarães'],
    ['papel', 'Fundador & Dev Líder @ CodeSpace, estúdio de produto digital (2024 – atual)'],
    ['base', 'Teresina, Piauí, Brasil'],
    ['formação', 'Bacharelado em Engenharia de Software, iCEV (2024 – atual)'],
    ['foco', 'SaaS multi-tenant · compras públicas (Lei 14.133) · dados governamentais · IA'],
    ['método', 'spec antes do código · TypeScript strict · testes · CI/CD · semver'],
  ],
  quote: '“Um sistema bom é aquele que ninguém precisa explicar duas vezes.”',
  stats: [['5', 'PRODUTOS EM PRODUÇÃO'], ['7', 'CERTIFICAÇÕES'], ['25+', 'MÓDULOS NO MURAL'], ['400+', 'ARQUIVOS DE TESTE']],
  projects: [
    {
      name: 'MURAL DE PREÇOS', kind: 'SAAS · LICITAÇÃO — 2025',
      copy: [
        'Plataforma do ciclo de compras públicas: pesquisa de preços, cotações, licitações, atas e contratos.',
        'Reescrevi o legado Java/Spring em Fastify: 25+ módulos, worker do PNCP e assistente de IA com tool use.',
      ],
      stack: 'NODE 22 · FASTIFY 5 · NEXT.JS 16 · POSTGRESQL 17 · DRIZZLE · REDIS · ZOD',
    },
    {
      name: 'MEDSPACE', kind: 'SAÚDE · LAUDOS',
      copy: [
        'Laudos médicos estruturados com um motor em TypeScript puro que roda no navegador e no servidor.',
        'Conteúdo clínico versionado como código, testes de ouro e multi-tenancy com Row-Level Security.',
      ],
      stack: 'MONOREPO PNPM · FASTIFY · REACT + VITE · TANSTACK ROUTER · BETTER AUTH · POSTGRES RLS',
    },
    {
      name: 'GEC CORE', kind: 'SAAS · CONSTRUÇÃO',
      copy: [
        'SaaS multi-organização para construtoras controlarem diaristas, pagamentos e o financeiro da obra.',
        'Dinheiro em centavos (bigint), CPF validado, contratos Zod compartilhados e testes E2E com Playwright.',
      ],
      stack: 'FASTIFY · DRIZZLE · BETTER AUTH · REACT · TANSTACK · SHADCN/UI · PLAYWRIGHT',
    },
    {
      name: 'MYSTORELAB', kind: 'SAAS · E-COMMERCE — 2025',
      copy: [
        'E-commerce multi-tenant: planos com limites, feature flags, checkout com webhooks e cotação de frete.',
        'Guards por papel, 30+ migrações versionadas, imagens no GHCR e releases semânticas automáticas.',
      ],
      stack: 'NESTJS (FASTIFY) · DRIZZLE · BETTER AUTH · REDIS · DOCKER · GITHUB ACTIONS',
    },
    {
      name: 'BRASIL MAIS INTELIGENTE', kind: 'PLATAFORMA · B2G — 2024',
      copy: [
        'Conecta pequenas empresas a compras públicas, cruzando o perfil de cada uma com os editais abertos.',
        'ETL em streaming dos dados de CNPJ da Receita Federal, API REST com cache em Redis e front em Next.js.',
      ],
      stack: 'FASTIFY · NEXT.JS 16 · POSTGRESQL · REDIS · ETL',
    },
    {
      name: 'SGE', kind: 'GESTÃO · GABINETES — 2024',
      copy: [
        'Gestão de equipes e gabinetes parlamentares: demandas, atendimentos e indicadores de desempenho.',
        'Um fluxo único com responsável, prazo e status, e histórico auditável de cada atendimento.',
      ],
      stack: 'NEXT.JS · NODE.JS · POSTGRESQL',
    },
    {
      name: 'ORCA-CLI-MCP', kind: 'OPEN SOURCE · NPM',
      copy: [
        'Servidor MCP que deixa agentes de IA (Claude, Cursor, Codex) orquestrar worktrees e terminais do Orca.',
        '18 ferramentas tipadas com Zod, processos sem shell (execFile), testes com cobertura e docs bilíngue.',
      ],
      stack: 'TYPESCRIPT · MODEL CONTEXT PROTOCOL · ZOD · VITEST',
    },
    {
      name: 'PAPELADA', kind: 'OPEN SOURCE · DESKTOP — 2026',
      copy: [
        'App desktop para juntar, separar e converter PDFs em massa no macOS, Windows e Linux, 100% local.',
        'Descompacta zip/rar/7z, mostra miniaturas, reordena arrastando e converte PDF para Word.',
      ],
      stack: 'PYTHON · PDF · DESKTOP · GITHUB ACTIONS',
    },
  ],
  opensource: [
    {
      name: 'SIMULADORCOLETALIXO', kind: 'JAVA · SIMULAÇÃO',
      copy: [
        'Simulador orientado a eventos da coleta de lixo urbano em Teresina, com horários de pico e capacidade.',
        'Listas próprias e descarregamento em estações de transferência até o aterro sanitário.',
      ],
      stack: 'JAVA · EVENTOS DISCRETOS · ESTRUTURAS DE DADOS',
    },
    {
      name: 'TEST-ORCHESTRATOR', kind: 'PYTHON · QA',
      copy: [
        'Suíte de testes end-to-end cobrindo APIs e fluxos web, com integração contínua.',
        'Selenium, boas práticas de engenharia e pipeline de CI/CD.',
      ],
      stack: 'PYTHON · SELENIUM · CI/CD',
    },
    {
      name: 'SISTEMA-GESTAO-CONSULTORIA', kind: 'TYPESCRIPT · GESTÃO',
      copy: [
        'GHAST: gestão para consultorias de planejamento financeiro, gestão empresarial e análise de dados.',
        'Automatiza o cadastro de clientes e consultores e o controle de contratos.',
      ],
      stack: 'TYPESCRIPT · SISTEMA DE GESTÃO',
    },
    {
      name: 'ANALISE-PORTAL-TRANSPARENCIA', kind: 'PYTHON · DADOS ABERTOS',
      copy: [
        'Análise dos gastos públicos com viagens em 2023, extraídos do Portal da Transparência.',
        'Gera relatórios consolidados e gráficos para facilitar a leitura e promover a transparência.',
      ],
      stack: 'PYTHON · DADOS PÚBLICOS · VISUALIZAÇÃO',
    },
    {
      name: 'TODO-LIST', kind: 'API REST',
      copy: [
        'API RESTful de tarefas com CRUD completo, totalmente containerizada com Docker.',
        'Fastify, Prisma ORM e PostgreSQL, com Prisma Studio para inspecionar o banco.',
      ],
      stack: 'FASTIFY · PRISMA · POSTGRESQL · DOCKER',
    },
    {
      name: 'BOOK-ANALYTICS', kind: 'PYTHON · DASHBOARD',
      copy: [
        'Dashboard interativo de livros: filtro por preço e gráficos de preços e anos de publicação.',
        'Inclui uma página com detalhes e avaliações de cada livro.',
      ],
      stack: 'PYTHON · STREAMLIT',
    },
  ],
  // * marca a stack principal (destacada na cor de acento)
  stack: [
    ['LINGUAGENS', '*TypeScript · JavaScript · SQL · Python · Java · C'],
    ['BACK-END', '*Node.js · Fastify · NestJS · REST · OpenAPI · Better Auth · JWT'],
    ['FRONT-END', '*React · *Next.js · Vite · TanStack Query/Router · Tailwind CSS · shadcn/ui · PWA'],
    ['MOBILE', 'React Native · Expo'],
    ['DADOS', '*PostgreSQL · Drizzle · Prisma · Redis · ETL · migrações versionadas'],
    ['IA', 'Anthropic SDK · OpenAI SDK · tool use · Model Context Protocol'],
    ['DEVOPS', 'Docker · GitHub Actions · GHCR · Dokploy · Traefik · Vercel · AWS · Arch Linux'],
    ['TESTES', 'Vitest · Testing Library · Playwright'],
  ],
  certs: [
    ['nov 2026', 'AWS Academy Graduate — Data Engineering', 'AMAZON WEB SERVICES', true],
    ['abr 2026', 'AWS Academy Graduate — Cloud Architecting', 'AMAZON WEB SERVICES'],
    ['ago 2025', 'AWS Academy Graduate — Generative AI Foundations', 'AMAZON WEB SERVICES'],
    ['jun 2025', 'AWS Academy Graduate — Cloud Foundations', 'AMAZON WEB SERVICES'],
    ['2025', 'Red Hat Academy — Program Learner', 'RED HAT'],
    ['2024', 'Red Hat Academy — Program Learner', 'RED HAT'],
    ['2023', 'Oracle Academy — Java & Database Fundamentals', 'ORACLE'],
  ],
  timeline: [
    ['2022', ['Freelance', 'sistemas web para PMEs', 'painéis e integrações']],
    ['2023', ['Oracle Academy', 'Java & banco de dados']],
    ['2024', ['Funda a CodeSpace', 'Eng. Software · iCEV', 'Red Hat Academy', 'BMI · SGE']],
    ['2025', ['AWS Cloud Foundations', 'AWS Generative AI', 'Mural de Preços', 'MyStoreLab']],
    ['2026', ['AWS Cloud Architecting', 'AWS Data Engineering', 'Estágio · Mural', 'orca-cli-mcp no npm']],
  ],
  status: [
    ['construindo', 'Mural de Preços · MedSpace · GEC Core'],
    ['aprofundando', 'arquitetura de software · cloud (AWS) · engenharia de dados · Linux'],
    ['disponível', 'projetos sob demanda · freelance · colaboração open source'],
  ],
  updated: 'nov 2026',
};

const MONO = 'ui-monospace,SFMono-Regular,&quot;SF Mono&quot;,&quot;JetBrains Mono&quot;,Menlo,Consolas,monospace';
const SANS = '&quot;Space Grotesk&quot;,-apple-system,BlinkMacSystemFont,&quot;Segoe UI&quot;,Helvetica,Arial,sans-serif';
const W = 1000, L = 48, R = 952;
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
// shortcut: largura estimada de fonte mono (0.6em); se trocar a fonte, revise o limite
const monoWidth = (s, size, spacing = 0) => [...s].length * (size * 0.6 + spacing);

function fits(s, x, size, spacing = 0, max = R) {
  const end = x + monoWidth(s, size, spacing);
  if (end > max + 1) throw new Error(`Texto passa da borda (${Math.round(end)} > ${max}): "${s}"`);
  return s;
}

const text = (x, y, cls, size, s, attrs = '') =>
  `<text x="${x}" y="${y}" class="${cls}" font-size="${size}" ${attrs}>${esc(s)}</text>`;
const fade = (delay, inner) => `<g class="fade" style="animation-delay:${delay}s">${inner}</g>`;
const rule = (x1, y, x2 = R, delay = 0) =>
  `<line class="rule draw" x1="${x1}" y1="${y}" x2="${x2}" y2="${y}" style="animation-delay:${delay}s"/>`;

function svg(t, h, label, body) {
  const css = `.m{font-family:${MONO}}.s{font-family:${SANS}}
.ink{fill:${t.ink}}.ink2{fill:${t.ink2}}.mut{fill:${t.muted}}.acc{fill:${t.accent}}.ok{fill:${t.ok}}
.rule{stroke:${t.line};stroke-width:1}
.fade{opacity:0;animation:fade .7s ease forwards}@keyframes fade{to{opacity:1}}
.draw{stroke-dasharray:1000;stroke-dashoffset:1000;animation:draw 1.2s cubic-bezier(.6,0,.2,1) forwards}@keyframes draw{to{stroke-dashoffset:0}}
.blink{animation:blink 1.1s steps(1) infinite}@keyframes blink{50%{opacity:0}}
.pulse{animation:pulse 2.2s ease-in-out infinite}@keyframes pulse{50%{opacity:.25}}
@media (prefers-reduced-motion:reduce){.fade,.draw,.blink,.pulse{animation:none;opacity:1;stroke-dashoffset:0}}`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${h}" width="${W}" height="${h}" fill="none" role="img" aria-label="${esc(label)}">
<style>${css}</style>
${body}
</svg>
`;
}

function header(t) {
  const body = [
    rule(L, 58),
    fade(0.1, text(L, 44, 'm mut', 11, '~/ADRYANRR — README.MD', 'letter-spacing="3"') +
      text(R, 44, 'm mut', 11, 'TERESINA, PI — 5.09° S · 42.80° W', 'letter-spacing="3" text-anchor="end"')),
    fade(0.3, text(44, 160, 's ink', 76, 'Adryan Ryan', 'font-weight="700" letter-spacing="-2"')),
    fade(0.6, text(L, 198, 'm mut', 17, fits('Engenheiro de Software · Full-Stack · Fundador da CodeSpace', L, 17))),
    fade(1.2, text(L, 250, 'm mut', 12.5, 'foco ▸') +
      text(112, 250, 'm ink', 12.5, fits('SaaS multi-tenant · compras públicas (B2G) · sistemas de gestão · IA aplicada', 112, 12.5))),
    rule(L, 280, R, 0.3),
    fade(1.5, `<circle cx="52" cy="302" r="4" class="ok pulse"/>` +
      text(64, 306, 'm mut', 11, 'ABERTO A PROJETOS · FREELANCE · COLABORAÇÃO', 'letter-spacing="1.5"') +
      text(R, 306, 'm mut', 11, 'TYPESCRIPT · NODE.JS · REACT · POSTGRESQL', 'letter-spacing="1.5" text-anchor="end"')),
  ];
  return svg(t, 330, 'Adryan Ryan — Engenheiro de Software, Full-Stack, fundador da CodeSpace', body.join('\n'));
}

function section(t, n, title) {
  const label = `— ${title.toUpperCase()}`;
  const end = 84 + monoWidth(label, 13, 2) + 16;
  const body = fade(0, text(L, 38, 'm acc', 13, n, 'letter-spacing="2" font-weight="700"') +
    text(84, 38, 'm ink', 13, label, 'letter-spacing="2"')) + rule(end, 34, R, 0.1);
  return svg(t, 60, `${n} — ${title}`, body);
}

function whoami(t) {
  const rows = DATA.whoami.map(([k, v], i) => fade(0.1 + i * 0.08,
    text(L, 76 + i * 28, 'm mut', 13, k) + text(170, 76 + i * 28, 'm ink', 13, fits(v, 170, 13))));
  const colW = (R - L) / DATA.stats.length;
  const stats = DATA.stats.map(([n, label], i) => fade(0.8 + i * 0.1,
    text(L + i * colW, 342, 's ink', 30, n, 'font-weight="700"') +
    text(L + i * colW, 364, 'm mut', 10.5, label, 'letter-spacing="2"')));
  const body = [
    fade(0, text(L, 32, 'm acc', 14, '$') + text(66, 32, 'm ink', 14, 'whoami') +
      `<rect x="${66 + monoWidth('whoami ', 14)}" y="20" width="8" height="15" class="acc blink"/>`),
    ...rows,
    fade(0.65, text(L, 262, 's acc', 17, DATA.quote, 'font-style="italic"')),
    rule(L, 296, R, 0.4),
    ...stats,
  ];
  return svg(t, 390, 'Sobre Adryan Ryan', body.join('\n'));
}

function projectList(t, list, label) {
  const H = 124;
  const rows = list.map((p, i) => {
    const nn = String(i + 1).padStart(2, '0');
    const inner = [
      text(L, 24, 'm ink', 17, `${nn} / ${p.name}`, 'font-weight="700" letter-spacing=".8"'),
      text(R, 20, 'm mut', 10.5, p.kind, 'letter-spacing="2" text-anchor="end"'),
      ...p.copy.map((c, j) => text(L, 54 + j * 19, 'm ink2', 12.5, fits(c, L, 12.5))),
      text(L, 96, 'm mut', 10.5, fits(p.stack, L, 10.5, 1.2), 'letter-spacing="1.2"'),
      `<line class="rule" x1="${L}" y1="112" x2="${R}" y2="112"/>`,
    ].join('');
    return `<g class="fade" style="animation-delay:${0.05 + i * 0.08}s" transform="translate(0 ${10 + i * H})">${inner}</g>`;
  });
  return svg(t, 20 + list.length * H, label, rows.join('\n'));
}
const projects = (t) => projectList(t, DATA.projects, `${DATA.projects.length} projetos em destaque`);
const opensource = (t) => projectList(t, DATA.opensource, `${DATA.opensource.length} projetos de código aberto`);

function stackRow(y, items) {
  let x = 190;
  return items.split(' · ').map((raw, i) => {
    const main = raw.startsWith('*');
    const s = main ? raw.slice(1) : raw;
    const sep = i ? text(x - 22, y, 'm mut', 13, '·') : '';
    const out = sep + text(x, y, main ? 'm acc' : 'm ink', 13, fits(s, x, 13), main ? 'font-weight="700"' : '');
    x += monoWidth(s, 13) + 30;
    return out;
  }).join('');
}

function stack(t) {
  const rows = DATA.stack.map(([k, items], i) => {
    const y = 34 + i * 40;
    return fade(0.05 + i * 0.07, text(L, y, 'm mut', 11, k, 'letter-spacing="2"') + stackRow(y, items) +
      `<line class="rule" x1="${L}" y1="${y + 16}" x2="${R}" y2="${y + 16}"/>`);
  });
  const legend = fade(0.7, `<rect x="${L}" y="${24 + DATA.stack.length * 40}" width="9" height="9" class="acc"/>` +
    text(L + 16, 33 + DATA.stack.length * 40, 'm mut', 11, 'stack principal — onde tenho mais profundidade'));
  return svg(t, 50 + DATA.stack.length * 40, 'Stack técnica', rows.join('\n') + legend);
}

function certs(t) {
  const rows = DATA.certs.map(([date, name, issuer, isNew], i) => {
    const y = 30 + i * 36;
    const tag = isNew ? text(150 + monoWidth(name, 13) + 14, y, 'm acc', 11, '● NOVO', 'letter-spacing="1.5"') : '';
    return fade(0.05 + i * 0.07, text(L, y, 'm mut', 12, date) + text(150, y, 'm ink', 13, fits(name, 150, 13, 0, 700)) + tag +
      text(R, y, 'm mut', 10.5, issuer, 'letter-spacing="2" text-anchor="end"') +
      `<line class="rule" x1="${L}" y1="${y + 14}" x2="${R}" y2="${y + 14}"/>`);
  });
  return svg(t, 30 + DATA.certs.length * 36, 'Certificações', rows.join('\n'));
}

function timeline(t) {
  const step = 180, axisY = 96, last = DATA.timeline.length - 1;
  const cols = DATA.timeline.map(([year, lines], i) => {
    const x = L + i * step;
    const node = i === last
      ? `<circle cx="${x + 6}" cy="${axisY}" r="10" class="acc pulse" opacity=".35"/><circle cx="${x + 6}" cy="${axisY}" r="5" class="acc"/>`
      : `<circle cx="${x + 6}" cy="${axisY}" r="5" class="ink"/>`;
    const label = text(x, 68, i === last ? 's acc' : 's ink', 22, year, 'font-weight="700"');
    const body = lines.map((l, j) => text(x, 132 + j * 20, j ? 'm mut' : 'm ink', 11, fits(l, x, 11, 0, x + 172))).join('');
    return fade(0.3 + i * 0.15, label + node + body);
  });
  const now = fade(1.2, text(R, 68, 'm mut', 10.5, 'AGORA →', 'letter-spacing="2" text-anchor="end"'));
  return svg(t, 230, 'Trajetória de 2022 a 2026', [rule(L, axisY), ...cols, now].join('\n'));
}

function footer(t) {
  const rows = DATA.status.map(([k, v], i) => fade(0.2 + i * 0.1,
    text(L, 84 + i * 26, 'm mut', 13, `▸ ${k}`) + text(220, 84 + i * 26, 'm ink', 13, fits(v, 220, 13))));
  const body = [
    rule(L, 18),
    fade(0, text(L, 50, 'm acc', 14, '$') + text(66, 50, 'm ink', 14, 'status')),
    ...rows,
    fade(0.6, text(R - 14, 50, 'm mut', 10.5, `ATUALIZADO · ${DATA.updated.toUpperCase()}`, 'letter-spacing="2" text-anchor="end"') +
      `<rect x="${R - 8}" y="40" width="8" height="12" class="acc blink"/>`),
  ];
  return svg(t, 170, 'Status atual', body.join('\n'));
}

const SECTIONS = [['s01', '01', 'whoami'], ['s02', '02', 'projetos'], ['s03', '03', 'código aberto'], ['s04', '04', 'stack'],
  ['s05', '05', 'certificações'], ['s06', '06', 'trajetória'], ['s07', '07', 'atividade']];

for (const [name, t] of Object.entries(THEMES)) {
  const dir = new URL(`../assets/${name}/`, import.meta.url);
  mkdirSync(dir, { recursive: true });
  const files = { header, whoami, projects, opensource, stack, certs, timeline, footer };
  for (const [file, build] of Object.entries(files)) writeFileSync(new URL(`${file}.svg`, dir), build(t));
  for (const [file, n, title] of SECTIONS) writeFileSync(new URL(`${file}.svg`, dir), section(t, n, title));
}
console.log('SVGs gerados em assets/light e assets/dark');
