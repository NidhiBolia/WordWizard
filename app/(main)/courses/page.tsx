import { getCourses,getUserProgress } from "@/database/queries";
import { List } from "./list";


const CoursesPage = async () => {
  const courses = await getCourses();
  // const userProgress = await getUserProgress();
  const userProgress = await getUserProgress();


  return (
    <div className="h-full max-w-[912px] px-3 mx-auto">
      <h1 className="text-2xl font-bold text-neutral-700">
        Language Courses
      </h1>
      <List 
        courses={courses} 
        activeCourseId={userProgress?.activeCourseId}
      />
    </div>
  );
};

export default CoursesPage;