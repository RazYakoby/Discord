import { useEffect, useState } from 'react';
import '../../css/Chat&staff.css';
import axios from 'axios';

const baseRoute = 'http://localhost:3200';
const loginRoute = '/login';

interface friend {
  image: string;
  userName: string[];
  online: boolean;
  onClick: () => void;
}

const GetFriends = async (): Promise<friend[]> => {
  try {
      const response = await axios.post(`${baseRoute}${loginRoute}/GetFriends`);
      if (response.status === 200) {
          console.log('Response data:', JSON.stringify(response.data, null, 2));
          return Array.isArray(response.data) ? response.data : [];
      } else {
          console.error('Failed to fetch stories:', response.statusText);
          return [];
      }
  } catch (error) {
      console.error('Error fetching user stories:', error);
      return [];
  }
}

function App() {

  const [friends, setFriends] = useState<friend[]>([]);

  useEffect (() => {
    const fetch = async () => {
      const result = await GetFriends();
      setFriends(result);
    }
    fetch();
  }, []);
  
    return (
      <div className='button1'>
        <div className='space'>
          <button className='flexabillty'>
            <img
              src="data:image/png;base64,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"
              style={{ width: "32px", height: "32px", borderRadius: "50%", margin: "-3px 10px 0px -10px"}}
              alt="Avatar"
            />
            <text style={{margin: "1px 3px 1px 3px"}}>Friends</text>
          </button>
          <button className='flexabillty'>
            <img
              src="data:image/png;base64,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"
              style={{ width: "32px", height: "32px", borderRadius: "50%", margin: "-3px 10px 0px -10px"}}
              alt="Avatar"
            />
            <text style={{margin: "1px 3px 1px 3px"}}>Nitro</text>
          </button>
          <button className='flexabillty'>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRA6vKKYkxJO3Kz10d4xw7wX0PcRw4DbtTc-F1rsS-JD4n2E_4WZAuY7qzQ44Fb3slJ0A0&usqp=CAU"
              style={{ width: "32px", height: "32px", borderRadius: "50%", margin: "-3px 10px 0px -10px"}}
              alt="Avatar"
            />
            <text style={{margin: "1px 3px 1px 3px"}}>Shop</text>
          </button>
        </div>
        <div className='space2'>
          {friends.length > 0 ?
            (friends.map((friend: any, index) => {
              
              return (
                <button className='flexabillty'>
                  <img
                    key={index}
                    src={friend.image || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSuMFvTh3hIO21nydJ3Lxv38Mg_odpdDAYvnegLGP1DYXQTzCzCMCYtXz_t8ulkQP_7dQ&usqp=CAU'}
                    style={{ width: "32px", height: "32px", borderRadius: "50%", margin: "-3px 10px 0px -10px"}}
                    alt="Avatar"
                  />
                  <text style={{margin: "1px 3px 1px 3px"}}>{friend}</text>
                </button>
              );
            })): (
              <p>lo...</p>
            ) 
          }
        </div>
      </div>
    );
  }
  export default App;