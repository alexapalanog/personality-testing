const { useState, useMemo, useEffect } = React;

const COMMITTEES = [
  'Academics', 'Community Development', 'Creatives & Technical', 'Documentation',
  'External Affairs', 'Finance', 'Logistics', 'Publicity', 'Sports & Talent',
  'Technology Development'
];

const questions = [
   { id: 1, text: "I often find myself thinking about color schemes, fonts, and layouts for posters or social media posts.", dominant: 'Creatives & Technical', average: ['Publicity'], less: ['Technology Development'] },
  { id: 2, text: "My friends would describe me as the 'planner' of the group, organizing the schedule, venue, and physical needs for a trip or get-together.", dominant: 'Logistics', average: ['External Affairs'], less: ['Sports & Talent'] },
  { id: 3, text: "I'm fascinated by new technologies and how they can be used to improve how an organization operates.", dominant: 'Technology Development', average: ['Academics'], less: ['Logistics'] },
  { id: 4, text: "I get a sense of satisfaction from a perfectly balanced budget and ensuring every transaction is transparently recorded.", dominant: 'Finance', average: ['Logistics'], less: ['Academics'] },
  { id: 5, text: "I love the energy of a live performance, a big game, or any event with a large, enthusiastic audience.", dominant: 'Sports & Talent', average: ['Publicity'], less: ['Community Development'] },
  { id: 6, text: "I'm the person who takes out their phone to capture the perfect group photo or a memorable moment at an event.", dominant: 'Documentation', average: ['Publicity', 'Sports & Talent'], less: ['Creatives & Technical'] },
  { id: 7, text: "I enjoy mentoring and guiding other people to help them grow into future leaders.", dominant: 'Community Development', average: ['Academics'], less: ['External Affairs'] },
  { id: 8, text: "When I use a well-designed website or app, my first thought is about how it was built and the logic behind it.", dominant: 'Technology Development', average: ['Creatives & Technical'], less: ['Academics'] },
  { id: 9, text: "I'm careful about keeping track of things and making sure they’re returned in good condition.", dominant: 'Logistics', average: ['Finance'], less: ['Creatives & Technical'] },
  { id: 10, text: "I am competitive and enjoy activities that involve strategy, teamwork, and a clear winner.", dominant: 'Sports & Talent', average: ['Academics'], less: ['Logistics'] },
  { id: 11, text: "The idea of building a complete visual identity for a project logo, colors, and theme from scratch is appealing to me.", dominant: 'Creatives & Technical', average: ['External Affairs'], less: ['Finance'] },
  { id: 12, text: "I'm comfortable starting conversations with new people, especially if it's to represent my group or organization.", dominant: 'External Affairs', average: ['Community Development'], less: ['Publicity'] },
  { id: 13, text: "I am drawn to learning about academic subjects in-depth, even if they aren't directly related to my required courses.", dominant: 'Academics', average: ['Technology Development'], less: ['Community Development'] },
  { id: 14, text: "I love being behind the scenes like coordinating people and keeping the event running smoothly.", dominant: 'Logistics', average: ['Community Development'], less: ['Documentation'] },
  { id: 15, text: "I believe providing outlets for expression like sports, music, or art is essential for a balanced community.", dominant: 'Sports & Talent', average: ['Community Development', 'Creatives & Technical'], less: ['Finance'] },
  { id: 16, text: "When a message needs to be shared, I focus on finding the exact right words for caption or announcement to make it engaging.", dominant: 'Publicity', average: ['Documentation'], less: ['External Affairs'] },
  { id: 17, text: "I am most motivated when my work directly contributes to the well-being and growth of our community members.", dominant: 'Community Development', average: ['Academics'], less: ['External Affairs'] },
  { id: 18, text: "I often think, ‘There has to be a smarter way to do this,’ and I enjoy building a tool or script to solve that inefficiency.", dominant: 'Technology Development', average: ['Logistics'], less: ['Community Development'] },
  { id: 19, text: "I am comfortable with the responsibility of handling money and keeping precise records.", dominant: 'Finance', average: ['Logistics'], less: ['External Affairs'] },
  { id: 20, text: "When I'm at an event, I notice the sound quality, the lighting, and how smoothly the technical aspects are running.", dominant: 'Creatives & Technical', average: ['Logistics'], less: ['Sports & Talent'] },
  { id: 21, text: "I like making sure everything looks and sounds consistent so people recognize the brand.", dominant: 'Publicity', average: ['External Affairs'], less: ['Creatives & Technical'] },
  { id: 22, text: "I enjoy organizing events that bring people together and build bonds.", dominant: 'Community Development', average: ['Sports & Talent', 'Logistics'], less: ['Documentation'] },
  { id: 23, text: "I find it rewarding to explain a difficult concept to someone and help them finally understand it through a tutorial or study session.", dominant: 'Academics', average: ['Community Development'], less: ['Technology Development'] },
  { id: 24, text: "When I plan a hangout with friends, I first think about the budget and who to invite.", dominant: 'External Affairs', average: ['Finance'], less: ['Logistics'] },
  { id: 25, text: "I enjoy helping organize training, workshops, or tournaments that develop people’s practical skills and passions.", dominant: 'Sports & Talent', average: ['Community Development'], less: ['Technology Development'] },
  { id: 26, text: "When I see a great graphic design or a beautiful poster, I get inspired to create something artistic myself.", dominant: 'Creatives & Technical', average: ['Publicity'], less: ['Documentation'] },
  { id: 27, text: "Before planning a project, I think it's critical to first gather feedback from members to understand what they truly need.", dominant: 'Community Development', average: ['Academics'], less: ['Documentation'] },
  { id: 28, text: "The idea of a competitive hackathon or a programming contest excites me.", dominant: 'Academics', average: ['Technology Development'], less: ['Sports & Talent'] },
  { id: 29, text: "I'm good at finding and sourcing the physical materials or supplies needed for a project, ensuring we have everything on time.", dominant: 'Logistics', average: ['Finance'], less: ['Technology Development'] },
  { id: 30, text: "When it comes to fundraising, I tend to brainstorm ideas that are not just profitable but also fun and engaging for participants.", dominant: 'Finance', average: ['Community Development'], less: ['Sports & Talent'] },
  { id: 31, text: "I believe a picture is worth a thousand words, and I enjoy telling a complete story through a series of photos or a video.", dominant: 'Documentation', average: ['Publicity'], less: ['Creatives & Technical'] },
  { id: 32, text: "I am good at negotiating and formally representing a group's interests to an outside party, like a sponsor or another organization.", dominant: 'External Affairs', average: ['Finance'], less: ['Publicity', 'Logistics'] },
  { id: 33, text: "I’m the person my friends come to for help with their computer problems or tech-related questions.", dominant: 'Technology Development', average: ['Community Development'], less: ['Logistics', 'Academics'] },
  { id: 34, text: "I enjoy making a budget tracker to see where money comes from and where it goes.", dominant: 'Finance', average: ['External Affairs'], less: ['Academics'] },
  { id: 35, text: "After an event, I feel a responsibility to organize raw photos and edit videos into a polished final album or highlight reel.", dominant: 'Documentation', average: ['Technology Development'], less: ['Logistics'] },
  { id: 36, text: "I enjoy looking for opportunities by writing proposals and connecting with companies", dominant: 'External Affairs', average: ['Finance'], less: ['Publicity'] },
  { id: 37, text: "I enjoy researching a complex topic and summarizing it into an easy-to-understand presentation or article for others.", dominant: 'Academics', average: ['Documentation'], less: ['Sports & Talent'] },
  { id: 38, text: "I enjoy organizing photos and records so we don’t lose our group’s memories", dominant: 'Documentation', average: ['Logistics'], less: ['Community Development'] },
  { id: 39, text: "I enjoy analyzing social media engagement (likes, shares, comments) to understand what content performs best.", dominant: 'Publicity', average: ['Finance'], less: ['External Affairs', 'Academics'] },
  { id: 40, text: "I enjoy planning posts to get the right attention at the right time.", dominant: 'Publicity', average: ['Creatives & Technical'], less: ['Finance'] },
];

