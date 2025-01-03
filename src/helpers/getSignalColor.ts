export const getSignalColor = (signal: string) => {
    switch (signal) {
        case 'red':
            return 'bg-red-500';
        case 'orange':
            return 'bg-orange-500';
        case 'green':
            return 'bg-green-500';
        default:
            return 'bg-gray-500';
    }
};