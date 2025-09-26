// results.js - A0 Quiz Results Page Logic

// Helper functions
function formatSeconds(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function formatDate(date) {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

function getRelativeTime(date) {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins} minutes ago`;
  if (diffHours < 24) return `${diffHours} hours ago`;
  return `${diffDays} days ago`;
}

// Compute outcome based on thresholds
function computeOutcome(config, participant) {
  const questions = config.questions;
  const answers = participant.answers;

  // Map answers by questionId for quick lookup
  const answerMap = new Map(answers.map(a => [a.questionId, a]));

  const questionResults = questions.map(q => {
    const answer = answerMap.get(q.id);
    const isCorrect = checkAnswer(q, answer?.value);

    return {
      id: q.id,
      title: q.title,
      type: q.type,
      correct: isCorrect,
      userAnswer: answer?.value || null,
      correctAnswer: getCorrectAnswer(q),
      timeSpent: 0, // Would need timing data
      difficulty: getDifficulty(q),
      skill: getSkill(q),
      audioOnly: q.type === 'audio'
    };
  });

  const correctAnswers = questionResults.filter(q => q.correct).length;
  const accuracy = (correctAnswers / questions.length) * 100;

  // Determine level based on result templates
  const level = determineLevel(config, questionResults);

  // Calculate breakdowns
  const skillsBreakdown = calculateSkillsBreakdown(questionResults);
  const typesBreakdown = calculateTypesBreakdown(questionResults);
  const bandsBreakdown = calculateBandsBreakdown(questionResults);

  return {
    totalQuestions: questions.length,
    correctAnswers,
    accuracy,
    level,
    timeSpent: 0, // Would need total time
    questions: questionResults,
    skillsBreakdown,
    typesBreakdown,
    bandsBreakdown
  };
}

// Helper functions for computeOutcome
function checkAnswer(question, userAnswer) {
  if (!userAnswer) return false;

  const correctAnswer = getCorrectAnswer(question);

  switch (question.type) {
    case 'mcq':
    case 'image-selection':
    case 'audio':
      return userAnswer === correctAnswer;
    case 'fill-in-blanks':
      return typeof userAnswer === 'string' && userAnswer.toLowerCase().trim() === correctAnswer.toLowerCase();
    case 'order':
      return typeof userAnswer === 'string' && userAnswer === correctAnswer;
    case 'text':
      // For text input, might need more complex checking
      return typeof userAnswer === 'string' && userAnswer.toLowerCase().trim() === correctAnswer.toLowerCase();
    default:
      return false;
  }
}

function getCorrectAnswer(question) {
  switch (question.type) {
    case 'mcq':
    case 'image-selection':
    case 'audio':
      return question.options?.find(opt => opt.value === getExpectedValue(question.id))?.value || '';
    case 'fill-in-blanks':
      // For fill-in-blanks, the correct answer is typically the expected text
      return getExpectedValue(question.id);
    case 'order':
      return question.orderQuestion?.correctAnswer || '';
    case 'text':
      return getExpectedValue(question.id);
    default:
      return '';
  }
}

// This would need to be based on the result templates or predefined correct answers
function getExpectedValue(questionId) {
  // This is a simplified version - in reality, you'd have correct answers defined
  const correctAnswers = {
    q1: 'perro', q2: 'gato', q3: 'mesa', q4: 'carro',
    q5: 'hola', q6: 'adios', q7: 'por_favor', q8: 'gracias',
    q9: '', q10: '', // Fill in blanks - would need user input validation
    q11: 'la', q12: 'los', q13: 'los_museos', q14: 'las_bibliotecas',
    q15: 'soy', q16: 'es', q17: 'esta', q18: 'estamos',
    q19: 'good_morning', q20: 'good_evening_night', q21: 'mexico', q22: '25',
    q23: '10', q24: '15', q25: 'pedro', q26: '25', q27: '7_pm', q28: '8_am',
    q29: 'monday_wednesday', q30: '2', q31: 'bien', q32: 'soy_colombia',
    q33: 'mesa', q34: 'hermosa', q35: 'rapidamente', q36: 'febrero',
    q37: 'hoy_es_15_marzo', q38: 'hermano', q39: 'yo soy estudiante de psicología',
    q40: 'ella está en la playa'
  };
  return correctAnswers[questionId] || '';
}

function getDifficulty(question) {
  // Simplified difficulty assignment
  const id = parseInt(question.id.slice(1));
  if (id <= 10) return 'easy';
  if (id <= 25) return 'medium';
  return 'hard';
}

function getSkill(question) {
  const id = parseInt(question.id.slice(1));
  if (id <= 4) return 'vocabulary';
  if (id <= 18) return 'grammar';
  if (id <= 24) return 'listening';
  if (id <= 30) return 'reading';
  return 'conversation';
}

function determineLevel(config, questionResults) {
  // Check how many conditions are met for each level
  const levels = ['A0', 'A1', 'A2', 'B1', 'B2'];
  let bestLevel = 'A0';
  let maxCorrect = 0;

  for (const template of config.resultTemplates) {
    const correctCount = template.conditions.filter(condition => {
      const result = questionResults.find(q => q.id === condition.questionId);
      return result?.correct;
    }).length;

    if (correctCount > maxCorrect) {
      maxCorrect = correctCount;
      bestLevel = template.title.split(' ')[0]; // Extract level like A1, A2, etc.
    }
  }

  return bestLevel;
}

function calculateSkillsBreakdown(questionResults) {
  const skills = {};

  questionResults.forEach(q => {
    const skill = q.skill;
    if (!skills[skill]) skills[skill] = { correct: 0, total: 0 };
    skills[skill].total++;
    if (q.correct) skills[skill].correct++;
  });

  const result = {};
  Object.keys(skills).forEach(skill => {
    const { correct, total } = skills[skill];
    result[skill] = { correct, total, percentage: (correct / total) * 100 };
  });

  return result;
}

function calculateTypesBreakdown(questionResults) {
  const types = {};

  questionResults.forEach(q => {
    const type = q.type;
    if (!types[type]) types[type] = { correct: 0, total: 0 };
    types[type].total++;
    if (q.correct) types[type].correct++;
  });

  const result = {};
  Object.keys(types).forEach(type => {
    const { correct, total } = types[type];
    result[type] = { correct, total, percentage: (correct / total) * 100 };
  });

  return result;
}

function calculateBandsBreakdown(questionResults) {
  // Simplified band calculation based on question ranges
  const bands = { A0: 0, A1: 0, A2: 0, B1: 0, B2: 0 };

  questionResults.forEach(q => {
    const id = parseInt(q.id.slice(1));
    if (id <= 8) bands.A1++;
    else if (id <= 18) bands.A2++;
    else if (id <= 30) bands.B1++;
    else bands.B2++;
  });

  return bands;
}

// Apply filters to question results
function applyFilters(questionResults, filters) {
  return questionResults.filter(q => {
    if (filters.status && filters.status !== 'all') {
      if (filters.status === 'correct' && !q.correct) return false;
      if (filters.status === 'incorrect' && q.correct) return false;
    }

    if (filters.skill && q.skill !== filters.skill) return false;
    if (filters.type && q.type !== filters.type) return false;
    if (filters.difficulty && q.difficulty !== filters.difficulty) return false;
    if (filters.audioOnly !== undefined && q.audioOnly !== filters.audioOnly) return false;

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      if (!q.title.toLowerCase().includes(searchLower) &&
          !q.correctAnswer.toLowerCase().includes(searchLower)) return false;
    }

    return true;
  });
}

// Render charts using Chart.js
function renderCharts(results, containerId) {
  // This would require Chart.js to be installed
  // For now, return chart configurations

  const accuracyDonut = {
    type: 'doughnut',
    data: {
      labels: ['Correct', 'Incorrect'],
      datasets: [{
        data: [results.correctAnswers, results.totalQuestions - results.correctAnswers],
        backgroundColor: ['#10B981', '#EF4444'],
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'bottom' },
        title: { display: true, text: 'Overall Accuracy' }
      }
    }
  };

  const skillsRadar = {
    type: 'radar',
    data: {
      labels: Object.keys(results.skillsBreakdown),
      datasets: [{
        label: 'Skills Performance',
        data: Object.values(results.skillsBreakdown).map(s => s.percentage),
        backgroundColor: 'rgba(16, 185, 129, 0.2)',
        borderColor: '#10B981',
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      scales: {
        r: { beginAtZero: true, max: 100 }
      }
    }
  };

  const bandsBar = {
    type: 'bar',
    data: {
      labels: Object.keys(results.bandsBreakdown),
      datasets: [{
        label: 'Questions per Band',
        data: Object.values(results.bandsBreakdown),
        backgroundColor: '#3B82F6',
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
        title: { display: true, text: 'Questions by CEFR Band' }
      }
    }
  };

  const typesDoughnut = {
    type: 'doughnut',
    data: {
      labels: Object.keys(results.typesBreakdown),
      datasets: [{
        data: Object.values(results.typesBreakdown).map(t => t.percentage),
        backgroundColor: ['#F59E0B', '#8B5CF6', '#06B6D4', '#84CC16', '#F97316', '#EC4899'],
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'bottom' },
        title: { display: true, text: 'Performance by Question Type' }
      }
    }
  };

  return { accuracyDonut, skillsRadar, bandsBar, typesDoughnut };
}

// Render table with expandable details
function renderTable(questionResults, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const tableHTML = `
    <div class="overflow-x-auto">
      <table class="w-full border-collapse border border-gray-300" role="table" aria-label="Quiz Results Table">
        <thead>
          <tr class="bg-gray-50">
            <th class="border border-gray-300 px-4 py-2 text-left" scope="col">Question</th>
            <th class="border border-gray-300 px-4 py-2 text-left" scope="col">Type</th>
            <th class="border border-gray-300 px-4 py-2 text-left" scope="col">Status</th>
            <th class="border border-gray-300 px-4 py-2 text-left" scope="col">Skill</th>
            <th class="border border-gray-300 px-4 py-2 text-left" scope="col">Details</th>
          </tr>
        </thead>
        <tbody>
          ${questionResults.map(q => `
            <tr class="hover:bg-gray-50">
              <td class="border border-gray-300 px-4 py-2">${q.title}</td>
              <td class="border border-gray-300 px-4 py-2">${q.type}</td>
              <td class="border border-gray-300 px-4 py-2">
                <span class="px-2 py-1 rounded text-sm ${q.correct ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">
                  ${q.correct ? 'Correct' : 'Incorrect'}
                </span>
              </td>
              <td class="border border-gray-300 px-4 py-2">${q.skill}</td>
              <td class="border border-gray-300 px-4 py-2">
                <button class="text-blue-600 hover:text-blue-800 underline focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onclick="toggleDetails('${q.id}')"
                        aria-expanded="false"
                        aria-controls="details-${q.id}">
                  ${q.correct ? 'Show' : 'Show Details'}
                </button>
              </td>
            </tr>
            <tr id="details-${q.id}" class="hidden" style="display: none;">
              <td colspan="5" class="border border-gray-300 px-4 py-2 bg-gray-50">
                <div class="space-y-2">
                  <p><strong>Your Answer:</strong> ${q.userAnswer || 'No answer'}</p>
                  <p><strong>Correct Answer:</strong> ${q.correctAnswer}</p>
                  ${!q.correct ? `<p><strong>Explanation:</strong> ${getExplanation(q)}</p>` : ''}
                </div>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;

  container.innerHTML = tableHTML;
}

// Helper for table details toggle
function toggleDetails(questionId) {
  const detailsRow = document.getElementById(`details-${questionId}`);
  const button = document.querySelector(`[aria-controls="details-${questionId}"]`);

  if (detailsRow && button) {
    const isExpanded = detailsRow.style.display !== 'none';
    detailsRow.style.display = isExpanded ? 'none' : 'table-row';
    button.setAttribute('aria-expanded', (!isExpanded).toString());
  }
}

// Make toggleDetails available globally for onclick
window.toggleDetails = toggleDetails;

function getExplanation(question) {
  // Simplified explanations
  const explanations = {
    q1: "The image shows a dog (perro).",
    q2: "The image shows a cat (gato).",
    // Add more explanations as needed
  };
  return explanations[question.id] || "Please review the correct answer.";
}

// Download PDF using html2pdf.js
function downloadPdf(elementId, filename = 'quiz-results.pdf') {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error('Element not found for PDF generation');
    return;
  }

  // Hide chart elements during PDF generation
  const chartElements = element.querySelectorAll('canvas');
  const originalDisplays = [];
  chartElements.forEach(el => {
    originalDisplays.push(el.style.display);
    el.style.display = 'none';
  });

  // html2pdf configuration
  const options = {
    margin: 0.5,
    filename: filename,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
  };

  // Generate PDF and restore chart visibility after
  html2pdf().set(options).from(element).save().then(() => {
    chartElements.forEach((el, index) => {
      el.style.display = originalDisplays[index];
    });
  });
}

// Export for use in components - removed for plain JS
// Unified table-only PDF export (landscape, monochrome, no charts/images)
// Exposes: window.exportResultsToPDF()
(function () {
  // Build minimal quiz/results needed for export in original question order
  function getExportData() {
    // Prefer global data prepared by the results page
    if (typeof window !== 'undefined' && window.data && window.data.quiz && window.data.results) {
      return { quiz: window.data.quiz, results: window.data.results };
    }

    // Fallback: reconstruct from localStorage using existing helpers (checkAnswer)
    try {
      var configJson = localStorage.getItem('quizConfig');
      var participantJson = localStorage.getItem('quizParticipant');

      if (!configJson || !participantJson) {
        throw new Error('Missing quiz data in localStorage (quizConfig or quizParticipant).');
      }

      var config = JSON.parse(configJson);
      var participant = JSON.parse(participantJson);

      var quiz = {
        id: config.id,
        title: config.title,
        questions: (config.questions || []).map(function (q) {
          return { id: q.id, title: q.title, type: q.type };
        })
      };

      var answerMap = {};
      (participant.answers || []).forEach(function (a) {
        answerMap[a.questionId] = a.value;
      });

      var answers = (quiz.questions || []).map(function (q) {
        var value = answerMap[q.id];
        var correct = checkAnswer(q, value);
        return {
          questionId: q.id,
          answer: value != null ? String(value) : '',
          correct: !!correct
        };
      });

      var results = { answers: answers, totalQuestions: (quiz.questions || []).length };
      return { quiz: quiz, results: results };
    } catch (e) {
      console.error('Failed to rebuild export data:', e);
      throw e;
    }
  }

  // Generate a PDF containing only a single table: #, Question, Response, Result (✓/✗)
  function exportResultsToPDF(filename) {
    filename = filename || 'spanish-quiz-results.pdf';

    var jsPDFNS = (window.jspdf && window.jspdf.jsPDF) ? window.jspdf.jsPDF : null;
    if (!jsPDFNS) {
      console.error('jsPDF not available. Ensure the jsPDF UMD script is loaded before calling exportResultsToPDF().');
      return;
    }

    var doc = new jsPDFNS({
      orientation: 'landscape',
      unit: 'in',
      format: 'letter'
    });

    var payload = getExportData();
    var quiz = payload.quiz || { questions: [] };
    var results = payload.results || { answers: [] };

    // Header details
    var participantName = 'User';
    try {
      var pJson = localStorage.getItem('quizParticipant');
      if (pJson) {
        var p = JSON.parse(pJson);
        if (p && p.name) participantName = p.name;
      }
    } catch (e) {}
    var totalQuestions = (typeof results.totalQuestions === 'number') ? results.totalQuestions : (quiz.questions || []).length;
    var totalScore = (typeof results.score === 'number') ? results.score : ((results.answers || []).filter(function (a) { return a.correct; }).length);
    var totalTimeSec = (typeof results.totalTime === 'number') ? results.totalTime : 0;
    var level = results.level || 'A0';

    // Header: title + meta line + divider
    var left = 0.25;
    var top = 0.35;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.text('Results — ' + participantName, left, top);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    var subline = 'Level: ' + level + '   Score: ' + totalScore + ' / ' + totalQuestions + '   Total time: ' + formatSeconds(totalTimeSec);
    doc.text(subline, left, top + 0.22);
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.005);
    var pageWidth = doc.internal.pageSize.getWidth();
    doc.line(left, top + 0.28, pageWidth - left, top + 0.28);
    var startY = top + 0.4;

    var ansById = {};
    (results.answers || []).forEach(function (a) {
      ansById[a.questionId] = a;
    });

    // Body rows in original question order
    var body = (quiz.questions || []).map(function (q, idx) {
      var a = ansById[q.id] || {};
      var resp = a && a.answer != null ? String(a.answer) : '';
      var ok = !!(a && a.correct);
      return [String(idx + 1), q.title || '', resp, ok ? 'Correct' : 'Incorrect'];
    });

    // Table styling: monochrome, wrapping, fixed widths for # and Result columns
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);

    if (typeof doc.autoTable !== 'function') {
      console.error('jsPDF-AutoTable not available. Load the jspdf-autotable plugin script.');
      return;
    }

    doc.autoTable({
      head: [['#', 'Question', 'Response', 'Result']],
      body: body,
      startY: startY,
      // Use narrow margins to maximize width (0.25 in all around)
      margin: { top: 0.25, right: 0.25, bottom: 0.25, left: 0.25 },
      // Avoid splitting a row across pages
      rowPageBreak: 'avoid',
      // Monochrome styling with wrapping
      theme: 'grid',
      // Extra-light, thin borders (units are in inches due to doc unit)
      tableLineWidth: 0.005,
      tableLineColor: [200, 200, 200],
      styles: {
        font: 'helvetica',
        fontSize: 11,
        cellPadding: 0.08,
        overflow: 'linebreak',
        halign: 'left',
        valign: 'top', // top-align multi-line cells
        textColor: 20,
        lineWidth: 0.005,
        lineColor: [200, 200, 200]
      },
      headStyles: {
        fillColor: [240, 240, 240],
        textColor: 20,
        halign: 'left',
        lineWidth: 0.005,
        lineColor: [200, 200, 200]
      },
      bodyStyles: {
        lineWidth: 0.005,
        lineColor: [200, 200, 200]
      },
      columnStyles: {
        // Content width (Letter landscape = 11in; content width ~ 10.5in after 0.25in margins)
        // Widen Result and slightly reduce Question to keep total at ~10.5in
        0: { cellWidth: 0.5, halign: 'left' },   // #
        1: { cellWidth: 5.7, halign: 'left' },   // Question (reduced)
        2: { cellWidth: 3.5, halign: 'left' },   // Response
        3: { cellWidth: 0.8, halign: 'center' }  // Result (wider)
      },
      didParseCell: function (hookData) {
        // Ensure the Result column stays centered
        if (hookData.section === 'body' && hookData.column.index === 3) {
          hookData.cell.styles.halign = 'center';
        }
      }
    });

    doc.save(filename);
  }

  // Expose globally for the static Results page button handler
  window.exportResultsToPDF = exportResultsToPDF;
})();