const handleSQLError = (res, error) => {
    console.log(error)
    res.status(500).json({ status: 'SQL Error' });
}

module.exports = handleSQLError;