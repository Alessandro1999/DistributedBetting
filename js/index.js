/**
 * This function converts wei to ether
 * @param {float} wei 
 * @returns float
 */
function fromWei(wei) 
    { return wei / 1000000000000000000; }
   
/**
 * This function gets the number of entry tokens the user wants to buy and updates the price in ether
 */
function updateEthPrice()
{
    // the amount of entry tokens the user wants to buy
    var quantity = parseInt(document.getElementById("quantity").value);
    // the price of the entry tokens in wei
    var ethPrice = quantity * entryTokensPrice;
    // show the price in ether
    document.getElementById("entryEthPrice").value = fromWei(ethPrice);
}

/**
 * This function gets the number of entry tokens the user wants to buy and mints them
 * @returns 
 */
function mint()
{
    // the amount of entry tokens the user wants to buy
    var quantity = parseInt(document.getElementById("quantity").value);
    // the price of the entry tokens in wei
    var ethPrice = quantity * entryTokensPrice;
    updateEther();
    // check if the user has enough ether
    if(ethPrice > web3.utils.toWei(document.getElementById("ether").innerHTML, "ether"))
    {
        alert("Not enough ether");
        return;
    }
    else
    {
        // mint the entry tokens
        contract.methods.mint().send({from: myAddress, value: ethPrice}).then(function(result) {
        // update the entry tokens
        document.getElementById("entryTokens").innerHTML = parseInt(document.getElementById("entryTokens").innerHTML) + quantity;
        updateEther();
        alert("Congratulations! You have minted " + quantity + " entryTokens");
        });
    }
   
}

/**
 * This function gets the json objects of the matches
 */
async function getMatches()
{
    seriea = await LoadFileToJSON("serieah");
    bundesliga = await LoadFileToJSON("bundesligah");
    ligue1 = await LoadFileToJSON("ligue1h");
    premierleague = await LoadFileToJSON("premierleagueh");
    laliga = await LoadFileToJSON("laligah");
    eredivisie = await LoadFileToJSON("eredivisieh");
}

/**
 * This function shows the matches of the league selected by the user
 * @param {string} leagueId 
 */
