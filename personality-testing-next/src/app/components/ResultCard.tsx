"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { 
    committeeImagePaths, 
    committeeFitReasons, 
    committeeDescriptions 
} from '@/data/quizData';
import { CommitteeName } from '@/types/quiz';

// Define the shape of the 'committee' prop
interface CommitteeData {
    committee: CommitteeName;
    score: number;
}

// Define the props for the ResultCard component
interface ResultCardProps {
  committee: CommitteeData | undefined; // It can be undefined if results are loading
  isPrimary?: boolean; // Optional prop, defaults to false
}

const ResultCard: React.FC<ResultCardProps> = ({ committee, isPrimary = false }) => {
    const [view, setView] = useState<'fit' | 'duties'>('fit');

    useEffect(() => {
        // Reset to the 'fit' view whenever the committee prop changes
        setView('fit');
    }, [committee]);

    // If there's no committee data, render nothing.
    if (!committee) {
        return null;
    }

    const committeeName = committee.committee;

    return (
        <div className={`result-card-container ${isPrimary ? 'is-primary' : ''}`}>
            <div className="result-card-header">
                <div className={`result-image-wrapper ${isPrimary ? 'is-primary' : ''}`}>
                    <Image 
                        src={committeeImagePaths[committeeName]} 
                        alt={`${committeeName} committee illustration`} 
                        width={250} // Adjust width/height as needed for your design
                        height={250}
                    />
                </div>
                <div className="result-title-wrapper">
                    {isPrimary && <h3>Your Primary Committee Fit is...</h3>}
                    <h1 className={isPrimary ? 'result-title-main' : 'result-title-other'}>{committeeName}</h1>
                </div>
            </div>
            <div className="result-card-body">
                {view === 'fit' ? (
                    <p className="fit-reason-text">{committeeFitReasons[committeeName]}</p>
                ) : (
                    <div className="committee-duties">
                        <h4>Key Responsibilities:</h4>
                        <ul>
                            {committeeDescriptions[committeeName].map((duty, index) => (
                                <li key={index}>{duty}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            <div className="result-card-nav">
                <button onClick={() => setView('fit')} disabled={view === 'fit'} aria-label="Show fit reason">
                    <span className="nav-arrow" aria-label="Previous">&#60;</span>
                </button>
                <div className="nav-dots">
                    <span className={`nav-dot ${view === 'fit' ? 'active' : ''}`}></span>
                    <span className={`nav-dot ${view === 'duties' ? 'active' : ''}`}></span>
                </div>
                <button onClick={() => setView('duties')} disabled={view === 'duties'} aria-label="Show key responsibilities">
                    <span className="nav-arrow" aria-label="Next">&#62;</span>
                </button>
            </div>
        </div>
    );
};

export default ResultCard;