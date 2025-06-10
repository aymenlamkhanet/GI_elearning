export const getBadgeInfo = (
  fireScore = 0,
  contentInteractions = 0,
  forumContributions = 0
) => {
  // Ensure inputs are numbers
  fireScore = Number(fireScore) || 0;
  contentInteractions = Number(contentInteractions) || 0;
  forumContributions = Number(forumContributions) || 0;

  // Main badge calculation
  let mainBadge = {
    tier: "Newbie",
    icon: "FiUser", // Newbie
    color: "gray",
    score: fireScore,
  };

  if (fireScore >= 1000) {
    mainBadge = {
      tier: "Legend",
      icon: "FiStar", // Legend
      color: "purple",
      score: fireScore,
    };
  } else if (fireScore >= 500) {
    mainBadge = {
      tier: "Master",
      icon: "FiAward", // Master
      color: "gold",
      score: fireScore,
    };
  } else if (fireScore >= 300) {
    mainBadge = {
      tier: "Scholar",
      icon: "FiBook", // Scholar
      color: "blue",
      score: fireScore,
    };
  } else if (fireScore >= 150) {
    mainBadge = {
      tier: "Contributor",
      icon: "FiActivity", // Contributor
      color: "orange",
      score: fireScore,
    };
  } else if (fireScore >= 50) {
    mainBadge = {
      tier: "Explorer",
      icon: "FiCompass", // Explorer
      color: "green",
      score: fireScore,
    };
  }

  // Additional badges
  const additionalBadges = [];

  if (contentInteractions >= 100) {
    additionalBadges.push({ icon: "FiBookOpen", title: "Bookworm" });
  } else if (contentInteractions >= 20) {
    additionalBadges.push({ icon: "FiFileText", title: "Reader" });
  }

  if (forumContributions >= 50) {
    additionalBadges.push({
      icon: "FiMessageSquare",
      title: "Top Contributor",
    });
  } else if (forumContributions >= 10) {
    additionalBadges.push({ icon: "FiMessageCircle", title: "Active" });
  }

  return {
    mainBadge,
    additionalBadges,
  };
};