const committeeDescriptions = {
    Academics: "Dedicated to enhancing the academic environment, this committee organizes tutorials, reviewers, and academic events like quiz bees and programming contests.",
    'Community Development': "Works to improve community well-being through social projects and events that foster civic engagement and empowerment.",
    'Creatives & Technical': "Oversees all creative design, from digital graphics to event decor, and manages technical needs like sound and lighting for events.",
    Documentation: "Responsible for photojournalism, this committee captures and preserves all organizational activities and memorable moments.",
    'External Affairs': "Manages relationships with outside entities, including sponsors, other organizations, and the media, handling partnerships and public relations.",
    Finance: "Oversees the organization's budget, expenditures, and revenue, ensuring fiscal responsibility and transparency through regular audits.",
    Logistics: "Manages and maintains all organizational properties and keeps a thorough record of expenses related to activities and assets.",
    Publicity: "Manages all promotional activities, including marketing strategies, social media platforms, and publicizing events to target audiences.",
    'Sports & Talent': "Organizes all sports-related and talent activities, including events, workshops, and shows to help members develop and showcase their skills.",
    'Technology Development': "Spearheads technology projects like the organization's website, implements new tech to streamline operations, and organizes tech-focused workshops."
};

const OPTIONS = [
  { value: 5 }, { value: 4 }, { value: 3 }, { value: 2 }, { value: 1 }
];

