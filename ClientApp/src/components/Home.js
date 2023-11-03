import React, { useEffect, useState } from 'react';
import Delete from "./Delete"
import Edit from "./Edit"
import New from "./New"
import Appointment from './Appointment';
import { getDefault, openModel, filter, getAppointments, notifyUser } from "./Lib"

export default function Home(props) {

    const [dataList, setDataList] = useState([])

    const [refreshApp, setRefreshApp] = useState(0)

    const [stateListener, setStateListener] = useState(0)

    const filterApp = (e) => {
        let name_ = e.target.name;
        let value_ = e.target.value;

        if (name_ === "All" || name_ === "Done" || name_ === "Deleted") {
            value_ = e.target.checked;
            filter[name_] = value_;
        }

        if (name_ === "period") {
            // 1 = today, 2 = this week, 3 = last week
            let startDate = new Date(), endDate = new Date();
            const number_of_days = startDate.getDay();

            if (value_ === "1") {
                startDate.setDate(number_of_days - 1)
            }

            if (value_ === "2") {
                let startDaysInSec = (number_of_days - 1) * 24 * 60 * 60 * 1000;
                let endDaysInSec = (7 - number_of_days) * 24 * 60 * 60 * 1000;

                startDate = new Date(Date.now() - startDaysInSec);
                endDate = new Date(Date.now() + endDaysInSec);
            }

            if (value_ === "3") {
                let startDaysInSec = number_of_days * 24 * 60 * 60 * 1000;
                let endDaysInSec = (6 + number_of_days) * 24 * 60 * 60 * 1000;

                endDate = new Date(Date.now() - startDaysInSec);
                startDate = new Date(Date.now() - endDaysInSec);
            }

            filter.StartDate = value_ === '4' ? null : startDate;
            filter.EndDate = value_ === '4' ? null : endDate;
            filter.SpecifiedDate = null
        }

        if (name_ === "SpecifiedDate") {
            filter.SpecifiedDate = new Date(value_);
            filter.StartDate = null
            filter.EndDate = null
        }

        if (name_ === "SpecifiedTime") {
            filter.SpecifiedTime = value_;
        }

        if (name_ === "LevelOfImportance") {
            filter.LevelOfImportance = Number(value_) === 9 ? null : Number(value_);
        }

        // fetch data with filter
        getAppointments(filter).then(r => {
            if (r.length < 1) {
                notifyUser("Filter result is empty!")
            }
            setDataList(r)
        }).catch(e => console.log("Error getting data on filter: ", e))
    }

    useEffect(() => {
        getDefault().then(data => {
            setDataList(data)
        })

    }, [refreshApp])
    return (
        <main>
            <h1 className='h1'>Manage Your Tasks Very Easy</h1>
            <div className="add-btn row items-center content-center">
                <div className="btn add" title="Add New Appointment" onClick={() => openModel("new-model")}>+</div>
            </div>

            <div className="notifications space"></div>

            <section className="row justify-btw items-center filter">
                <div className="filter-name"></div>
                <div className="row items-center filter-items">
                    <button className="clear-filters" onClick={() => window.location.reload()}>Clear Filters</button>
                    <div>
                        <label htmlFor="All_f">All</label> <br />
                        <input type="checkbox" id="All_f" name="All" onChange={filterApp} />
                    </div>

                    <div>
                        <label htmlFor="Done_f">Done</label> <br />
                        <input type="checkbox" id="Done_f" name="Done" onChange={filterApp} />
                    </div>

                    <div>
                        <label htmlFor="Deleted_f">Deleted</label> <br />
                        <input type="checkbox" id="Deleted_f" name="Deleted" onChange={filterApp} />
                    </div>
                    <div>
                        <label htmlFor="period">Period</label> <br />
                        <select name="period" id="period" defaultValue={"4"} onChange={filterApp}>
                            <option value="5" disabled>Period</option>
                            <option value="4" >Default</option>
                            <option value="1">Today</option>
                            <option value="2">This week</option>
                            <option value="3">Last week</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="SpecifiedDate">Specified Date</label> <br />
                        <input type="date" id="SpecifiedDate" name="SpecifiedDate" onChange={filterApp} />
                    </div>

                    <div>
                        <label htmlFor="SpecifiedTime">Specified Time</label> <br />
                        <input type="time" id="SpecifiedTime" name="SpecifiedTime" onChange={filterApp} />
                    </div>

                    <div>
                        <label htmlFor="LevelOfImportance_f">Level Of Importance</label> <br />
                        <select name="LevelOfImportance" id="LevelOfImportance_f" defaultValue={8} onChange={filterApp}>
                            <option value={8} disabled>Level Of Importance</option>
                            <option value={9} >Reset</option>
                            <option value={5}>Very High</option>
                            <option value={4}>High</option>
                            <option value={3}>Medium</option>
                            <option value={2}>Normal</option>
                            <option value={1}>Low</option>
                            <option value={0}>Very Low</option>
                        </select>
                    </div>
                </div>
            </section>

            <div className='row underline all' >
                <div className='column id'>ID</div>
                <div className='column title'>Title</div>
                <div className='column description'>Description</div>
                <div className='column importance'>Importance</div>
                <div className='column date'>Date</div>
                <div className='column time'>Time</div>
                <div className='column address'>Address</div>
                <div className='column edit'>Edit</div>
                <div className='column delete'>Delete</div>
            </div>

            {
                dataList.length === 0 ?
                    <div className="row empty-data waiting">Data is Empty<div className="loading">...</div></div> :
                    dataList.map(item => <Appointment item={item} key={item.id} stateListener={setStateListener} />)
            }

            <section>
                <section className='model new-model hidden' >
                    <New refreshApp={setRefreshApp} />
                </section>
                <section className='model edit-model hidden'>
                    <Edit stateListener={stateListener} refreshApp={setRefreshApp} />
                </section>
                <section className='model delete-model hidden'>
                    <Delete stateListener={stateListener} refreshApp={setRefreshApp} />
                </section>
            </section>


        </main>
    )
}
