const app = document.getElementById('app');
let lang = localStorage.getItem('mbtiLang');
let userName = localStorage.getItem('mbtiName') || '';


const descriptions = {
  INTJ: {
    en: "Strategic and analytical. Enjoys planning for long-term goals.",
    kr: "전략적이고 분석적이며 장기 목표를 계획하는 것을 즐깁니다."
  },
  INTP: {
    en: "Innovative thinker who loves solving complex problems.",
    kr: "복잡한 문제 해결을 좋아하는 혁신적인 사색가입니다."
  },
  ENTJ: {
    en: "Confident leader who organizes people and projects.",
    kr: "사람과 프로젝트를 정리하는 자신감 있는 리더입니다."
  },
  ENTP: {
    en: "Curious and clever. Thrives on exploring new ideas.",
    kr: "새로운 아이디어 탐구에 열정적인 호기심 많은 사람입니다."
  },
  INFJ: {
    en: "Insightful and compassionate. Seeks meaning in connections.",
    kr: "통찰력 있고 따뜻하며 관계에서 의미를 찾습니다."
  },
  INFP: {
    en: "Idealistic and empathetic. Values personal authenticity.",
    kr: "이상적이고 공감 능력이 뛰어나며 개인의 진정성을 중시합니다."
  },
  ENFJ: {
    en: "Charismatic and supportive. Inspires others to grow.",
    kr: "카리스마 있고 배려심이 많아 다른 사람의 성장을 이끕니다."
  },
  ENFP: {
    en: "Energetic and imaginative. Finds possibilities everywhere.",
    kr: "활기차고 상상력이 풍부하며 어디서든 가능성을 찾습니다."
  },
  ISTJ: {
    en: "Reliable and practical. Prefers clear structures.",
    kr: "신뢰할 수 있고 현실적이며 명확한 구조를 선호합니다."
  },
  ISFJ: {
    en: "Caring and meticulous. Enjoys helping others quietly.",
    kr: "배려심 많고 꼼꼼하며 조용히 남을 돕는 것을 좋아합니다."
  },
  ESTJ: {
    en: "Efficient organizer who likes order and tradition.",
    kr: "효율적인 조직가로 질서와 전통을 중시합니다."
  },
  ESFJ: {
    en: "Friendly and cooperative. Values harmony in groups.",
    kr: "친절하고 협동적이며 집단의 조화를 중요하게 생각합니다."
  },
  ISTP: {
    en: "Adaptable problem solver who likes hands-on tasks.",
    kr: "융통성 있는 문제 해결사로 직접 하는 일을 좋아합니다."
  },
  ISFP: {
    en: "Sensitive and artistic. Lives in the present moment.",
    kr: "섬세하고 예술적이며 현재 순간을 즐깁니다."
  },
  ESTP: {
    en: "Action-oriented and resourceful. Loves immediate results.",
    kr: "행동 지향적이고 수완이 좋으며 즉각적인 결과를 좋아합니다."
  },
  ESFP: {
    en: "Enthusiastic and playful. Enjoys living life to the fullest.",
    kr: "열정적이고 장난기 많으며 인생을 즐겁게 살아갑니다."
  }
};

function renderLanguageSelection() {
  app.innerHTML = `
    <h2>Select Language</h2>
    <button class="btn" onclick="setLanguage('en')">English</button>
    <button class="btn" onclick="setLanguage('kr')">한국어</button>
  `;
}

function setLanguage(l) {
  lang = l;
  localStorage.setItem('mbtiLang', l);
  renderNameEntry();
}

function renderNameEntry() {
  const label = lang === 'en' ? 'Enter your name' : '이름을 입력하세요';
  const start = lang === 'en' ? 'Start Test' : '테스트 시작';
  app.innerHTML = `
    <h2>${label}</h2>
    <input id="nameInput" type="text" value="${userName}" />
    <br>
    <button class="btn" onclick="saveName()">${start}</button>
  `;
}

function saveName() {
  const input = document.getElementById('nameInput');
  userName = input.value.trim() || (lang === 'en' ? 'Guest' : '손님');
  localStorage.setItem('mbtiName', userName);
  startTest();
}

let current = 0;
const scores = {E:0,I:0,S:0,N:0,T:0,F:0,J:0,P:0};

function startTest() {
  current = 0;
  for (let key in scores) scores[key] = 0;
  showQuestion();
}

function showQuestion() {
  if (current >= questions.length) {
    showResult();
    return;
  }
  const q = questions[current];
  const opts = q.options[lang];
  app.innerHTML = `
    <div class="progress">${current + 1} / ${questions.length}</div>
    <div class="options">
      <button class="btn" onclick="answer(0)">${opts[0]}</button>
      <button class="btn" onclick="answer(1)">${opts[1]}</button>
    </div>
  `;
}

function answer(index) {
  const letter = questions[current].letters[index];
  scores[letter]++;
  current++;
  showQuestion();
}

function showResult() {
  const type = `${scores['I']>scores['E']?'I':'E'}${scores['S']>scores['N']?'S':'N'}${scores['T']>scores['F']?'T':'F'}${scores['J']>scores['P']?'J':'P'}`;
  const desc = descriptions[type][lang];
  const greet = lang === 'en' ? 'Hi' : '안녕하세요';
  const title = lang === 'en' ? 'Your MBTI type is' : '당신의 MBTI 유형은';
  app.innerHTML = `
    <div class="result">
      <h2>${greet} ${userName}! ${title} ${type}</h2>
      <p>${desc}</p>
      <button class="btn" onclick="window.print()">Print</button>
    </div>
  `;
}

if (!lang) {
  renderLanguageSelection();
} else if (!userName) {
  renderNameEntry();
} else {
  startTest();
}