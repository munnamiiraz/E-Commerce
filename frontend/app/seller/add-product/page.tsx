"use client"
import React, { useEffect, useState } from 'react';
import { Upload, X, Plus, Loader2, Trash2 } from 'lucide-react';

import axios from 'axios';
import toast from 'react-hot-toast';

interface ImageType {
  id: string;
  url: string;
  file: File;
}

interface Specification {
  key: string;
  value: string;
}

interface FormData {
  title: string;
  category: string;
  originalPrice: string;
  discountPrice: string;
  quantity: string;
  description: string;
}

const SellerAddItem: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [images, setImages] = useState<ImageType[]>([]);
  const [specifications, setSpecifications] = useState<Specification[]>([{ key: '', value: '' }]);
  const [stoken, setStoken] = useState<string | null>('')
  
  const [formData, setFormData] = useState<FormData>({
    title: '',
    category: '',
    originalPrice: '',
    discountPrice: '',
    quantity: '',
    description: ''
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const remainingSlots = 4 - images.length;
    const filesToAdd = files.slice(0, remainingSlots);
    
    const newImages: ImageType[] = filesToAdd.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      url: URL.createObjectURL(file),
      file: file
    }));
    setImages([...images, ...newImages]);
  };

  const removeImage = (id: string) => {
    setImages(images.filter(img => img.id !== id));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSpecificationChange = (index: number, field: keyof Specification, value: string) => {
    const newSpecs = [...specifications];
    newSpecs[index][field] = value;
    setSpecifications(newSpecs);
  };

  const addSpecification = () => {
    setSpecifications([...specifications, { key: '', value: '' }]);
  };

  const removeSpecification = (index: number) => {
    if (specifications.length > 1) {
      setSpecifications(specifications.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);
    
    const validSpecs = specifications.filter(spec => spec.key && spec.value);
    
    const submitData = {
      ...formData,
      specifications: validSpecs,
      images: images
    };
    console.log(submitData);

    const response = await axios.post(process.env.NEXT_PUBLIC_BACKEND_URL + '/api/seller/add-product', submitData, {headers: {stoken}})
    
  };

  const calculateDiscount = (): number => {
    if (formData.originalPrice && formData.discountPrice) {
      const original = parseFloat(formData.originalPrice);
      const discount = parseFloat(formData.discountPrice);
      if (original > 0 && discount > 0) {
        return Math.floor(((original - discount) / original * 100));
      }
    }
    return 0;
  };

  

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Add New Product</h1>
            <p className="text-gray-600">Fill in the product details to list your item</p>
          </div>

          {/* Form Card */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-8">
            <div className="space-y-8">
              {/* Basic Information */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6 pb-3 border-b border-gray-200">
                  Basic Information
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Product Title *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      placeholder="e.g., Premium Wireless Headphones"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category *
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    >
                      <option value="">Select Category</option>
                      <option value="electronics">Electronics</option>
                      <option value="fashion">Fashion</option>
                      <option value="home">Home & Garden</option>
                      <option value="sports">Sports</option>
                      <option value="books">Books</option>
                      <option value="automotive">Automotive</option>
                      <option value="toys">Toys & Games</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Original Price (৳) *
                      </label>
                      <input
                        type="number"
                        name="originalPrice"
                        value={formData.originalPrice}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                        placeholder="299"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Discount Price (৳) *
                      </label>
                      <input
                        type="number"
                        name="discountPrice"
                        value={formData.discountPrice}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                        placeholder="199"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Discount %
                      </label>
                      <div className="px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-red-600 font-bold flex items-center justify-center">
                        {calculateDiscount()}% OFF
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Quantity in Stock *
                    </label>
                    <input
                      type="number"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      placeholder="23"
                    />
                  </div>
                </div>
              </div>

              {/* Product Images */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6 pb-3 border-b border-gray-200">
                  Product Images
                </h2>
                <p className="text-gray-600 text-sm mb-4">Upload up to 4 images of your product</p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {images.map((img, idx) => (
                    <div key={img.id} className="relative group">
                      <img
                        src={img.url}
                        alt={`Product ${idx + 1}`}
                        className="w-full h-40 object-cover rounded-lg border-2 border-gray-200"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(img.id)}
                        className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-red-600"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                  
                  {images.length < 4 && (
                    <label className="border-2 border-dashed border-gray-300 rounded-lg h-40 flex flex-col items-center justify-center cursor-pointer hover:border-green-500 hover:bg-green-50 transition-all">
                      <Upload className="text-gray-400 mb-2" size={28} />
                      <span className="text-gray-600 text-sm font-medium">Upload Image</span>
                      <span className="text-gray-400 text-xs mt-1">{images.length}/4</span>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>

              {/* Description */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6 pb-3 border-b border-gray-200">
                  Product Description
                </h2>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={8}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all resize-none"
                  placeholder="Describe your product in detail. Include features, condition, and any other relevant information..."
                ></textarea>
              </div>

              {/* Specifications */}
              <div>
                <div className="flex items-center justify-between mb-6 pb-3 border-b border-gray-200">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">Specifications</h2>
                    <p className="text-gray-600 text-sm mt-1">Add custom specifications for your product</p>
                  </div>
                  <button
                    type="button"
                    onClick={addSpecification}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center space-x-2 transition-all shadow-sm"
                  >
                    <Plus size={18} />
                    <span>Add Spec</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {specifications.map((spec, index) => (
                    <div key={index} className="flex gap-4 items-start">
                      <div className="flex-1">
                        <input
                          type="text"
                          value={spec.key}
                          onChange={(e) => handleSpecificationChange(index, 'key', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                          placeholder="e.g., Brand, Model, Weight"
                        />
                      </div>
                      <div className="flex-1">
                        <input
                          type="text"
                          value={spec.value}
                          onChange={(e) => handleSpecificationChange(index, 'value', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                          placeholder="e.g., Premium Tech, PT-2025-PRO"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeSpecification(index)}
                        disabled={specifications.length === 1}
                        className="px-3 py-3 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-all disabled:opacity-30 disabled:cursor-not-allowed border border-red-200"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Specification Preview */}
                {specifications.some(spec => spec.key && spec.value) && (
                  <div className="mt-6 p-6 bg-gray-50 border border-gray-200 rounded-lg">
                    <h3 className="text-gray-900 font-semibold mb-4">Specifications Preview</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {specifications
                        .filter(spec => spec.key && spec.value)
                        .map((spec, index) => (
                          <div key={index} className="flex justify-between py-2 border-b border-gray-200 last:border-0">
                            <span className="text-gray-600 font-medium">{spec.key}</span>
                            <span className="text-gray-900 font-semibold">{spec.value}</span>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Submit Buttons */}
              <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  className="px-8 py-3 rounded-lg font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-all border border-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={loading}
                  className="px-8 py-3 rounded-lg font-semibold text-white bg-green-600 hover:bg-green-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      <span>Publishing...</span>
                    </>
                  ) : (
                    <>
                      <Plus size={20} />
                      <span>Publish Product</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerAddItem;