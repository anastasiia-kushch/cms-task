import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import toast from 'react-hot-toast';
import TOWNS from '../../data/towns';
import DEFAULT_KEYWORDS from '../../data/keywords';
import css from './CampaignForm.module.scss';

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
      id: form.id?.toString() || Date.now().toString(),
    });
    const message = initialData ? 'Campaign edited' : 'Campaign added';
    toast.success(message, {
      duration: 3000,
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
    <form onSubmit={handleSubmit} className={css.form}>
      <h2>{initialData ? 'Edit campaign' : 'New campaign'}</h2>

      <label className={css.fieldContainer}>
        Campaign name:
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
        />
        {errors.name && <span className={css.error}>{errors.name}</span>}
      </label>

      <label className={css.fieldContainer}>
        Keywords:
        <input
          list="keywords"
          value={keywordInput}
          onChange={(e) => setKeywordInput(e.target.value)}
          onBlur={(e) => addKeyword(e.target.value)}
          onKeyDown={handleKeywordKeyDown}
          placeholder="Select a keyword"
        />
        <datalist id="keywords">
          {DEFAULT_KEYWORDS.map((kw) => (
            <option key={kw} value={kw} />
          ))}
        </datalist>
        <ul className={css.kwList}>
          {form.keywords.map((kw) => (
            <li className={css.kwItem} key={kw}>
              {kw}
              <button
                className={css.kwButton}
                type="button"
                onClick={() => handleKeywordDelete(kw)}
              >
                <X width={18} height={18} />
              </button>
            </li>
          ))}
        </ul>
        {errors.keywords && (
          <span className={css.error}>{errors.keywords}</span>
        )}
      </label>

      <label className={css.fieldContainer}>
        Bid amount:
        <input
          type="number"
          name="bid"
          value={form.bid}
          step="0.01"
          min={MIN_BID}
          onChange={handleChange}
        />
        {errors.bid && <span className={css.error}>{errors.bid}</span>}
      </label>

      <label className={css.fieldContainer}>
        Campaign fund:
        <input
          type="number"
          name="fund"
          value={form.fund}
          min="0"
          step="0.01"
          onChange={handleChange}
        />
        {errors.fund && <span className={css.error}>{errors.fund}</span>}
      </label>

      <label className={css.fieldContainer}>
        Status:
        <select name="status" value={form.status} onChange={handleChange}>
          <option value="on">On</option>
          <option value="off">Off</option>
        </select>
      </label>

      <label className={css.fieldContainer}>
        Town:
        <select name="town" value={form.town} onChange={handleChange}>
          <option value="">-- Select town --</option>
          {TOWNS.map((town) => (
            <option key={town} value={town}>
              {town}
            </option>
          ))}
        </select>
        {errors.town && <span className={css.error}>{errors.town}</span>}
      </label>

      <label className={css.fieldContainer}>
        Radius (km):
        <input
          type="number"
          name="radius"
          value={form.radius}
          onChange={handleChange}
          min="1"
        />
        {errors.radius && <span className={css.error}>{errors.radius}</span>}
      </label>

      <div className={css.buttons}>
        <button className={css.button} type="submit">
          Save
        </button>
        <button className={css.button} type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default CampaignForm;
