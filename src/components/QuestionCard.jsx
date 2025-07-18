function QuestionCard({ question, options, selectedAnswer, onAnswerSelect }) {
  return (
    <div>
      <h3>{question}</h3>
      <div>
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => onAnswerSelect(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default QuestionCard;