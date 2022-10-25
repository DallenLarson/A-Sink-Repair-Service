import { getCompletions, getRequests, getPlumbers, saveCompletion } from "./dataAccess.js"
import { deleteRequest } from "./dataAccess.js"

const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("click", click => {
    if (click.target.id.startsWith("request--")) {
        const [,requestId] = click.target.id.split("--")
        deleteRequest(parseInt(requestId))
    }
})

mainContainer.addEventListener(
    "change",
    (event) => {
        if (event.target.id === "plumbers") {
            const [requestId, plumberId] = event.target.value.split("--")

            /*
                This object should have 3 properties
                   1. requestId
                   2. plumberId
                   3. date_created
            */
            const completion = {
                requestId: requestId,
                plumberId: plumberId,
                dateCreated: Date.now()
             }
            /*
                Invoke the function that performs the POST request
                to the `completions` resource for your API. Send the
                completion object as a parameter.
             */
            saveCompletion(completion)

        }
    }
)

export const Requests = () => {
    const requests = getRequests()
    const completions = getCompletions()
    
    const incompletedRequests = requests.filter(request =>
        !completions.find(completion => request.id === completion.requestId)) 

    let html = `
        <ul>
            ${incompletedRequests.map(incomplete).join("")}
        </ul>
    `
    return html
}

const incomplete = (requestObj) => {
    const plumbers = getPlumbers()

    return `
        <li>${requestObj.name} -- ${requestObj.description}&nbsp;&nbsp;&nbsp;
        
        <select class="plumbers" id="plumbers">
        <option value="">☆ Choose ☆</option>
        ${
            plumbers.map(
                plumber => {
                        return `<option value="${requestObj.id}--${plumber.id}">${plumber.name}</option>`
                    }
                ).join("")
            }
        </select>

        <button class="requestDelete" id="request--${requestObj.id}">Delete</button>
        </li>
        `
}

export const Completion = () => {
    const requests = getRequests()
    const completions = getCompletions()

    const completedRequests = requests.filter(request => 
        completions.find(completion => request.id === completion.id))

    let html = `
        <ul>
            ${completedRequests.map(completed).join("")}
        </ul>
    `

    return html
}

const completed = (requestObj) => {

    return `
        <li><b>${requestObj.name}</b>'s service request is complete & customer will be notified.
    
        <button class="requestDelete" id="request--${requestObj.id}">Delete</button>
        </li>
        `
}

//NOTE TO SELF: DALLEN PLEASE COME BACK TO THIS!!!

/* 

.FILTER METHOD (will return ALL data that matches) 

const namesThatStartWithM = nameArray.filter(name => name.startsWith('M')) // ['Morgan', 'Maria'] // after .filter = anaoymous function

.FIND METHOD (returns the first data that matches & doesn't check the rest of the data)

const sName = nameArray.find(name => name.startsWith('S')) // ['Samuel']

*/