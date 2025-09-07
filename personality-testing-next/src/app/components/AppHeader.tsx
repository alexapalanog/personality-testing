"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Define the types for the component's props
interface AppHeaderProps {
  page: 'home' | 'quiz';
  onTakeTest: () => void;
  onGoHome: () => void;
}

const AppHeader: React.FC<AppHeaderProps> = ({ page, onTakeTest, onGoHome }) => {
    const isHomePage = page === 'home';

    const Logo = () => (
        <Image
          src="/assets/logos/Logo_CSS Apply.svg" // Path from the public folder
          alt="CSS Apply Logo"
          className="header-logo"
          width={150} // Add width and height for Next.js Image
          height={50} // Adjust these values to match your CSS
          priority // Prioritize loading the logo since it's above the fold
        />
    );

    return (
        <header className="app-header">
            {isHomePage ? (
                // On the home page, the logo is just a static image
                <Logo />
            ) : (
                // On other pages, it's a button to go home
                <button onClick={onGoHome} className="header-logo-button" aria-label="Go to Home Page" title="Go to Home Page">
                    <Logo />
                </button>
            )}
            {isHomePage && (
              <div className="header-actions">
                {/* Use Next.js Link component for internal navigation */}
                <Link href="/join" className="btn btn-primary btn-join">Join CSS</Link>
                <button className="btn btn-secondary btn-take-test" onClick={onTakeTest}>Take Test</button>
              </div>
            )}
        </header>
    );
};

export default AppHeader;