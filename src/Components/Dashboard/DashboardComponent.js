import {
  BookOpen,
  Users,
  ClipboardList,
  Star,
  CalendarDays,
  BarChart,
  PieChart,
  Clock,
  ChevronRight,
  UserPlus,
  RefreshCw,
  FileText,
} from "lucide-react";

const DashboardComponent = () => {
  // Mock data
  const stats = [
    {
      id: 1,
      title: "Cours totaux",
      value: "145",
      icon: BookOpen,
      change: "+12%",
      changeColor: "text-green-400",
    },
    {
      id: 2,
      title: "Étudiants actifs",
      value: "3.8K",
      icon: Users,
      change: "+8%",
      changeColor: "text-blue-400",
    },
    {
      id: 3,
      title: "Examens passés",
      value: "1.2K",
      icon: ClipboardList,
      change: "+15%",
      changeColor: "text-purple-400",
    },
    {
      id: 4,
      title: "Satisfaction",
      value: "4.8/5",
      icon: Star,
      change: "+0.2",
      changeColor: "text-yellow-400",
    },
  ];

  const recentActivities = [
    {
      id: 1,
      title: "Nouvel étudiant inscrit",
      user: "Jean Dupont",
      time: "Il y a 2h",
      icon: UserPlus,
    },
    {
      id: 2,
      title: "Cours mis à jour",
      course: "JavaScript Avancé",
      time: "Aujourd'hui",
      icon: RefreshCw,
    },
    {
      id: 3,
      title: "Nouvel examen ajouté",
      course: "IA Fondamentale",
      time: "Hier",
      icon: FileText,
    },
    {
      id: 4,
      title: "Évaluation soumise",
      user: "Marie Curie",
      time: "Il y a 5h",
      icon: Star,
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
          Tableau de Bord
        </h2>
        <div className="flex items-center space-x-4">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
            <button className="relative flex items-center px-4 py-2 bg-gray-800/50 backdrop-blur-sm rounded-lg border border-white/10 hover:border-purple-400/30 transition-all">
              <CalendarDays className="w-5 h-5 mr-2 text-purple-400" />
              <span>18 Mars 2024</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className="bg-gray-800/30 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:border-purple-400/30 transition-all relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400 text-sm">{stat.title}</p>
                <p className="text-3xl font-bold mt-2">{stat.value}</p>
                <p className={`text-sm mt-1 ${stat.changeColor}`}>
                  {stat.change}
                </p>
              </div>
              <div className="p-3 bg-purple-500/20 rounded-lg">
                <stat.icon className="w-6 h-6 text-purple-400" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Enrollment Chart */}
        <div className="bg-gray-800/30 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:border-purple-400/30 transition-all">
          <h3 className="text-xl font-bold mb-6 flex items-center space-x-2">
            <BarChart className="w-6 h-6 text-blue-400" />
            <span>Inscriptions par Mois</span>
          </h3>
          <div className="h-64 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-xl flex items-center justify-center">
            <span className="text-gray-500">Graphique des inscriptions</span>
          </div>
        </div>

        {/* Course Distribution */}
        <div className="bg-gray-800/30 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:border-purple-400/30 transition-all">
          <h3 className="text-xl font-bold mb-6 flex items-center space-x-2">
            <PieChart className="w-6 h-6 text-purple-400" />
            <span>Répartition des Cours</span>
          </h3>
          <div className="h-64 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-xl flex items-center justify-center">
            <span className="text-gray-500">Graphique circulaire</span>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-gray-800/30 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:border-purple-400/30 transition-all">
        <h3 className="text-xl font-bold mb-6 flex items-center space-x-2">
          <Clock className="w-6 h-6 text-green-400" />
          <span>Activité Récente</span>
        </h3>
        <div className="space-y-4">
          {recentActivities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center space-x-4 p-4 bg-gray-900/20 rounded-lg hover:bg-gray-900/30 transition-colors"
            >
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <activity.icon className="w-5 h-5 text-purple-400" />
              </div>
              <div className="flex-1">
                <p className="font-medium">{activity.title}</p>
                <p className="text-sm text-gray-400">
                  {activity.course || activity.user} • {activity.time}
                </p>
              </div>
              <button className="p-2 hover:bg-gray-800/50 rounded-lg">
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


export default DashboardComponent;