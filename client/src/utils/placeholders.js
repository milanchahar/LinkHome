const PLACEHOLDERS = [
    "https://images.unsplash.com/photo-1600585154340-be6199f7a096?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1600585154542-4912f1f2215a?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1600573472591-ee29a9d44ad6?auto=format&fit=crop&q=80"
];

export const getPlaceholderImage = (id) => {
    const index = (id || 0) % PLACEHOLDERS.length;
    return PLACEHOLDERS[index];
};
