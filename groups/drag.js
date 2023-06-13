let row;

class Drag{

    dragRow;

    column = [];

    constructor() {

    }

    append = (elem) => {
        this.column.push(elem)

        elem.setAttribute('draggable', true)
        elem.addEventListener('dragstart', (ev) => this.dragStart(ev))
        elem.addEventListener('dragover', (ev) => this.dragOver(ev))
        elem.addEventListener('dragend', (ev) => this.dragEnd(ev))
        // elem.setAttribute('ondragstart', )
        // elem.setAttribute('ondragover', (event) => this.dragOver(event))
    }

    dragStart = (event) => {


        this.dragRow = event.target

        // let crt = event.target.cloneNode(true)
        // crt.style.opacity = 10;

        // document.body.appendChild(crt);
        // event.dataTransfer.setDragImage(crt, 0, 0)

        setTimeout(() => {
            this.dragRow.classList.add('hide')
        });





        console.log(this.dragRow)

        return false
    }

    dragEnd = (event) => {

        this.dragRow.classList.remove('hide')
    }

    dragOver = (event) => {
        event.preventDefault();

        let target = event.target;

        while (!target.classList.contains("group-team-card")){
            target = target.parentNode
        }

        if(target.id === this.dragRow.id){
            return
        }

        this.swapElems(this.dragRow, target)
    }

    swapElems = (first, second) => {

        let firstIndex = this.column.findIndex((elem) => elem.id === first.id)
        let secondIndex = this.column.findIndex((elem) => elem.id === second.id)

        if(firstIndex !== -1 && secondIndex !== -1){
            this.column[firstIndex] = second;
            this.column[secondIndex] = first;

            this.swapElemsInHtml(first, second)
        }

        console.log(this.column)
    }

    swapElemsInHtml = (first, second) => {
        let firstRowParent = first.parentNode

        second.parentNode.append(first);
        firstRowParent.append(second)
    }
}

let dragB = new Drag();

dragB.append(document.getElementById("member6"))
dragB.append(document.getElementById("member7"))
dragB.append(document.getElementById("member8"))
dragB.append(document.getElementById("member9"))
dragB.append(document.getElementById("member10"))



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
// const temp = 6;
// setPredictionResult(document.querySelector(`#member${temp}`), 1)
//пример
// setPredictionResult(document.querySelector(`#member${1}`), 0)

