import { useState } from 'react';
import { searchMedicines } from '../api/medicine';

export default function useMedicineSearch() {
  const [results, setResults]   = useState([]);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');
  const [searched, setSearched] = useState(false);

  const search = async (query) => {
    setLoading(true);
    setError('');
    setSearched(true);
    try {
      const { data } = await searchMedicines(query);
      setResults(data);
    } catch {
      setError('Failed to fetch medicines. Make sure the backend server is running on port 5000.');
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setResults([]);
    setSearched(false);
    setError('');
  };

  return { results, loading, error, searched, search, reset };
}
