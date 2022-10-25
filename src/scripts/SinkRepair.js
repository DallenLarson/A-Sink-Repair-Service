import { ServiceForm } from "./ServiceForm.js"
import { Completion } from "./Request.js"
import { Requests } from "./Request.js"


export const SinkRepair = () => {
    return `
        <h1>🛠️ Maude & Merle's Sink Repair 🛠️</h1>

        <section class="serviceForm">
            ${ServiceForm()}
        </section>

        <section class="serviceRequests">
            <h2>Service Requests</h2>
             ${Requests()}
        </section>

        <section class="Completed">
            <h2>Completed Requests</h2>
           ${Completion()}
    </section>
    `
}
