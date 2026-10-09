import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import virusImage from './assets/virus-covid.jpg';
import scientistImage from './assets/scientist-woman.jpg';
import sequencingImage from './assets/sequencing-machine.jpg';
import pipettingImage from './assets/pipetting-lab.jpg';
import dnaImage from './assets/dna-helix.jpg';
import labImage from './assets/laboratory-wide.jpg';
import {
  ArrowDown, ArrowRight, ArrowUpRight, Atom, BookOpen, Check, ChevronDown,
  CircleHelp, Dna, FlaskConical, Menu, Microscope, MoveUpRight, ScanLine,
  Sparkles, Wallet, X
} from 'lucide-react';

const navItems = [
  ['inicio', 'Início'], ['genoma', 'O sequenciamento'], ['mulheres', 'Mulheres na ciência'],
  ['financiamento', 'Financiamento'], ['cruzamento', 'Gênero + orçamento'], ['galeria', 'Galeria'], ['quiz', 'Quiz']
];

const quizQuestions = [
  {
    question: 'Por que sequenciar o genoma do SARS-CoV-2 foi importante?',
    options: [
      'Para conhecer informações genéticas do vírus e apoiar seu monitoramento',
      'Para eliminar o vírus imediatamente da população',
      'Para substituir todos os testes de diagnóstico',
      'Para provar que todos os casos tinham a mesma origem'
    ],
    answer: 0,
    explanation: 'O sequenciamento permite analisar o material genético do vírus, investigar sua diversidade e acompanhar mudanças e rotas de disseminação.'
  },
  {
    question: 'Qual foi o papel de Jaqueline Goes de Jesus e Ester Sabino no marco científico brasileiro?',
    options: [
      'Criaram sozinhas uma vacina contra a Covid-19',
      'Lideraram equipes ligadas ao sequenciamento do genoma viral no Brasil',
      'Descobriram o primeiro coronavírus da história',
      'Desenvolveram todos os testes usados no mundo'
    ],
    answer: 1,
    explanation: 'As pesquisadoras tiveram papéis centrais em equipes que sequenciaram o genoma do SARS-CoV-2 a partir dos primeiros casos brasileiros.'
  },
  {
    question: 'O que pode acontecer quando a pesquisa científica sofre cortes de orçamento?',
    options: [
      'Todas as pesquisas ficam mais rápidas',
      'Os laboratórios deixam de precisar de equipamentos',
      'Podem faltar bolsas, insumos, manutenção e recursos para continuar estudos',
      'A qualidade científica aumenta automaticamente'
    ],
    answer: 2,
    explanation: 'A pesquisa depende de pessoas, equipamentos, reagentes, infraestrutura e financiamento contínuo. A falta desses recursos pode atrasar ou interromper projetos.'
  },
  {
    question: 'Como a falta de recursos pode agravar desigualdades de gênero na ciência?',
    options: [
      'Afeta somente pesquisadores que já têm cargos de liderança',
      'Pode reduzir oportunidades de bolsas, redes de apoio e progressão profissional',
      'Elimina automaticamente diferenças de oportunidade',
      'Não tem relação possível com a carreira científica'
    ],
    answer: 1,
    explanation: 'Quando há poucos recursos, a competição por bolsas e oportunidades aumenta. Desigualdades já existentes, inclusive as ligadas ao gênero e às responsabilidades de cuidado, podem se intensificar.'
  },
  {
    question: 'Qual conclusão melhor resume a relação entre ciência e sociedade?',
    options: [
      'A ciência só importa durante emergências',
      'O talento individual torna o financiamento desnecessário',
      'Investimento contínuo ajuda a sustentar pesquisas, formar cientistas e responder a desafios coletivos',
      'A pesquisa científica não depende de colaboração'
    ],
    answer: 2,
    explanation: 'A ciência depende de colaboração, formação, infraestrutura e financiamento estável. Investir nela fortalece a capacidade de responder a problemas de saúde, ambiente e tecnologia.'
  }
];

function SectionLabel({ number, children }) {
  return <div className="section-label"><span>{number}</span><span>{children}</span></div>;
}

