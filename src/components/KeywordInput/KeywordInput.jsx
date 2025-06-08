import { useState } from 'react';
import  DEFAULT_KEYWORDS  from '../../data/keywords.js'; 

function KeywordInput({ selectedKeywords, setSelectedKeywords, error }) {
  const [keywordInput, setKeywordInput] = useState('');

  const addKeyword = (value) => {
    const trimmed = value.trim();
    if (trimmed && !selectedKeywords.includes(trimmed)) {
      setSelectedKeywords((prev) => [...prev, trimmed]);
    }
    setKeywordInput('');
  };


  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addKeyword(keywordInput);
    }
  };

  const handleDelete = (kw) => {
    setSelectedKeywords((prev) => prev.filter((k) => k !== kw));
  };

  return (
    <label>
      Keywords:
      <input
        list="keywords"
        value={keywordInput}
        onChange={(e) => setKeywordInput(e.target.value)}
        onBlur={(e) => addKeyword(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Add or select keyword"
      />
      <datalist id="keywords">
        {DEFAULT_KEYWORDS.map((kw) => (
          <option key={kw} value={kw} />
        ))}
      </datalist>
      <div className="keyword-list">
        {selectedKeywords.map((kw) => (
          <span key={kw} className="keyword-chip">
            {kw}
            <button type="button" onClick={() => handleDelete(kw)}>
              ×
            </button>
          </span>
        ))}
      </div>
      {error && <span className="error">{error}</span>}
    </label>
  );
}

export default KeywordInput;
