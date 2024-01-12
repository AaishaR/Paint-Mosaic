import React, { useState } from 'react'
import { css } from '@emotion/react';
import { ClipLoader } from 'react-spinners';
import { useAuth } from '../../contexts/auth';
import { cloudinaryUpload, postArtWork } from '../../services/apiService';
import { PhotoIcon } from '@heroicons/react/24/solid'

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

export default function AddArtwork() {

    const { token, user } = useAuth();

    const [title, setTitle] = useState('');
    const [imageURL, setImageURL] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [material, setMaterial] = useState('');
    const [category, setCategory] = useState('Modern Art');
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFileUpload = async (e) => {
        if (e.target.files) {
            setLoading(true)
            const file = e.target.files[0];
            // console.log(file)
            const form = new FormData();
            form.append('upload_preset', 'paint-mosaic');
            form.append('file', file);
            setImageURL(await cloudinaryUpload(form));

            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
                setLoading(false);
            };

            reader.readAsDataURL(file);
        }
    }

    const handleUpload = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const newArtWork = {
                title: title,
                image: imageURL,
                description: description,
                price: price,
                material: material,
                category: category,
                artistId: user.userId,
            };

            // console.log(newArtWork);

            await postArtWork(newArtWork, token);

            setTitle('');
            setImageURL('');
            setDescription('');
            setPrice('');
            setMaterial('');
            setCategory('');

        } catch (error) {
            console.error('Error uploading artwork:', error);
        } finally {
            setLoading(false);
        }
    };
    return (
        <form>
            <div className="space-y-12">

                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Details</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">Add as much detail as possible.</p>

                    <div className="col-span-full">
                        <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                            Add photo
                        </label>
                        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                            <div className="text-center">
                                <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                    <label
                                        htmlFor="file-upload"
                                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                    >
                                        <span>Upload a file</span>
                                        <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileUpload} />
                                    </label>
                                    <p className="pl-1">or drag and drop</p>
                                </div>
                                {loading && (
                                    <ClipLoader css={override} size={50} color={'#123abc'} loading={loading} />
                                )}
                                {imagePreview && (
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="mt-4 rounded-lg border border-gray-900/25"
                                        style={{ maxWidth: '100%', maxHeight: '200px' }}
                                    />
                                )}
                                <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                            </div>
                        </div>
                    </div>


                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                            <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                                Title
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="description"
                                    id="description"
                                    autoComplete="given-name"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={(text) => { setTitle(text.target.value) }}
                                />
                            </div>
                        </div>

                        <div className="col-span-full">
                            <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                                Description
                            </label>
                            <div className="mt-2">
                                <textarea
                                    id="description"
                                    name="description"
                                    rows={3}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    defaultValue={''}
                                    onChange={(text) => { setDescription(text.target.value) }}
                                />
                            </div>
                            <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about art piece.</p>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                                Price
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="price"
                                    id="price"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={(text) => { setPrice(text.target.value) }}
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-4">
                            <label htmlFor="material" className="block text-sm font-medium leading-6 text-gray-900">
                                Material
                            </label>
                            <div className="mt-2">
                                <input
                                    id="material"
                                    name="material"
                                    type="text"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={(text) => { setMaterial(text.target.value) }}
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="category" className="block text-sm font-medium leading-6 text-gray-900">
                                Category
                            </label>
                            <div className="mt-2">
                                <select
                                    id="category"
                                    name="category"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                    onChange={(text) => { setCategory(text.target.value === '' ? 'Modern Art' : text.target.value) }}
                                >
                                    <option>Modern Art</option>
                                    <option>Still Life</option>
                                    <option>Potraits</option>
                                    <option>Landscape</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-6 flex items-center justify-center gap-x-6">
                <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                    Cancel
                </button>
                <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={handleUpload}
                    disabled={loading}
                >
                    {loading ? 'Uploading...' : 'Upload'}
                </button>
            </div>
        </form>
    )
}
