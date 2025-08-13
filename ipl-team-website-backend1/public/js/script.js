// Wait for the page content to load
document.addEventListener("DOMContentLoaded", async () => {
  try {
    // Fetch player data from the backend API
    const res = await fetch("/api/team");
    const data = await res.json();

    // Get the container where player cards will be displayed
    const playerCards = document.getElementById("playerCards");

    // ✅ Clear any previously rendered cards to avoid duplicates
    playerCards.innerHTML = "";

    // Check if players exist
    if (data.players && data.players.length > 0) {
      data.players.forEach(player => {
        // Create card element
        const card = document.createElement("div");
        card.className = "card";

        // Populate card content
        card.innerHTML = `
        <div class="card-image-container">
          <img src="${player.image}" alt="${player.name || 'RCB Player'}" class="player-image">
        <div class="role-badge">${getRoleEmoji(player.role)}</div>
        </div>
        <div class="card-content">
            <h3>${player.name}</h3>
            <p>${player.role}</p>
        </div>
      `;



        // Append card to container
        playerCards.appendChild(card);
      });
    } else {
      playerCards.innerHTML = "<p>No players available at the moment.</p>";
    }

        // ✅ Render Upcoming Matches
    const matchSchedule = document.getElementById("matchSchedule");
    matchSchedule.innerHTML = ""; // Clear previous

    if (data.matches && data.matches.length > 0) {
      data.matches.forEach(match => {
       const li = document.createElement("div");
        li.className = "match-card";
        li.innerHTML = `
          <strong>vs ${match.opponent}</strong><br/>
          Date: ${match.date}<br/>
          Venue: ${match.venue}
      `;
        matchSchedule.appendChild(li);
      });
    } else {
      matchSchedule.innerHTML = "<div class='alert alert-warning'>No upcoming matches.</div>";
    }

    // ... your existing player and match rendering code here ...

// Render Team Statistics
const teamStats = document.getElementById("teamStats");
teamStats.innerHTML = "";

if (data.stats) {
  teamStats.innerHTML = `
    <p><strong>Matches Played:</strong> ${data.stats.matchesPlayed}</p>
    <p><strong>Wins:</strong> ${data.stats.wins}</p>
    <p><strong>Top Scorer:</strong> ${data.stats.topScorer}</p>
    <p><strong>Top Bowler:</strong> ${data.stats.topBowler}</p>
  `;
} else {
  teamStats.innerHTML = "<p>No statistics available.</p>";
}

  } catch (error) {
    console.error("Error fetching player data:", error);
    document.getElementById("playerCards").innerHTML = "<p>Failed to load players.</p>";
    document.getElementById("matchSchedule").innerHTML = "<li class='list-group-item'>Failed to load matches.</li>";
    document.getElementById("teamStats").innerHTML = "<p>Failed to load statistics.</p>";
  }
});

function getRoleEmoji(role) {
  switch (role.toLowerCase()) {
    case "batter":
      return `<img src="assets/icons/Batter.png" alt="Batter Icon" class="medium-icon">`;
    case "bowler":
      return `<img src="assets/icons/bowler.jpg" alt="Bowler Icon" class="role-icon">`;
    case "wicket keeper":
      return `<img src="assets/icons/wicket keeper.jpg" alt="Wicket Keeper Icon" class="role-icon large-icon">`;
    case "all-rounder":
      return `<img src="assets/icons/All-Rounder.jpg" alt="All-Rounder Icon" class="role-icon large-icon">`;
    case "captain and batter":
      return `<img src="assets/icons/captain cap.jpg" alt="Captain Icon" class="role-icon verylarge-icon">`;
    default:
      return `<img src="assets/icons/default.jpg" alt="Default Icon" class="role-icon">`;
  }
}


