import { useEffect, useState } from 'react';
import './App.css';
import './App.scss'

function App() { 
  const [searchQuery, setSearchQuery] = useState('')
  const [launchesData, setLaunchesData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('https://api.spacexdata.com/v5/launches')
      const data = await res.json()
      setLaunchesData(data)
    }
    fetchData()
  }, [])

  const handleChange = (e) => {
      setSearchQuery(e.target.value)
  }

  return (
    <div className="App">
      <div className='container'>
        <div className='search'>
          <input
            type='text'
            value={searchQuery}
            placeholder='Enter keywords'
            onChange={handleChange}
          />
        </div>
        <div className='lists'>
          {
            launchesData ?
            (
              launchesData
              .filter((item) => {
                if (searchQuery === '') {
                  return item
                } else if (item.name.toLowerCase().includes(searchQuery.toLowerCase())) {
                  return item
                }
              })
              .map((item, index) => {
                const event = new Date(item.date_local).getFullYear()
                return (
                  <div className='list-card' key={item.id}>
                    <img src={item.links.patch.small} alt=''/>
                    <h2>{item.flight_number}: {item.name} ({event})</h2>
                    <p>Details: {item.details || '[No Details Found]'}</p>
                  </div>
                )
              })
            ) :
            <h1>Loading!!!</h1>
          }
        </div>
      </div>
    </div>
  );
}

export default App;
