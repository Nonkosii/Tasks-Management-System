import { useEffect } from "react"
import { activeId, closeModel, deleteAppointment } from "./Lib"

export default function Delete(props) {

    const deleteApp = () => {
        deleteAppointment(activeId.id).then(result => {
            console.log("Deleted successfully: ", result)
            props.refreshApp(Math.random() * 240 * Math.random())
        }).catch(e => console.log("Could not delete the appointment: ", e))

        closeModel("delete-model")
    }

    useEffect(() => {
    }, [props.stateListener])


    return (
        <div className="model-container">
            <div className="model-title red-text">Warning deleting the Appointment</div>
            <p>Are you sure you want to delete this Appointment?</p>

            <div className="row justify-btw model-action-container new-address">
                <div className="btn" onClick={() => closeModel("delete-model")}>Cancel</div>

                <div className="btn" onClick={deleteApp}>Yes</div>
            </div>
        </div>
    )
}