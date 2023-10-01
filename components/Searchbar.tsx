"use client"

import React, {useState} from 'react';
import {scrapeAndStoreProduct} from "@/lib/actions";

const isValidAmazonProductURL = (url: string) => {
  try {
    const parsedURL = new URL(url);
    const hostname = parsedURL.hostname;

    if(
      hostname.includes('amazon.com') ||
      hostname.includes ('amazon.') ||
      hostname.endsWith('amazon')
    ) {
      return true;
    }
  } catch (error) {
    return false;
  }

  return false;
}


const Searchbar = ({}) => {
  const [searchPrompt, setSearchPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValidLink = isValidAmazonProductURL(searchPrompt);

    if (!isValidLink) {
      alert('Please enter a valid Amazon product link');
      return;
    }

    try {
      setIsLoading(true);

      // Scrape
      const product = await scrapeAndStoreProduct(searchPrompt);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form
      className="flex flex-wrap gap-4 mt-12"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        value={searchPrompt}
        onChange={(e) => setSearchPrompt(e.target.value)}
        placeholder="Enter product link"
        className="searchbar-input"
      />

      <button
        type="submit"
        className="searchbar-btn"
        disabled={searchPrompt === ''}
      >
        {isLoading ? 'Searching...' : 'Search'}
      </button>
    </form>
  );
};

export default Searchbar;
// by Rokas with ❤️
