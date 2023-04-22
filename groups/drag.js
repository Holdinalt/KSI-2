function dragStart(event)
{
    row = event.target;

    const canvas = document.createElement('canvas')
    canvas.width = 1
    canvas.height = 1

    const ctx = canvas.getContext('2d')
    ctx.fillStyle = 'rgba(0, 0, 0, 0)'
    ctx.fillRect(0, 0, 1, 1)

    const img = new Image(1, 1)
    img.src = canvas.toDataURL()
    event.dataTransfer.setDragImage(img, 1, 1);

    return false;
}

function dragOver(event)
{
    event.preventDefault();

    let targetCard = event.target;

    while (!targetCard.classList.contains("group-team-card")){
        targetCard = targetCard.parentNode
    }

    let parentNodeIdNumber = targetCard.id.replace(/[^0-9]/g, '');
    let rowIdNumber = row.id.replace(/[^0-9]/g, '');

    if (((parentNodeIdNumber > 5 && rowIdNumber > 5) || (parentNodeIdNumber <= 5 && rowIdNumber <= 5)) && parentNodeIdNumber !== rowIdNumber)
    {
        let rowParent = row.parentNode

        targetCard.parentNode.append(row);
        rowParent.append(targetCard)

        swapMembersIDs('member' + parentNodeIdNumber, 'member' + rowIdNumber);
    }
}

function swapMembersIDs(parentMemberID, rowMemberID)
{
    let parentMember = document.getElementById(parentMemberID);
    let rowMember = document.getElementById(rowMemberID);

    parentMember.id = "temp";
    rowMember.id = parentMemberID;
    parentMember.id = rowMemberID;
}


const setPredictionResult = (team, result) => {

    const resultNode = document.createElement('div')

    const card = team.parentNode;
    card.append(resultNode)

    if(result){
        resultNode.setAttribute('style',
            `position: absolute; width: 33px; height: 33px; background-image: url("../assets/checkGroups.svg"); margin-left: ${card.offsetWidth - 12 + 25}px`
        )
    }else {
        resultNode.setAttribute('style',
            `position: absolute; width: 33px; height: 33px; background-image: url("../assets/crossGroups.svg"); margin-left: ${card.offsetWidth - 12 + 25}px`
        )
    }

}

// не забудь, что нужны id в верстке. id от драга подойдут
//пример
const temp = 6;
setPredictionResult(document.querySelector(`#member${temp}`), 1)
//пример
setPredictionResult(document.querySelector(`#member${1}`), 0)