function showMatches(leagueId) {
    ids = ["premierleague", "seriea", "laliga", "bundesliga"];
    // make active the button selected by the user
    if (leagueId == "premierleague") 
    {
        currentChampionship = premierleague;
        document.getElementById("premierButton").classList.add("active");
        document.getElementById("aButton").classList.remove("active");
        document.getElementById("laButton").classList.remove("active");
        document.getElementById("bunButton").classList.remove("active");
    } 
    else if (leagueId == "seriea")
    {
        currentChampionship = seriea;
        document.getElementById("aButton").classList.add("active");
        document.getElementById("premierButton").classList.remove("active");
        document.getElementById("laButton").classList.remove("active");
        document.getElementById("bunButton").classList.remove("active");
    }
    else if (leagueId == "laliga")
    {
        currentChampionship = laliga;
        document.getElementById("laButton").classList.add("active");
        document.getElementById("premierButton").classList.remove("active");
        document.getElementById("aButton").classList.remove("active");
        document.getElementById("bunButton").classList.remove("active");
    }
    else if (leagueId == "bundesliga")
    {
        currentChampionship = bundesliga;
        document.getElementById("bunButton").classList.add("active");
        document.getElementById("premierButton").classList.remove("active");
        document.getElementById("aButton").classList.remove("active");
        document.getElementById("laButton").classList.remove("active");
    }
    // load the matches only if they are not already loaded
    if((leagueId == "bundesliga" && !bundesligaCreated) || (leagueId == "laliga" && !laligaCreated) || (leagueId == "seriea" && !serieaCreated) || (leagueId == "premierleague" && !premierleagueCreated)) 
        {
            for(match in currentChampionship)
                {
                    // create the div that contains the match
                    var matchDiv = document.createElement("button");
                    // set some style to the div
                    matchDiv.className = "list-group-item btn-outline-light list-group-item-action";
                    matchDiv.style.backgroundColor = "#201e26";
                    // create the labels that contain the match information such as date and time
                    var timeLabel = document.createElement("label");
                    timeLabel.style.color = "white";
                    timeLabel.style.display = "inline-block";
                    timeLabel.style.width = "300px";
                    timeLabel.style.textAlign = "left";
                    timeLabel.innerHTML = currentChampionship[match].date + "-" + currentChampionship[match].time;
                    // create the labels that contain home team and away team
                    var matchLabel = document.createElement("label");
                    matchLabel.style.color = "white";
                    matchLabel.style.display = "inline-block";
                    matchLabel.style.width = "300px";
                    matchLabel.style.textAlign = "center";
                    // create the div for the odds
                    var odds = document.createElement("div");
                    odds.className = "btn-group";
                    odds.style.display = "inline-block";
                    odds.style.float = "right";
                    odds.style.width = "300px";
                    odds.style.textAlign = "right";
                    // create the button for the home odds
                    var homeOdds = document.createElement("button");
                    homeOdds.name = "homeOdds";
                    homeOdds.id = match;
                    homeOdds.className = "btn btn-outline-light";
                    homeOdds.style.width = "100px";
                    homeOdds.innerHTML = "1";
                    var homeOddsLabel = document.createElement("label");
                    homeOddsLabel.style.color = "white";
                    homeOddsLabel.style.display = "inline-block";
                    homeOddsLabel.style.width = "100px";
                    homeOddsLabel.style.textAlign = "center";
                    homeOddsLabel.innerHTML = currentChampionship[match].homeodds;
                    // create the button for the draw odds
                    var drawOdds = document.createElement("button");
                    drawOdds.name = "drawOdds";
                    drawOdds.id = match;
                    drawOdds.className = "btn btn-outline-light";
                    drawOdds.style.width = "100px";
                    drawOdds.innerHTML = "X";
                    var drawOddsLabel = document.createElement("label");
                    drawOddsLabel.style.color = "white";
                    drawOddsLabel.style.display = "inline-block";
                    drawOddsLabel.style.width = "100px";
                    drawOddsLabel.style.textAlign = "center";
                    drawOddsLabel.innerHTML = currentChampionship[match].X;
                    // create the button for the away odds
                    var awayOdds = document.createElement("button");
                    awayOdds.name = "awayOdds";
                    awayOdds.id = match;
                    awayOdds.style.width = "100px";
                    awayOdds.className = "btn btn-outline-light";
                    awayOdds.innerHTML = "2";
                    var awayOddsLabel = document.createElement("label");
                    awayOddsLabel.style.color = "white";
                    awayOddsLabel.style.display = "inline-block";
                    awayOddsLabel.style.width = "100px";
                    awayOddsLabel.style.textAlign = "center";
                    awayOddsLabel.innerHTML = currentChampionship[match].awayodds;
                    // append the elements to the div
                    odds.appendChild(homeOdds);
                    odds.appendChild(drawOdds);
                    odds.appendChild(awayOdds);
                    odds.appendChild(homeOddsLabel);
                    odds.appendChild(drawOddsLabel);
                    odds.appendChild(awayOddsLabel);
                    matchLabel.innerHTML = currentChampionship[match].home_team + " - " + currentChampionship[match].away_team;
                    matchDiv.appendChild(timeLabel);
                    matchDiv.appendChild(matchLabel);
                    matchDiv.appendChild(odds);
                    document.getElementById(leagueId).appendChild(matchDiv);
                }
            if(leagueId == "bundesliga")
                bundesligaCreated = true;
            else if(leagueId == "laliga")
                laligaCreated = true;
            else if(leagueId == "seriea")
                serieaCreated = true;
            else if(leagueId == "premierleague")
                premierleagueCreated = true;
        }
    // hide the matches of the other leagues and show the matches of the selected ones
    for(championship in ids)
        {
            if (ids[championship] != leagueId)
                document.getElementById(ids[championship]).style.display = "none";
            else
                document.getElementById(ids[championship]).style.display = "block";
        }
    // add the onclick event to the buttons
    var homeOddsButtons = document.getElementsByName("homeOdds");
    var drawOddsButtons = document.getElementsByName("drawOdds");
    var awayOddsButtons = document.getElementsByName("awayOdds");
    // add the onclick event to the buttons
    for(var i = 0; i < homeOddsButtons.length; i++)
    {
        homeOddsButtons[i].onclick = function()
        {
            var match = currentChampionship[this.id];
            betList("1", match.home_team, match.away_team, match.homeodds);
        }
    }
    for(var i = 0; i < drawOddsButtons.length; i++)
    {
        drawOddsButtons[i].onclick = function()
        {
            var match = currentChampionship[this.id];
            betList("X", match.home_team, match.away_team, match.X);
        }
    }
    for(var i = 0; i < awayOddsButtons.length; i++)
    {
        awayOddsButtons[i].onclick = function()
        {
            var match = currentChampionship[this.id];
            betList("2", match.home_team, match.away_team, match.awayodds);
        }
    }
}

