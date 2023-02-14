import React from 'react'
import { useState, useEffect } from 'react';
import { NativeSelect,FormControl } from '@mui/material';
import styles from './countryPicker.module.css'
import {countryPicker} from '../../api'

export default({handleCountryChange})=>{

  const [fetchCountries,setfetchCountries]=useState([]);

  useEffect(()=>{
    const countreis = async()=>{
     return setfetchCountries(await countryPicker());
    }
    countreis();
  },[setfetchCountries]);
  console.log(fetchCountries);

  return <>
    <FormControl className={styles.formControl}>
      <NativeSelect defaultValue="" onChange={(e)=>{handleCountryChange(e.target.value)}}>
        <option value='global'>Global</option>
       {fetchCountries.map((country,i)=> <option key={i} value={country}>{country}</option>) }
      </NativeSelect>
    </FormControl>
    </>
}