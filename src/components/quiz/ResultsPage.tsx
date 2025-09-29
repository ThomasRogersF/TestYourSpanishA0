
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { QuizConfig, QuizParticipant, ResultTemplate } from "@/types/quiz";
import { ArrowRight } from "lucide-react";
import { buildResultsSummary } from "@/utils/quizUtils";

interface ResultsPageProps {
  config?: QuizConfig;
  participant?: QuizParticipant;
  personalizedResult?: ResultTemplate | null;
  onContinue?: () => void;
}

const ResultsPage = ({
  config: propConfig,
  participant: propParticipant,
  personalizedResult: propPersonalizedResult,
  onContinue
}: ResultsPageProps) => {
  const [config, setConfig] = useState<QuizConfig | undefined>(propConfig);
  const [participant, setParticipant] = useState<QuizParticipant | undefined>(propParticipant);
  const [personalizedResult, setPersonalizedResult] = useState<ResultTemplate | null | undefined>(propPersonalizedResult);
  const [resultsJSONVisible, setResultsJSONVisible] = useState(false);
  const [resultsPayload, setResultsPayload] = useState<any | null>(null);

  // Load fallback from localStorage if props are missing (keeps parity with static debug page)
  useEffect(() => {
    if (!propConfig || !propParticipant) {
      try {
        const storedConfig = localStorage.getItem("quizConfig");
        const storedParticipant = localStorage.getItem("quizParticipant");
        const storedPersonalized = localStorage.getItem("personalizedResult");

        if (storedConfig && !propConfig) {
          setConfig(JSON.parse(storedConfig));
        }
        if (storedParticipant && !propParticipant) {
          setParticipant(JSON.parse(storedParticipant));
        }
        if (storedPersonalized && !propPersonalizedResult) {
          setPersonalizedResult(JSON.parse(storedPersonalized));
        }
      } catch (e) {
        console.error("Failed to parse results from localStorage", e);
      }
    }
  }, [propConfig, propParticipant, propPersonalizedResult]);

  // Build results payload once config & participant are available
  useEffect(() => {
    if (config && participant) {
      const summary = buildResultsSummary(config, participant, personalizedResult || undefined);
      setResultsPayload({ quiz: { id: config.id, title: config.title, questions: config.questions }, results: summary });
    } else {
      setResultsPayload(null);
    }
  }, [config, participant, personalizedResult]);

  const onContinueClicked = () => {
    if (onContinue) onContinue();
  };

  // Memoized display values
  const scoreDisplay = useMemo(() => {
    if (!resultsPayload) return null;
    const r = resultsPayload.results;
    return `${r.score}/${r.totalQuestions}`;
  }, [resultsPayload]);

  const totalTimeDisplay = useMemo(() => {
    if (!resultsPayload) return "0:00";
    const totalSec = resultsPayload.results.totalTime || 0;
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins}:${String(secs).padStart(2, "0")}`;
  }, [resultsPayload]);

  return (
    <div className="quiz-container w-full max-w-4xl shadow-soft">
      <div className="flex justify-center mb-6">
        <img
          src={config?.logoUrl || "/placeholder.svg"}
          alt={`${config?.title || "Quiz"} logo`}
          className="h-14 w-auto"
        />
      </div>

      <h1 className="quiz-title">Your Results 🎉</h1>

      {personalizedResult ? (
        <>
          <h2 className="text-2xl font-bold mb-4 text-brand-primary">{personalizedResult.title}</h2>
          <p className="text-gray-600 mb-6 text-left p-4 bg-brand-background rounded-[1rem]">{personalizedResult.description}</p>
        </>
      ) : (
        <p className="text-gray-600 mb-6">
          Thank you for completing the quiz! Here's a summary of your performance.
        </p>
      )}

      <div className="border-t border-gray-200 my-6 pt-6">
        <h3 className="text-lg font-bold mb-4 text-brand-secondary">Personal Summary</h3>
        <div className="bg-brand-background p-5 rounded-[1rem] mb-6">
          <p className="font-medium">👤 Name: <span className="font-normal">{participant?.name || "—"}</span></p>
          <p className="font-medium">✉️ Email: <span className="font-normal">{participant?.email || "—"}</span></p>
        </div>
      </div>

      {/* High level stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm text-center">
          <div className="text-sm text-gray-500">Score</div>
          <div className="text-2xl font-bold">{scoreDisplay || "—"}</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm text-center">
          <div className="text-sm text-gray-500">Total Time</div>
          <div className="text-2xl font-bold">{totalTimeDisplay}</div>
        </div>
      </div>

      {/* Answers table */}
      <div className="question-review bg-white rounded-lg p-4 mb-6">
        <h3 className="font-semibold mb-3">Question Review</h3>
        <div className="table-container overflow-x-auto">
          <table className="question-table w-full">
            <thead>
              <tr>
                <th className="text-left pr-4">#</th>
                <th className="text-left pr-4">Prompt</th>
                <th className="text-left pr-4">Your Answer</th>
                <th className="text-left pr-4">Correct</th>
              </tr>
            </thead>
            <tbody>
              {resultsPayload && resultsPayload.results && resultsPayload.results.answers && resultsPayload.results.answers.length > 0 ? (
                resultsPayload.results.answers.map((a: any, i: number) => (
                  <tr key={a.questionId} className="align-top">
                    <td className="pr-4">{i + 1}</td>
                    <td className="pr-4">{config?.questions.find(q => q.id === a.questionId)?.title || a.questionId}</td>
                    <td className="pr-4">{a.answer || "No answer"}</td>
                    <td className="pr-4">
                      <span className={a.correct ? "status-correct" : "status-incorrect"}>
                        {a.correct ? "Correct" : "Incorrect"}
                      </span>
                      <div className="text-sm text-gray-500 mt-1">Ans: {a.correctAnswer || "—"}</div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-sm text-gray-500 p-4">No answers to display.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-500">
          Your results have been saved and (if configured) will be sent to your email. You can also download a debug JSON below.
        </p>
      </div>

      <div className="flex gap-3">
        <Button className="quiz-button w-full" onClick={onContinueClicked}>
          Continue <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
        <Button variant="outline" onClick={() => setResultsJSONVisible(v => !v)}>
          {resultsJSONVisible ? "Hide Debug JSON" : "Show Debug JSON"}
        </Button>
      </div>

      {resultsJSONVisible && (
        <pre className="debug-json mt-4 p-3 bg-gray-50 rounded-md">
          {JSON.stringify(resultsPayload, null, 2)}
        </pre>
      )}

      <div className="mt-6 p-4 bg-brand-background rounded-[1rem] border border-gray-200">
        <p className="text-sm text-gray-600 italic">
          This isn't a formal test to evaluate your Spanish skills — it's just a fun way to get to know you better so we can send you personalized recommendations, resources, and exclusive deals from SpanishVIP. 🎁✨
        </p>
      </div>
    </div>
  );
};

export default ResultsPage;
