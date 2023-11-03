import { closeModel, formatedDateToStr, formatedTimeToStr, user_entry, postAppointment } from "./Lib"
import { useState } from "react"


export default function New(props) {

    const [titleLength, setTitleLength] = useState(0)
    const [descriptionLength, setDescriptionLength] = useState(0)
    const [addressLength, setAddressLength] = useState(0)

    const newApp = (e) => {
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

        if (name_ === "date") {
            value_ = new Date(value_)
        }

        if (name_ === "levelOfImportance") {
            value_ = Number(value_)
        }

        user_entry[name_] = value_

    }

    const postApp = () => {
        postAppointment(user_entry).then(result => {
            console.log("Appointment Created successfully", result)
            props.refreshApp(Math.random() * 130 * Math.random())
            window.location.reload();
        }).catch(e => console.log("There was an error adding your appointment: ", e))

        closeModel("new-model")
    }
    return (
        <div className="model-container">
            <div className="model-title">New Appointment</div>

            <div className="margin-top">
                <label htmlFor="Title_n">Title</label> <br />
                <input className="text-area" type="text" id="Title_n" maxLength={50} name="title" onChange={newApp} />
                <span className="new-levelOfImportance">{titleLength}/50</span>
            </div>

            <div className="margin-top">
                <label htmlFor="Description_n">Description</label> <br />
                <textarea className="text-area" id="Description_n" maxLength={300} name="description" onChange={newApp} cols={102} rows={10}></textarea> <br />
                <span className="float-right new-span">{descriptionLength}/300</span>
            </div>


            <div className="row margin-t">
                <div>
                    <label htmlFor="Address_n">Address</label>
                    <input type="text" id="Address_n" name="address" onChange={newApp} maxLength={50} />
                    <span className='new-levelOfImportance'>{addressLength}/50</span>
                </div>

                <div className="new-levelOfImportance">
                    <label htmlFor="LevelOfImportance_n">Importance</label>
                    <select name="levelOfImportance" id="LevelOfImportance_n" onChange={newApp} defaultValue={2}>
                        <option value={5}>Very High</option>
                        <option value={4}>High</option>
                        <option value={3}>Medium</option>
                        <option value={2}>Normal</option>
                        <option value={1}>Low</option>
                        <option value={0}>Very Low</option>
                    </select>
                </div>
            </div>
            <div className="row margin-top">
                <div className="">
                    <label htmlFor="Date_n">Date</label>
                    <input type="date" id="Date_n" name="date" defaultValue={formatedDateToStr()} onChange={newApp} />
                </div>

                <div className="new-levelOfImportance">
                    <label htmlFor="Time_n">Time</label>
                    <input type="time" id="Time_n" name="time" defaultValue={formatedTimeToStr()} onChange={newApp} />
                </div>
            </div>

            <div className="row justify-btw model-action-container margin-top">
                <div className="btn" onClick={() => closeModel("new-model")}>Cancel</div>

                <div className="btn" onClick={postApp}>Add</div>

            </div>
        </div>
    )
}