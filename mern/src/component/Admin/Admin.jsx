import React, { useState, useEffect } from 'react';
import styles from './Admin.module.css';
import { Skeleton } from '@mui/material';
import WithAuthHOC from '../../utils/HOC/withAuthHOC';
import axios from '../../utils/axios';

const Admin = () => {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const fetchAllData = async () => {
      setLoader(true);
      try {
        const res = await axios.get('/api/resume/get');
        setData(res.data?.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoader(false);
      }
    };

    fetchAllData();
  }, []);

  return (
    <div className={styles.Admin}>
      <div className={styles.AdminBlock}>
        {loader && (
          <>
            <Skeleton
              variant="rectangular"
              width={266}
              height={400}
              sx={{ borderRadius: '20px' }}
            />
            <Skeleton
              variant="rectangular"
              width={266}
              height={400}
              sx={{ borderRadius: '20px' }}
            />
            <Skeleton
              variant="rectangular"
              width={266}
              height={400}
              sx={{ borderRadius: '20px' }}
            />
          </>
        )}

        {data.map((item) => (
          <div key={item._id} className={styles.AdminCard}>
            <div className={styles.cardHeader}>
              <h3>{item.user?.name || 'Unknown User'}</h3>
              <span>{item.score ? `${item.score}%` : 'N/A'}</span>
            </div>
            <p>Email: {item.user?.email}</p>
            <p>Resume: {item.resume_name}</p>
            <p>{item.feedback}</p>
            <p>Dated: {item.createdAt?.slice(0, 10)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WithAuthHOC(Admin);