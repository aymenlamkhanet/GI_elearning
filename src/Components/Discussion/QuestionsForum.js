import React, { useState, useEffect } from "react";
import {
  MessageCircle,
  ThumbsUp,
  Send,
  Clock,
  Search,
  Plus,
  Filter,
  User,
  ChevronRight,
} from "lucide-react";

const API_BASE_URL = "http://localhost:8084/api";

const QuestionsForum = () => {
  const [questions, setQuestions] = useState([]);
  const [isAddQuestionOpen, setIsAddQuestionOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/questions?page=0&size=10`
        );
        const data = await response.json();
        const questionsWithReplies = await Promise.all(
          data.content.map(async (question) => {
            const res = await fetch(
              `${API_BASE_URL}/questions/${question.id}/reponses`
            );
            const reponses = await res.json();
            return { ...question, replies: reponses.length };
          })
        );
        setQuestions(questionsWithReplies);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching questions:", error);
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const filteredQuestions = questions.filter((question) => {
    const matchesTerm =
      question.titre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      question.contenu?.toLowerCase().includes(searchTerm.toLowerCase());
    // Note: tags filtering removed as it's not in the Question entity

    if (filter === "all") return matchesTerm;
    return matchesTerm && question.department === filter;
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const AddQuestionModal = () => {
    const [newQuestion, setNewQuestion] = useState({
      titre: "",
      contenu: "",
      department: "info",
      // Tags removed as it's not in the Question entity
    });

    const handleChange = (e) => {
      const { name, value } = e.target;
      setNewQuestion((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
      e.preventDefault();

      try {
        const response = await fetch(`${API_BASE_URL}/questions`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            titre: newQuestion.titre,
            contenu: newQuestion.contenu,
            department: newQuestion.department,
            dateCreation: new Date().toISOString(),
            userId: "user123", // Placeholder - should come from auth
            userName: "User", // Placeholder - should come from auth
            voteCount: 0,
            answerCount: 0,
            viewCount: 0,
          }),
        });

        if (!response.ok) throw new Error("Failed to create question");

        const createdQuestion = await response.json();
        setQuestions((prev) => [createdQuestion, ...prev]);
        setIsAddQuestionOpen(false);
      } catch (error) {
        console.error("Error creating question:", error);
      }
    };

    return (
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-gradient-to-br from-blue-900 to-purple-900 text-white rounded-2xl shadow-xl max-w-2xl w-full mx-4 border border-white/10">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300">
                Poser une question
              </h2>
              <button
                onClick={() => setIsAddQuestionOpen(false)}
                className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="titre" className="block text-blue-200">
                  Titre
                </label>
                <input
                  id="titre"
                  name="titre"
                  value={newQuestion.titre}
                  onChange={handleChange}
                  type="text"
                  placeholder="Soyez spécifique et imaginez que vous posez la question à une autre personne"
                  className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-white/10 text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="contenu" className="block text-blue-200">
                  Contenu
                </label>
                <textarea
                  id="contenu"
                  name="contenu"
                  value={newQuestion.contenu}
                  onChange={handleChange}
                  placeholder="Incluez tous les détails nécessaires pour quelqu'un pour répondre à votre question"
                  className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-white/10 text-white min-h-[150px] focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30"
                  required
                ></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="department" className="block text-blue-200">
                    Département
                  </label>
                  <select
                    id="department"
                    name="department"
                    value={newQuestion.department}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-white/10 text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30"
                    required
                  >
                    <option value="info">Informatique</option>
                    <option value="maths">Mathématiques</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <button
                  type="button"
                  onClick={() => setIsAddQuestionOpen(false)}
                  className="px-4 py-2 rounded-lg bg-gray-800 border border-white/20 text-white hover:bg-gray-700 transition-all"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold shadow-lg shadow-purple-500/20 transition-all"
                >
                  Publier la question
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  const QuestionDetail = ({ question }) => {
    const [reply, setReply] = useState("");
    const [replies, setReplies] = useState([]);

    useEffect(() => {
      const fetchReplies = async () => {
        try {
          const response = await fetch(
            `${API_BASE_URL}/questions/${question.id}/reponses`
          );
          const data = await response.json();
          setReplies(data);
        } catch (error) {
          console.error("Error fetching replies:", error);
        }
      };

      fetchReplies();
    }, [question.id]);

    const handleReplySubmit = async (e) => {
      e.preventDefault();
      if (!reply.trim()) return;

      try {
        const response = await fetch(
          `${API_BASE_URL}/questions/${question.id}/reponses`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              contenu: reply,
              dateCreation: new Date().toISOString(),
              userId: "user123", // Placeholder - should come from auth
              userName: "User", // Placeholder - should come from auth
              voteCount: 0,
              isAccepted: false,
              questionId: question.id,
            }),
          }
        );

        if (!response.ok) throw new Error("Failed to submit reply");

        const newReply = await response.json();
        setReplies((prev) => [...prev, newReply]);
        setReply("");

        // Update answer count in the question
        setSelectedQuestion({
          ...question,
          answerCount: question.answerCount + 1,
        });
      } catch (error) {
        console.error("Error submitting reply:", error);
      }
    };

    const handleVoteQuestion = async (upvote) => {
      try {
        const endpoint = upvote ? "upvote" : "downvote";
        const response = await fetch(
          `${API_BASE_URL}/questions/${question.id}/${endpoint}`,
          { method: "POST" }
        );

        if (!response.ok) throw new Error("Failed to vote");

        const updatedQuestion = await response.json();
        setSelectedQuestion(updatedQuestion);
        setQuestions((prev) =>
          prev.map((q) => (q.id === updatedQuestion.id ? updatedQuestion : q))
        );
      } catch (error) {
        console.error("Error voting:", error);
      }
    };

    const handleVoteReply = async (replyId, upvote) => {
      try {
        const endpoint = upvote ? "upvote" : "downvote";
        const response = await fetch(
          `${API_BASE_URL}/reponses/${replyId}/${endpoint}`,
          { method: "POST" }
        );

        if (!response.ok) throw new Error("Failed to vote");

        const updatedReply = await response.json();
        setReplies((prev) =>
          prev.map((r) => (r.id === updatedReply.id ? updatedReply : r))
        );
      } catch (error) {
        console.error("Error voting:", error);
      }
    };

    return (
      <div className="space-y-6 p-6 bg-gradient-to-br from-blue-900/40 to-purple-900/40 rounded-2xl border border-white/10 shadow-xl">
        <button
          onClick={() => setSelectedQuestion(null)}
          className="flex items-center text-blue-400 hover:text-blue-300 mb-4"
        >
          ← Retour aux questions
        </button>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300">
            {question.titre}
          </h2>

          <div className="flex items-center text-gray-400 text-sm gap-4">
            <div className="flex items-center">
              <User size={14} className="mr-1" />
              <span>{question.userName}</span>
            </div>
            <div className="flex items-center">
              <Clock size={14} className="mr-1" />
              <span>{formatDate(question.dateCreation)}</span>
            </div>
            <div>
              <span className="px-2 py-1 bg-purple-800/50 rounded-full text-xs">
                {question.department === "info"
                  ? "Informatique"
                  : "Mathématiques"}
              </span>
            </div>
          </div>

          <div className="mt-4 text-gray-200 bg-gray-800/50 p-4 rounded-lg border border-white/5">
            {question.contenu}
          </div>

          <div className="flex items-center gap-3 mt-2">
            <button
              onClick={() => handleVoteQuestion(true)}
              className="flex items-center gap-1 text-gray-400 hover:text-blue-400"
            >
              <ThumbsUp size={16} />
              <span>{question.voteCount}</span>
            </button>
            <button
              onClick={() => handleVoteQuestion(false)}
              className="flex items-center gap-1 text-gray-400 hover:text-red-400"
            >
              <ThumbsUp size={16} className="rotate-180" />
            </button>
            <span className="flex items-center gap-1 text-gray-400">
              <MessageCircle size={16} />
              <span>{question.answerCount || replies.length}</span>
            </span>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300 mb-4">
            {replies.length} Réponses
          </h3>

          <div className="space-y-6">
            {replies.map((reply) => (
              <div
                key={reply.id}
                className="p-4 bg-gray-800/50 rounded-lg border-l-4 border-purple-600"
              >
                <div className="flex justify-between">
                  <div className="flex items-center text-gray-400 text-sm gap-2">
                    <span className="font-medium text-blue-300">
                      {reply.userName}
                    </span>
                    <span>{formatDate(reply.dateCreation)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleVoteReply(reply.id, true)}
                      className="flex items-center gap-1 text-gray-400 hover:text-blue-400"
                    >
                      <ThumbsUp size={14} />
                      <span>{reply.voteCount}</span>
                    </button>
                    <button
                      onClick={() => handleVoteReply(reply.id, false)}
                      className="flex items-center gap-1 text-gray-400 hover:text-red-400"
                    >
                      <ThumbsUp size={14} className="rotate-180" />
                    </button>
                  </div>
                </div>
                <div className="mt-2 text-gray-200 whitespace-pre-line">
                  {reply.contenu}
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleReplySubmit} className="mt-6">
            <div className="space-y-3">
              <label
                htmlFor="reply"
                className="block text-blue-200 font-medium"
              >
                Votre réponse
              </label>
              <textarea
                id="reply"
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                placeholder="Partagez votre solution ou posez une question de clarification..."
                className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-white/10 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 placeholder-gray-400 transition-all"
                required
              ></textarea>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold shadow-lg shadow-purple-500/20 transition-all flex items-center gap-2"
                >
                  <Send size={16} />
                  Publier la réponse
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Forum d'Entraide
          </h1>
          <button
            onClick={() => setIsAddQuestionOpen(true)}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold shadow-lg shadow-purple-500/20 transition-all flex items-center gap-2 group"
          >
            <Plus
              size={20}
              className="group-hover:rotate-90 transition-transform"
            />
            Poser une question
          </button>
        </div>

        {!selectedQuestion && (
          <div className="mb-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Rechercher des questions..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-800 border border-white/10 text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30"
                />
                <Search
                  className="absolute left-3 top-2.5 text-gray-400"
                  size={18}
                />
              </div>
            </div>
            <div className="flex items-center space-x-2 overflow-x-auto pb-2">
              <Filter size={18} className="text-gray-400 flex-shrink-0" />
              <button
                onClick={() => handleFilterChange("all")}
                className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${
                  filter === "all"
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
              >
                Tous
              </button>
              <button
                onClick={() => handleFilterChange("info")}
                className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${
                  filter === "info"
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
              >
                Informatique
              </button>
              <button
                onClick={() => handleFilterChange("maths")}
                className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${
                  filter === "maths"
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
              >
                Mathématiques
              </button>
            </div>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        ) : selectedQuestion ? (
          <QuestionDetail question={selectedQuestion} />
        ) : (
          <div className="space-y-4">
            {filteredQuestions.length > 0 ? (
              filteredQuestions.map((question) => (
                <div
                  key={question.id}
                  className="p-4 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl border border-white/10 hover:border-purple-500/50 transition-colors cursor-pointer shadow-lg"
                  onClick={() => setSelectedQuestion(question)}
                >
                  <div className="flex justify-between">
                    <h3 className="text-xl font-medium text-blue-200 hover:text-purple-300 transition-colors">
                      {question.titre}
                    </h3>
                    <ChevronRight className="text-blue-400" />
                  </div>
                  <p className="text-gray-300 mt-2 line-clamp-2">
                    {question.contenu}
                  </p>
                  <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center text-gray-400 text-sm gap-4">
                      <div className="flex items-center">
                        <User size={14} className="mr-1" />
                        <span>{question.userName}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock size={14} className="mr-1" />
                        <span>{formatDate(question.dateCreation)}</span>
                      </div>
                      <div>
                        <span className="px-2 py-1 bg-purple-800/50 rounded-full text-xs">
                          {question.department === "info"
                            ? "Informatique"
                            : "Mathématiques"}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1 text-gray-400">
                        <ThumbsUp size={16} />
                        <span>{question.voteCount}</span>
                      </span>
                      <span className="flex items-center gap-1 text-gray-400">
                        <MessageCircle size={16} />
                        <span>{question.answerCount}</span>
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl border border-white/10 shadow-lg">
                <MessageCircle
                  size={48}
                  className="text-purple-400 mx-auto mb-4"
                />
                <h3 className="text-xl font-medium text-blue-200">
                  Aucune question trouvée
                </h3>
                <p className="text-gray-300 mt-2">
                  {searchTerm
                    ? `Aucun résultat ne correspond à "${searchTerm}"`
                    : "Soyez le premier à poser une question"}
                </p>
                <button
                  onClick={() => setIsAddQuestionOpen(true)}
                  className="mt-4 px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold shadow-lg shadow-purple-500/20 transition-all"
                >
                  Poser une question
                </button>
              </div>
            )}
          </div>
        )}

        {isAddQuestionOpen && <AddQuestionModal />}
      </div>
    </div>
  );
};

export default QuestionsForum;
