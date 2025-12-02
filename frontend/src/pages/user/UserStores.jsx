import { useState, useEffect } from 'react';
import api from '../../utils/api';
import Navbar from '../../components/Navbar';

const UserStores = () => {
  const [stores, setStores] = useState([]);
  const [filters, setFilters] = useState({ name: '', address: '' });
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedStore, setSelectedStore] = useState(null);
  const [ratingDialog, setRatingDialog] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchStores();
  }, [filters, sortBy, sortOrder]);

  const fetchStores = async () => {
    setLoading(true);
    try {
      const response = await api.get('/user/stores', { params: { ...filters, sortBy, sortOrder } });
      setStores(response.data);
    } catch (error) {
      console.error('Error fetching stores:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const handleRateClick = (store) => {
    setSelectedStore(store);
    setRating(store.userRating || 0);
    setHoverRating(0);
    setRatingDialog(true);
  };

  const handleRatingSubmit = async () => {
    if (rating === 0) return;
    
    setSubmitting(true);
    try {
      await api.post('/user/ratings', { storeId: selectedStore.id, rating });
      setRatingDialog(false);
      fetchStores();
    } catch (error) {
      console.error('Error submitting rating:', error);
      alert(error.response?.data?.error || 'Error submitting rating');
    } finally {
      setSubmitting(false);
    }
  };

  const StarRating = ({ rating, interactive = false, onRate, onHover }) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            onClick={() => interactive && onRate && onRate(star)}
            onMouseEnter={() => interactive && onHover && onHover(star)}
            onMouseLeave={() => interactive && onHover && onHover(0)}
            className={`h-6 w-6 ${interactive ? 'cursor-pointer' : ''} ${
              star <= rating ? 'text-yellow-400' : 'text-gray-300'
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Available Stores</h1>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Filters</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="name" value={filters.name} onChange={handleFilterChange} placeholder="Store Name" className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <input name="address" value={filters.address} onChange={handleFilterChange} placeholder="Address" className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
        </div>

        {loading ? (
          <div className="bg-white rounded-lg shadow p-12">
            <div className="flex flex-col items-center justify-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
              <p className="mt-4 text-gray-600">Loading stores...</p>
            </div>
          </div>
        ) : stores.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12">
            <p className="text-center text-gray-600">No stores found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {stores.map((store) => (
              <div key={store.id} className="bg-white rounded-lg shadow-md p-4 sm:p-6 hover:shadow-lg transition">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 truncate">{store.name}</h2>
                <p className="text-sm sm:text-base text-gray-600 mb-2 truncate">{store.email}</p>
                <p className="text-sm sm:text-base text-gray-600 mb-4 line-clamp-2">{store.address}</p>
              
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-medium text-gray-700">Average Rating:</span>
                  <StarRating rating={store.rating} />
                  <span className="text-sm text-gray-600">({store.rating})</span>
                </div>
                {store.userRating && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-700">Your Rating:</span>
                    <StarRating rating={store.userRating} />
                    <span className="text-sm text-gray-600">({store.userRating})</span>
                  </div>
                )}
              </div>

              <button onClick={() => handleRateClick(store)} className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
                {store.userRating ? 'Update Rating' : 'Rate Store'}
                </button>
              </div>
            ))}
          </div>
        )}

        {ratingDialog && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Rate {selectedStore?.name}</h2>
              <p className="text-gray-600 mb-6">Click on the stars to rate this store</p>
              
              <div className="flex justify-center mb-6">
                <StarRating 
                  rating={hoverRating || rating} 
                  interactive 
                  onRate={setRating}
                  onHover={setHoverRating}
                />
              </div>

              {rating > 0 && (
                <p className="text-center text-lg font-medium text-gray-700 mb-6">
                  You selected: {rating} star{rating !== 1 ? 's' : ''}
                </p>
              )}

              <div className="flex gap-4">
                <button 
                  onClick={() => setRatingDialog(false)} 
                  disabled={submitting}
                  className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-md hover:bg-gray-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleRatingSubmit} 
                  disabled={rating === 0 || submitting} 
                  className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {submitting && (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  )}
                  {submitting ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserStores;
