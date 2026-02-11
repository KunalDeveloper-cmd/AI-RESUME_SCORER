import styles from './History.module.css';
import { Skeleton } from '@mui/material';
import WithAuthHOC from '../../utils/HOC/withAuthHOC';
import { useState, useEffect, useContext } from 'react';
import axios from '../../utils/axios';
import { AuthContext } from '../../utils/AuthContext';

const History = () => {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);

  const { userInfo } = useContext(AuthContext);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userInfo || !userInfo._id) return;
      setLoader(true);
      try {
        const res = await axios.get(`/api/resume/get/${userInfo._id}`);
        setData(res.data?.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoader(false);
      }
    };

    fetchUserData();
  }, [userInfo]);

  return (
    <div className={styles.History}>
      <div className={styles.HistoryCardBlock}>
        {loader && (
          <>
            <Skeleton
              variant="rectangular"
              width={266}
              height={200}
              sx={{ borderRadius: '20px' }}
            />
            <Skeleton
              variant="rectangular"
              width={266}
              height={200}
              sx={{ borderRadius: '20px' }}
            />
            <Skeleton
              variant="rectangular"
              width={266}
              height={200}
              sx={{ borderRadius: '20px' }}
            />
            <Skeleton
              variant="rectangular"
              width={266}
              height={200}
              sx={{ borderRadius: '20px' }}
            />
          </>
        )}

        {data.map((item) => (
          <div key={item._id} className={styles.HistoryCard}>
            <div className={styles.cardPercentage}>
              {item.score ? `${item.score}%` : 'N/A'}
            </div>
            <p>Resume Name : {item.resume_name}</p>
            <p>{item.feedback}</p>
            <p>Dated : {item.createdAt?.slice(0, 10)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WithAuthHOC(History);