/**
 * This function creates and display the list of the bets
 * @param {string} bet 
 * @param {string} home_team 
 * @param {string} away_team 
 * @param {string} odds 
 * @returns 
 */
function betList(bet, home_team, away_team, odds)
{
    // change the visibility of the input and the buttons
    var betTokens = document.getElementById("betTokens");
    var eraseButton = document.getElementById("btnErase");
    var betBtn = document.getElementById("btnBet");
    betTokens.className = "d-block";
    betBtn.className = "btn btn-outline-light text-align-center d-block";
    eraseButton.className = "btn btn-outline-light text-align-center d-block";
    var betUl = document.getElementById("betslist");
    // check if the bet is already in the list by checking the home team
    if (betUl.childElementCount > 0)
    {
        for(var i = 0; i < betUl.childElementCount; i++)
        {
            var li = betUl.children[i];
            var liHomeTeam = li.innerHTML.split(" - ")[0];
            if (liHomeTeam == home_team)
            {
                alert("You have already bet on this match");
                return;
            }
        }
    }
    // create the list item
    var betLi = document.createElement("li");
    betLi.className = "list-group-item";
    betLi.style.color = "white";
    betLi.style.backgroundColor = "transparent";
    betLi.style.fontSize = "13px";
    betLi.style.width = "100%";
    betLi.style.marginBottom = "5px";
    betLi.style.padding = "5px";
    betLi.style.borderRadius = "5px";
    betLi.innerHTML = home_team + " - " + away_team + " " + bet + " " + odds;
    betUl.appendChild(betLi);
}

/**
 * This function is used to erase the list of the bets
 * 
 */
function removeList()
{
    var ul = document.getElementById("betslist");
    // remove only <li> elements
    while(ul.childElementCount > 1)
    {
        ul.removeChild(ul.lastChild);
    }
    // change the visibility of the input and the buttons
    var betTokens = document.getElementById("betTokens");
    var eraseButton = document.getElementById("btnErase");
    var betBtn = document.getElementById("btnBet");
    betBtn.className = "btn btn-outline-light text-align-center d-none";
    betTokens.className = "d-none";
    eraseButton.className = "btn btn-outline-light text-align-center d-none";
}

/**
 * This function is used to refresh the progress bar when the user wants to scrape the data
 */
function refreshProgress() 
{
    progbar = document.getElementById("progress-bar");
    progbar.style.display = "block";
    var value = 0;
    function update() 
    {
        if (value >= 171)
        {
            clearInterval(id);
            progbar.style.display = "none";
            document.getElementById("scrapeForm").submit();
        }
        else 
        {
            progbar.style.width = value + "%";
            progbar.setAttribute("aria-valuenow", value);
            value += 1.71;
        }
    }
    var id = setInterval(update, 2600);
}