const courseSelect = document.querySelector("[data-course-select]");
const semesterSelect = document.querySelector("[data-semester-select]");
const semesterField = document.querySelector("[data-semester-field]");
const summary = document.querySelector("[data-calendar-summary]");
const scheduleSection = document.querySelector("[data-schedule-section]");
const scheduleBadge = document.querySelector("[data-schedule-badge]");
const scheduleTitle = document.querySelector("[data-schedule-title]");
const scheduleDescription = document.querySelector("[data-schedule-description]");
const scheduleBody = document.querySelector("[data-schedule-body]");

const days = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta"];
const rooms = ["Sala 01", "Sala 03", "Sala 06", "Sala 10", "Sala 11", "Laboratórios"];

const courses = {
  analise: {
    name: "Análise de Sistemas",
    short: "ADS",
    base: [
      ["Algoritmos", "Arquitetura de Computadores", "Matemática Aplicada", "Comunicação Técnica", "Administração"],
      ["Banco de Dados I", "Engenharia de Software", "Programação Web I", "Estatística", "Linguagem de Programação"],
      ["Banco de Dados II", "Programação Web II", "Estruturas de Dados", "Redes de Computadores", "Projeto Integrador"],
      ["Desenvolvimento Mobile", "Sistemas Operacionais", "Interface Humano-Computador", "Segurança da Informação", "Empreendedorismo"],
      ["Qualidade de Software", "Computação em Nuvem", "Gestão de Projetos", "Inteligência Artificial", "Projeto Aplicado"],
      ["Estágio Supervisionado", "Tópicos Avançados", "Governança de TI", "Trabalho de Conclusão", "Ética Profissional"]
    ]
  },
  turismo: {
    name: "Turismo",
    short: "TUR",
    base: [
      ["Fundamentos do Turismo", "Hospitalidade", "Geografia do Turismo", "Comunicação", "História Regional"],
      ["Agenciamento", "Eventos", "Inglês Aplicado", "Patrimônio Cultural", "Meios de Hospedagem"],
      ["Roteiros Turísticos", "Marketing Turístico", "Alimentos e Bebidas", "Sustentabilidade", "Projeto Integrador"],
      ["Planejamento Turístico", "Gestão de Eventos", "Espanhol Aplicado", "Turismo Rural", "Empreendedorismo"],
      ["Políticas Públicas", "Consultoria em Turismo", "Gestão Financeira", "Pesquisa de Mercado", "Práticas Profissionais"],
      ["Estágio Supervisionado", "Tópicos em Turismo", "Trabalho de Conclusão", "Ética Profissional", "Projetos Turísticos"]
    ]
  },
  matematica: {
    name: "Matemática",
    short: "MAT",
    base: [
      ["Fundamentos de Matemática", "Geometria Plana", "Leitura e Produção", "Educação e Sociedade", "Informática"],
      ["Cálculo I", "Álgebra Linear", "Geometria Espacial", "Didática", "Psicologia da Educação"],
      ["Cálculo II", "Teoria dos Números", "Estatística", "Metodologia de Ensino", "Projeto Integrador"],
      ["Equações Diferenciais", "Álgebra Moderna", "Física Geral", "Avaliação Educacional", "Prática de Ensino"],
      ["Análise Real", "História da Matemática", "Modelagem Matemática", "Estágio I", "Pesquisa em Educação"],
      ["Educação Inclusiva", "Tecnologias no Ensino", "Estágio II", "Trabalho de Conclusão", "Seminários"]
    ]
  },
  pedagogia: {
    name: "Pedagogia",
    short: "PED",
    base: [
      ["História da Educação", "Sociologia da Educação", "Leitura e Escrita", "Psicologia", "Arte e Educação"],
      ["Didática", "Currículo", "Educação Infantil", "Políticas Educacionais", "Libras"],
      ["Alfabetização", "Gestão Escolar", "Educação Inclusiva", "Metodologia de Pesquisa", "Projeto Integrador"],
      ["Ensino de Matemática", "Ensino de Ciências", "Ensino de História", "Avaliação", "Prática Pedagógica"],
      ["Educação de Jovens e Adultos", "Tecnologias Educacionais", "Estágio I", "Coordenação Pedagógica", "Pesquisa em Educação"],
      ["Estágio II", "Trabalho de Conclusão", "Ética Docente", "Seminários", "Projetos Educacionais"]
    ]
  },
  edificacoes: {
    name: "Edificações",
    short: "EDI",
    base: [
      ["Desenho Técnico", "Materiais de Construção", "Matemática Aplicada", "Informática", "Segurança do Trabalho"],
      ["Topografia", "Sistemas Construtivos", "Instalações Prediais", "Física Aplicada", "Projeto Arquitetônico"],
      ["Estruturas", "Orçamento de Obras", "Planejamento", "Desenho Assistido", "Projeto Integrador"],
      ["Concreto Armado", "Fundações", "Hidráulica", "Elétrica Predial", "Gestão de Obras"],
      ["Patologia das Construções", "Sustentabilidade", "Compatibilização", "Empreendedorismo", "Práticas de Campo"],
      ["Estágio Supervisionado", "Trabalho de Conclusão", "Legislação", "Tópicos Técnicos", "Projeto Executivo"]
    ]
  }
};