const SCORE_MAP = {
  5: { dominant: 5, average: 3, less: 1 }, // Strongly Agree
  4: { dominant: 3, average: 2, less: 0 }, // Agree
  3: { dominant: 1, average: 0, less: 0 }, // Neutral
  2: { dominant: -1, average: 0, less: 0 }, // Disagree
  1: { dominant: -2, average: -1, less: 0 }, // Strongly Disagree
};

const QUESTIONS_PER_PAGE = 7;
const TOTAL_PAGES = Math.ceil(questions.length / QUESTIONS_PER_PAGE);

const HomePage = ({ onStartQuiz }) => {
    const leftCommittees = ['Academics', 'Community Development', 'Creatives & Technical', 'Publicity', 'External Affairs'];
    const rightCommittees = ['Documentation', 'Technology Development', 'Finance', 'Logistics', 'Sports & Talent'];

    const simplifyName = (name) => {
        if (name === 'Creatives & Technical') return 'Creatives';
        return name;
    };

    const CommitteeItem = ({ name }) => (
        <div className="committee-item">
            <div className="committee-circle"></div>
            <p>{simplifyName(name)}</p>
        </div>
    );

    return (
        <div className="home-container">
            <div className="home-mobile-placeholder">
                <div className="committee-circle"></div>
            </div>
            
            <div className="committee-column left">
                {leftCommittees.map(name => <CommitteeItem key={name} name={name} />)}
            </div>

            <div className="home-central-content">
                <h1 className="home-title">Not Sure Which Committee You Belong To?</h1>
                <p className="home-subtitle">Discover within minutes in which committee matches your skills, passions and goals</p>
                <button className="btn btn-primary btn-find-out" onClick={onStartQuiz}>
                    Find out my committee
                </button>
            </div>

            <div className="committee-column right">
                {rightCommittees.map(name => <CommitteeItem key={name} name={name} />)}
            </div>
        </div>
    );
};


const QuizApp = ({ onGoHome }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage, showResults]);

  const handleAnswerChange = (questionId, value) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };
  
  const handleReset = () => {
      setAnswers({});
      setCurrentPage(0);
      setShowResults(false);
  }

  const currentQuestions = questions.slice(
    currentPage * QUESTIONS_PER_PAGE,
    (currentPage + 1) * QUESTIONS_PER_PAGE
  );
  
  const isPageComplete = currentQuestions.every(q => answers[q.id] !== undefined);

  const handleNext = () => {
    if (currentPage < TOTAL_PAGES - 1) {
      setCurrentPage(prev => prev + 1);
    } else {
      setShowResults(true);
    }
  };
  
  const handleBack = () => {
      if(currentPage > 0) {
          setCurrentPage(prev => prev - 1);
      }
  }
  
  const progressPercent = showResults ? 100 : (currentPage / (TOTAL_PAGES - 1)) * 100;

  const isQuestionAnswered = (id) => answers[id] !== undefined;
  let firstUnansweredFound = false;

  if (showResults) {
    return <ResultsPage answers={answers} onRetake={handleReset} />;
  }

  return (
    <React.Fragment>
      <div className="quiz-banner">
          <div className="quiz-header">
              <h1>Committee Personality Test</h1>
              <p>Find your perfect committee in CSS!</p>
          </div>
      </div>
      
      <div className="progress-container">
          <div className="progress-bar">
              <div className="progress-bar-inner" style={{ width: `${progressPercent}%` }}></div>
              <div className="progress-bar-head" style={{ left: `${progressPercent}%` }}></div>
          </div>
          <p className="progress-text">Page {currentPage + 1} of {TOTAL_PAGES}</p>
      </div>

      <div className="questions-list">
        {currentQuestions.map(q => {
            const isAnswered = isQuestionAnswered(q.id);
            const isActive = !isAnswered && !firstUnansweredFound;
            if (isActive) {
                firstUnansweredFound = true;
            }

            return (
                <div key={q.id} className={`question-wrapper ${isActive ? 'active' : ''} ${isAnswered ? 'answered' : ''}`}>
                    <h2 className="question-text"><span className="question-number">{q.id}.</span>{q.text}</h2>
                    <div className="answer-scale" role="radiogroup" aria-labelledby={`question-${q.id}`}>
                        <span className="scale-label agree">Agree</span>
                        <div className="scale-options">
                            {OPTIONS.map(opt => (
                                <label key={opt.value} className="scale-option" data-value={opt.value}>
                                    <input
                                        type="radio"
                                        name={`question-${q.id}`}
                                        value={opt.value}
                                        checked={answers[q.id] === opt.value}
                                        onChange={() => handleAnswerChange(q.id, opt.value)}
                                    />
                                    <span className="scale-circle" aria-hidden="true"></span>
                                </label>
                            ))}
                        </div>
                        <span className="scale-label disagree">Disagree</span>
                    </div>
                </div>
            )
        })}
      </div>
        
      <div className="navigation-buttons">
          <button className="btn btn-secondary" onClick={currentPage > 0 ? handleBack : onGoHome}>
            Back
          </button>
          <button className="btn btn-primary" onClick={handleNext} disabled={!isPageComplete}>
            {currentPage === TOTAL_PAGES - 1 ? 'See Results' : 'Next'}
          </button>
      </div>
    </React.Fragment>
  );
};


