import { useEffect, useState } from "react"
import { closeModel, updateAppointment } from "./Lib"
import { user_entry } from "./Lib"

export default function Edit(props) {

    const [titleLength, setTitleLength] = useState(0);
    const [descriptionLength, setDescriptionLength] = useState(0)
    const [addressLength, setAddressLength] = useState(0)

    const [done, setDone] = useState(false)
    const [deleted, setDeleted] = useState(false)
    const [importance, setImportance] = useState(0)
    const [data, setData] = useState({})




    const editApp = (e) => {
        const name_ = e.target.name
        let value_ = e.target.value

        if (name_ === "title") {
            setTitleLength(value_.length)
        }

        if (name_ === "description") {
            setDescriptionLength(value_.length)
        }

        if (name_ === "address") {
            setAddressLength(value_.length)
        }

        if (name_ === "done") {
            value_ = e.target.checked
            setDone(value_)
        }

        if (name_ === "delete") {
            value_ = e.target.checked
            setDeleted(value_)
        }

        if (name_ === "date") {
            value_ = new Date(value_)
        }

        if (name_ === "levelOfImportance") {
            value_ = Number(value_)
            setImportance(value_)
        }

        user_entry[name_] = value_

    }

    useEffect(() => {
        if (user_entry.title) {
            setTitleLength(user_entry.title.length);
        }
        if (user_entry.title) {
            setDescriptionLength(user_entry.description.length);
        }
        if (user_entry.address) {
            setAddressLength(user_entry.address.length);
        }
    }, []);

    const updateApp = () => {
        updateAppointment(user_entry).then(result => {
            console.log("Updated successfully: ", result)
            props.refreshApp(Math.random() * 240 * Math.random())
        }).catch(e => console.log("Could not update the appointment: ", e))

        closeModel("edit-model")
    }



    const default_date = typeof (user_entry.date) === "string" ? user_entry.date.split("T")[0] : "";


    useEffect(() => {
        setDone(user_entry.done)
        setDeleted(user_entry.delete)
        setImportance(user_entry.levelOfImportance)
        setData(user_entry)
    }, [props.stateListener])

    return (
        <div className="model-container">
            <div className="model-title">Edit Appointment</div>

            <div className="margin-top">
                <label htmlFor="Title_e">Title</label> <br />
                <input className="text-area" type="text" id="Title_e" maxLength={50} name="title" defaultValue={data.title} onChange={editApp} />
                <span className="new-levelOfImportance">{titleLength}/50</span>
            </div>

            <div className="margin-top">
                <label htmlFor="Description_e">Description</label> <br />
                <textarea className="text-area" id="Description_e" maxLength={300} name="description" cols={102} rows={10} defaultValue={data.description} onChange={editApp}></textarea> <br />
                <span className="float-right new-span">{descriptionLength}/300</span>
            </div>

            <div className="row margin-top">
                <div>
                    <label htmlFor="Address_e">Address</label>
                    <input type="text" id="Address_e" name="address" maxLength={50} defaultValue={data.address} onChange={editApp} />
                    <span className='new-levelOfImportance'>{addressLength}/50</span>
                </div>

                <div className="new-levelOfImportance">
                    <label htmlFor="LevelOfImportance_e">Importance</label>
                    <select name="levelOfImportance" id="LevelOfImportance_e" value={importance} onChange={editApp}>
                        <option value={5}>Very High</option>
                        <option value={4}>High</option>
                        <option value={3}>Medium</option>
                        <option value={2}>Normal</option>
                        <option value={1}>Low</option>
                        <option value={0}>Very Low</option>
                    </select>
                </div>
            </div>
            <div className="row margin-top items-center">
                <div className="">
                    <label htmlFor="Date_e">Date</label>
                    <input type="date" id="Date_e" name="date" onChange={editApp} defaultValue={default_date} />
                </div>

                <div className="new-levelOfImportance">
                    <label htmlFor="Time_e">Time</label>
                    <input type="time" id="Time_e" name="time" defaultValue={data.time} onChange={editApp} />
                </div>

                <div className="new-levelOfImportance row items-center">
                    <label htmlFor="Done_e">Done</label>
                    <input type="checkbox" id="Done_e" name="done" checked={done} onChange={editApp} />
                </div>

                <div className="new-levelOfImportance row items-center">
                    <label htmlFor="Delete_e">Deleted</label>
                    <input type="checkbox" id="Delete_e" name="delete" checked={deleted} onChange={editApp} />
                </div>
            </div>

            <div className="row justify-btw model-action-container margin-top">
                <div className="btn" onClick={() => closeModel("edit-model")}>Cancel</div>

                <div className="btn" onClick={updateApp}>Update</div>
            </div>
        </div>
    )
}