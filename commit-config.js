module.exports = {
  prompter: (cz, commit) => {
    const typeChoices = [
      { value: "✨ feat", name: "✨ feat:     새로운 기능" },
      { value: "🐛 fix", name: "🐛 fix:      버그 수정" },
      { value: "📚 docs", name: "📚 docs:     문서 수정" },
      // ... 기타 타입들 ...
    ];

    const questions = [
      {
        type: "list",
        name: "type",
        message: "1️⃣ 커밋 유형을 선택하세요:",
        choices: typeChoices,
      },
      {
        type: "input",
        name: "subject",
        message: "2️⃣ 커밋 메시지를 입력하세요:",
        validate: (input) => input.length > 0 && input.length <= 100,
      },
      {
        type: "input",
        name: "ticketNumber",
        message: "3️⃣ 이슈 번호를 입력하세요 (숫자만):",
        validate: (input) => /^\d+$/.test(input),
      },
    ];

    cz.prompt(questions).then((answers) => {
      const { type, subject, ticketNumber } = answers;
      const message = `${type}: ${subject} (#${ticketNumber})`;

      const divider = "=".repeat(50);
      const decoratedMessage = `
  ${divider}
  ✅ 커밋 메시지가 다음과 같아요! 커밋할까요?
  
  ${message}
  
  ${divider}
  `;

      cz.prompt([
        {
          type: "confirm",
          name: "confirmCommit",
          message: decoratedMessage,
          default: false,
        },
      ]).then((confirmAnswer) => {
        if (confirmAnswer.confirmCommit) {
          commit(message);
        } else {
          console.log("❌ 커밋이 취소되었습니다.");
        }
      });
    });
  },
};
