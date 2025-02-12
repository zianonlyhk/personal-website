export default function Projects() {
    return (
        <div className="h-full flex flex-col items-center justify-center p-8">
            <h1 className="text-4xl font-bold mb-8">My Projects</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Example project card */}
                <div className="bg-gray-800 rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-2">Project Name</h2>
                    <p className="text-gray-400 mb-4">Project description goes here...</p>
                    <div className="flex gap-4">
                        <a href="#" className="text-primary-500 hover:text-primary-400">Demo</a>
                        <a href="#" className="text-primary-500 hover:text-primary-400">GitHub</a>
                    </div>
                </div>
            </div>
        </div>
    );
} 