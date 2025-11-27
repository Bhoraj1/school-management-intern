import { toast } from "react-toastify";
import { useGetAllTeachersQuery } from "../../../redux/features/teacherSlice";
import Loading from "../../shared/Loading";

const TeacherDash = () => {
  const { data, isLoading, error } = useGetAllTeachersQuery();

  if (isLoading) {
    return <Loading />;
  }

  if (error)
    return <p className="p-4 text-red-600">Failed to load teachers!</p>;

  const teachers = data?.teachers;

  const handleDelete = () => {
    toast.error("Hey you have to build api first");
  };
  const handleEdit = () => {
    toast.error("Hey you have to build api first");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Teachers List</h1>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                Position
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                Phone
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {teachers.map((teacher) => (
              <tr key={teacher.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-800">
                  {teacher.id}
                </td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {teacher.name}
                </td>
                <td className="px-6 py-4 text-sm text-blue-600">
                  {teacher.email}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {teacher.position}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {teacher.phone}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  <div className="space-x-4 ">
                    <button onClick={handleDelete} className="cursor-pointer">
                      Delete
                    </button>
                    <button onClick={handleEdit} className="cursor-pointer">
                      Edit
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {teachers.length === 0 && (
          <p className="p-4 text-center text-gray-500">No teacher data found</p>
        )}
      </div>
    </div>
  );
};

export default TeacherDash;
