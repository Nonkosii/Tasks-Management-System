

// export const testData = [
//    { ID: 1, Title: "Title one", Description: "Description one", LevelOfImportance: 3, Date: "14-04-2023", Time: "17:32", Address: "Be 8500" },
//    { ID: 2, Title: "Title two", Description: "Description two", LevelOfImportance: 4, Date: "13-04-2023", Time: "13:32", Address: "Be 9000" },
//    { ID: 3, Title: "Title three", Description: "Description three", LevelOfImportance: 5, Date: "12-04-2023", Time: "10:32", Address: "Be 2000" },
//    { ID: 4, Title: "Title four", Description: "Description four", LevelOfImportance: 0, Date: "10-04-2023", Time: "19:09", Address: "Be 1000" },
// ]



export const user_entry = {
    title: "",
    description: "",
    address: "",
    date: new Date(),
    time: formatedTimeToStr(),
    done: false,
    delete: false,
    levelOfImportance: 2,
}

export const filter = {
    LevelOfImportance: null,
    All: false,
    Delete: false,
    Done: false,
    StartDate: null,
    EndDate: null,
    SpecifiedDate: null,
    SpecifiedTime: null,

}

export const activeId = {
    id: 0
}

const url = "api/appointment"

export async function getDefault() {
    const result = await fetch(url)

    if (!result.ok && !result.status !== 200) {
        notifyUser("Something went wrong, please refresh the page.")
        return []
    }

    const output = await result.json()
    return output
}

export async function postAppointment(newApp) {
    const result = await fetch(url, {
        method: "POST",
        body: JSON.stringify(newApp),
        headers: {
            "content-type": "application/json"
        }
    })

    if (!result.ok) {
        notifyUser("We could not create your appointment, please try again.")
        return { msg: result }
    }
    return await result.json()

}

export async function getAppointments(filter_) {
    const result = await fetch(url + "/filters", {
        method: "POST",
        body: JSON.stringify(filter_),
        headers: {
            "content-type": "application/json"
        }
    })

    if (!result.ok) {
        notifyUser("Something went wrong, please clear filters and try again.")
        return []
    }

    return await result.json()
}

export async function updateAppointment(updateApp) {
    const result = await fetch(url + "/" + updateApp.id, {
        method: "PUT",
        body: JSON.stringify(updateApp),
        headers: {
            "Content-Type": "application/json"
        }
    })

    if (!result.ok) {
        notifyUser("We could not update your appointment, please try again.")
        return { msg: result }
    }
    notifyUser("Appointment Updated successfully.")
    return result
}

export async function deleteAppointment(id) {
    const result = await fetch(url + "/" + id, {
        method: "DELETE"
    })

    if (!result.ok) {
        notifyUser("Something went wrong, please refresh the page.")
        return { msg: result }
    }
    notifyUser("Appointment has been deleted successfully.")
    return result
}

export function notifyUser(msg) {
    const notification = document.querySelector(".notifications")
    notification.innerHTML = msg ? msg : ""

    if (msg) {
        setTimeout(() => {
            notification.innerHTML = ""
        }, 12000)
    }
}

export function openModel(model) {
    const model_ = document.querySelector("." + model)
    if (model_) {
        model_.classList.remove("hidden")
    }
}

export function closeModel(model) {
    const model_ = document.querySelector("." + model)
    if (model_) {
        model_.classList.add("hidden")
    }
}

export function formatedDateToStr(date) {
    const newDate = date ? new Date(date) : new Date()
    const month_ = newDate.getMonth() + 1;
    const monthStr = month_ > 9 ? month_ : 0 + "" + month_;
    const day_ = newDate.getDate() > 9 ? newDate.getDate() : 0 + "" + newDate.getDate();
    return newDate.getFullYear() + "-" + monthStr + "-" + day_;
}

export function formatedTimeToStr(time) {
    const newTime = time ? new Date(time) : new Date();
    const hour_ = newTime.getHours() < 9 ? 0 + '' + newTime.getHours() : newTime.getHours()
    const minutes_ = newTime.getMinutes() < 9 ? 0 + '' + newTime.getMinutes() : newTime.getMinutes()
    return hour_ + ':' + minutes_
}