const Loader = () => (
    <div className="fixed inset-0 flex flex-col gap-6 items-center justify-center bg-gray-100 dark:bg-gray-800 !bg-opacity-75 z-50">
        <div className="w-16 h-16 border-4 border-t-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
        <p className="text-gray-800 dark:text-gray-200">Syncing examples from google sheets.....</p>
    </div>
);

export default Loader;