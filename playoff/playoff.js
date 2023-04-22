const pickTeam = (event) => {

    let team = event.target

    while(!team.classList.contains('team')){
        team = team.parentNode
    }

    const teamLogo = team.children[0].children[0]

    if(teamLogo.classList.contains('lose')){
        const gameID = team.parentNode.parentNode["id"]

        // костыль
        if (gameID === "game4"){
            const targetCardId = document.querySelector("#game6").children[1].children[2].id
            pickCascade(team.id, targetCardId)
        }

        let vsTeam
        for(let node of team.parentNode.children){
            if(node.classList.contains('team') && node.id !== team.id){
                vsTeam = node
                break
            }
        }

        const vsLogo = vsTeam.children[0].children[0]

        styleTeamLogos(teamLogo, vsLogo)

        teamPicked(gameID, team.id)
    }
}

const teamPicked = (gameID, pickedTeam) => {
    // Logic
}

const styleTeamLogos = (winTeamLogo, loseTeamLogo) => {
    winTeamLogo.classList.remove('lose')
    loseTeamLogo.classList.add('lose')
}

const setTeamPick = (gameID, pickedTeamID) => {
    const game = document.querySelector(`#game${gameID}`)
    const teams = Array.from(game.children[1].children).filter((item) => item.id)

    let winTeam;
    // let loseTeam;

    winTeam = teams.find((team) => team.id === `team${pickedTeamID}`)
    // loseTeam = teams.find((team) => team !== winTeam)

    winTeam.click()
    // styleTeamLogos(winTeam.children[0].children[0], loseTeam.children[0].children[0])
}

const setPickResult = (gameID, result) => {
    const game = document.querySelector(`#game${gameID}`)

    const resultNode = document.createElement('div')
    game.append(resultNode)

    if(result){
        resultNode.setAttribute('style',
            `position: absolute; width: 33px; height: 33px; background-image: url("../assets/checkGroups.svg"); margin-left: ${game.offsetWidth - 19 + 25}px`
        )
    }else {
        resultNode.setAttribute('style',
            `position: absolute; width: 33px; height: 33px; background-image: url("../assets/crossGroups.svg"); margin-left: ${game.offsetWidth - 19 + 25}px`
        )
    }
}

// Пример
//setPickResult(1, 0)
// setTeamPick(1, 2);

const pickCascade = (idWinCard, idRelatedCard) => {
    const result = document.querySelector(`#${idWinCard}`)
    const related = document.querySelector(`#${idRelatedCard}`)

    const resultLogo = result.children[0].children[0].getAttribute('style');
    const resultText= result.children[1].innerHTML
    const resultID= result.id

    related.children[0].children[0].setAttribute("style", resultLogo);
    related.children[1].innerHTML = resultText;
    related.id = resultID
}
// Изначальная карта teamID, куда вписать teamID
// pickCascade(4, 1)