function Reveal({ children, className = '', delay = 0 }) {
  return <motion.div
    className={className}
    initial={{ opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.16 }}
    transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
  >{children}</motion.div>;
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const { scrollYProgress } = useScroll();
  const navBackground = useTransform(scrollYProgress, [0, 1], ['rgba(13,16,22,0.96)', 'rgba(13,16,22,0.96)']);
  const progress = useTransform(scrollYProgress, value => `${value * 100}%`);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('is-visible');
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.stagger-in').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const score = quizQuestions.reduce((total, question, index) => total + (answers[index] === question.answer ? 1 : 0), 0);
  const chooseAnswer = (questionIndex, optionIndex) => {
    if (submitted) return;
    setAnswers(previous => ({ ...previous, [questionIndex]: optionIndex }));
  };
  const submitQuiz = () => {
    if (Object.keys(answers).length !== quizQuestions.length) return;
    setSubmitted(true);
  };
  const resetQuiz = () => { setAnswers({}); setSubmitted(false); };

  return (
    <motion.main className="site-shell">
      <motion.div className="scroll-progress" style={{ width: progress }} />
      <motion.header className="topbar" style={{ backgroundColor: navBackground, borderColor: "rgba(255,255,255,.16)" }}>
        <a className="brand" href="#inicio" onClick={() => setMenuOpen(false)} aria-label="Ciência em Movimento, início">
          <span className="brand-mark"><Dna size={20} /></span>
          <span>CIÊNCIA<span className="brand-light">EM MOVIMENTO</span></span>
        </a>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}>
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
        <nav className={menuOpen ? 'nav-links open' : 'nav-links'}>
          {navItems.map(([id, label]) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{label}</a>)}
        </nav>
        <a className="top-cta" href="#quiz">Testar conhecimentos <ArrowUpRight size={15} /></a>
      </motion.header>

      <section id="inicio" className="hero section-pad">
        <div className="hero-grid">
          <div className="hero-copy">
            <motion.div className="eyebrow" initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .7 }}>
              <span className="live-dot" /> PESQUISA • EQUIDADE • FUTURO
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8, delay: .12 }}>
              A ciência<br />não pode <em>parar.</em>
            </motion.h1>
            <motion.p className="hero-intro" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8, delay: .24 }}>
              O que o sequenciamento do genoma da Covid-19 revela sobre a força da pesquisa brasileira — e sobre os desafios que ainda precisamos superar.
            </motion.p>
            <motion.div className="hero-actions" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .45 }}>
              <a className="button-primary" href="#genoma">Explorar a pesquisa <ArrowDown size={16} /></a>
              <span className="read-time"><BookOpen size={15} /> Leitura de 5 minutos</span>
            </motion.div>
          </div>
          <motion.div className="hero-art" initial={{ opacity: 0, scale: .94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.1, delay: .15 }}>
            <div className="art-orbit orbit-one" />
            <div className="art-orbit orbit-two" />
            <div className="art-orbit orbit-three" />
            <div className="dna-helix">
              {Array.from({ length: 17 }, (_, i) => <span key={i} className="dna-rung" style={{ '--i': i }}><i /><b /></span>)}
            </div>
            <div className="art-tag tag-top"><span>01 / 05</span><span>GENOMA VIRAL</span></div>
            <div className="art-tag tag-bottom"><Atom size={15} /> Ciência em movimento</div>
            <div className="art-cross cross-a">+</div><div className="art-cross cross-b">+</div>
          </motion.div>
        </div>
        <div className="hero-bottom">
          <span>UMA PESQUISA SOBRE CIÊNCIA E SOCIEDADE</span>
          <a href="#genoma">ROLE PARA DESCOBRIR <ArrowDown size={13} /></a>
        </div>
      </section>

      <section id="genoma" className="content-section section-pad">
        <Reveal><SectionLabel number="01">O MARCO CIENTÍFICO</SectionLabel></Reveal>
        <div className="two-col">
          <Reveal className="section-heading">
            <h2>48 horas.<br /><em>Uma descoberta</em><br />que abriu caminhos.</h2>
          </Reveal>
          <Reveal className="section-description" delay={.12}>
            <p className="lead">Em fevereiro de 2020, uma equipe brasileira sequenciou o genoma do SARS-CoV-2 identificado no primeiro caso confirmado de Covid-19 no Brasil.</p>
            <p>O trabalho foi realizado em cerca de 48 horas após a confirmação do caso, com participação de pesquisadoras da USP, do Instituto Adolfo Lutz e de outras instituições. A rapidez ajudou a comunidade científica a estudar o vírus desde o começo da epidemia no país.</p>
          </Reveal>
        </div>
        <div className="timeline">
          {[
            ['JAN–FEV 2020', 'Emergência global', 'O novo coronavírus se espalha e cientistas de vários países começam a investigar sua genética.'],
            ['26 FEV 2020', 'Primeiro caso no Brasil', 'O país confirma seu primeiro caso de Covid-19, em São Paulo.'],
            ['48 HORAS', 'Sequenciamento rápido', 'A equipe analisa o material genético viral e disponibiliza dados para a pesquisa internacional.']
          ].map(([time, title, desc], i) => <Reveal key={title} className="timeline-item stagger-in" delay={i * .08}>
            <span className="timeline-time">{time}</span><span className="timeline-dot" /><div><h3>{title}</h3><p>{desc}</p></div>
          </Reveal>)}
        </div>
        <div className="fact-strip">
          <div className="fact-icon"><FlaskConical size={23} /></div>
          <div><strong>O que é sequenciar um genoma?</strong><p>É determinar a ordem das unidades que compõem o material genético. No caso do SARS-CoV-2, o genoma é formado por RNA, e sua análise ajuda a comparar amostras e acompanhar mudanças no vírus.</p></div>
        </div>
        <div className="method-grid">
          <Reveal className="method-card"><span className="card-index">A / TECNOLOGIA</span><Microscope size={24} /><h3>Sequenciamento portátil</h3><p>A equipe usou a tecnologia MinION, um sequenciador compacto que permite ler fragmentos de material genético em tempo real.</p></Reveal>
          <Reveal className="method-card" delay={.1}><span className="card-index">B / ANÁLISE</span><Dna size={24} /><h3>Comparar as sequências</h3><p>Os dados genéticos podem ser comparados com outras amostras para investigar relações entre vírus e apoiar estudos sobre sua disseminação.</p></Reveal>
          <Reveal className="method-card" delay={.2}><span className="card-index">C / IMPACTO</span><ArrowUpRight size={24} /><h3>Dados que circulam</h3><p>Compartilhar sequências contribui para a vigilância genômica e para o estudo de variantes. O sequenciamento, sozinho, não elimina o vírus nem substitui testes diagnósticos.</p></Reveal>
        </div>
      </section>

      <section id="mulheres" className="content-section section-pad">
        <Reveal><SectionLabel number="02">QUEM FAZ A CIÊNCIA</SectionLabel></Reveal>
        <div className="two-col">
          <Reveal className="section-heading"><h2>Conhecimento<br />também é <em>representatividade.</em></h2></Reveal>
          <Reveal className="section-description" delay={.12}>
            <p className="lead">Jaqueline Goes de Jesus e Ester Sabino foram protagonistas de uma conquista científica que colocou pesquisadoras brasileiras em destaque.</p>
            <p>Jaqueline Goes de Jesus é biomédica e pesquisadora; Ester Sabino é médica e pesquisadora. Ambas estiveram ligadas à liderança de equipes envolvidas no sequenciamento do genoma do SARS-CoV-2 no Brasil. O trabalho foi coletivo e contou com profissionais de diferentes áreas.</p>
          </Reveal>
        </div>
        <div className="people-grid">
          <Reveal className="person-card">
            <div className="person-number">01</div><div className="person-art person-art-one"><Dna size={72} strokeWidth={1} /><span>GENÔMICA</span></div>
            <div className="person-meta"><span>PESQUISADORA BRASILEIRA</span><ArrowUpRight size={16}/></div>
            <h3>Jaqueline Goes<br />de Jesus</h3>
            <p>Biomédica e pesquisadora, teve papel de destaque no trabalho de sequenciamento e na comunicação pública sobre ciência. Sua trajetória também amplia a visibilidade de mulheres negras na pesquisa científica.</p>
          </Reveal>
          <Reveal className="person-card" delay={.12}>
            <div className="person-number">02</div><div className="person-art person-art-two"><Microscope size={72} strokeWidth={1} /><span>EPIDEMIOLOGIA</span></div>
            <div className="person-meta"><span>PESQUISADORA BRASILEIRA</span><ArrowUpRight size={16}/></div>
            <h3>Ester<br />Sabino</h3>
            <p>Médica e pesquisadora, contribuiu para a coordenação de pesquisas e para o trabalho científico que ajudou a analisar o genoma do vírus no início da pandemia.</p>
          </Reveal>
        </div>
        <div className="insight-row">
          <Sparkles size={22} />
          <p><strong>Por que a representatividade importa?</strong> Ver pessoas de diferentes origens em posições de destaque amplia referências para novas gerações e ajuda a mostrar que a ciência depende de talentos diversos.</p>
        </div>
        <div className="barrier-block">
          <h3>Os obstáculos não desaparecem com uma conquista.</h3>
          <div className="barrier-list">
            <div><span>01</span><p><strong>Visibilidade desigual</strong><br />Mulheres podem receber menos reconhecimento e espaço de liderança em determinados contextos acadêmicos.</p></div>
            <div><span>02</span><p><strong>Progressão na carreira</strong><br />Acesso a cargos, financiamento, redes profissionais e oportunidades pode não ser distribuído igualmente.</p></div>
            <div><span>03</span><p><strong>Responsabilidades de cuidado</strong><br />A divisão desigual do trabalho doméstico e de cuidado pode afetar tempo disponível e continuidade da carreira.</p></div>
          </div>
        </div>
      </section>

      <section id="financiamento" className="content-section section-pad">
        <Reveal><SectionLabel number="03">O QUE SUSTENTA A PESQUISA</SectionLabel></Reveal>
        <div className="two-col">
          <Reveal className="section-heading"><h2>Sem recursos,<br />a ciência perde<br /><em>fôlego.</em></h2></Reveal>
          <Reveal className="section-description" delay={.12}>
            <p className="lead">Descobertas dependem de pessoas preparadas, equipamentos, laboratórios, insumos e tempo de pesquisa.</p>
            <p>No Brasil, o financiamento científico envolve diferentes fontes, como orçamento público, agências federais e estaduais de fomento, universidades e parcerias. Bolsas ajudam a formar pesquisadores; verbas de custeio mantêm laboratórios e projetos em funcionamento.</p>
            <p>Quando recursos são reduzidos ou liberados de forma irregular, projetos podem atrasar, equipamentos deixam de ser atualizados e jovens pesquisadores podem ter mais dificuldade para permanecer na carreira.</p>
          </Reveal>
        </div>
        <div className="funding-visual">
          <div className="funding-top"><span>O ECOSSISTEMA DA PESQUISA</span><Wallet size={20}/></div>
          <div className="funding-flow">
            <div className="flow-node"><BookOpen size={22}/><strong>Formação</strong><span>Bolsas e orientação</span></div>
            <div className="flow-arrow"><ArrowRight size={20}/></div>
            <div className="flow-node"><FlaskConical size={22}/><strong>Infraestrutura</strong><span>Laboratórios e insumos</span></div>
            <div className="flow-arrow"><ArrowRight size={20}/></div>
            <div className="flow-node"><Atom size={22}/><strong>Resultados</strong><span>Conhecimento e inovação</span></div>
          </div>
          <p className="funding-caption">Financiamento estável conecta a formação de pessoas à produção de conhecimento útil para a sociedade.</p>
        </div>
        <div className="resource-grid">
          <Reveal className="resource-card"><span className="resource-tag">01 / PESSOAS</span><h3>Bolsas e salários</h3><p>Permitem que estudantes e pesquisadores dediquem tempo à formação, à coleta de dados e à análise dos resultados.</p></Reveal>
          <Reveal className="resource-card" delay={.08}><span className="resource-tag">02 / ESTRUTURA</span><h3>Laboratórios e tecnologia</h3><p>Equipamentos, reagentes, manutenção e acesso a ferramentas são essenciais para realizar experimentos confiáveis.</p></Reveal>
          <Reveal className="resource-card" delay={.16}><span className="resource-tag">03 / CONTINUIDADE</span><h3>Planejamento de longo prazo</h3><p>Pesquisa de qualidade exige tempo. Instabilidade financeira pode interromper projetos e dificultar a formação de equipes.</p></Reveal>
        </div>
      </section>

      <section id="cruzamento" className="content-section section-pad">
        <Reveal><SectionLabel number="04">O CRUZAMENTO CRÍTICO</SectionLabel></Reveal>
        <div className="cross-heading">
          <Reveal><h2>Quando falta investimento,<br /><em>quem fica para trás?</em></h2></Reveal>
          <Reveal delay={.1}><p>O orçamento e a desigualdade de gênero não são assuntos isolados. A falta de recursos pode intensificar barreiras que já dificultam a entrada, a permanência e a liderança de mulheres na ciência.</p></Reveal>
        </div>
        <div className="intersection">
          <div className="intersection-circle circle-budget"><Wallet size={26}/><h3>Menos<br />recursos</h3><p>Menos bolsas, equipamentos e oportunidades.</p></div>
          <div className="intersection-symbol">+</div>
          <div className="intersection-circle circle-gender"><Sparkles size={26}/><h3>Barreiras<br />de gênero</h3><p>Desigualdade de reconhecimento, tempo e acesso.</p></div>
          <div className="intersection-result"><ArrowDown size={24}/><strong>Risco de ampliar desigualdades</strong><span>Menos condições para produzir, permanecer e assumir posições de liderança.</span></div>
        </div>
        <div className="two-col closing-analysis">
          <Reveal className="section-heading"><h3>Talento precisa de<br /><em>condições reais.</em></h3></Reveal>
          <Reveal className="section-description"><p>Não é correto afirmar que toda mulher enfrenta os mesmos obstáculos ou que todo corte afeta todos os grupos da mesma forma. Porém, quando as oportunidades já são desiguais, a escassez de recursos pode pesar mais sobre quem tem menos redes de apoio, estabilidade ou acesso a financiamento.</p><p>Ampliar a transparência na distribuição de recursos, apoiar a formação e promover condições justas de progressão são caminhos para uma ciência mais diversa e forte.</p></Reveal>
        </div>
      </section>

      <section id="conclusao" className="conclusion-section section-pad">
        <Reveal><SectionLabel number="05">CIÊNCIA E SOCIEDADE</SectionLabel></Reveal>
        <Reveal className="conclusion-copy">
          <h2>Uma descoberta é um começo.<br /><em>Investir é permitir o próximo passo.</em></h2>
          <p>O sequenciamento do genoma do SARS-CoV-2 mostrou a capacidade de colaboração e resposta rápida da ciência brasileira. O protagonismo de pesquisadoras como Jaqueline Goes de Jesus e Ester Sabino também evidencia a importância de reconhecer talentos diversos. Para que novas descobertas aconteçam, o país precisa de financiamento contínuo, infraestrutura e oportunidades justas para quem pesquisa.</p>
          <div className="conclusion-points">
            <div><Check size={18}/><span>Valorizar quem produz conhecimento.</span></div>
            <div><Check size={18}/><span>Garantir recursos para pesquisa e formação.</span></div>
            <div><Check size={18}/><span>Construir oportunidades mais equitativas.</span></div>
          </div>
        </Reveal>
      </section>

      <section id="quiz" className="quiz-section section-pad">
        <Reveal><SectionLabel number="06">DESAFIO FINAL</SectionLabel></Reveal>
        <div className="quiz-intro">
          <Reveal><h2>O que ficou<br /><em>na sua cabeça?</em></h2></Reveal>
          <Reveal delay={.1}><p>Responda às cinco perguntas para revisar as ideias principais da pesquisa. O resultado aparece no final.</p></Reveal>
        </div>
        <div className="quiz-card">
          <div className="quiz-card-head"><span><CircleHelp size={18}/> QUIZ CIENTÍFICO</span><span>{Object.keys(answers).length} / {quizQuestions.length} RESPONDIDAS</span></div>
          <div className="quiz-progress"><div style={{ width: `${Object.keys(answers).length / quizQuestions.length * 100}%` }} /></div>
          {quizQuestions.map((question, qi) => (
            <div className="quiz-question" key={question.question}>
              <div className="question-number">PERGUNTA {String(qi + 1).padStart(2, '0')}</div>
              <h3>{question.question}</h3>
              <div className="answer-list">
                {question.options.map((option, oi) => {
                  const selected = answers[qi] === oi;
                  const isCorrect = submitted && question.answer === oi;
                  const isWrongSelected = submitted && selected && question.answer !== oi;
                  return <button key={option} className={`answer-option ${selected ? 'selected' : ''} ${isCorrect ? 'correct' : ''} ${isWrongSelected ? 'wrong' : ''}`} onClick={() => chooseAnswer(qi, oi)} disabled={submitted}>
                    <span className="answer-letter">{String.fromCharCode(65 + oi)}</span><span>{option}</span>
                    {isCorrect && <Check size={17}/>}
                  </button>;
                })}
              </div>
              {submitted && <div className="answer-explanation"><strong>{answers[qi] === question.answer ? 'Você acertou.' : 'Vamos aprender:'}</strong> {question.explanation}</div>}
            </div>
          ))}
          {!submitted ? <button className="button-primary quiz-submit" onClick={submitQuiz} disabled={Object.keys(answers).length !== quizQuestions.length}>Ver meu resultado <ArrowRight size={17}/></button> :
            <div className="quiz-result"><span className="result-kicker">SEU RESULTADO</span><strong>{score}<small> / {quizQuestions.length}</small></strong><h3>{score === 5 ? 'Excelente! Você mandou muito bem.' : score >= 3 ? 'Bom trabalho! Você já pegou as ideias centrais.' : 'Continue explorando. Ciência é aprender sempre.'}</h3><p>Revise as explicações acima e compartilhe o que aprendeu com alguém.</p><button className="button-secondary" onClick={resetQuiz}>Refazer quiz <ArrowRight size={16}/></button></div>
          }
        </div>
      </section>

      <section id="galeria" className="gallery-section section-pad">
        <Reveal><SectionLabel number="GALERIA VISUAL">A CIÊNCIA EM IMAGENS</SectionLabel></Reveal>
        <Reveal className="gallery-intro">
          <h2>Por trás de cada descoberta,<br /><em>tem gente, pesquisa e evidência.</em></h2>
          <p>Uma seleção de imagens para aproximar você das pesquisadoras, do sequenciamento genético e dos espaços onde a ciência acontece.</p>
        </Reveal>


        <div className="image-gallery">
          <a className="gallery-card gallery-card-tall" href="https://commons.wikimedia.org/wiki/File:18_08_2023_-_Z%C3%A9_Gotinha_e_cientista_Jaqueline_Goes_de_Jesus_visitam_MCTI_(53124595267).jpg" target="_blank" rel="noreferrer">
            <img src="https://upload.wikimedia.org/wikipedia/commons/9/95/18_08_2023_-_Z%C3%A9_Gotinha_e_cientista_Jaqueline_Goes_de_Jesus_visitam_MCTI_%2853124595267%29.jpg" alt="Fotografia de Jaqueline Goes de Jesus em evento do Ministério da Ciência, Tecnologia e Inovação" loading="lazy" referrerPolicy="no-referrer" />
            <span className="gallery-caption"><small>01 / PESQUISADORAS</small><strong>Jaqueline Goes de Jesus</strong><em>Biomédica e pesquisadora brasileira</em></span>
          </a>
          <a className="gallery-card" href="https://commons.wikimedia.org/wiki/File:ENTREGA_DO_PR%C3%8AMIO_ESTER_SABINO_2022_(51875382473)_(cropped).jpg" target="_blank" rel="noreferrer">
            <img src="https://thumb.wikimedia.org/wikipedia/commons/thumb/3/39/ENTREGA_DO_PR%C3%8AMIO_ESTER_SABINO_2022_%2851875382473%29_%28cropped%29.jpg/1280px-ENTREGA_DO_PR%C3%8AMIO_ESTER_SABINO_2022_%2851875382473%29_%28cropped%29.jpg" alt="Fotografia de Ester Sabino em evento científico" loading="lazy" referrerPolicy="no-referrer" />
            <span className="gallery-caption"><small>02 / PESQUISADORAS</small><strong>Ester Sabino</strong><em>Pesquisadora da Universidade de São Paulo</em></span>
          </a>
          <div className="gallery-card">
            <img src={virusImage} alt="Representação visual do coronavírus SARS-CoV-2" loading="lazy" />
            <span className="gallery-caption"><small>03 / VIROLOGIA</small><strong>O SARS-CoV-2</strong><em>Imagem ilustrativa para representar o vírus causador da COVID-19</em></span>
          </div>
          <div className="gallery-card">
            <img src={sequencingImage} alt="Equipamento de laboratório usado em análise genética, em imagem ilustrativa" loading="lazy" />
            <span className="gallery-caption"><small>04 / GENÉTICA</small><strong>Sequenciamento</strong><em>Equipamentos ajudam a ler e comparar material genético</em></span>
          </div>
          <div className="gallery-card">
            <img src={scientistImage} alt="Imagem ilustrativa de uma cientista trabalhando com amostras no laboratório" loading="lazy" />
            <span className="gallery-caption"><small>05 / REPRESENTATIVIDADE</small><strong>Mulheres na ciência</strong><em>Pesquisa, colaboração e novas descobertas</em></span>
          </div>
          <div className="gallery-card">
            <img src={labImage} alt="Imagem ilustrativa de um laboratório de pesquisa" loading="lazy" />
            <span className="gallery-caption"><small>06 / INFRAESTRUTURA</small><strong>Onde a ciência acontece</strong><em>Laboratórios dependem de equipamentos, manutenção e investimento</em></span>
          </div>
          <div className="gallery-card">
            <img src={pipettingImage} alt="Imagem ilustrativa de uma etapa de trabalho de laboratório com micropipeta" loading="lazy" />
            <span className="gallery-caption"><small>07 / NA PRÁTICA</small><strong>A bancada de pesquisa</strong><em>O trabalho científico exige técnica, cuidado e colaboração</em></span>
          </div>
          <div className="gallery-card gallery-card-wide">
            <img src={dnaImage} alt="Imagem ilustrativa de uma dupla hélice de DNA" loading="lazy" />
            <span className="gallery-caption"><small>08 / CÓDIGO DA VIDA</small><strong>Genética em foco</strong><em>O material genético guarda informações que podem ser estudadas e comparadas</em></span>
          </div>
        </div>
        <p className="gallery-credit-note">As fotos de Jaqueline Goes de Jesus e Ester Sabino são fotografias reais com crédito nas páginas de origem. As demais são imagens ilustrativas criadas para este projeto e não retratam um experimento específico.</p>
      </section>

      <section className="references-section section-pad">
        <Reveal><SectionLabel number="FONTES E NOTAS">PARA IR ALÉM</SectionLabel></Reveal>
        <Reveal className="references-copy">
          <h2>Ciência boa também é<br /><em>ciência verificável.</em></h2>
          <p>Este material é uma introdução resumida. Para aprofundar, consulte as fontes institucionais abaixo e confira os detalhes metodológicos e históricos.</p>
          <div className="reference-links">
            <a href="https://www.nature.com/articles/s41591-020-0820-9" target="_blank" rel="noreferrer"><span>01</span><div><strong>Nature Medicine</strong><small>Genomic characterisation of the 2019 novel coronavirus in the first COVID-19 patient in Brazil</small></div><MoveUpRight size={17}/></a>
            <a href="https://www.butantan.gov.br/" target="_blank" rel="noreferrer"><span>02</span><div><strong>Instituto Butantan</strong><small>Conteúdos sobre ciência, vacinas e saúde pública</small></div><MoveUpRight size={17}/></a>
            <a href="https://www.gov.br/cnpq/pt-br" target="_blank" rel="noreferrer"><span>03</span><div><strong>CNPq</strong><small>Informações sobre fomento e formação científica no Brasil</small></div><MoveUpRight size={17}/></a>
            <a href="https://www.gov.br/capes/pt-br" target="_blank" rel="noreferrer"><span>04</span><div><strong>CAPES</strong><small>Bolsas e apoio à pós-graduação</small></div><MoveUpRight size={17}/></a>
          </div>
        </Reveal>
        <footer className="footer footer-redesign">
          <div className="footer-topline"><span>CIÊNCIA EM MOVIMENTO</span><span>FEIRA DE CIÊNCIAS • 2026</span></div>
          <div className="footer-credit">Israel dos Santos Sales · Turma 2J</div>
          <div className="footer-bottomline"><span>CONHECIMENTO É REVOLUÇÃO.</span><a href="#inicio">VOLTAR AO TOPO ↑</a></div>
        </footer>
      </section>
    </motion.main>
  );
}

export default App;
