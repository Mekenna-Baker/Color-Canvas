import Auth from '../utils/auth';
import { UserData } from '../interfaces/userData';

const retrieveUsers = async () => {
  try {
    const response = await fetch('/api/users', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.getToken()}`
      }
    });
    const data = await response.json();

    if(!response.ok) {
      throw new Error('invalid user API response, check network tab!');
    }

    return data;

  } catch (err) { 
    console.log('Error from data retrieval:', err);
    return [];
  }
};

const retrieveUser = async (username: string | null): Promise<UserData> => {
  try {
    const response = await fetch(`/api/users/${username}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.getToken()}`
        }
      }
    );

    const data = await response.json();
    if(!response.ok){
      throw new Error('Invalid api response, check network tab!');
    }
    return data
  } catch (err: any){
    console.log('Error from user data retrieval: ', err);
    return Promise.reject('Could not fetch singular user!')
  }
}

export { retrieveUsers, retrieveUser};