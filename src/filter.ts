import { Data, Filter } from "./slice/dataSlice"

export const filterDataFunction = (filterValues: Filter[], data: Data[]) => {

    if (filterValues.length === 0) {
        return data;
    }
    
    let newArr: Data[] = [];
    
    filterValues.forEach((item, index) => {
        if (item.name === 'number') {
            if (index === 0) {
                newArr = data.filter(val => item.filterValues.includes(val.number));
                console.log(item.filterValues.includes(110))
            } else {
                newArr = (newArr.filter(val => item.filterValues.includes(val.number)))
            }
        } else if (item.name === 'mod350') {
            if (index === 0) {
                newArr = data.filter(val => item.filterValues.includes(val.mod350));
            } else {
                newArr = (newArr.filter(val => item.filterValues.includes(val.mod350)))
            }
        } else if (item.name === 'mod8000') {
            if (index === 0) {
                newArr = data.filter(val => item.filterValues.includes(val.mod8000));
            } else {
                newArr = (newArr.filter(val => item.filterValues.includes(val.mod8000)))
            }
        } else if (item.name === 'mod20002') {
            if (index === 0) {
                newArr = data.filter(val => item.filterValues.includes(val.mod20002));
            } else {
                newArr = (newArr.filter(val => item.filterValues.includes(val.mod20002)))
            }
        }
        
    })
    
    return newArr
}