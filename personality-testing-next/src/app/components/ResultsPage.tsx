"use client";

import React, { useMemo, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient'; // Import our new client
import { Answers, CommitteeName } from '@/types/quiz';
import { COMMITTEES, questions, SCORE_MAP } from '@/data/quizData';
import ResultCard from './ResultCard';
import BackgroundIcons from './BackgroundIcons';
import Link from 'next/link';

interface ResultsPageProps {
    answers: Answers;
    onRetake: () => void;
}

const ResultsPage: React.FC<ResultsPageProps> = ({ answers, onRetake }) => {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    const quizData = useMemo(() => {
        // This logic remains the same
        const rawScores = COMMITTEES.reduce((acc, c) => ({...acc, [c]: 0}), {} as Record<CommitteeName, number>);

        questions.forEach(q => {
            const answerValue = answers[q.id];
            if (answerValue && SCORE_MAP[answerValue as keyof typeof SCORE_MAP]) {
                const points = SCORE_MAP[answerValue as keyof typeof SCORE_MAP];
                
                if (Array.isArray(q.dominant)) {
                    q.dominant.forEach(c => { rawScores[c as CommitteeName] += points.dominant; });
                } else {
                    rawScores[q.dominant as CommitteeName] += points.dominant;
                }

                (q.average || []).forEach(c => { rawScores[c as CommitteeName] += points.average; });
                (q.less || []).forEach(c => { rawScores[c as CommitteeName] += points.less; });
            }
        });
        
        const sortedResults = Object.entries(rawScores)
            .map(([committee, score]) => ({ committee: committee as CommitteeName, score }))
            .sort((a, b) => b.score - a.score);
            
        return { rawScores, sortedResults };
    }, [answers]);

    useEffect(() => {
        const submitResults = async () => {
            const { rawScores, sortedResults } = quizData;
            
            if (!sortedResults || sortedResults.length < 3) {
                console.error("Not enough results to submit.");
                return;
            }

            try {
                const formatColumnName = (name: string) => 
                    `score_${name.toLowerCase().replace(/ & /g, '_and_').replace(/ /g, '_')}`;

                const scoresForDb = Object.entries(rawScores).reduce((acc, [committee, score]) => {
                    acc[formatColumnName(committee)] = score;
                    return acc;
                }, {} as Record<string, number>);

                const submissionData = {
                    top_committee: sortedResults[0].committee,
                    second_committee: sortedResults[1].committee,
                    third_committee: sortedResults[2].committee,
                    ...scoresForDb
                };

                // Use the imported Supabase client
                const { data, error } = await supabase
                    .from('quiz_submissions')
                    .insert([submissionData]);

                if (error) throw error;
                
                console.log('Successfully submitted detailed quiz results to Supabase:', data);

            } catch (error) {
                const err = error as Error;
                console.error('Error submitting quiz results to Supabase:', err.message);
            }
        };

        submitResults();
    }, [quizData]);

    const { sortedResults } = quizData;
    const [topResult, secondResult, thirdResult] = sortedResults;
    
    if (!topResult) {
        return <div className="results-container"><h2>Calculating your results...</h2></div>; 
    }

    return (
        <>
            <div className="results-container">
                <h2>Your Results Are In!</h2>
                
                <ResultCard committee={topResult} isPrimary={true} />

                <h4>Other Committees You Might Enjoy</h4>
                <div className="other-results-grid">
                    <ResultCard committee={secondResult} />
                    <ResultCard committee={thirdResult} />
                </div>

                <div className="results-actions">
                    {/* Use Next.js Link for navigation */}
                    <Link href="/apply" className="btn btn-primary">Join CSS Committee</Link>
                    <button className="btn btn-secondary" onClick={onRetake}>Retake the Test</button>
                </div>
            </div>
            <BackgroundIcons />
        </>
    );
}

export default ResultsPage;