const AppHeader = ({ page, onTakeTest, onGoHome }) => {
    const isHomePage = page === 'home';
    const Logo = () => (
        <img
          src="assets/logos/Logo_CSS Apply.svg"
          alt="CSS Apply Logo"
          className="header-logo"
        />
    );

    return (
        <header className="app-header">
            {isHomePage ? (
                <Logo />
            ) : (
                <button onClick={onGoHome} className="header-logo-button" aria-label="Go to Home Page" title="Go to Home Page">
                    <Logo />
                </button>
            )}
            
            {isHomePage && (
              <div className="header-actions">
                <a href="#/join" className="btn btn-primary btn-join">Join CSS</a>
                <button className="btn btn-secondary btn-take-test" onClick={onTakeTest}>Take the Test</button>
              </div>
            )}
        </header>
    );
};


const ResultsPage = ({ answers, onRetake }) => {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    const sortedResults = useMemo(() => {
        const scores = COMMITTEES.reduce((acc, c) => ({...acc, [c]: 0}), {});

        questions.forEach(q => {
            const answerValue = answers[q.id];
            if (answerValue && SCORE_MAP[answerValue]) {
                const points = SCORE_MAP[answerValue];
                scores[q.dominant] += points.dominant;
                q.average.forEach(c => { scores[c] += points.average; });
                q.less.forEach(c => { scores[c] += points.less; });
            }
        });
        
        return Object.entries(scores)
            .map(([committee, score]) => ({ committee: committee, score }))
            .sort((a, b) => b.score - a.score);

    }, [answers]);

    const [topResult, secondResult, thirdResult] = sortedResults;

    return (
        <div className="results-container">
            <h2>Your Results Are In!</h2>
            
            <div className="result-card-main">
                <div className="result-image-placeholder-main" role="img" aria-label="Personality illustration"></div>
                <h3>Your Primary Committee Fit is...</h3>
                <h1 className="result-title-main">{topResult.committee}</h1>
                <p>{committeeDescriptions[topResult.committee]}</p>
            </div>

            <h4>Other Committees You Might Enjoy</h4>
            <div className="other-results-grid">
                <div className="result-card-other">
                    <div className="result-image-placeholder-other" role="img" aria-label="Committee illustration"></div>
                    <div className="result-content-other">
                        <h3>{secondResult.committee}</h3>
                        <p>{committeeDescriptions[secondResult.committee]}</p>
                    </div>
                </div>
                 <div className="result-card-other">
                    <div className="result-image-placeholder-other" role="img" aria-label="Committee illustration"></div>
                    <div className="result-content-other">
                        <h3>{thirdResult.committee}</h3>
                        <p>{committeeDescriptions[thirdResult.committee]}</p>
                    </div>
                </div>
            </div>

            <div className="results-actions">
                <a href="#/apply" className="btn btn-primary">Join CSS Committee</a>
                <button className="btn btn-secondary" onClick={onRetake}>Retake the Test</button>
            </div>
        </div>
    );
}

