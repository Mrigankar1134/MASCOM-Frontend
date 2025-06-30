import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  ChevronDown,
  Eye,
  Edit,
  Save,
  X,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Package,
  ChevronLeft,
  ChevronRight,
  User,
  Hash
} from 'lucide-react';

const UserMgmt = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [sortBy, setSortBy] = useState('activity');
  const [expandedUser, setExpandedUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [editingUser, setEditingUser] = useState(null);
  const [editForm, setEditForm] = useState({});
  const itemsPerPage = 5;

  // Mock user data as state
  const [mockUsers, setMockUsers] = useState([
    {
      id: 1,
      name: 'Alice Johnson',
      rollNo: 'CS2021001',
      email: 'alice@example.com',
      phone: '+1 234-567-8901',
      role: 'Admin',
      status: 'Active',
      dob: '1999-03-15',
      lastActivity: '2025-05-30',
      address: '123 Main St, New York, NY 10001',
      orders: [
        { id: 'ORD-001', date: '2025-05-25', status: 'Delivered', amount: '$299.99', item: 'Laptop' },
        { id: 'ORD-002', date: '2025-05-20', status: 'Processing', amount: '$149.50', item: 'Books' }
      ]
    },
    {
      id: 2,
      name: 'Bob Smith',
      rollNo: 'CS2021002',
      email: 'bob@example.com',
      phone: '+1 234-567-8902',
      role: 'Student',
      status: 'Active',
      dob: '2000-07-22',
      lastActivity: '2025-05-29',
      address: '456 Oak Ave, Los Angeles, CA 90210',
      orders: [
        { id: 'ORD-003', date: '2025-05-28', status: 'Shipped', amount: '$89.99', item: 'Headphones' }
      ]
    },
    {
      id: 3,
      name: 'Carol Davis',
      rollNo: 'CS2020045',
      email: 'carol@example.com',
      phone: '+1 234-567-8903',
      role: 'Faculty',
      status: 'Active',
      dob: '1985-11-08',
      lastActivity: '2025-05-15',
      address: '789 Pine Rd, Chicago, IL 60601',
      orders: []
    },
    {
      id: 4,
      name: 'David Wilson',
      rollNo: 'CS2021045',
      email: 'david@example.com',
      phone: '+1 234-567-8904',
      role: 'Student',
      status: 'Active',
      dob: '2001-01-12',
      lastActivity: '2025-05-31',
      address: '321 Elm St, Houston, TX 77001',
      orders: [
        { id: 'ORD-004', date: '2025-05-31', status: 'Delivered', amount: '$199.99', item: 'Tablet' },
        { id: 'ORD-005', date: '2025-05-25', status: 'Delivered', amount: '$79.99', item: 'Mouse' },
        { id: 'ORD-006', date: '2025-05-20', status: 'Cancelled', amount: '$299.99', item: 'Monitor' }
      ]
    },
    {
      id: 5,
      name: 'Eva Brown',
      rollNo: 'CS2021078',
      email: 'eva@example.com',
      phone: '+1 234-567-8905',
      role: 'Student',
      status: 'Active',
      dob: '2000-09-30',
      lastActivity: '2025-05-28',
      address: '654 Maple Dr, Phoenix, AZ 85001',
      orders: [
        { id: 'ORD-007', date: '2025-05-27', status: 'Processing', amount: '$159.99', item: 'Keyboard' }
      ]
    },
    {
      id: 6,
      name: 'Frank Miller',
      rollNo: 'FAC001',
      email: 'frank@example.com',
      phone: '+1 234-567-8906',
      role: 'Faculty',
      status: 'Active',
      dob: '1978-12-05',
      lastActivity: '2025-05-30',
      address: '987 Cedar Ln, Miami, FL 33101',
      orders: []
    }
  ]);

  // Filter and sort users
  const filteredUsers = useMemo(() => {
    let filtered = mockUsers.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           user.rollNo.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRole = roleFilter === 'all' || user.role.toLowerCase() === roleFilter.toLowerCase();
      return matchesSearch && matchesRole;
    });

    // Sort users
    filtered.sort((a, b) => {
      if (sortBy === 'activity') {
        return new Date(b.lastActivity) - new Date(a.lastActivity);
      } else if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });

    return filtered;
  }, [searchTerm, roleFilter, sortBy, mockUsers]);

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

  const handleEdit = (user) => {
    setEditingUser(user.id);
    setEditForm({
      name: user.name,
      rollNo: user.rollNo,
      email: user.email,
      phone: user.phone,
      dob: user.dob,
      address: user.address
    });
  };

  const handleSave = () => {
    const updatedUsers = mockUsers.map(user =>
      user.id === editingUser ? { ...user, ...editForm } : user
    );
    setMockUsers(updatedUsers);
    setEditingUser(null);
    setEditForm({});
  };

  const handleCancel = () => {
    setEditingUser(null);
    setEditForm({});
  };

  const toggleExpand = (userId) => {
    setExpandedUser(expandedUser === userId ? null : userId);
  };

  const getStatusColor = (status) => {
    return status === 'Active' ? 'text-green-600' : 'text-red-500';
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'Admin': return 'bg-black text-white';
      case 'Faculty': return 'bg-blue-600 text-white';
      case 'Student': return 'bg-green-600 text-white';
      default: return 'bg-gray-200 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <motion.div 
      className="p-8 bg-white min-h-screen"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <motion.div 
        className="mb-8 border-b border-black pb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-black mb-2">User Management</h1>
        <p className="text-gray-600">Total Users: {filteredUsers.length}</p>
      </motion.div>

      {/* Controls */}
      <motion.div 
        className="mb-8 flex flex-col md:flex-row gap-4 items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {/* Search Bar */}
        <motion.div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all duration-300"
          />
        </motion.div>

        {/* Role Filter */}
        <motion.div className="relative">
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="appearance-none bg-white border-2 border-black rounded-lg px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-gray-300 cursor-pointer"
          >
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="faculty">Faculty</option>
            <option value="student">Student</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </motion.div>

        {/* Sort By */}
        <motion.div className="relative">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="appearance-none bg-white border-2 border-black rounded-lg px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-gray-300 cursor-pointer"
          >
            <option value="activity">Last Activity</option>
            <option value="name">Name</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </motion.div>
      </motion.div>

      {/* Users Table */}
      <motion.div 
        className="bg-white border-2 border-black rounded-lg overflow-hidden mb-8"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-black text-white">
              <tr>
                <th className="px-6 py-4 text-left font-semibold">Name</th>
                <th className="px-6 py-4 text-left font-semibold">Roll No</th>
                <th className="px-6 py-4 text-left font-semibold">Email</th>
                <th className="px-6 py-4 text-left font-semibold">Role</th>
                <th className="px-6 py-4 text-left font-semibold">Status</th>
                <th className="px-6 py-4 text-left font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {paginatedUsers.map((user, index) => (
                  <React.Fragment key={user.id}>
                    <motion.tr
                      className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                    >
                      <td className="px-6 py-4 font-medium text-black">{user.name}</td>
                      <td className="px-6 py-4 text-gray-600 font-mono">{user.rollNo}</td>
                      <td className="px-6 py-4 text-gray-600">{user.email}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRoleColor(user.role)}`}>
                          {user.role}
                        </span>
                      </td>
                      <td className={`px-6 py-4 font-medium ${getStatusColor(user.status)}`}>
                        {user.status}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <motion.button
                            onClick={() => toggleExpand(user.id)}
                            className="p-2 border border-black rounded-lg hover:bg-black hover:text-white transition-colors duration-200"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            title="View Details"
                          >
                            <Eye size={16} />
                          </motion.button>
                        </div>
                      </td>
                    </motion.tr>

                    {/* Expanded User Details */}
                    <AnimatePresence>
                      {expandedUser === user.id && (
                        <motion.tr
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                          <td colSpan="6" className="px-0 py-0">
                            <motion.div 
                              className="bg-gray-50 border-t border-gray-200"
                              initial={{ y: -20 }}
                              animate={{ y: 0 }}
                              transition={{ delay: 0.1, duration: 0.3 }}
                            >
                              <div className="p-6">
                                <div className="grid md:grid-cols-2 gap-8">
                                  {/* User Profile */}
                                  <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2, duration: 0.3 }}
                                  >
                                    <div className="flex justify-between items-center mb-4">
                                      <h3 className="text-xl font-bold text-black border-b border-black pb-2">
                                        User Profile
                                      </h3>
                                      {editingUser !== user.id && (
                                        <motion.button
                                          onClick={() => handleEdit(user)}
                                          className="flex items-center gap-2 px-3 py-1 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-200"
                                          whileHover={{ scale: 1.05 }}
                                          whileTap={{ scale: 0.95 }}
                                        >
                                          <Edit size={14} />
                                          Edit
                                        </motion.button>
                                      )}
                                    </div>

                                    {editingUser === user.id ? (
                                      // Edit Form
                                      <div className="space-y-4">
                                        <div>
                                          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                          <div className="flex items-center gap-2">
                                            <User size={18} className="text-gray-600" />
                                            <input
                                              type="text"
                                              value={editForm.name}
                                              onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                                              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                            />
                                          </div>
                                        </div>

                                        <div>
                                          <label className="block text-sm font-medium text-gray-700 mb-1">Roll No</label>
                                          <div className="flex items-center gap-2">
                                            <Hash size={18} className="text-gray-600" />
                                            <input
                                              type="text"
                                              value={editForm.rollNo}
                                              onChange={(e) => setEditForm({...editForm, rollNo: e.target.value})}
                                              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black font-mono"
                                            />
                                          </div>
                                        </div>

                                        <div>
                                          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                          <div className="flex items-center gap-2">
                                            <Mail size={18} className="text-gray-600" />
                                            <input
                                              type="email"
                                              value={editForm.email}
                                              onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                                              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                            />
                                          </div>
                                        </div>

                                        <div>
                                          <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                                          <div className="flex items-center gap-2">
                                            <Phone size={18} className="text-gray-600" />
                                            <input
                                              type="tel"
                                              value={editForm.phone}
                                              onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                                              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                            />
                                          </div>
                                        </div>

                                        <div>
                                          <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                                          <div className="flex items-center gap-2">
                                            <Calendar size={18} className="text-gray-600" />
                                            <input
                                              type="date"
                                              value={editForm.dob}
                                              onChange={(e) => setEditForm({...editForm, dob: e.target.value})}
                                              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                            />
                                          </div>
                                        </div>

                                        <div>
                                          <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                                          <div className="flex items-start gap-2">
                                            <MapPin size={18} className="text-gray-600 mt-2" />
                                            <textarea
                                              value={editForm.address}
                                              onChange={(e) => setEditForm({...editForm, address: e.target.value})}
                                              rows={2}
                                              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black resize-none"
                                            />
                                          </div>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex gap-3 pt-4">
                                          <motion.button
                                            onClick={handleSave}
                                            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                          >
                                            <Save size={16} />
                                            Save Changes
                                          </motion.button>
                                          <motion.button
                                            onClick={handleCancel}
                                            className="flex items-center gap-2 px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                          >
                                            <X size={16} />
                                            Cancel
                                          </motion.button>
                                        </div>
                                      </div>
                                    ) : (
                                      // View Mode
                                      <div className="space-y-3">
                                        <div className="flex items-center gap-3">
                                          <User size={18} className="text-gray-600" />
                                          <span className="text-gray-700 font-medium">{user.name}</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                          <Hash size={18} className="text-gray-600" />
                                          <span className="text-gray-700 font-mono">{user.rollNo}</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                          <Mail size={18} className="text-gray-600" />
                                          <span className="text-gray-700">{user.email}</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                          <Phone size={18} className="text-gray-600" />
                                          <span className="text-gray-700">{user.phone}</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                          <Calendar size={18} className="text-gray-600" />
                                          <span className="text-gray-700">DOB: {formatDate(user.dob)}</span>
                                        </div>
                                        <div className="flex items-start gap-3">
                                          <MapPin size={18} className="text-gray-600 mt-1" />
                                          <span className="text-gray-700">{user.address}</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                          <Calendar size={18} className="text-gray-600" />
                                          <span className="text-gray-700">Last Active: {formatDate(user.lastActivity)}</span>
                                        </div>
                                      </div>
                                    )}
                                  </motion.div>

                                  {/* Order History */}
                                  <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3, duration: 0.3 }}
                                  >
                                    <h3 className="text-xl font-bold text-black mb-4 border-b border-black pb-2">
                                      Recent Orders ({user.orders.length})
                                    </h3>
                                    {user.orders.length > 0 ? (
                                      <div className="space-y-3 max-h-64 overflow-y-auto">
                                        {user.orders.map((order) => (
                                          <motion.div
                                            key={order.id}
                                            className="p-4 border-2 border-gray-300 rounded-lg hover:border-black transition-colors duration-200"
                                            whileHover={{ scale: 1.02 }}
                                          >
                                            <div className="flex justify-between items-start mb-2">
                                              <div className="flex items-center gap-2">
                                                <Package size={16} className="text-gray-600" />
                                                <span className="font-semibold text-black">{order.id}</span>
                                              </div>
                                              <span className="font-bold text-black">{order.amount}</span>
                                            </div>
                                            <div className="mb-2">
                                              <span className="text-gray-700 font-medium">{order.item}</span>
                                            </div>
                                            <div className="flex justify-between items-center text-sm text-gray-600">
                                              <span>{formatDate(order.date)}</span>
                                              <span className={`px-2 py-1 rounded text-xs font-medium ${
                                                order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                                                order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                                                order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                                                'bg-red-100 text-red-800'
                                              }`}>
                                                {order.status}
                                              </span>
                                            </div>
                                          </motion.div>
                                        ))}
                                      </div>
                                    ) : (
                                      <p className="text-gray-500 text-center py-8">No orders found</p>
                                    )}
                                  </motion.div>
                                </div>
                              </div>
                            </motion.div>
                          </td>
                        </motion.tr>
                      )}
                    </AnimatePresence>
                  </React.Fragment>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Pagination */}
      {totalPages > 1 && (
        <motion.div 
          className="flex justify-center items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <motion.button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="flex items-center gap-2 px-4 py-2 border-2 border-black rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-black hover:text-white transition-colors duration-200"
            whileHover={{ scale: currentPage === 1 ? 1 : 1.05 }}
            whileTap={{ scale: currentPage === 1 ? 1 : 0.95 }}
          >
            <ChevronLeft size={16} />
            Previous
          </motion.button>
          
          <div className="flex gap-2">
            {[...Array(totalPages)].map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`w-10 h-10 rounded-lg border-2 border-black font-medium transition-colors duration-200 ${
                  currentPage === index + 1 ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-100'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {index + 1}
              </motion.button>
            ))}
          </div>

          <motion.button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="flex items-center gap-2 px-4 py-2 border-2 border-black rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-black hover:text-white transition-colors duration-200"
            whileHover={{ scale: currentPage === totalPages ? 1 : 1.05 }}
            whileTap={{ scale: currentPage === totalPages ? 1 : 0.95 }}
          >
            Next
            <ChevronRight size={16} />
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default UserMgmt;