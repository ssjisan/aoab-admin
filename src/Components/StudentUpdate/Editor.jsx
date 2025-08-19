export default function Editor({
  name,
  setName,
  email,
  setEmail,
  handleUpdateUser,
}) {
  return (
    <div>
      <h2 className="font-bold text-lg mb-4">Edit User Details</h2>

      <div className="mb-4">
        <label className="block mb-1 font-semibold">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-semibold">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>

      <button
        onClick={handleUpdateUser}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Update User
      </button>
    </div>
  );
}
