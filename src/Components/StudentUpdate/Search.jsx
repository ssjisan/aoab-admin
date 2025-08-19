export default function Search({
  search,
  setSearch,
  searchResults,
  loading,
  handleSearch,
  handleSelectUser,
  highlightMatch,
}) {
  return (
    <div className="relative w-full max-w-md">
      {/* Input + Button */}
      <div className="flex gap-2 mb-2">
        <input
          type="text"
          placeholder="Search user..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className="border p-2 rounded w-full"
        />
        <button
          onClick={handleSearch}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {/* Suggestions Dropdown */}
      {searchResults.length > 0 && (
        <ul className="border rounded bg-white shadow-md absolute z-10 w-full">
          {searchResults.map((student) => (
            <li
              key={student._id}
              onClick={() => handleSelectUser(student)}
              className="p-2 hover:bg-gray-100 cursor-pointer"
            >
              {highlightMatch(student.name)} ({highlightMatch(student.email)})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
