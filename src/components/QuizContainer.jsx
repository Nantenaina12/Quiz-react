import { useState } from 'react';
import QuestionCard from './QuestionCard';
import ResultScreen from './ResultScreen';
//Les questions
const questions = [
  {
    question: "Quel langage est principalement utilisé avec React ?",
    options: ["Python", "PHP", "JavaScript", "Ruby"],
    correctAnswer: "JavaScript"
  },
  {
    question: "Quel mot-clé déclare une variable constante en JavaScript ?",
    options: ["let", "var", "const", "define"],
    correctAnswer: "const"
  },
  {
    question: "Quel est le framework CSS associé à des classes utilitaires ?",
    options: ["Bootstrap", "Foundation", "Tailwind CSS", "Materialize"],
    correctAnswer: "Tailwind CSS"
  },
  {
    question: "Quelle méthode transforme une chaîne JSON en objet JS ?",
    options: ["JSON.parse()", "JSON.stringify()", "parseJSON()", "toObject()"],
    correctAnswer: "JSON.parse()"
  },
  {
    question: "Quelle balise HTML contient le contenu visible de la page ?",
    options: ["<html>", "<head>", "<body>", "<title>"],
    correctAnswer: "<body>"
  },
  {
    question: "Quelle méthode d’un tableau JS ajoute un élément à la fin ?",
    options: ["push()", "pop()", "shift()", "unshift()"],
    correctAnswer: "push()"
  },
  {
    question: "Quelle extension de fichier est utilisée pour JSX ?",
    options: [".jsx", ".js", ".ts", ".html"],
    correctAnswer: ".jsx"
  },
  {
    question: "Comment écrit-on un commentaire sur une ligne en JS ?",
    options: ["// commentaire", "# commentaire", "<!-- commentaire -->", "/* commentaire */"],
    correctAnswer: "// commentaire"
  },
  {
    question: "Quel hook React est utilisé pour gérer l'état ?",
    options: ["useEffect", "useState", "useContext", "useRef"],
    correctAnswer: "useState"
  },
  {
    question: "Quel est le rôle de Vite dans un projet React ?",
    options: ["Transpiler", "Bundler rapide", "Base de données", "Framework backend"],
    correctAnswer: "Bundler rapide"
  },
  {
    question: "Quelle méthode JS permet de filtrer un tableau ?",
    options: ["map()", "forEach()", "filter()", "reduce()"],
    correctAnswer: "filter()"
  },
  {
    question: "Quel protocole est utilisé pour les API REST ?",
    options: ["SMTP", "FTP", "HTTP", "SSH"],
    correctAnswer: "HTTP"
  },
  {
    question: "Quelle propriété CSS centre un élément horizontalement ?",
    options: ["text-align: center", "margin: auto", "position: center", "align: center"],
    correctAnswer: "margin: auto"
  },
  {
    question: "Quel mot-clé crée une fonction en JS ?",
    options: ["def", "fun", "function", "proc"],
    correctAnswer: "function"
  },
  {
    question: "Quelle est la structure d’un objet en JS ?",
    options: ["[clé:valeur]", "{clé:valeur}", "(clé:valeur)", "<clé:valeur>"],
    correctAnswer: "{clé:valeur}"
  },
  {
    question: "Quel attribut HTML rend un champ obligatoire ?",
    options: ["required", "mandatory", "validate", "checked"],
    correctAnswer: "required"
  },
  {
    question: "Que signifie DOM ?",
    options: ["Document Object Model", "Data Object Management", "Digital Output Method", "Dynamic Object Mapping"],
    correctAnswer: "Document Object Model"
  },
  {
    question: "Quelle méthode JS arrondit à l’entier inférieur ?",
    options: ["Math.ceil()", "Math.floor()", "Math.round()", "Math.trunc()"],
    correctAnswer: "Math.floor()"
  },
  {
    question: "Quel est le rôle de useEffect() en React ?",
    options: ["Gérer les états", "Gérer les effets de bord", "Créer un composant", "Mettre à jour un hook"],
    correctAnswer: "Gérer les effets de bord"
  },
  {
    question: "Quelle méthode vérifie si un tableau contient une valeur ?",
    options: ["has()", "find()", "includes()", "check()"],
    correctAnswer: "includes()"
  }
];

function QuizContainer() {
  // États
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  // Sélection d'une réponse
  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
    setShowFeedback(false);
  };

  // Validation d'une réponse
  const handleValidate = () => {
    if (selectedAnswer === null) return;

    const isCorrect = selectedAnswer === questions[currentQuestionIndex].correctAnswer;
    if (isCorrect) setScore(score + 1);

    setShowFeedback(true);

    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
        setShowFeedback(false);
      } else {
        setQuizCompleted(true);
      }
    }, 1500);
  };

  // Réinitialisation du quiz
  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setQuizCompleted(false);
    setShowFeedback(false);
  };

  // Calcul de la progression
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="quiz-container bg-base-100 rounded-box shadow-lg p-6 max-w-2xl mx-auto mt-10">
  {quizCompleted ? (
    <ResultScreen 
      score={score} 
      totalQuestions={questions.length} 
      onRestart={handleRestart} 
    />
  ) : (
    <>
      <div className="progress-bar bg-base-200 rounded-full h-4 mb-6">
        <div 
          className="progress bg-primary rounded-full h-full transition-all duration-300" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      <QuestionCard
        question={questions[currentQuestionIndex].question}
        options={questions[currentQuestionIndex].options}
        selectedAnswer={selectedAnswer}
        onAnswerSelect={handleAnswerSelect}
        correctAnswer={questions[currentQuestionIndex].correctAnswer}
        showFeedback={showFeedback}
      />
      
      <button 
        onClick={handleValidate} 
        disabled={selectedAnswer === null}
        className="validate-btn btn btn-primary mt-6 w-full disabled:btn-disabled"
      >
        Valider
      </button>
      
      {showFeedback && (
        <div className={`feedback mt-4 p-4 rounded-box ${
          selectedAnswer === questions[currentQuestionIndex].correctAnswer 
            ? 'bg-success text-success-content' 
            : 'bg-error text-error-content'
        }`}>
          {selectedAnswer === questions[currentQuestionIndex].correctAnswer
            ? "Correct ! 🎉"
            : `Incorrect. La réponse était : ${questions[currentQuestionIndex].correctAnswer}`}
        </div>
      )}
    </>
  )}
</div>
   
  );
}

export default QuizContainer;