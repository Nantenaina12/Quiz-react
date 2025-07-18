function ResultScreen({ score, totalQuestions, onRestart }) {
  const percentage = Math.round((score / totalQuestions) * 100);
  const getMessage = () => {
    if (percentage >= 80) return "Excellent !";
    if (percentage >= 50) return "Pas mal !";
    return "Peut mieux faire...";
  };

  return (
    <div>
      <h2>{getMessage()}</h2>
      <p>{score} bonnes réponses sur {totalQuestions} ({percentage}%)</p>
      <button onClick={onRestart}>
        ↻ Recommencer
      </button>
    </div>
  );
}

export default ResultScreen;