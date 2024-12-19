const SkeletonBox = () => {
    return (
        <div
            className="bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer p-6 rounded-lg shadow-lg flex flex-col justify-between h-36"></div>
    );
};

const FactSkeleton = () => {
    return (
        <div className={"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"}>
            {Array.from({ length: 15 }).map((_, index) => (
                <SkeletonBox key={index} />
            ))}
        </div>
    );
};

export default FactSkeleton;