const teachers = ["Aline", "Augusto", "Carla", "Edvando", "Karin", "Josivan", "Paulo", "Renata"];

const getRoom = (subject, index, semester) => {
  const lowerSubject = subject.toLowerCase();

  if (lowerSubject.includes("laboratório") || lowerSubject.includes("programação") || lowerSubject.includes("desenho assistido") || lowerSubject.includes("informática")) {
    return "Laboratórios";
  }

  if (lowerSubject.includes("biblioteca") || lowerSubject.includes("pesquisa") || lowerSubject.includes("tcc") || lowerSubject.includes("trabalho de conclusão")) {
    return "Biblioteca";
  }

  if (lowerSubject.includes("estágio") || lowerSubject.includes("secretaria") || lowerSubject.includes("coordenação")) {
    return "Secretaria";
  }

  return rooms[(index + Number(semester)) % rooms.length];
};

const makeClass = (course, semester, subjectIndex, shift) => {
  const subjects = course.base[Number(semester) - 1];
  const subject = subjects[(subjectIndex + shift) % subjects.length];

  return {
    code: `${course.short}${semester}0${subjectIndex + shift + 1}`,
    subject,
    teacher: teachers[(subjectIndex + shift + Number(semester)) % teachers.length],
    room: getRoom(subject, subjectIndex + shift, semester)
  };
};

const makeSchedule = (course, semester) => {
  return days.map((day, index) => ({
    day,
    first: makeClass(course, semester, index, 0),
    second: makeClass(course, semester, index, 2)
  }));
};

const roomLink = (room) => {
  const urlRoom = encodeURIComponent(room);

  return `
    <span class="room-link-wrap">
      <a class="room-link" href="index3.html?local=${urlRoom}" title="Abrir ${room} no mapa">${room}</a>
      <span class="room-popover" aria-hidden="true">Abrir no mapa</span>
    </span>
  `;
};

const classMarkup = (classItem) => `
  <div class="class-block">
    <strong>${classItem.subject}</strong>
    <span>${classItem.code}</span>
    <span>Prof. ${classItem.teacher}</span>
    ${roomLink(classItem.room)}
  </div>
`;

const resetSchedule = () => {
  scheduleSection.hidden = true;
  scheduleBody.innerHTML = "";
  summary.innerHTML = `
    <span class="status-pill">Aguardando</span>
    <h2>Selecione um curso</h2>
    <p>Depois de escolher curso e semestre, o cronograma aparece aqui com as aulas da semana.</p>
  `;
};

const renderSchedule = () => {
  const courseKey = courseSelect.value;
  const semester = semesterSelect.value;

  if (!courseKey) {
    semesterField.hidden = true;
    semesterSelect.value = "";
    resetSchedule();
    return;
  }

  semesterField.hidden = false;
  const course = courses[courseKey];

  summary.innerHTML = `
    <span class="status-pill">Curso selecionado</span>
    <h2>${course.name}</h2>
    <p>Agora escolha o semestre para carregar a grade semanal correspondente.</p>
  `;

  if (!semester) {
    scheduleSection.hidden = true;
    scheduleBody.innerHTML = "";
    return;
  }

  const schedule = makeSchedule(course, semester);

  scheduleBody.innerHTML = schedule.map((item) => `
    <tr>
      <th>${item.day}</th>
      <td>${classMarkup(item.first)}</td>
      <td>${classMarkup(item.second)}</td>
    </tr>
  `).join("");

  scheduleBadge.textContent = `${course.short} - ${semester}º semestre`;
  scheduleTitle.textContent = `${course.name}: ${semester}º semestre`;
  scheduleDescription.textContent = "Passe o mouse pelo local da aula para acessar o atalho do mapa do campus.";
  scheduleSection.hidden = false;

  summary.innerHTML = `
    <span class="status-pill">Cronograma pronto</span>
    <h2>${course.name}</h2>
    <p>${semester}º semestre carregado com aulas de segunda a sexta e atalhos para localização.</p>
  `;
};

if (courseSelect && semesterSelect) {
  courseSelect.addEventListener("change", renderSchedule);
  semesterSelect.addEventListener("change", renderSchedule);
}
