import { useEffect, useState } from 'react'
import './App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faSearch, faTable, faXmark } from '@fortawesome/free-solid-svg-icons'

function App() {
  const [data, setData] = useState([]);
  const [display, setDisplay] = useState('Card');
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [terms, setTerms] = useState([]);
  const [activeSearch, setActiveSearch] = useState('');

  const fetchData = async (page, terms) => {
    console.log('termes recherche', terms);
    const response = await fetch(`http://localhost:3000/user/${page}`, {
      method: 'post',
      body: JSON.stringify({ terms }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    setCount(data.count);
    setData((oldData) => [...oldData, ...data.data]);
  };

  useEffect(() => {
    fetchData(page, terms);
  }, [page, terms]);

  const addTerm = () => {
    setTerms([...terms, activeSearch]);
    setActiveSearch('');
  };

  const delTerm = (index) => {
    const newTerms = [...terms];
    newTerms.splice(index, 1);
    setTerms(newTerms);
  };

  

  return (
    <div className="bg-petrol-800 p-8 text-white">
      {/* Search + display */}
      <div className='my-8 flex flex-col gap-3 md:flex-row container m-auto'>
        <div className='flex md:flex-1 flex-shrink-1 w-full'>
          <div className='bg-white flex md:flex-1 flex-shrink-1 rounded-s-md text-petrol-950 py-2 px-2 w-auto'>
            <div className="flex gap-2">
              {
                terms.map(function(term, id) {
                  return (
                    <div id={`term-${id}`} key={id} className='bg-orange-400 rounded-md p-2 flex align-middle gap-2 text-white'>
                      <p>{term}</p>
                      <button onClick={() => delTerm(id)}><FontAwesomeIcon icon={faXmark} /></button>
                    </div>
                  )
                })
              }
            </div>
            <input
              value={activeSearch}
              onChange={event => setActiveSearch(event.target.value)}
              onKeyDown={event => (event.key === 'Enter') ? addTerm() : null}
              className='ps-2 flex-1 focus-within:outline-transparent active:outline-transparent outline outline-offset-0 outline-transparent' type="text" name="" id="" />
          </div>
          <button className='bg-orange-400 rounded-e-md aspect-square hover:bg-orange-500'>
            <FontAwesomeIcon icon={faSearch} className='text-2xl' />
          </button>
        </div>
        <div className='overflow-hidden w-auto'>
          <button className={`p-4 rounded-s-md bg-orange-400 hover:bg-orange-500 ${(display == 'List') ? 'bg-orange-500' : ''}`} onClick={() => setDisplay('List')}><FontAwesomeIcon icon={faList} /></button>
          <button className={`p-4 rounded-e-md bg-orange-400 hover:bg-orange-500 ${(display == 'Card') ? 'bg-orange-500' : ''}`} onClick={() => setDisplay('Card')}><FontAwesomeIcon icon={faTable} /></button>
        </div>
      </div>
      {
        display === 'Card' ? (
          // Affichage card 
          <div className='container grid items-stretch m-auto gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
            {
              data.map(function(data, id) {
                return (
                  <div className="card rounded-lg hover:scale-105 overflow-hidden bg-orange-300 text-petrol-950 mb-4 h-full" key={data.id + id}>
                    <img className='w-full' src={data.imageUrl} alt="" />
                    <div className='p-4 mb-auto'>
                      <p className='text-wrap break-words font-bold'>{data.firstName} {data.lastName}</p>
                      <p className='italic text-wrap break-words'>{data.jobTitle}</p>
                      <p className='text-wrap break-words'>{data.email}</p>
                    </div>

                  </div>
                )
              })
            }
            <button className='p-8 bg-orange-200 rounded-lg text-petrol-950 text-lg font-bold hover:bg-orange-300' onClick={() => setPage(page + 1)}>Load more</button>
          </div>
        ) : display === 'List' ? (
          // Affichage list
          <div className='container m-auto overflow-scroll'>
            <table className='table-auto w-full'>
              <thead>
                <tr className='text-center text-lg'>
                  <th>Picture</th><th>Name</th><th>Job</th><th>Email</th>
                </tr>
              </thead>
              <tbody>
                {
                  data.map(function(data, id) {
                    return (
                      <tr className="text-center even:bg-orange-300 odd:bg-orange-200 text-petrol-950" key={'table-' + id + data.id}>
                        <td className='p-2 md:p-4'><img className='rounded-lg md:rounded-3xl m-auto w-auto h-full aspect-square' src={data.imageUrl} alt="" /></td>
                        <td className='py-4 px-2 text-wrap break-words font-bold'>{data.firstName} {data.lastName}</td>
                        <td className='py-4 px-2 text-wrap break-words italic'>{data.jobTitle}</td>
                        <td className='py-4 px-2 text-wrap break-words'>{data.email}</td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
            <button className='my-4 p-8 w-full bg-orange-200 rounded-lg text-petrol-950 text-lg font-bold hover:bg-orange-300' onClick={() => setPage(page + 1)}>Load more</button>
          </div>
        ) : null
      }

    <div className='flex justify-end'>
      <p>{data.length} / {count}</p>
    </div>
    </div>
  )

}

export default App
