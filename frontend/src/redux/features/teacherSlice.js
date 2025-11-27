import { indexSlice } from "./indexSlice";

export const teacherAPIs = indexSlice.injectEndpoints({
  endpoints: (builder) => ({
    // // query:get
    //  post,delete,update(moutation)
    // Get All Teachers
    getAllTeachers: builder.query({
      query: () => ({
        url: "/teacher/all-teachers",
        method: "GET",
      }),
      providesTags: ["teacher"],
    }),

    /// Add Teacher
    addTeacher: builder.mutation({
      query: (data) => ({
        url: "/teacher/add-teacher",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["teacher"],
    }),
  }),
});

export const { useGetAllTeachersQuery, useAddTeacherMutation } = teacherAPIs;
