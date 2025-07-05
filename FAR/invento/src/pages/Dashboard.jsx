import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaTachometerAlt, FaUsers, FaBoxOpen, FaSignOutAlt, FaPlus } from 'react-icons/fa';
import axios from 'axios';

const InventoryDashboard = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    quantity: '',
    price: '',
  });

  // Redirect if not logged in
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/');
    }
  }, [navigate]);

  // Fetch products initially
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/products');
      setProducts(res.data);
    } catch (err) {
      console.error('Failed to fetch products', err);
      setError('Failed to load products');
    }
  };

  // Handle changes on Add product form
  const handleChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  // Handle changes on Edit product form
  const handleEditChange = (e) => {
    setEditProduct({ ...editProduct, [e.target.name]: e.target.value });
  };

  // Add new product with user id from localStorage
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user.id) {
      setError('⚠️ User info missing. Please login again.');
      return;
    }

    // Prepare payload with nested user id as backend expects
    const payload = {
      ...newProduct,
      quantity: Number(newProduct.quantity),
      price: Number(newProduct.price),
      user: { id: user.id },
    };

    try {
      await axios.post('http://localhost:8080/api/products', payload);
      setMessage('✅ Product added successfully');
      setNewProduct({ name: '', description: '', quantity: '', price: '' });
      fetchProducts();
      setTimeout(() => {
        setMessage('');
        setShowModal(false);
      }, 1500);
    } catch (err) {
      console.error('Failed to add product', err);
      setError('❌ Failed to add product. Please try again.');
    }
  };

  // Update existing product
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (!editProduct) {
      setError('No product selected for editing');
      return;
    }

    // Prepare updated payload
    const updatedPayload = {
      ...editProduct,
      quantity: Number(editProduct.quantity),
      price: Number(editProduct.price),
    };

    try {
      await axios.put(`http://localhost:8080/api/products/${editProduct.id}`, updatedPayload);
      setMessage('✅ Product updated successfully');
      fetchProducts();
      setTimeout(() => {
        setMessage('');
        setShowEditModal(false);
        setEditProduct(null);
      }, 1500);
    } catch (err) {
      console.error('Failed to update product', err);
      setError('❌ Failed to update product. Please try again.');
    }
  };

  // Open edit modal with product data
  const handleEdit = (product) => {
    setEditProduct(product);
    setShowEditModal(true);
    setMessage('');
    setError('');
  };

  // Delete product by id
  const handleDelete = async (id) => {
    setMessage('');
    setError('');
    try {
      await axios.delete(`http://localhost:8080/api/products/${id}`);
      fetchProducts();
    } catch (err) {
      console.error('Failed to delete product', err);
      setError('❌ Failed to delete product. Please try again.');
    }
  };

  // Logout user and clear localStorage
  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  const lowStockProducts = products.filter(p => p.quantity > 0 && p.quantity < 10);
  const outOfStockProducts = products.filter(p => p.quantity === 0);

  return (
    <div className="d-flex" style={{ minHeight: '100vh' }}>
      <div className="bg-dark text-white p-3 d-flex flex-column justify-content-between" style={{ width: '250px' }}>
        <div>
          <h4 className="mb-4">Inventory</h4>
          <p className="mb-3"><FaTachometerAlt className="me-2" /> Dashboard</p>
          <p className="mb-3"><FaUsers className="me-2" /> Users</p>
          <p className="mb-3"><FaBoxOpen className="me-2" /> Products</p>
           <div className="mt-auto">
          <button className="btn btn-outline-light w-100 mt-4" onClick={handleLogout}>
            <FaSignOutAlt className="me-2" /> Logout
          </button>
        </div>



        </div>
        <div className="mt-auto">
          {/* <button className="btn btn-outline-light w-100 mt-4" onClick={handleLogout}>
            <FaSignOutAlt className="me-2" /> Logout
          </button> */}
        </div>
      </div>

      <div className="flex-grow-1 bg-light">
        <div className="bg-dark text-white p-3 d-flex justify-content-between align-items-center">
          <div className="d-flex gap-4"></div>
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            <FaPlus className="me-2" /> Add Product
          </button>
        </div>

        {/* Add Product Modal */}
        {showModal && (
          <div className="modal d-block" tabIndex="-1" role="dialog" onClick={() => setShowModal(false)}>
            <div className="modal-dialog" role="document" onClick={e => e.stopPropagation()}>
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Add New Product</h5>
                  <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                </div>
                <div className="modal-body">
                  {message && <div className="alert alert-success">{message}</div>}
                  {error && <div className="alert alert-danger">{error}</div>}
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label className="form-label">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={newProduct.name}
                        onChange={handleChange}
                        required
                        autoFocus
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Description</label>
                      <input
                        type="text"
                        className="form-control"
                        name="description"
                        value={newProduct.description}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Quantity</label>
                      <input
                        type="number"
                        className="form-control"
                        name="quantity"
                        value={newProduct.quantity}
                        onChange={handleChange}
                        min={0}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Price</label>
                      <input
                        type="number"
                        className="form-control"
                        name="price"
                        value={newProduct.price}
                        onChange={handleChange}
                        min={0}
                        step="0.01"
                        required
                      />
                    </div>
                    <button type="submit" className="btn btn-success w-100">
                      Add Product
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Edit Product Modal */}
        {showEditModal && editProduct && (
          <div className="modal d-block" tabIndex="-1" role="dialog" onClick={() => setShowEditModal(false)}>
            <div className="modal-dialog" role="document" onClick={e => e.stopPropagation()}>
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Edit Product</h5>
                  <button type="button" className="btn-close" onClick={() => setShowEditModal(false)}></button>
                </div>
                <div className="modal-body">
                  {message && <div className="alert alert-success">{message}</div>}
                  {error && <div className="alert alert-danger">{error}</div>}
                  <form onSubmit={handleEditSubmit}>
                    <div className="mb-3">
                      <label className="form-label">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={editProduct.name}
                        onChange={handleEditChange}
                        required
                        autoFocus
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Description</label>
                      <input
                        type="text"
                        className="form-control"
                        name="description"
                        value={editProduct.description}
                        onChange={handleEditChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Quantity</label>
                      <input
                        type="number"
                        className="form-control"
                        name="quantity"
                        value={editProduct.quantity}
                        onChange={handleEditChange}
                        min={0}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Price</label>
                      <input
                        type="number"
                        className="form-control"
                        name="price"
                        value={editProduct.price}
                        onChange={handleEditChange}
                        min={0}
                        step="0.01"
                        required
                      />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">
                      Update Product
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="p-4">
          <h3>Inventory</h3>
          <div className="d-flex gap-3 my-4 flex-wrap">
            <div className="p-4 bg-primary text-white rounded flex-grow-1 text-center">
              <div>Total Products</div>
              <h4>{products.length}</h4>
            </div>
            <div className="p-4 bg-success text-white rounded flex-grow-1 text-center">
              <div>Low Stock</div>
              <h4>{lowStockProducts.length}</h4>
            </div>
            <div className="p-4 bg-warning text-white rounded flex-grow-1 text-center">
              <div>Out of Stock</div>
              <h4>{outOfStockProducts.length}</h4>
            </div>
            <div className="p-4 bg-success text-white rounded flex-grow-1 text-center">
              <div>Total Value</div>
              <h4>
                TSH {products.reduce((total, p) => total + p.quantity * p.price, 0)}
              </h4>
            </div>
          </div>

          <table className="table table-hover table-striped table-bordered rounded bg-white shadow-sm">
            <thead className="table-primary text-center">
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Quantity</th>
                <th>Price (TSH)</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="align-middle">
              {products.map((item, idx) => (
                <tr key={idx}>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td>{item.quantity}</td>
                  <td>{item.price}</td>
                  <td>
                    <div className="d-flex justify-content-center gap-2">
                      <button className="btn btn-sm btn-primary" onClick={() => handleEdit(item)}>Edit</button>
                      <button className="btn btn-sm btn-danger" onClick={() => handleDelete(item.id)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InventoryDashboard;
