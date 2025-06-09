import { useState, useEffect } from 'react';
import TOWNS from '../../data/towns';
import DEFAULT_KEYWORDS from '../../data/keywords';

const MIN_BID = 0.1;

function CampaignForm({ initialData, onSubmit, onCancel }) {
  const [form, setForm] = useState({
    name: '',
    keywords: [],
    bid: '',
    fund: '',
    status: 'on',
    town: '',
    radius: '',
  });
  const [errors, setErrors] = useState({});
  const [keywordInput, setKeywordInput] = useState('');

  useEffect(() => {
    if (initialData) {
      setForm({
        ...initialData,
        keywords: Array.isArray(initialData.keywords)
          ? initialData.keywords
          : [],
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Campaign name is required';
    if (form.keywords.length === 0)
      errs.keywords = 'At least one keyword is required';
    if (!form.bid || parseFloat(form.bid) < MIN_BID)
      errs.bid = `Minimum bid is ${MIN_BID}`;
    if (!form.fund) errs.fund = 'Campaign fund is required';
    if (!form.radius) errs.radius = 'Radius is required';
    if (!form.town) errs.town = 'Town is required';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    onSubmit({
      ...form,
      bid: parseFloat(form.bid),
      fund: parseFloat(form.fund),
      radius: parseInt(form.radius),
      id: form.id || Date.now(),
    });
  };

  const addKeyword = (value) => {
    const trimmed = value.trim();
    if (trimmed && !form.keywords.includes(trimmed)) {
      setForm((prev) => ({
        ...prev,
        keywords: [...prev.keywords, trimmed],
      }));
    }
    setKeywordInput('');
  };

  const handleKeywordKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addKeyword(keywordInput);
    }
  };

  const handleKeywordDelete = (kw) => {
    setForm((prev) => ({
      ...prev,
      keywords: prev.keywords.filter((k) => k !== kw),
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="campaign-form">
      <h2>{initialData ? 'Edit Campaign' : 'New Campaign'}</h2>

      <label>
        Campaign name:
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
        />
        {errors.name && <span className="error">{errors.name}</span>}
      </label>

      <label>
        Keywords:
        <input
          list="keywords"
          value={keywordInput}
          onChange={(e) => setKeywordInput(e.target.value)}
          onBlur={(e) => addKeyword(e.target.value)}
          onKeyDown={handleKeywordKeyDown}
          placeholder="Add or select keyword"
        />
        <datalist id="keywords">
          {DEFAULT_KEYWORDS.map((kw) => (
            <option key={kw} value={kw} />
          ))}
        </datalist>
        <div className="keyword-list">
          {form.keywords.map((kw) => (
            <span key={kw} className="keyword-chip">
              {kw}
              <button type="button" onClick={() => handleKeywordDelete(kw)}>
                ×
              </button>
            </span>
          ))}
        </div>
        {errors.keywords && <span className="error">{errors.keywords}</span>}
      </label>

      <label>
        Bid amount:
        <input
          type="number"
          name="bid"
          value={form.bid}
          step="0.01"
          min={MIN_BID}
          onChange={handleChange}
        />
        {errors.bid && <span className="error">{errors.bid}</span>}
      </label>

      <label>
        Campaign fund:
        <input
          type="number"
          name="fund"
          value={form.fund}
          min="0"
          step="0.01"
          onChange={handleChange}
        />
        {errors.fund && <span className="error">{errors.fund}</span>}
      </label>

      <label>
        Status:
        <select name="status" value={form.status} onChange={handleChange}>
          <option value="on">On</option>
          <option value="off">Off</option>
        </select>
      </label>

      <label>
        Town:
        <select name="town" value={form.town} onChange={handleChange}>
          <option value="">-- Select Town --</option>
          {TOWNS.map((town) => (
            <option key={town} value={town}>
              {town}
            </option>
          ))}
        </select>
        {errors.town && <span className="error">{errors.town}</span>}
      </label>

      <label>
        Radius (km):
        <input
          type="number"
          name="radius"
          value={form.radius}
          onChange={handleChange}
          min="1"
        />
        {errors.radius && <span className="error">{errors.radius}</span>}
      </label>

      <div className="form-buttons">
        <button type="submit">Save</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default CampaignForm;