const Footer = () => (
    <footer className="app-footer">
        <div className="footer-content">
            <div className="footer-main">
                <img src="assets/logos/Logo_CSS.svg" alt="Computer Science Society Logo" className="footer-logo-img" />
                <div className="footer-title">
                    Computer Science Society
                </div>
                <div className="footer-subtitle">
                    The mother organization of the Computer Science Department
                </div>
                <div className="footer-copyright">
                    © {new Date().getFullYear()} Computer Science Society. All rights reserved.
                </div>
            </div>
            <div className="footer-contact">
                <div className="footer-contact-title">Partner with us:</div>
                <ul className="footer-contact-links">
                    <li>
                        <a href="mailto:css.cics@ust.edu.ph" target="_blank" rel="noopener noreferrer">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                <path d="M20.1 4H4.9C3.855 4 3.0095 4.95625 3.0095 6.125L3 18.875C3 20.0438 3.855 21 4.9 21H20.1C21.145 21 22 20.0438 22 18.875V6.125C22 4.95625 21.145 4 20.1 4ZM20.1 8.25L12.5 13.5625L4.9 8.25V6.125L12.5 11.4375L20.1 6.125V8.25Z" fill="white"/>
                            </svg>
                            <span>css.cics@ust.edu.ph</span>
                        </a>
                    </li>
                    <li>
                        <a href="https://www.facebook.com/ustcss" target="_blank" rel="noopener noreferrer">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 25 25" fill="white" aria-hidden="true">
                                <path d="M22.9167 12.4997C22.9167 6.74967 18.25 2.08301 12.5 2.08301C6.75004 2.08301 2.08337 6.74967 2.08337 12.4997C2.08337 17.5413 5.66671 21.7393 10.4167 22.708V15.6247H8.33337V12.4997H10.4167V9.89551C10.4167 7.88509 12.0521 6.24967 14.0625 6.24967H16.6667V9.37467H14.5834C14.0105 9.37467 13.5417 9.84343 13.5417 10.4163V12.4997H16.6667V15.6247H13.5417V22.8643C18.8021 22.3434 22.9167 17.9059 22.9167 12.4997Z" />
                            </svg>
                            <span>UST Computer Science Society</span>
                        </a>
                    </li>
                    <li>
                        <a href="https://www.instagram.com/ustcss" target="_blank" rel="noopener noreferrer">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 25 25" fill="white" aria-hidden="true">
                                <path d="M16.6667 3.125C18.048 3.125 19.3728 3.67373 20.3495 4.65049C21.3263 5.62724 21.875 6.952 21.875 8.33333V16.6667C21.875 18.048 21.3263 19.3728 20.3495 20.3495C19.3728 21.3263 18.048 21.875 16.6667 21.875H8.33333C6.952 21.875 5.62724 21.3263 4.65049 20.3495C3.67373 19.3728 3.125 18.048 3.125 16.6667V8.33333C3.125 6.952 3.67373 5.62724 4.65049 4.65049C5.62724 3.67373 6.952 3.125 8.33333 3.125H16.6667ZM12.5 8.33333C11.3949 8.33333 10.3351 8.77232 9.55372 9.55372C8.77232 10.3351 8.33333 11.3949 8.33333 12.5C8.33333 13.6051 8.77232 14.6649 9.55372 15.4463C10.3351 16.2277 11.3949 16.6667 12.5 16.6667C13.6051 16.6667 14.6649 16.2277 15.4463 15.4463C16.2277 14.6649 16.6667 13.6051 16.6667 12.5C16.6667 11.3949 16.2277 10.3351 15.4463 9.55372C14.6649 8.77232 13.6051 8.33333 12.5 8.33333ZM12.5 10.4167C13.0525 10.4167 13.5824 10.6362 13.9731 11.0269C14.3638 11.4176 14.5833 11.9475 14.5833 12.5C14.5833 13.0525 14.3638 13.5824 13.9731 13.9731C13.5824 14.3638 13.0525 14.5833 12.5 14.5833C11.9475 14.5833 11.4176 14.3638 11.0269 13.9731C10.6362 13.5824 10.4167 13.0525 10.4167 12.5C10.4167 11.9475 10.6362 11.4176 11.0269 11.0269C11.4176 10.6362 11.9475 10.4167 12.5 10.4167ZM17.1875 6.77083C16.9112 6.77083 16.6463 6.88058 16.4509 7.07593C16.2556 7.27128 16.1458 7.53623 16.1458 7.8125C16.1458 8.08877 16.2556 8.35372 16.4509 8.54907C16.6463 8.74442 16.9112 8.85417 17.1875 8.85417C17.4638 8.85417 17.7287 8.74442 17.9241 8.54907C18.1194 8.35372 18.2292 8.08877 18.2292 7.8125C18.2292 7.53623 18.1194 7.27128 17.9241 7.07593C17.7287 6.88058 17.4638 6.77083 17.1875 6.77083Z" fill="white" />
                            </svg>
                            <span>@ustcss</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </footer>
);

