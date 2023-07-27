import './dropdown.css';
import DownArrow from '../assets/downarrow.svg';
import Minus from '../assets/minus.svg';
import Search from '../assets/search.svg';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../store/store';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch } from 'react-redux';
import { Filter, addFilters, removeFilter } from '../slice/dataSlice';

interface DropdownProps{
    label: string,
    open: boolean,
    handleOpen: () => void,
}

type IsOpen = boolean

const Dropdown = ({ label, open, handleOpen }: DropdownProps) => {
    
    const [hasNext, setHasNext] = useState<IsOpen>(true);
    const [index, setIndex] = useState<number>(20);
    const [data, setData] = useState<number[]>([]);
    const [filterValue, setFilterValue] = useState<number[]>([]);
    const rawData = useAppSelector(state => state.data);
    const dispatch = useDispatch();
    const [search, setSearch] = useState<string>();  

    useEffect(() => {
        const setDropDownData = () => {
            if (open) {
                if (label === 'number') {
                    setData([...filterValue,...rawData.number.slice(0,20).filter(item => !filterValue.includes(item))]);
                } else if (label === 'mod350') {
                    setData([...filterValue,...rawData.mod350.slice(0,20).filter(item => !filterValue.includes(item))]);
                }
                else if (label === 'mod8000') {
                    setData([...filterValue,...rawData.mod8000.slice(0,20).filter(item => !filterValue.includes(item))]);
                }
                else if (label === 'mod20002') {
                    setData([...filterValue,...rawData.mod20002.slice(0,20).filter(item => !filterValue.includes(item))]);
                }                    
            } else {
                setData([]);
                setIndex(20)
            }
        }
        setDropDownData()
    }, [label, open]);
    
    useEffect(() => {
        const obj: Filter = { name: label, filterValues: filterValue }
        if (filterValue.length === 0) {
            dispatch(removeFilter(obj));
        } else {
            dispatch(addFilters(obj));
        }
    },[filterValue, label])
    
    const fetchNext = () => {
        if (data.length === rawData.number.length) {
            setHasNext(false);
            return;
        }
        setTimeout(() => {
            setIndex(index + 20);
            if (label === 'number') {
                setData(data.concat(rawData.number.slice(index + 1, index + 20)));
            } else if (label === 'mod350') {
                setData(data.concat(rawData.mod350.slice(index + 1, index + 20)));
            }
            else if (label === 'mod8000') {
                setData(data.concat(rawData.mod8000.slice(index + 1, index + 20)));
            }
            else if (label === 'mod20002') {
                setData(data.concat(rawData.mod20002.slice(index + 1, index + 20)));
            } 
        },500)
    }
    
    const handleFilterValue = ( e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        if (checked) {
            setFilterValue([...filterValue, parseInt(value)]);
        } else {
            setFilterValue(filterValue.filter(val => val !== parseInt(value)));
        }
    }

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        if (label === 'number') {
            const newData: number[] = rawData.number.filter(val => val === parseInt(value));
            newData.length === 0 ? setData(rawData.number.slice(0,20)) : setData(newData);
        } else if (label === 'mod350') {
            const newData: number[] = rawData.mod350.filter(val => val === parseInt(value));
            newData.length === 0 ? setData(rawData.mod350.slice(0,20)) : setData(newData);
        }
        else if (label === 'mod8000') {
            const newData: number[] = rawData.mod8000.filter(val => val === parseInt(value));
            newData.length === 0 ? setData(rawData.mod8000.slice(0,20)) : setData(newData);
        }
        else if (label === 'mod20002') {
            const newData: number[] = rawData.mod20002.filter(val => val === parseInt(value));
            newData.length === 0 ? setData(rawData.mod20002.slice(0,20)) : setData(newData);
        }
        setSearch(value);
        setIndex(20);
    }
        
    return (
        <>
            <button className={`dropdown-btn ${open && 'selected'}`}>
                <div className='dropdown' onClick={handleOpen}>
                    {open && <img src={Minus} style={{width:'15px', height:'15px', border:'1px solid black'}}/>}
                    {label}
                </div>
                {!open && <img src={DownArrow} style={{ width: '15px' }} />}
                {   open &&
                    <div className='dropdown-checklist' >
                        <span className='dropdown-search'>
                            <img src={Search} style={{ width: '20px', height:'20px' }} />
                            <input type='string' style={{border:'none', outline:'none', color:'black',fontSize:'16px'}} placeholder='Type to search' value={search} onChange={handleSearch}/>
                        </span>

                        <InfiniteScroll className='dropdown-list' dataLength={data.length} hasMore={hasNext} next={fetchNext} loader={<h4>Loading...</h4>} height={250}>
                            {data.map((val, i) =>
                                <label className='dropdown-checklist-item' key={i}><input type='checkbox' value={val} checked={filterValue.includes(val)} onChange={handleFilterValue} />{val}</label> 
                            )}
                        </InfiniteScroll>    
                    </div>  
                }
            </button>
        </>
    )
}


export default Dropdown