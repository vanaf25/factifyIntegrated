import React from 'react';
import styles from './CheckFactLoader.module.css';

const CheckFactLoader = ({ progress }) => {
    const steps=["Gathering Sources","Analyzing Data","Verifying Facts","Generating Report"]
    return (
        <div className={styles.loadingContainer}>
            <div className={styles.loadingStages}>
                {steps.map((step, index) => {
                    const index2=(index + 1) * 25
                    return <div
                        className={`${styles.stage} ${progress} ${progress < index2 && progress>index*25 ? styles.active:""}  ${progress >= index2 ? styles.completed : ''}`}>
                        <div
                            className={`${styles.stageIcon} ${progress < index2 && progress>index*25 ? styles.active:""} ${progress >= index2 ? styles.completed : ''}`}>{index+1}
                        </div>
                        <div className={styles.stageLabel}>{step}</div>
                    </div>
                })}
            </div>

            <div className={styles.progressWrapper}>
                <div className={styles.progressBar}>
                    <div className={styles.progressFill} style={{width: `${progress}%`}}></div>
                </div>
                <div className={styles.progressStatus}>
                    <span>{progress}%</span>
                    <span>Estimated time: {Math.max(0, 10 - Math.floor(progress / 10))}s</span>
                </div>
            </div>
        </div>
    );
};

export default CheckFactLoader;
