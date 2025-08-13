document.addEventListener("DOMContentLoaded", async () => {
  const res = await fetch("/api/team");
  const data = await res.json();

  const matchList = document.getElementById("matchSchedule");
  data.matches.forEach(match => {
    const item = document.createElement("li");
    item.className = "list-group-item";
    item.innerText = `${match.date}: vs ${match.opponent} at ${match.venue}`;
    matchList.appendChild(item);
  });

  const playerCards = document.getElementById("playerCards");
  data.players.forEach(player => {
    const col = document.createElement("div");
    col.className = "col-md-4 mb-3";
    col.innerHTML = `
      <div class="card">
        <img src="${player.image}" class="card-img-top" alt="${player.name}">
        <div class="card-body">
          <h5 class="card-title">${player.name}</h5>
          <p class="card-text">${player.role}</p>
        </div>
      </div>`;
    playerCards.appendChild(col);
  });

  const stats = data.stats;
  document.getElementById("teamStats").innerHTML = `
    <p><strong>Matches Played:</strong> ${stats.matchesPlayed}</p>
    <p><strong>Wins:</strong> ${stats.wins}</p>
    <p><strong>Top Scorer:</strong> ${stats.topScorer}</p>
    <p><strong>Top Bowler:</strong> ${stats.topBowler}</p>
  `;

  document.getElementById("pollForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const choice = document.querySelector('input[name="vote"]:checked');
    if (choice) alert(`Thanks for voting for ${choice.value}!`);
    else alert("Please select a player to vote.");
  });
});
