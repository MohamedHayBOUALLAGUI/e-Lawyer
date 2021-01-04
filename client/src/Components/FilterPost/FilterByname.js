import React, { useState, useEffect } from 'react';
import { getSearchedLawyers, getPosts,getLawyersBySpecialty,getLawByNameSpecialty } from '../../JS/actions/post';
import { useDispatch } from 'react-redux'
import './FilterByName.css'

function FilterByname() {
  const dispatch = useDispatch()
  const [searchName, setSearchName] = useState('');
  const [searchSpecialty, setSearchSpecialty] = useState('');

  useEffect(() => {
    if (searchName === ''&& searchSpecialty==='') { dispatch(getPosts()) }
    else if (searchName!==''&&searchSpecialty===''){dispatch(getSearchedLawyers(searchName))}
    else if (searchSpecialty!==''&&searchName === '') { dispatch(getLawyersBySpecialty(searchSpecialty)) }
    else { dispatch(getLawByNameSpecialty(searchName,searchSpecialty)) }
  }, [searchName,searchSpecialty]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getSearchedLawyers(searchName))
  }
  return (
    <div className='filterName'>

      <input className="c-checkbox" type="checkbox" id="checkbox" />
      <div className="c-formContainer">

        <form className="c-form" onSubmit={handleSubmit} >
          <input className="c-form__input" placeholder="Search" type="text" required onChange={(e) => setSearchName(e.target.value)} />
          <label className="c-form__buttonLabel" htmlFor="checkbox">
            <button className="c-form__button" type="button" >Search</button>
          </label>
          <label className="c-form__toggle" htmlFor="checkbox" data-title="Search by name" />
        </form>
      </div>
      {/*Filter by lawyer specialty*/}
      <div className="contSpecialty">
        <select name="Specialty" className="specialty" onChange={(e)=>{setSearchSpecialty(e.target.value)}}>
          <option value=''>Search by Lawyer Specialty</option>
          <option value="Foreigners Lawyer">Foreigners Lawyer</option>
          <option value="Insurance Lawyer">Insurance Lawyer</option>
          <option value="Accountant & tax Lawyer">Accountant & tax Lawyer</option>
          <option value="Criminal Lawyer">Criminal Lawyer</option>
          <option value="Civil & Family Lawyer">Civil & Family Lawyer</option>
          <option value="Employment Lawyer">Employment Lawyer</option>
          <option value="Other">Other</option>
        </select>

      </div>
    </div>

  );
}

export default FilterByname;