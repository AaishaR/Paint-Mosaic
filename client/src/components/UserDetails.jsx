import { useAuth } from '../contexts/auth';
import { Link } from 'react-router-dom';

export default function UserDetails(props) {

    const { user } = useAuth();

    return (
        <>
            <form>
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Profile</h2>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-4">
                                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                                    Email
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                        <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">{user.email}</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <div className="mt-6 flex items-center justify-center gap-x-6">
                    <button type="button" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" >
                        <Link to="/addWork" style={{ color: 'white' }}>Upload New Art</Link>
                    </button>
                </div>

            </form>
        </>
    )
}