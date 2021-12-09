const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const getDayMonthYear = (dateString) => {
    const date =  new Date(dateString)
    return {
        day: date.getDate(),
        month: months[date.getMonth()],
        yearDay: `${date.getFullYear()}, ${days[date.getDay()]}`
    }
}

export default getDayMonthYear