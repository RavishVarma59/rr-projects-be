
const validateCategory = ({ name, slug }) => {
    if (!name?.trim() || !slug?.trim()) {
        return "Name and slug are required";
    }

    return null;
};

module.exports = validateCategory;