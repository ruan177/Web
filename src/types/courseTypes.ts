export interface Course {
    id: string,
    name: string,
    description: string,
    savedUsers: SavedCoursesUser[]
  }
  export interface CoursesResponse {
    courses: Course[];
    totalCount?: number; // Nova propriedade para indicar o total de cursos disponíveis
  }
 export interface Courses {
    uuid: string,
    name: string,
    author: string,
    description: string,
    body: string,
}

export interface SavedCoursesUser {
  id: string,
  user_id: string,
  course_id: string
}