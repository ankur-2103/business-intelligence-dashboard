import './table.css';
import LeftArrow from '../assets/left.svg'
import { useState, useEffect } from 'react';
import { filterDataFunction } from '../filter';
import { useAppSelector, useAppDispatch } from '../store/store';
import {  setNumber, setMod350, setMod8000, setMod20002, Data } from '../slice/dataSlice';

const Table = () => {

  const [currPage, setCurrPage] = useState(1);
  const rawData = useAppSelector(state => state.data.data);
  const [data, setData] = useState<Data[]>(rawData);
  const recordsPerPage = 20;
  const lastindex = currPage * recordsPerPage;
  const firstindex = lastindex - recordsPerPage;
  const records = data.slice(firstindex, lastindex);
  const filters = useAppSelector(state => state.data.filters);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const arr = filterDataFunction(filters, rawData);

    const number = arr.map(val => val.number);
    const mod350 = arr.map(val => val.mod350);
    const mod8000 = arr.map(val => val.mod8000);
    const mod20002 = arr.map(val => val.mod20002);

    if (filters[0]?.name === 'number' || arr.length===0) {
      dispatch(setNumber(rawData.map(val => val.number)))
    } else {
      dispatch(setNumber(number))
    }

    if (filters[0]?.name === 'mod350' || arr.length===0) {
      dispatch(setMod350(rawData.map(val => val.mod350)))
    } else {
      dispatch(setMod350(mod350))
    }
    if (filters[0]?.name === 'mod8000' || arr.length===0) {
      dispatch(setMod8000(rawData.map(val => val.mod8000)))
    } else {
      dispatch(setMod8000(mod8000))
    }
    if (filters[0]?.name === 'mod20002' || arr.length===0) {
      dispatch(setMod20002(rawData.map(val => val.mod20002)))
    } else {
      dispatch(setMod20002(mod20002))
    }

    setData(arr.length === 0 ? data : arr)
    setCurrPage(1);

  },[filters])

  return (
    <div className='table-container'>
      <div className='table'>
        <table>
          <thead>
            <tr style={{display:'flex', height:'fit-content'}}>
              <th style={{flex:'1', height:'24px', backgroundColor:'#e8e8e8'}}></th>
              <th style={{flex:'2', backgroundColor:'#e8e8e8'}}>number</th>
              <th style={{flex:'2', backgroundColor:'#e8e8e8'}}>mod350</th>
              <th style={{flex:'2', backgroundColor:'#e8e8e8'}}>mod8000</th>
              <th style={{flex:'2', backgroundColor:'#e8e8e8'}}>mod20002</th>
            </tr>
          </thead>
          <tbody>
            {records.map((item, index) => (
              <tr style={{display:'flex', height:'fit-content'}} key={index}>
                <td style={{flex:'1'}}>{firstindex+index+1}</td>
                <td style={{flex:'2'}}>{item.number}</td>
                <td style={{flex:'2'}}>{item.mod350}</td>
                <td style={{flex:'2'}}>{item.mod8000}</td>
                <td style={{flex:'2'}}>{item.mod20002}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='pagination'>
        {(firstindex + 1) + " - " + (lastindex >= data.length ? data.length : lastindex) + " / " + (data.length)}
        <img src={LeftArrow} style={{cursor:'pointer',width:'20px', borderRadius:"5px",height:"20px", backgroundColor:`${firstindex === 0 ? 'white' : 'gray'}`,display:`${firstindex === 0 ? 'none' : 'block'}`}} onClick={()=>setCurrPage(currPage-1)}/>
        <img src={LeftArrow} style={{cursor:'pointer',width:'20px', borderRadius:"5px",height:"20px", backgroundColor:`${lastindex >= data.length ? 'white' : 'gray'}`,display:`${lastindex >= data.length ? 'none' : 'block'}`, rotate:'180deg'}} onClick={()=>setCurrPage(currPage+1)}/>
      </div>
    </div>
  )
}

export default Table