'use client';

type Author = {
  id: number;
  name: string;
};

type Props = {
  authorId?: number;
  users: Author[];
};

export default function AuthorFilter({ authorId, users }: Props) {
  return (
    <form method="get" className="flex items-center space-x-4">
      <label htmlFor="authorId" className="text-sm font-medium text-gray-700">
        Filter by Author:
      </label>
      <select
        name="authorId"
        id="authorId"
        defaultValue={authorId ?? ''}
        className="border border-gray-300 px-3 py-2 rounded"
        onChange={(e) => e.currentTarget.form?.submit()}
      >
        <option value="">All Authors</option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>
    </form>
  );
}
