"use client";

import React from 'react';
import Image from 'next/image'; // Use Next.js Image component for optimization
import { committeeImagePaths } from '@/data/quizData';
import BackgroundIcons from './BackgroundIcons';

// Define props type
interface HomePageProps {
    onStartQuiz: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onStartQuiz }) => {
    const leftCommittees = ['Academics', 'Community Development', 'Creatives & Technical', 'Publicity', 'External Affairs'];
    const rightCommittees = ['Documentation', 'Technology Development', 'Finance', 'Logistics', 'Sports & Talent'];

    const simplifyName = (name: string) => {
        if (name === 'Creatives & Technical') return 'Creatives';
        return name;
    };

    const CommitteeItem = ({ name }: { name: string }) => (
        <div className="committee-item">
            <div className="committee-circle">
                {/* Notice the change in image path */}
                <Image src={committeeImagePaths[name as keyof typeof committeeImagePaths]} alt={name} width={150} height={150} />
            </div>
            <p>{simplifyName(name)}</p>
        </div>
    );

    return (
        <>
            <div className="home-container">
                <div className="committee-column left">
                    {leftCommittees.map(name => <CommitteeItem key={name} name={name} />)}
                </div>

                <div className="home-central-content">
                    {/* Public folder path is just '/' */}
                    <Image src="/assets/committee_test/Questions CSAR.png" alt="An illustration with a question mark, representing the quiz" className="home-main-image" width={400} height={400} />
                    <div className="home-text-content">
                        <h1 className="home-title">Not Sure Which Committee You Belong To?</h1>
                        <p className="home-subtitle">The best way to find your passion and skills is to get involved and try things out!</p>
                        <button className="btn btn-primary btn-find-out" onClick={onStartQuiz}>
                            Find out my committee
                        </button>
                    </div>
                </div>

                <div className="committee-column right">
                    {rightCommittees.map(name => <CommitteeItem key={name} name={name} />)}
                </div>
            </div>
            <BackgroundIcons />
        </>
    );
};

export default HomePage;