const BackgroundIcons = () => {
    const icons = [
        // Code Brackets
        <svg viewBox="0 0 24 24"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg>,
        // Book
        <svg viewBox="0 0 24 24"><path d="M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5C5.33 4.5 4.11 4.65 3 5V19c1.11.35 2.33.5 3.5.5 1.95 0 4.05-.4 5.5-1.5 1.45 1.1 3.55 1.5 5.5 1.5 1.17 0 2.39-.15 3.5-.5V5zM19 17c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5V6.5c1.45-1.1 3.55-1.5 5.5-1.5 1.17 0 2.39.15 3.5.5v11.5z"/></svg>,
        // Clipboard
        <svg viewBox="0 0 24 24"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1s-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>,
        // Heart
        <svg viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>,
        // Star Outline
        <svg viewBox="0 0 24 24"><path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"/></svg>,
        // Sparkle
        <svg viewBox="0 0 24 24"><path d="M12 2L9.5 9.5 2 12l7.5 2.5L12 22l2.5-7.5L22 12l-7.5-2.5L12 2z"/></svg>,
        // Dot (Circle)
        <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /></svg>,
        // Palette
        <svg viewBox="0 0 24 24"><path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5s-2.24-5-5-5h-3.09c-.23-.64-.23-1.32 0-1.96C13.3 3.6 12.69 3 12 3zm-3 9c-.83 0-1.5.67-1.5 1.5S8.17 15 9 15s1.5-.67 1.5-1.5S9.83 12 9 12zm3-4c-.83 0-1.5.67-1.5 1.5S11.17 11 12 11s1.5-.67 1.5-1.5S12.83 8 12 8zm3 4c-.83 0-1.5.67-1.5 1.5S14.17 15 15 15s1.5-.67 1.5-1.5S15.83 12 15 12z"/></svg>,
        // Speech Bubble
        <svg viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" /></svg>,
        // Camera
        <svg viewBox="0 0 24 24"><path d="M4 4h3l2-2h6l2 2h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm8 13a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm0-2a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/></svg>,
        // Globe
        <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-.9-1.39-1.69-1.39h-1v-3c0-.55-.45-1-1-1h-2v-2h2c.55 0 1-.45 1-1V7h2c.55 0 1-.45 1-1V5.5c2.04 1.33 3.5 3.63 3.5 6.5 0 2.18-.94 4.14-2.4 5.49z"/></svg>,
        // File
        <svg viewBox="0 0 24 24"><path d="M6 2c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6H6zm7 7V3.5L18.5 9H13z"/></svg>,
        // Plus
        <svg viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>,
    ];

    return (
        <div className="background-icons" aria-hidden="true">
            {icons.map((icon, i) => (
                <span className="icon-wrapper" key={i}>
                    {icon}
                </span>
            ))}
        </div>
    );
};

const App = () => {
    const [page, setPage] = useState('home');

    const handleStartQuiz = () => setPage('quiz');
    const handleGoHome = () => setPage('home');

    return (
        <React.Fragment>
            <AppHeader page={page} onTakeTest={handleStartQuiz} onGoHome={handleGoHome} />
            <main className={`app-container ${page === 'home' ? 'home-main-container' : ''}`}>
                {page === 'home' ? (
                    <HomePage onStartQuiz={handleStartQuiz} />
                ) : (
                    <QuizApp onGoHome={handleGoHome} />
                )}
            </main>
            <Footer />
            {page === 'home' && <BackgroundIcons />}
        </React.Fragment>
    );
};

const container = document.getElementById('root');
if (container) {
    const root = ReactDOM.createRoot(container);
    root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
}