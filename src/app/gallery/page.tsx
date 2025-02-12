export default function Gallery() {
    return (
        <div className="h-full flex flex-col items-center justify-center p-8">
            <h1 className="text-4xl font-bold mb-8">Gallery</h1>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {/* Example gallery items */}
                {[1, 2, 3, 4, 5, 6].map((item) => (
                    <div key={item} className="aspect-square rounded-lg overflow-hidden">
                        <div className="w-full h-full flex items-center justify-center">
                            Image {item}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
} 