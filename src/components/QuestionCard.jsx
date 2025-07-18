function QuestionCard({ question, options, selectedAnswer, onAnswerSelect }) {
  return (
    <div className="question-card">
      <h3>{question}</h3>
      <div className="options">
        {options.map((option, index) => (
          <button
            className="btn btn-primary"
            key={index}
            onClick={() => onAnswerSelect(option)}>
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default QuestionCard;