const app = document.getElementById('app');
let lang = localStorage.getItem('mbtiLang');

const questions = [
  // I/E questions
  {
    options: {en: ["You feel energized after social events.", "You need quiet time to recharge."],
              kr: ["당신은 사회적 행사 후에 에너지가 충전됩니다.", "당신은 재충전을 위해 조용한 시간이 필요합니다."]},
    letters: ['E','I']
  },
  {
    options: {en: ["You start conversations with strangers easily.", "You wait for others to begin conversations."],
              kr: ["당신은 낯선 사람과 쉽게 대화를 시작합니다.", "당신은 다른 사람이 먼저 말을 걸 때까지 기다립니다."]},
    letters: ['E','I']
  },
  {
    options: {en: ["You enjoy being in large groups.", "You prefer small gatherings or solitude."],
              kr: ["당신은 큰 모임을 즐깁니다.", "당신은 소규모 모임이나 혼자 있는 것을 선호합니다."]},
    letters: ['E','I']
  },
  {
    options: {en: ["You speak your thoughts as they come.", "You think carefully before speaking."],
              kr: ["생각나는 대로 말을 합니다.", "말하기 전에 신중히 생각합니다."]},
    letters: ['E','I']
  },
  {
    options: {en: ["You like participating in group activities.", "You like solitary hobbies."],
              kr: ["단체 활동에 참여하는 것을 좋아합니다.", "혼자 하는 취미를 좋아합니다."]},
    letters: ['E','I']
  },
  {
    options: {en: ["You thrive on being in the spotlight.", "You avoid being the center of attention."],
              kr: ["주목받을 때 활력이 생깁니다.", "주목받는 상황을 피합니다."]},
    letters: ['E','I']
  },
  {
    options: {en: ["You make decisions quickly in meetings.", "You reflect before giving opinions."],
              kr: ["회의에서 빠르게 결정을 내립니다.", "의견을 말하기 전 충분히 고민합니다."]},
    letters: ['E','I']
  },
  {
    options: {en: ["You often organize social events.", "You seldom invite others to events."],
              kr: ["자주 모임을 주최합니다.", "다른 사람을 모임에 거의 초대하지 않습니다."]},
    letters: ['E','I']
  },
  {
    options: {en: ["You enjoy networking with new people.", "You keep a close circle of friends."],
              kr: ["새로운 사람들과 인맥 쌓기를 즐깁니다.", "친한 몇 명의 친구와 지냅니다."]},
    letters: ['E','I']
  },
  {
    options: {en: ["You find small talk easy and enjoyable.", "You find small talk draining."],
              kr: ["가벼운 대화를 쉽게 즐깁니다.", "가벼운 대화가 부담스럽습니다."]},
    letters: ['E','I']
  },
  // S/N questions
  {
    options: {en: ["You focus on practical details.", "You focus on big ideas."],
              kr: ["실용적인 세부 사항에 집중합니다.", "큰 아이디어에 집중합니다."]},
    letters: ['S','N']
  },
  {
    options: {en: ["You rely on your five senses for information.", "You trust your intuition."],
              kr: ["정보를 얻을 때 오감을 믿습니다.", "직감을 믿습니다."]},
    letters: ['S','N']
  },
  {
    options: {en: ["You enjoy hands-on experience.", "You enjoy imaginative brainstorming."],
              kr: ["직접 체험하는 것을 좋아합니다.", "상상하며 아이디어를 떠올리는 것을 좋아합니다."]},
    letters: ['S','N']
  },
  {
    options: {en: ["You value realistic plans.", "You value visionary plans."],
              kr: ["현실적인 계획을 중시합니다.", "비전 있는 계획을 중시합니다."]},
    letters: ['S','N']
  },
  {
    options: {en: ["You notice concrete facts.", "You notice patterns and possibilities."],
              kr: ["구체적인 사실을 잘 파악합니다.", "패턴과 가능성을 잘 파악합니다."]},
    letters: ['S','N']
  },
  {
    options: {en: ["You prefer proven methods.", "You like experimenting with new approaches."],
              kr: ["검증된 방법을 선호합니다.", "새로운 방법을 시도해 보는 것을 좋아합니다."]},
    letters: ['S','N']
  },
  {
    options: {en: ["You keep conversations grounded.", "You bring up abstract theories."],
              kr: ["대화를 현실적인 내용으로 유지합니다.", "추상적인 이론을 꺼냅니다."]},
    letters: ['S','N']
  },
  {
    options: {en: ["You trust data that you can verify.", "You go with your gut feelings."],
              kr: ["확인할 수 있는 데이터를 신뢰합니다.", "직감을 따릅니다."]},
    letters: ['S','N']
  },
  {
    options: {en: ["You appreciate step-by-step instructions.", "You jump into exploring new ideas."],
              kr: ["단계별 지시를 선호합니다.", "새로운 아이디어 탐구에 바로 뛰어듭니다."]},
    letters: ['S','N']
  },
  {
    options: {en: ["You stay aware of present realities.", "You dream about future potentials."],
              kr: ["현재의 현실을 인식합니다.", "미래의 가능성을 꿈꿉니다."]},
    letters: ['S','N']
  },
  // T/F questions
  {
    options: {en: ["You make decisions with logical analysis.", "You consider people’s feelings."],
              kr: ["논리적으로 판단해 결정합니다.", "사람들의 감정을 고려합니다."]},
    letters: ['T','F']
  },
  {
    options: {en: ["You value objective criticism.", "You value supportive feedback."],
              kr: ["객관적인 비판을 중시합니다.", "지지적인 피드백을 중시합니다."]},
    letters: ['T','F']
  },
  {
    options: {en: ["You prioritize efficiency.", "You prioritize harmony."],
              kr: ["효율성을 우선시합니다.", "조화를 우선시합니다."]},
    letters: ['T','F']
  },
  {
    options: {en: ["You keep emotions private.", "You openly share emotions."],
              kr: ["감정을 겉으로 드러내지 않습니다.", "감정을 솔직하게 표현합니다."]},
    letters: ['T','F']
  },
  {
    options: {en: ["You debate to find the best answer.", "You avoid conflicts to keep peace."],
              kr: ["최선의 답을 찾기 위해 토론합니다.", "평화를 위해 갈등을 피합니다."]},
    letters: ['T','F']
  },
  {
    options: {en: ["You trust reason over sentiment.", "You trust your heart."],
              kr: ["감정보다 이성을 믿습니다.", "가슴의 소리를 믿습니다."]},
    letters: ['T','F']
  },
  {
    options: {en: ["You are direct with your opinions.", "You soften words to avoid hurt."],
              kr: ["의견을 직설적으로 말합니다.", "상대가 상처받지 않도록 완곡하게 말합니다."]},
    letters: ['T','F']
  },
  {
    options: {en: ["You focus on tasks and goals.", "You focus on relationships."],
              kr: ["과업과 목표에 집중합니다.", "관계에 집중합니다."]},
    letters: ['T','F']
  },
  {
    options: {en: ["You can disregard personal feelings for fairness.", "You weigh personal needs heavily."],
              kr: ["공정을 위해 개인 감정을 무시할 수 있습니다.", "개인적인 필요를 많이 고려합니다."]},
    letters: ['T','F']
  },
  {
    options: {en: ["You critique flaws openly.", "You give praise even if there are flaws."],
              kr: ["문제점을 직접 지적합니다.", "문제가 있어도 칭찬을 먼저 합니다."]},
    letters: ['T','F']
  },
  // J/P questions
  {
    options: {en: ["You plan your day in advance.", "You like to be spontaneous."],
              kr: ["하루 일정을 미리 계획합니다.", "즉흥적으로 움직이는 것을 좋아합니다."]},
    letters: ['J','P']
  },
  {
    options: {en: ["You keep organized schedules.", "You keep plans open-ended."],
              kr: ["체계적인 일정을 유지합니다.", "계획을 자유롭게 둡니다."]},
    letters: ['J','P']
  },
  {
    options: {en: ["You complete tasks before relaxing.", "You mix work and play."],
              kr: ["일을 끝내고 휴식합니다.", "일과 놀이를 섞어 합니다."]},
    letters: ['J','P']
  },
  {
    options: {en: ["You make decisions early.", "You postpone decisions."],
              kr: ["일찍 결정을 내립니다.", "결정을 미룹니다."]},
    letters: ['J','P']
  },
  {
    options: {en: ["You like clear rules.", "You see rules as guidelines."],
              kr: ["명확한 규칙을 좋아합니다.", "규칙을 지침 정도로 생각합니다."]},
    letters: ['J','P']
  },
  {
    options: {en: ["You stick to plans.", "You adapt as you go."],
              kr: ["계획을 고수합니다.", "상황에 맞게 조정합니다."]},
    letters: ['J','P']
  },
  {
    options: {en: ["You feel uncomfortable with sudden changes.", "You enjoy unexpected events."],
              kr: ["갑작스러운 변화를 불편해합니다.", "예상치 못한 일을 즐깁니다."]},
    letters: ['J','P']
  },
  {
    options: {en: ["You prefer closure on issues.", "You keep options open."],
              kr: ["문제를 마무리 짓는 것을 선호합니다.", "여러 가능성을 열어 둡니다."]},
    letters: ['J','P']
  },
  {
    options: {en: ["You follow routines closely.", "You shift routines frequently."],
              kr: ["일상의 루틴을 잘 따릅니다.", "루틴을 자주 바꿉니다."]},
    letters: ['J','P']
  },
  {
    options: {en: ["You value predictability.", "You seek new experiences."],
              kr: ["예측 가능한 것을 중시합니다.", "새로운 경험을 추구합니다."]},
    letters: ['J','P']
  }
];

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
    <div class="question">${opts[0]}<br><br>${opts[1]}</div>
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
  const title = lang==='en' ? 'Your MBTI type is' : '당신의 MBTI 유형은';
  app.innerHTML = `
    <div class="result">
      <h2>${title} ${type}</h2>
      <p>${desc}</p>
      <button class="btn" onclick="window.print()">Print</button>
    </div>
  `;
}

if (!lang) {
  renderLanguageSelection();
} else {
  startTest();
}
