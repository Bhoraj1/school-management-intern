import { indexSlice } from "./indexSlice";

export const teacherAPIs = indexSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllTeachers: builder.query({
      query: ({ page, limit }) => ({
        url: `/teacher/all-teachers?page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: ["teacher"],
    }),

    /// Delete Teacher
    deleteTeacher: builder.mutation({
      query: (id) => ({
        url: `/teacher/delete-teacher/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["teacher"],
    }),

    // update Teacher
    updateTeacher: builder.mutation({
      query: ({ id, data }) => ({
        url: `/teacher/update-teacher/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["teacher"],
    }),

    addTeacher: builder.mutation({
      query: (data) => ({
        url: `/teacher/add-teacher`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["teacher"],
    }),
  }),
});

export const {
  useGetAllTeachersQuery,
  useDeleteTeacherMutation,
  useUpdateTeacherMutation,
  useAddTeacherMutation,
} = teacherAPIs;
