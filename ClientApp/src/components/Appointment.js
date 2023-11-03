import { activeId, openModel, user_entry } from "./Lib";

export default function Appointment(props) {

    const handleDelete = (id) => {
        activeId.id = id
        //update state
        props.stateListener(Math.random() * 848 * Math.random())

        openModel("delete-model")
    }

    const handleEdit = (row) => {
        Object.assign(user_entry, row)

        //update state
        props.stateListener(Math.random() * 548 * Math.random())

        openModel("edit-model")
    }

    const levelOfImportance = ["Very Low", "Low", "Normal", "Medium", "High", "Very High"];

    return (
        <div className={` row p-UpBottom underline ${props.item.delete ? 'bc-red' : props.item.done ? 'bc-green' : ''}`} key={props.item.id}>
            <div className="column id">{props.item.id}</div>
            <div className="column title">{props.item.title}</div>
            <div className="column description">{props.item.description}</div>
            <div className={`column importance ${props.item.levelOfImportance === 0 ? 'bc-green' :
                props.item.levelOfImportance === 4 ? 'bc-gold' : props.item.levelOfImportance === 5 ? 'bc-red' : ''}`}>
                {levelOfImportance[props.item.levelOfImportance]}</div>
            <div className="column date">{props.item.date.split("T")[0]}</div>
            <div className="column time">{props.item.time}</div>
            <div className="column address">{props.item.address}</div>

            <div className="column edit">
                <div className="btn edit" onClick={() => handleEdit(props.item)}>Edit</div>
            </div>
            <div className={`column delete ${props.item.delete ? ' not-allowed' : ''}`}>
                <div className={`btn red-background delete ${props.item.delete ? ' no-event' : ''}`} onClick={() => handleDelete(props.item.id)}>Delete</div>
            </div>
        </div>
    )
}