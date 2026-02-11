
import styles from './Dashboard.module.css';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import Skeleton from '@mui/material/Skeleton';
import WithAuthHOC from '../../utils/HOC/withAuthHOC';
import { useState, useContext } from 'react';
import axios from '../../utils/axios';
import { AuthContext } from '../../utils/AuthContext';

const Dashboard = () => {
  const [uploadFiletext, setUploadFileText] = useState('Upload your resume');
  const [loading, setLoading] = useState(false);
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDesc, setJobDesc] = useState('');

  const [result, setResult] = useState(null);

  const { userInfo } = useContext(AuthContext);

  const handleOnChangeFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setResumeFile(e.target.files[0]);
    setUploadFileText(e.target.files[0].name);
  };

  const handleUpload = async () => {
    if (!resumeFile) {
      alert('Please upload your resume (PDF)');
      return;
    }

    if (!jobDesc.trim()) {
      alert('Please paste the job description');
      return;
    }

    if (!userInfo?._id) {
      alert('User information missing, please log in again.');
      return;
    }

    try {
      setLoading(true);
      setResult(null);

      const formData = new FormData();
      formData.append('resume', resumeFile);
      formData.append('job_desc', jobDesc);
      formData.append('user', userInfo._id);

      const res = await axios.post('/api/resume/addResume', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setResult(res.data.data);
    } catch (err) {
      console.error(err);
      alert('Something went wrong while analyzing the resume.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.Dashboard}>
      <div className={styles.DashboardLeft}>
        <div className={styles.DashboardHeader}>
          <div className={styles.iconWithText}>
            <CreditScoreIcon sx={{ fontSize: 32 }} />
            <div>
              <h2>Resume Screening</h2>
              <p>Upload your resume and get an AI-powered match score.</p>
            </div>
          </div>
        </div>

        <div className={styles.alertInfo}>
          <p>
            Use a PDF resume and provide a clear job description for the best
            results. Your previous analyses are available in the History page.
          </p>
        </div>

        <div className={styles.DashboardUploadResume}>
          <label className={styles.uploadLabel}>
            <div>
              <span>{uploadFiletext}</span>
              <div className={styles.uploadHint}>Click to choose a PDF resume from your computer</div>
            </div>
            <input type="file" accept="application/pdf" onChange={handleOnChangeFile} />
          </label>
        </div>

        <div className={styles.jobDesc}>
          <textarea
            value={jobDesc}
            onChange={(e) => {
              setJobDesc(e.target.value);
            }}
            className={styles.textArea}
            placeholder="Paste Your Job Description"
            rows={10}
            cols={50}
          />
          <div className={styles.AnalyzeBtn} onClick={handleUpload}>
            Analyze
          </div>
        </div>
      </div>

      <div className={styles.DashboardRight}>
        <div className={styles.DashboardRightTopCard}>
          <div>Analyze With AI</div>

          {userInfo?.photoUrl && (
            <img className={styles.profileImg} src={userInfo.photoUrl} />
          )}

          <h2>{userInfo?.name}</h2>
        </div>

        {result && (
          <div className={styles.DashboardRightTopCard}>
            <div>Result</div>
            <div className={styles.resultScore}>
              Score: {result.score ? `${result.score}%` : 'N/A'}
            </div>
            <p className={styles.resultFeedback}>{result.feedback}</p>
          </div>
        )}

        {loading && (
          <Skeleton
            variant="rectangular"
            sx={{ borderRadius: '20px' }}
            width={280}
            height={280}
          />
        )}
      </div>
    </div>
  );
};

export default WithAuthHOC(Dashboard);